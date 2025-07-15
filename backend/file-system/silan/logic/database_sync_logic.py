"""Database synchronization business logic implementation"""

import json
from pathlib import Path
from typing import Dict, Any, Union, List, Optional, cast
from datetime import datetime, date
from rich.progress import TaskID
from sqlalchemy import create_engine, and_, text
from sqlalchemy.orm import sessionmaker, Session

from ..core.exceptions import DatabaseError, ValidationError
from ..models import (
    Base, User, BlogPost, BlogTag, BlogPostTag, 
    BlogCategory, Project, ProjectTechnology,
    ProjectDetail, Idea, RecentUpdate
)
from ..parsers import ParserFactory
from ..utils import ModernLogger, CLIInterface, FileOperations, ConfigManager
from .content_logic import ContentLogic


class DatabaseSyncLogger(ModernLogger):
    """Specialized logger for database sync operations"""
    
    def __init__(self):
        super().__init__(name="db_sync", level="info")
    
    def sync_start(self, db_type: str, content_count: int) -> None:
        """Log sync operation start"""
        self.stage(f"Starting sync to {db_type} database")
        self.info(f"📚 Found {content_count} content items to process")
    
    def sync_progress(self, current: int, total: int, item_name: str) -> None:
        """Log sync progress"""
        self.debug(f"Syncing ({current}/{total}): {item_name}")
    
    def sync_complete(self, success_count: int, error_count: int) -> None:
        """Log sync completion"""
        if error_count == 0:
            self.success(f"✅ Sync completed: {success_count} items processed successfully")
        else:
            self.warning(f"⚠️ Sync completed with {error_count} errors: {success_count} success, {error_count} failed")


class DatabaseSyncLogic(DatabaseSyncLogger):
    """Complex business logic for database synchronization"""
    
    def __init__(self, database_config: Union[str, Dict[str, Any]], dry_run: bool = False):
        super().__init__()
        self.database_config = database_config
        self.dry_run = dry_run
        self.cli = CLIInterface(self)
        self.file_ops = FileOperations(self)
        
        # Initialize sub-components
        self.content_logic = ContentLogic()
        self.config_manager = ConfigManager(Path.cwd())
        
        # Database components
        self.engine = None
        self.session_factory = None
        self.current_user = None
        
        # Sync statistics
        self.sync_stats = {
            'total_items': 0,
            'processed_items': 0,
            'success_count': 0,
            'error_count': 0,
            'skipped_count': 0,
            'created_count': 0,
            'updated_count': 0,
            'deleted_count': 0,
            'sync_errors': [],
            'sync_warnings': []
        }
    
    def validate_configuration(self) -> bool:
        """Validate database configuration"""
        try:
            if isinstance(self.database_config, dict):
                self._validate_database_dict(self.database_config)
            elif isinstance(self.database_config, str):
                if not self.database_config.strip():
                    raise ValidationError("Database connection string cannot be empty")
            else:
                raise ValidationError("Database config must be dict or string")
            
            return True
            
        except ValidationError as e:
            self.error(f"Configuration validation failed: {e}")
            return False
    
    def _validate_database_dict(self, config: Dict[str, Any]) -> None:
        """Validate database configuration dictionary"""
        if 'type' not in config:
            raise ValidationError("Database config missing 'type' field")
        
        db_type = config['type']
        if db_type not in ['mysql', 'postgresql', 'sqlite']:
            raise ValidationError(f"Unsupported database type: {db_type}")
        
        if db_type in ['mysql', 'postgresql']:
            required_keys = ['host', 'user', 'database']
            for key in required_keys:
                if key not in config:
                    raise ValidationError(f"Missing required database config: {key}")
        
        elif db_type == 'sqlite':
            if 'path' not in config:
                raise ValidationError("SQLite database config missing 'path'")
    
    def show_sync_overview(self) -> None:
        """Display synchronization overview"""
        self.section("Database Synchronization Overview")
        
        # Database configuration info
        db_info = self._get_database_info()
        self.cli.display_info_panel("Database Configuration", db_info)
        
        # Content analysis
        content_analysis = self.content_logic.analyze_content_for_sync()
        self.cli.display_info_panel("Content Analysis", content_analysis)
        
        if self.dry_run:
            self.info("🧪 Running in DRY RUN mode - no changes will be made")
    
    def _get_database_info(self) -> Dict[str, Any]:
        """Get database configuration info for display"""
        if isinstance(self.database_config, str):
            return {'Type': 'Custom connection string', 'Connection': self.database_config[:50] + '...'}
        
        config = self.database_config
        info = {'Type': config['type'].upper()}
        
        if config['type'] == 'sqlite':
            info['Database File'] = config['path']
        else:
            info['Host'] = f"{config['host']}:{config.get('port', 'default')}"
            info['Database'] = config['database']
            info['User'] = config['user']
        
        return info
    
    def execute_sync(self, create_tables: bool = False) -> bool:
        """Execute the database synchronization"""
        try:
            # Initialize database connection
            if not self._initialize_database():
                return False
            
            # Create tables if requested
            if create_tables:
                self._create_database_tables()
            
            # Get content to sync
            content_items = self.content_logic.get_all_content_for_sync()
            self.sync_stats['total_items'] = len(content_items)
            
            if not content_items:
                self.info("📋 No content found to sync")
                return True
            
            # Start sync process
            self.sync_start(
                self._get_database_type(),
                len(content_items)
            )
            
            # Process content items
            progress, raw_task_id = self.progress(len(content_items), "Syncing content")
            task_id = cast(TaskID, raw_task_id)
            progress.start()
            try:
                for i, item in enumerate(content_items):
                    try:
                        if self.dry_run:
                            self._simulate_sync_item(item)
                        else:
                            self._sync_content_item(item)
                        
                        self.sync_stats['success_count'] += 1
                        self.sync_progress(i + 1, len(content_items), item['name'])
                        
                    except Exception as e:
                        error_msg = f"Failed to sync {item['path']}: {e}"
                        self.error(error_msg)
                        self.sync_stats['error_count'] += 1
                        self.sync_stats['sync_errors'].append(error_msg)
                    
                    self.sync_stats['processed_items'] += 1
                    progress.update(task_id, advance=1)
            finally:
                progress.stop()
            
            # Log completion
            self.sync_complete(
                self.sync_stats['success_count'],
                self.sync_stats['error_count']
            )
            
            # Save sync summary
            if not self.dry_run:
                self.save_sync_summary()
            
            # Display final statistics
            self._display_sync_results()
            
            return self.sync_stats['error_count'] == 0
            
        except Exception as e:
            self.error(f"Sync execution failed: {e}")
            return False
        finally:
            self._cleanup_database()
    
    def _initialize_database(self) -> bool:
        """Initialize database connection"""
        try:
            connection_string = self._build_connection_string()
            self.engine = create_engine(
                connection_string,
                echo=False,
                pool_pre_ping=True
            )
            
            # Test connection
            with self.engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            
            self.session_factory = sessionmaker(bind=self.engine)
            self.debug("Database connection initialized successfully")
            return True
            
        except Exception as e:
            self.error(f"Failed to initialize database: {e}")
            return False
    
    def _build_connection_string(self) -> str:
        """Build SQLAlchemy connection string"""
        if isinstance(self.database_config, str):
            return self.database_config
        
        config = self.database_config
        db_type = config['type']
        
        if db_type == 'sqlite':
            db_path = config['path']
            Path(db_path).parent.mkdir(parents=True, exist_ok=True)
            return f"sqlite:///{db_path}"
        
        elif db_type == 'mysql':
            host = config['host']
            port = config.get('port', 3306)
            user = config['user']
            password = config.get('password', '')
            database = config['database']
            return f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4"
        
        elif db_type == 'postgresql':
            host = config['host']
            port = config.get('port', 5432)
            user = config['user']
            password = config.get('password', '')
            database = config['database']
            return f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}"
        
        else:
            raise DatabaseError(f"Unsupported database type: {db_type}")
    
    def _create_database_tables(self) -> None:
        """Create database tables"""
        try:
            if not self.engine:
                raise DatabaseError("Database engine not initialized")
            
            Base.metadata.create_all(self.engine)
            self.info("✅ Database tables created/verified")
        except Exception as e:
            raise DatabaseError(f"Failed to create tables: {e}")
    
    def _sync_content_item(self, item: Dict[str, Any]) -> None:
        """Sync a single content item to database"""
        try:
            if not self.session_factory:
                raise DatabaseError("Database session factory not initialized")
            
            with self.session_factory() as session:
                # Ensure user exists
                if not self.current_user:
                    self.current_user = self._get_or_create_user(session)
                
                if not self.current_user:
                    raise DatabaseError("Failed to get or create user")
                
                content_type = item['type']
                content_data = item['data']
                
                # Sync based on content type
                if content_type == 'blog':
                    self._sync_blog_post(session, content_data, item)
                elif content_type == 'projects':
                    self._sync_project(session, content_data, item)
                elif content_type == 'ideas':
                    self._sync_idea(session, content_data, item)
                elif content_type == 'updates':
                    self._sync_update(session, content_data, item)
                else:
                    self.warning(f"Unknown content type: {content_type}")
                    return
                
                session.commit()
                self.sync_stats['created_count'] += 1
                
        except Exception as e:
            raise DatabaseError(f"Failed to sync content item: {e}")
    
    def _sync_blog_post(self, session: Session, content_data: Dict[str, Any], item: Dict[str, Any]) -> None:
        """Sync blog post to database"""
        try:
            frontmatter = content_data.get('frontmatter', {})
            content = content_data.get('content', '')
            
            # Required fields
            title = frontmatter.get('title', 'Untitled')
            slug = frontmatter.get('slug', self._generate_slug(title))
            
            # Check if blog post exists
            existing_post = session.query(BlogPost).filter_by(slug=slug).first()
            
            if existing_post:
                # Update existing post
                existing_post.title = title
                existing_post.content = content
                existing_post.excerpt = frontmatter.get('excerpt', frontmatter.get('description', ''))
                existing_post.is_featured = frontmatter.get('featured', False)
                existing_post.updated_at = datetime.utcnow()
                
                if frontmatter.get('date'):
                    existing_post.published_at = self._parse_datetime(frontmatter['date'])
                
                blog_post = existing_post
                self.sync_stats['updated_count'] += 1
            else:
                # Create new post
                assert self.current_user is not None
                blog_post = BlogPost(
                    user_id=self.current_user.id,
                    title=title,
                    slug=slug,
                    content=content,
                    excerpt=frontmatter.get('excerpt', frontmatter.get('description', '')),
                    is_featured=frontmatter.get('featured', False),
                    published_at=self._parse_datetime(frontmatter.get('date', datetime.utcnow()))
                )
                session.add(blog_post)
                session.flush()  # Get the ID
                self.sync_stats['created_count'] += 1
            
            # Handle tags
            if 'tags' in frontmatter and frontmatter['tags']:
                self._sync_blog_tags(session, blog_post, frontmatter['tags'])
            
            # Handle categories
            if 'categories' in frontmatter and frontmatter['categories']:
                self._sync_blog_categories(session, blog_post, frontmatter['categories'])
            
            self.debug(f"Synced blog post: {title}")
            
        except Exception as e:
            raise DatabaseError(f"Failed to sync blog post: {e}")
    
    def _sync_project(self, session: Session, content_data: Dict[str, Any], item: Dict[str, Any]) -> None:
        """Sync project to database"""
        try:
            frontmatter = content_data.get('frontmatter', {})
            content = content_data.get('content', '')
            
            title = frontmatter.get('title', 'Untitled Project')
            slug = frontmatter.get('slug', self._generate_slug(title))
            
            # Check if project exists
            existing_project = session.query(Project).filter_by(slug=slug).first()
            
            if existing_project:
                # Update existing project
                existing_project.title = title
                existing_project.description = frontmatter.get('description', '')
                existing_project.github_url = frontmatter.get('github_url')
                existing_project.demo_url = frontmatter.get('demo_url')
                existing_project.is_featured = frontmatter.get('featured', False)
                existing_project.updated_at = datetime.utcnow()
                
                if frontmatter.get('start_date'):
                    existing_project.start_date = self._parse_date(frontmatter['start_date'])
                if frontmatter.get('end_date'):
                    existing_project.end_date = self._parse_date(frontmatter['end_date'])
                
                project = existing_project
                self.sync_stats['updated_count'] += 1
            else:
                # Create new project
                assert self.current_user is not None
                project = Project(
                    user_id=self.current_user.id,
                    title=title,
                    slug=slug,
                    description=frontmatter.get('description', ''),
                    github_url=frontmatter.get('github_url'),
                    demo_url=frontmatter.get('demo_url'),
                    is_featured=frontmatter.get('featured', False),
                    start_date=self._parse_date(frontmatter.get('start_date')),
                    end_date=self._parse_date(frontmatter.get('end_date'))
                )
                session.add(project)
                session.flush()
                self.sync_stats['created_count'] += 1
            
            # Handle technologies
            if 'technologies' in frontmatter and frontmatter['technologies']:
                self._sync_project_technologies(session, project, frontmatter['technologies'])
            
            # Handle project details
            if content:
                self._sync_project_details(session, project, content)
            
            self.debug(f"Synced project: {title}")
            
        except Exception as e:
            raise DatabaseError(f"Failed to sync project: {e}")
    
    def _sync_idea(self, session: Session, content_data: Dict[str, Any], item: Dict[str, Any]) -> None:
        """Sync idea to database"""
        try:
            frontmatter = content_data.get('frontmatter', {})
            content = content_data.get('content', '')
            
            title = frontmatter.get('title', 'Untitled Idea')
            slug = frontmatter.get('slug', self._generate_slug(title))
            
            # Check if idea exists
            existing_idea = session.query(Idea).filter_by(slug=slug).first()
            
            if existing_idea:
                # Update existing idea
                existing_idea.title = title
                existing_idea.abstract = frontmatter.get('abstract', frontmatter.get('description', ''))
                existing_idea.updated_at = datetime.utcnow()
                
                idea = existing_idea
                self.sync_stats['updated_count'] += 1
            else:
                # Create new idea
                assert self.current_user is not None
                idea = Idea(
                    user_id=self.current_user.id,
                    title=title,
                    slug=slug,
                    abstract=frontmatter.get('abstract', frontmatter.get('description', '')),
                    motivation=content if content else None
                )
                session.add(idea)
                session.flush()
                self.sync_stats['created_count'] += 1
            
            self.debug(f"Synced idea: {title}")
            
        except Exception as e:
            raise DatabaseError(f"Failed to sync idea: {e}")
    
    def _sync_update(self, session: Session, content_data: Dict[str, Any], item: Dict[str, Any]) -> None:
        """Sync update to database"""
        try:
            frontmatter = content_data.get('frontmatter', {})
            content = content_data.get('content', '')
            
            title = frontmatter.get('title', 'Untitled Update')
            update_date = self._parse_date(frontmatter.get('date', datetime.utcnow().date()))
            
            # Check if update exists (by title and date)
            existing_update = session.query(RecentUpdate).filter(
                and_(
                    RecentUpdate.title == title,
                    RecentUpdate.date == update_date
                )
            ).first()
            
            if existing_update:
                # Update existing update
                existing_update.description = content or frontmatter.get('description', '')
                existing_update.updated_at = datetime.utcnow()
                
                update = existing_update
                self.sync_stats['updated_count'] += 1
            else:
                # Create new update
                assert self.current_user is not None
                update = RecentUpdate(
                    user_id=self.current_user.id,
                    title=title,
                    description=content or frontmatter.get('description', ''),
                    date=update_date
                )
                session.add(update)
                session.flush()
                self.sync_stats['created_count'] += 1
            
            self.debug(f"Synced update: {title}")
            
        except Exception as e:
            raise DatabaseError(f"Failed to sync update: {e}")
    
    def _simulate_sync_item(self, item: Dict[str, Any]) -> None:
        """Simulate syncing an item (dry run)"""
        self.debug(f"[DRY RUN] Would sync {item['type']}: {item['name']}")
    
    def _get_or_create_user(self, session: Session) -> User:
        """Get or create default user for content"""
        user = session.query(User).first()
        if not user:
            user = User(
                username='admin',
                email='admin@example.com',
                display_name='Admin User',
                is_active=True
            )
            session.add(user)
            session.flush()
        return user
    
    def _sync_blog_tags(self, session: Session, blog_post: BlogPost, tags: List[str]) -> None:
        """Sync blog tags for a post"""
        # Clear existing tags
        session.query(BlogPostTag).filter_by(blog_post_id=blog_post.id).delete()
        
        for tag_name in tags:
            if not tag_name or not tag_name.strip():
                continue
                
            # Get or create tag
            tag = session.query(BlogTag).filter_by(name=tag_name).first()
            if not tag:
                tag = BlogTag(
                    name=tag_name,
                    slug=self._generate_slug(tag_name)
                )
                session.add(tag)
                session.flush()
            
            # Create association
            blog_post_tag = BlogPostTag(
                blog_post_id=blog_post.id,
                blog_tag_id=tag.id
            )
            session.add(blog_post_tag)
    
    def _sync_blog_categories(self, session: Session, blog_post: BlogPost, categories: List[str]) -> None:
        """Sync blog categories for a post"""
        if categories and categories[0]:
            category_name = categories[0]  # Take first category
            category = session.query(BlogCategory).filter_by(name=category_name).first()
            if not category:
                category = BlogCategory(
                    name=category_name,
                    slug=self._generate_slug(category_name)
                )
                session.add(category)
                session.flush()
            
            blog_post.category_id = category.id
    
    def _sync_project_technologies(self, session: Session, project: Project, technologies: List[str]) -> None:
        """Sync project technologies"""
        # Clear existing technologies
        session.query(ProjectTechnology).filter_by(project_id=project.id).delete()
        
        for i, tech_name in enumerate(technologies):
            if not tech_name or not tech_name.strip():
                continue
                
            tech = ProjectTechnology(
                project_id=project.id,
                technology_name=tech_name,
                sort_order=i
            )
            session.add(tech)
    
    def _sync_project_details(self, session: Session, project: Project, content: str) -> None:
        """Sync project details from content"""
        # Check if details exist
        details = session.query(ProjectDetail).filter_by(project_id=project.id).first()
        if not details:
            details = ProjectDetail(
                project_id=project.id,
                detailed_description=content
            )
            session.add(details)
        else:
            details.detailed_description = content
            details.updated_at = datetime.utcnow()
    
    def _generate_slug(self, title: str) -> str:
        """Generate URL-friendly slug from title"""
        import re
        if not title:
            return 'untitled'
        
        slug = title.lower()
        slug = re.sub(r'[^\w\s-]', '', slug)
        slug = re.sub(r'[-\s]+', '-', slug)
        slug = slug.strip('-')
        
        return slug or 'untitled'
    
    def _parse_datetime(self, date_str: Union[str, datetime]) -> datetime:
        """Parse datetime from string or return datetime object"""
        if isinstance(date_str, datetime):
            return date_str
        
        if isinstance(date_str, str):
            try:
                return datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                try:
                    return datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
                except ValueError:
                    return datetime.utcnow()
        
        return datetime.utcnow()
    
    def _parse_date(self, date_str: Union[str, datetime, date]) -> Optional[date]:
        """Parse date from string"""
        if not date_str:
            return None
        
        if isinstance(date_str, date):
            return date_str
        
        if isinstance(date_str, datetime):
            return date_str.date()
        
        if isinstance(date_str, str):
            try:
                return datetime.strptime(date_str, '%Y-%m-%d').date()
            except ValueError:
                return None
        
        return None
    
    def _get_database_type(self) -> str:
        """Get database type for logging"""
        if isinstance(self.database_config, dict):
            return self.database_config.get('type', 'unknown')
        return 'custom'
    
    def save_sync_summary(self) -> None:
        """Save sync summary to cache file"""
        try:
            sync_summary = {
                'timestamp': datetime.utcnow().isoformat(),
                'stats': self.sync_stats,
                'database_config': self.database_config if isinstance(self.database_config, dict) else 'custom',
                'dry_run': self.dry_run
            }
            
            summary_file = self.config_manager.project_dir / '.silan' / 'last_sync.json'
            with open(summary_file, 'w') as f:
                json.dump(sync_summary, f, indent=2)
            
            self.debug(f"Sync summary saved to {summary_file}")
            
        except Exception as e:
            self.error(f"Failed to save sync summary: {e}")
    
    def _display_sync_results(self) -> None:
        """Display comprehensive sync results"""
        try:
            # Summary statistics
            stats_data = {
                "Total Items": self.sync_stats['total_items'],
                "Successfully Processed": self.sync_stats['success_count'],
                "Created": self.sync_stats['created_count'],
                "Updated": self.sync_stats['updated_count'],
                "Skipped": self.sync_stats['skipped_count'],
                "Errors": self.sync_stats['error_count']
            }
            
            if self.dry_run:
                self.cli.display_info_panel("Dry Run Results", stats_data)
            else:
                self.cli.display_success_panel(
                    "Sync Completed Successfully",
                    "Database synchronization completed",
                    stats_data
                )
            
            # Show errors if any
            if self.sync_stats['sync_errors']:
                self.error("Synchronization errors occurred:")
                for i, error in enumerate(self.sync_stats['sync_errors'][:5]):
                    self.error(f"  {i+1}. {error}")
            
            # Show warnings if any
            if self.sync_stats['sync_warnings']:
                self.warning(f"Sync completed with {len(self.sync_stats['sync_warnings'])} warnings")
            
        except Exception as e:
            self.error(f"Failed to display sync results: {e}")
    
    def _cleanup_database(self) -> None:
        """Clean up database resources"""
        try:
            if self.engine:
                self.engine.dispose()
                self.debug("Database connection disposed")
        except Exception as e:
            self.error(f"Error during database cleanup: {e}")
    
    def cleanup(self) -> None:
        """Clean up all resources"""
        self._cleanup_database()
        if self.content_logic:
            self.content_logic.cleanup()