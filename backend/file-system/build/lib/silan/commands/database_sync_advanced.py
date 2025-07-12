"""
Advanced database sync command that uses structured parsing to properly map
content to the complex database models
"""

import frontmatter
from pathlib import Path
from typing import Dict, Any, List, Optional, Union
import hashlib
import uuid

from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError

from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn
from rich.table import Table

from ..models import (
    Base, User, Language, PersonalInfo, PersonalInfoTranslation, SocialLink,
    Education, EducationTranslation, EducationDetail, EducationDetailTranslation,
    WorkExperience, WorkExperienceTranslation, WorkExperienceDetail, WorkExperienceDetailTranslation,
    Project, ProjectTranslation, ProjectDetail, ProjectDetailTranslation,
    ProjectTechnology, ProjectImage, ProjectImageTranslation, ProjectRelationship,
    BlogPost, BlogPostTranslation, BlogCategory, BlogCategoryTranslation,
    BlogTag, BlogSeries, BlogSeriesTranslation, BlogComment,
    Idea, IdeaTranslation,
    ResearchProject, ResearchProjectTranslation, ResearchProjectDetail,
    ResearchProjectDetailTranslation, Publication, PublicationTranslation,
    PublicationAuthor, Award, AwardTranslation,
    RecentUpdate, RecentUpdateTranslation
)
from ..parsers import ParserFactory, ParsedContentCollection
from ..utils.config import ConfigManager

console = Console()

class AdvancedDatabaseSyncCommand:
    """Advanced database sync that properly maps structured data to models"""
    
    def __init__(self, database_config: Union[str, Dict[str, Any]], dry_run: bool = False):
        self.dry_run = dry_run
        self.project_dir = Path.cwd()
        self.content_dir = self.project_dir / "content"
        
        # Load configuration
        self.config_manager = ConfigManager(self.project_dir)
        self.config = self.config_manager.load_config()
        
        # Handle both URL string and config dict
        if isinstance(database_config, str):
            self.database_url = database_config
            self.database_config = {'url': database_config}
            self.db_type = 'sqlite' if 'sqlite' in database_config else 'mysql'
        else:
            self.database_config = database_config
            self.database_url = self._build_database_url(database_config)
            self.db_type = database_config.get('type', 'mysql')
        
        # SQLAlchemy setup
        self.engine = None
        self.SessionLocal = None
        
        # Initialize parser factory
        self.parser_factory = ParserFactory
        
        # Track created entities
        self.created_entities = {
            'users': 0,
            'projects': 0,
            'blog_posts': 0,
            'ideas': 0,
            'education': 0,
            'experience': 0,
            'research': 0,
            'publications': 0,
            'awards': 0,
            'recent_updates': 0
        }
    
    def execute(self) -> bool:
        """Execute the advanced database sync command"""
        if not self.content_dir.exists():
            console.print("[red]❌ No content directory found. Run 'silan init <project-name>' first.[/red]")
            return False

        console.print(f"[bold blue]🔄 Advanced Syncing content to {self.db_type} database[/bold blue]")
        
        if self.dry_run:
            console.print("[yellow]🧪 Dry run mode - no changes will be made[/yellow]")
            return self._dry_run_analysis()

        # Connect to database
        if not self._connect_database():
            return False
            
        # Create schema
        try:
            Base.metadata.create_all(self.engine)
            console.print("[green]✅ Database schema created/verified[/green]")
        except Exception as e:
            console.print(f"[red]❌ Schema creation failed: {e}[/red]")
            return False

        # Sync content with proper structure
        success = self._sync_structured_content()
        
        return success
    
    def _dry_run_analysis(self) -> bool:
        """Analyze content structure for dry run"""
        try:
            analysis_results = {}
            
            content_types = ['resume', 'projects', 'blog', 'ideas', 'education', 'experience', 'research', 'recent_updates']
            
            for content_type in content_types:
                content_path = self.content_dir / content_type
                if content_path.exists():
                    files = list(content_path.glob('**/*.md'))
                    
                    # Parse files to analyze structure
                    structured_data = []
                    for file_path in files:
                        try:
                            extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                            if extracted:
                                structured_data.append(extracted)
                        except Exception as e:
                            console.print(f"[yellow]⚠️  Error parsing {file_path}: {e}[/yellow]")
                    
                    analysis_results[content_type] = {
                        'files': len(files),
                        'parsed': len(structured_data),
                        'sample_data': structured_data[:1] if structured_data else []
                    }
                else:
                    analysis_results[content_type] = {'files': 0, 'parsed': 0, 'sample_data': []}
            
            # Display analysis
            self._display_structure_analysis(analysis_results)
            
            return True
            
        except Exception as e:
            console.print(f"[red]❌ Analysis failed: {e}[/red]")
            return False
    
    def _sync_structured_content(self) -> bool:
        """Sync content using structured parsing and proper model mapping"""
        try:
            with self.SessionLocal() as session:
                # Get or create default user and languages
                user = self._get_or_create_user(session)
                languages = self._ensure_languages(session)
                
                with Progress(
                    SpinnerColumn(),
                    TextColumn("[progress.description]{task.description}"),
                    BarColumn(),
                    TaskProgressColumn(),
                    console=console,
                ) as progress:
                    
                    # Sync different content types with proper structure detection
                    content_types = {
                        'resume': self._sync_resume_content,
                        'blog': self._sync_blog_content,
                        'education': self._sync_education_content,
                        'experience': self._sync_experience_content,
                        'research': self._sync_research_content,
                        'recent_updates': self._sync_recent_updates_content
                    }
                    
                    # Handle file-based content types
                    for content_type, sync_method in content_types.items():
                        content_path = self.content_dir / content_type
                        if content_path.exists():
                            task = progress.add_task(f"Syncing {content_type}...", total=None)
                            
                            files = list(content_path.glob('**/*.md'))
                            progress.update(task, total=len(files))
                            
                            try:
                                result = sync_method(session, user, files, progress, task)
                                console.print(f"[green]✅ {content_type.title()}: {result['created']} created, {result['updated']} updated[/green]")
                            except Exception as e:
                                console.print(f"[red]❌ Error syncing {content_type}: {e}[/red]")
                                import traceback
                                traceback.print_exc()
                            
                            progress.update(task, completed=len(files))
                    
                    # Handle folder-based content types (projects and ideas)
                    folder_content_types = {
                        'projects': self._sync_projects_folders,
                        'ideas': self._sync_ideas_folders
                    }
                    
                    for content_type, sync_method in folder_content_types.items():
                        content_path = self.content_dir / content_type
                        if content_path.exists():
                            task = progress.add_task(f"Syncing {content_type}...", total=None)
                            
                            # Find project/idea folders (directories with README.md or config.yaml)
                            folders = self._find_content_folders(content_path)
                            progress.update(task, total=len(folders))
                            
                            try:
                                result = sync_method(session, user, folders, progress, task)
                                console.print(f"[green]✅ {content_type.title()}: {result['created']} created, {result['updated']} updated[/green]")
                            except Exception as e:
                                console.print(f"[red]❌ Error syncing {content_type}: {e}[/red]")
                                import traceback
                                traceback.print_exc()
                            
                            progress.update(task, completed=len(folders))
                
                # Display final summary
                self._display_sync_summary()
                
                return True
                
        except Exception as e:
            console.print(f"[red]❌ Structured sync failed: {e}[/red]")
            import traceback
            traceback.print_exc()
            return False
    
    def _sync_resume_content(self, session: Session, user: User, files: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync resume content with proper personal info, education, experience extraction"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        for file_path in files:
            try:
                extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                if not extracted or extracted.content_type != 'resume':
                    continue
                
                # Update or create personal info
                personal_info_data = extracted.main_entity
                personal_info = session.execute(
                    select(PersonalInfo).where(PersonalInfo.user_id == user.id, PersonalInfo.is_primary == True)
                ).scalar_one_or_none()
                
                if personal_info:
                    # Update existing
                    for key, value in personal_info_data.items():
                        if hasattr(personal_info, key) and value:
                            setattr(personal_info, key, value)
                    results['updated'] += 1
                else:
                    # Create new
                    personal_info = PersonalInfo(user_id=user.id, **personal_info_data)
                    session.add(personal_info)
                    results['created'] += 1
                
                session.flush()  # Get the personal_info.id
                
                # Sync social links
                if 'social_links' in extracted.metadata:
                    self._sync_social_links(session, personal_info, extracted.metadata['social_links'])
                
                # Sync education
                if 'education' in extracted.metadata:
                    self._sync_education_records(session, user, extracted.metadata['education'])
                
                # Sync experience
                if 'experience' in extracted.metadata:
                    self._sync_experience_records(session, user, extracted.metadata['experience'])
                
                # Sync publications
                if 'publications' in extracted.metadata:
                    self._sync_publications(session, user, extracted.metadata['publications'])
                
                # Sync awards
                if 'awards' in extracted.metadata:
                    self._sync_awards(session, user, extracted.metadata['awards'])
                
                # Sync research experience
                if 'research' in extracted.metadata:
                    self._sync_research_projects(session, user, extracted.metadata['research'])
                
                # Sync recent updates
                if 'recent_updates' in extracted.metadata:
                    self._sync_recent_updates_from_resume(session, user, extracted.metadata['recent_updates'])
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing resume {file_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        return results
    
    def _sync_projects_content(self, session: Session, user: User, files: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync project content with proper project details and technologies"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        for file_path in files:
            try:
                extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                if not extracted or extracted.content_type != 'project':
                    continue
                
                project_data = extracted.main_entity
                
                # Check if project exists
                existing_project = session.execute(
                    select(Project).where(Project.slug == project_data['slug'], Project.user_id == user.id)
                ).scalar_one_or_none()
                
                if existing_project:
                    # Update existing
                    for key, value in project_data.items():
                        if hasattr(existing_project, key) and value is not None:
                            setattr(existing_project, key, value)
                    project = existing_project
                    results['updated'] += 1
                else:
                    # Create new
                    project = Project(user_id=user.id, **project_data)
                    session.add(project)
                    results['created'] += 1
                
                session.flush()  # Get project.id
                
                # Sync project details
                if 'details' in extracted.metadata:
                    self._sync_project_details(session, project, extracted.metadata['details'])
                
                # Sync technologies
                if extracted.technologies:
                    self._sync_project_technologies(session, project, extracted.technologies)
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing project {file_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['projects'] += results['created']
        return results
    
    def _sync_blog_content(self, session: Session, user: User, files: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync blog content with proper categories and tags"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        for file_path in files:
            try:
                extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                if not extracted or extracted.content_type != 'blog_post':
                    continue
                
                blog_data = extracted.main_entity
                
                # Check if blog post exists
                existing_post = session.execute(
                    select(BlogPost).where(BlogPost.slug == blog_data['slug'], BlogPost.user_id == user.id)
                ).scalar_one_or_none()
                
                if existing_post:
                    # Update existing
                    for key, value in blog_data.items():
                        if hasattr(existing_post, key) and value is not None:
                            setattr(existing_post, key, value)
                    blog_post = existing_post
                    results['updated'] += 1
                else:
                    # Create new
                    blog_post = BlogPost(user_id=user.id, **blog_data)
                    session.add(blog_post)
                    results['created'] += 1
                
                session.flush()
                
                # Sync categories and tags (simplified for now)
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing blog post {file_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['blog_posts'] += results['created']
        return results
    
    def _sync_ideas_content(self, session: Session, user: User, files: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync ideas content"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        for file_path in files:
            try:
                extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                if not extracted or extracted.content_type != 'idea':
                    continue
                
                idea_data = extracted.main_entity
                
                # Check if idea exists (by title)
                existing_idea = session.execute(
                    select(Idea).where(Idea.title == idea_data['title'], Idea.user_id == user.id)
                ).scalar_one_or_none()
                
                if existing_idea:
                    # Update existing
                    for key, value in idea_data.items():
                        if hasattr(existing_idea, key) and value is not None:
                            setattr(existing_idea, key, value)
                    results['updated'] += 1
                else:
                    # Create new
                    idea = Idea(user_id=user.id, **idea_data)
                    session.add(idea)
                    results['created'] += 1
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing idea {file_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['ideas'] += results['created']
        return results
    
    def _sync_education_content(self, session: Session, user: User, files: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync education content"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        for file_path in files:
            try:
                extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                if not extracted or extracted.content_type != 'education':
                    continue
                
                education_data = extracted.main_entity
                
                # Check if education record exists
                existing_education = session.execute(
                    select(Education).where(
                        Education.institution == education_data['institution'],
                        Education.degree == education_data['degree'],
                        Education.user_id == user.id
                    )
                ).scalar_one_or_none()
                
                if existing_education:
                    # Update existing
                    for key, value in education_data.items():
                        if hasattr(existing_education, key) and value is not None:
                            setattr(existing_education, key, value)
                    results['updated'] += 1
                else:
                    # Create new
                    education = Education(user_id=user.id, **education_data)
                    session.add(education)
                    results['created'] += 1
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing education {file_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['education'] += results['created']
        return results
    
    def _sync_experience_content(self, session: Session, user: User, files: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync work experience content"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        for file_path in files:
            try:
                extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                if not extracted or extracted.content_type != 'experience':
                    continue
                
                experience_data = extracted.main_entity
                
                # Check if experience record exists
                existing_experience = session.execute(
                    select(WorkExperience).where(
                        WorkExperience.company == experience_data['company'],
                        WorkExperience.position == experience_data['position'],
                        WorkExperience.user_id == user.id
                    )
                ).scalar_one_or_none()
                
                if existing_experience:
                    # Update existing
                    for key, value in experience_data.items():
                        if hasattr(existing_experience, key) and value is not None:
                            setattr(existing_experience, key, value)
                    results['updated'] += 1
                else:
                    # Create new
                    experience = WorkExperience(user_id=user.id, **experience_data)
                    session.add(experience)
                    results['created'] += 1
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing experience {file_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['experience'] += results['created']
        return results
    
    def _sync_research_content(self, session: Session, user: User, files: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync research content"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        for file_path in files:
            try:
                extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                if not extracted or extracted.content_type != 'research':
                    continue
                
                research_data = extracted.main_entity
                
                # Check if research project exists
                existing_research = session.execute(
                    select(ResearchProject).where(
                        ResearchProject.title == research_data['title'],
                        ResearchProject.user_id == user.id
                    )
                ).scalar_one_or_none()
                
                if existing_research:
                    # Update existing
                    for key, value in research_data.items():
                        if hasattr(existing_research, key) and value is not None:
                            setattr(existing_research, key, value)
                    results['updated'] += 1
                else:
                    # Create new
                    research = ResearchProject(user_id=user.id, **research_data)
                    session.add(research)
                    results['created'] += 1
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing research {file_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['research'] += results['created']
        return results
    
    def _sync_recent_updates_content(self, session: Session, user: User, files: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync recent updates content"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        for file_path in files:
            try:
                extracted = self.parser_factory.parse_file_with_auto_detection(file_path, self.content_dir)
                if not extracted or extracted.content_type != 'recent_update':
                    continue
                
                update_data = extracted.main_entity
                
                # Check if recent update exists
                existing_update = session.execute(
                    select(RecentUpdate).where(
                        RecentUpdate.title == update_data['title'],
                        RecentUpdate.user_id == user.id
                    )
                ).scalar_one_or_none()
                
                if existing_update:
                    # Update existing
                    for key, value in update_data.items():
                        if hasattr(existing_update, key) and value is not None:
                            setattr(existing_update, key, value)
                    results['updated'] += 1
                else:
                    # Create new
                    recent_update = RecentUpdate.from_parsed_data(update_data, user.id)
                    session.add(recent_update)
                    results['created'] += 1
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing recent update {file_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['recent_updates'] += results['created']
        return results
    
    def _find_content_folders(self, content_path: Path) -> List[Path]:
        """Find content folders that contain README.md or config.yaml"""
        folders = []
        
        for item in content_path.iterdir():
            if item.is_dir():
                # Check if this folder has content files
                has_readme = (item / "README.md").exists()
                has_config = (item / "config.yaml").exists()
                
                if has_readme or has_config:
                    folders.append(item)
        
        return folders
    
    def _sync_projects_folders(self, session: Session, user: User, folders: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync project folders with proper project details and technologies"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        # Create project parser
        project_parser = self.parser_factory.create_parser(self.content_dir, 'project')
        
        for folder_path in folders:
            try:
                # Parse project folder
                extracted = project_parser.parse_folder(folder_path)
                if not extracted or extracted.content_type != 'project':
                    continue
                
                project_data = extracted.main_entity
                
                # Ensure required fields have values
                if not project_data.get('title'):
                    project_data['title'] = folder_path.name.replace('-', ' ').title()
                
                if not project_data.get('slug'):
                    project_data['slug'] = folder_path.name
                
                if not project_data.get('description'):
                    project_data['description'] = f"Project: {project_data['title']}"
                
                # Map status to uppercase for database enum
                if 'status' in project_data and project_data['status']:
                    project_data['status'] = self._map_project_status(project_data['status'])
                
                # Convert date strings to date objects
                from datetime import datetime, date
                for date_field in ['start_date', 'end_date']:
                    if date_field in project_data and isinstance(project_data[date_field], str):
                        try:
                            project_data[date_field] = datetime.strptime(project_data[date_field], '%Y-%m-%d').date()
                        except (ValueError, TypeError):
                            project_data[date_field] = None
                
                # Check if project exists
                existing_project = session.execute(
                    select(Project).where(Project.slug == project_data['slug'], Project.user_id == user.id)
                ).scalar_one_or_none()
                
                if existing_project:
                    # Update existing
                    for key, value in project_data.items():
                        if hasattr(existing_project, key) and value is not None:
                            setattr(existing_project, key, value)
                    project = existing_project
                    results['updated'] += 1
                else:
                    # Create new
                    project = Project(user_id=user.id, **project_data)
                    session.add(project)
                    results['created'] += 1
                
                session.flush()  # Get project.id
                
                # Sync project details
                if 'details' in extracted.metadata:
                    self._sync_project_details(session, project, extracted.metadata['details'])
                
                # Sync technologies
                if extracted.technologies:
                    self._sync_project_technologies(session, project, extracted.technologies)
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing project folder {folder_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['projects'] += results['created']
        return results
    
    def _sync_ideas_folders(self, session: Session, user: User, folders: List[Path], progress: Progress, task_id) -> Dict[str, int]:
        """Sync idea folders"""
        results = {'created': 0, 'updated': 0, 'errors': 0}
        
        # Create idea parser
        idea_parser = self.parser_factory.create_parser(self.content_dir, 'idea')
        
        for folder_path in folders:
            try:
                # Parse idea folder
                extracted = idea_parser.parse_folder(folder_path)
                if not extracted or extracted.content_type != 'idea':
                    continue
                
                idea_data = extracted.main_entity
                
                # Ensure required fields have values
                if not idea_data.get('title'):
                    idea_data['title'] = folder_path.name.replace('-', ' ').title()
                
                # Generate unique slug from folder name (not title)
                if not idea_data.get('slug') or idea_data.get('slug') == 'untitled':
                    idea_data['slug'] = folder_path.name
                
                if not idea_data.get('abstract'):
                    idea_data['abstract'] = idea_data.get('description', f"Idea: {idea_data['title']}")
                
                # Map status and priority to uppercase for database enum
                if 'status' in idea_data and idea_data['status']:
                    idea_data['status'] = self._map_idea_status(idea_data['status'])
                
                if 'priority' in idea_data and idea_data['priority']:
                    idea_data['priority'] = self._map_idea_priority(idea_data['priority'])
                
                # Convert complex types to strings
                for field in ['methodology', 'expected_outcome', 'required_resources']:
                    if field in idea_data and isinstance(idea_data[field], (dict, list)):
                        if isinstance(idea_data[field], dict):
                            # Convert dict to a readable string format
                            idea_data[field] = '\n'.join([f"{k}: {v}" for k, v in idea_data[field].items()])
                        else:
                            # Convert list to comma-separated string
                            idea_data[field] = ', '.join(str(item) for item in idea_data[field])
                
                # Set default values for required fields
                defaults = {
                    'motivation': idea_data.get('description', ''),
                    'methodology': '',
                    'expected_outcome': '',
                    'required_resources': '',
                    'status': 'DRAFT',
                    'priority': 'MEDIUM',
                    'collaboration_needed': False,
                    'funding_required': False,
                    'is_public': True,
                    'estimated_duration_months': 0
                }
                
                for key, default_value in defaults.items():
                    if key not in idea_data or idea_data[key] is None:
                        idea_data[key] = default_value
                
                # Check if idea exists (by slug not title)
                existing_idea = session.execute(
                    select(Idea).where(Idea.slug == idea_data['slug'], Idea.user_id == user.id)
                ).scalar_one_or_none()
                
                if existing_idea:
                    # Update existing
                    for key, value in idea_data.items():
                        if hasattr(existing_idea, key) and value is not None:
                            setattr(existing_idea, key, value)
                    results['updated'] += 1
                else:
                    # Create new
                    idea = Idea(user_id=user.id, **idea_data)
                    session.add(idea)
                    results['created'] += 1
                
                session.commit()
                progress.advance(task_id)
                
            except Exception as e:
                console.print(f"[red]❌ Error processing idea folder {folder_path}: {e}[/red]")
                results['errors'] += 1
                session.rollback()
                progress.advance(task_id)
        
        self.created_entities['ideas'] += results['created']
        return results
    
    def _map_project_status(self, status: str) -> str:
        """Map project status to database enum values"""
        status_mapping = {
            'active': 'ACTIVE',
            'completed': 'COMPLETED', 
            'paused': 'PAUSED',
            'cancelled': 'CANCELLED',
            'planning': 'ACTIVE'  # Map planning to active
        }
        return status_mapping.get(status.lower(), 'ACTIVE')
    
    def _map_idea_status(self, status: str) -> str:
        """Map idea status to database enum values"""
        status_mapping = {
            'draft': 'DRAFT',
            'hypothesis': 'HYPOTHESIS',
            'experimenting': 'EXPERIMENTING',
            'validating': 'VALIDATING',
            'published': 'published',
            'concluded': 'CONCLUDED'
        }
        return status_mapping.get(status.lower(), 'DRAFT')
    
    def _map_idea_priority(self, priority: str) -> str:
        """Map idea priority to database enum values"""
        priority_mapping = {
            'low': 'LOW',
            'medium': 'MEDIUM',
            'high': 'HIGH',
            'urgent': 'URGENT'
        }
        return priority_mapping.get(priority.lower(), 'MEDIUM')

    # Helper methods for syncing related data
    
    def _sync_social_links(self, session: Session, personal_info: PersonalInfo, social_links_data: List[Dict[str, Any]]):
        """Sync social links for personal info"""
        # Clear existing social links using modern SQLAlchemy syntax
        from sqlalchemy import delete
        session.execute(
            delete(SocialLink).where(SocialLink.personal_info_id == personal_info.id)
        )
        
        # Add new social links
        for link_data in social_links_data:
            social_link = SocialLink(personal_info_id=personal_info.id, **link_data)
            session.add(social_link)
    
    def _sync_education_records(self, session: Session, user: User, education_data: List[Dict[str, Any]]):
        """Sync education records extracted from resume"""
        for edu_data in education_data:
            # Separate details from main education data
            details = edu_data.pop('details', [])
            
            existing = session.execute(
                select(Education).where(
                    Education.institution == edu_data['institution'],
                    Education.user_id == user.id
                )
            ).scalar_one_or_none()
            
            if not existing:
                education = Education(user_id=user.id, **edu_data)
                session.add(education)
                session.flush()  # Force immediate ID generation
                
                # Add education details
                self._sync_education_details(session, education, details)
                
                self.created_entities['education'] += 1
    
    def _sync_education_details(self, session: Session, education: Education, details: List[str]):
        """Sync education details"""
        from silan.models.education import EducationDetail
        
        for i, detail_text in enumerate(details):
            if detail_text.strip():
                detail = EducationDetail(
                    education_id=education.id,
                    detail_text=detail_text.strip(),
                    sort_order=i
                )
                session.add(detail)
                session.flush()
    
    def _sync_experience_records(self, session: Session, user: User, experience_data: List[Dict[str, Any]]):
        """Sync work experience records extracted from resume"""
        for exp_data in experience_data:
            # Separate details from main experience data
            details = exp_data.pop('details', [])
            
            existing = session.execute(
                select(WorkExperience).where(
                    WorkExperience.company == exp_data['company'],
                    WorkExperience.position == exp_data['position'],
                    WorkExperience.user_id == user.id
                )
            ).scalar_one_or_none()
            
            if not existing:
                experience = WorkExperience(user_id=user.id, **exp_data)
                session.add(experience)
                session.flush()  # Force immediate ID generation
                
                # Add experience details
                self._sync_experience_details(session, experience, details)
                
                self.created_entities['experience'] += 1
    
    def _sync_experience_details(self, session: Session, experience: WorkExperience, details: List[str]):
        """Sync work experience details"""
        from silan.models.experience import WorkExperienceDetail
        
        for i, detail_text in enumerate(details):
            if detail_text.strip():
                detail = WorkExperienceDetail(
                    work_experience_id=experience.id,
                    detail_text=detail_text.strip(),
                    sort_order=i
                )
                session.add(detail)
                session.flush()
    
    def _sync_publications(self, session: Session, user: User, publications_data: List[Dict[str, Any]]):
        """Sync publications from resume"""
        for pub_data in publications_data:
            # Extract authors separately - they go in a different table
            authors_data = pub_data.pop('authors', []) if isinstance(pub_data.get('authors'), list) else []
            
            existing = session.execute(
                select(Publication).where(
                    Publication.title == pub_data['title'],
                    Publication.user_id == user.id
                )
            ).scalar_one_or_none()
            
            if not existing:
                publication = Publication(user_id=user.id, **pub_data)
                session.add(publication)
                session.flush()  # Force immediate ID generation
                
                # Add authors to the PublicationAuthor table
                for i, author_name in enumerate(authors_data):
                    if author_name.strip():
                        author = PublicationAuthor(
                            publication_id=publication.id,
                            author_name=author_name.strip(),
                            author_order=i + 1,
                            is_corresponding=False
                        )
                        session.add(author)
                
                self.created_entities['publications'] += 1
    
    def _sync_awards(self, session: Session, user: User, awards_data: List[Dict[str, Any]]):
        """Sync awards from resume"""
        for award_data in awards_data:
            existing = session.execute(
                select(Award).where(
                    Award.title == award_data['title'],
                    Award.user_id == user.id
                )
            ).scalar_one_or_none()
            
            if not existing:
                award = Award(user_id=user.id, **award_data)
                session.add(award)
                session.flush()  # Force immediate ID generation
                self.created_entities['awards'] += 1
    
    def _sync_research_projects(self, session: Session, user: User, research_data: List[Dict[str, Any]]):
        """Sync research projects from resume"""
        from silan.models.research import ResearchProject
        
        for research_data_item in research_data:
            # Separate details from main research data
            details = research_data_item.pop('details', [])
            
            existing = session.execute(
                select(ResearchProject).where(
                    ResearchProject.title == research_data_item['title'],
                    ResearchProject.user_id == user.id
                )
            ).scalar_one_or_none()
            
            if not existing:
                research = ResearchProject(user_id=user.id, **research_data_item)
                session.add(research)
                session.flush()  # Force immediate ID generation
                
                # Add research details
                self._sync_research_details(session, research, details)
                
                self.created_entities['research'] += 1
    
    def _sync_research_details(self, session: Session, research: ResearchProject, details: List[str]):
        """Sync research project details"""
        from silan.models.research import ResearchProjectDetail
        
        for i, detail_text in enumerate(details):
            if detail_text.strip():
                detail = ResearchProjectDetail(
                    research_project_id=research.id,
                    detail_text=detail_text.strip(),
                    sort_order=i
                )
                session.add(detail)
                session.flush()
    
    def _sync_recent_updates_from_resume(self, session: Session, user: User, recent_updates_data: List[Dict[str, Any]]):
        """Sync recent updates from resume content"""
        for update_data in recent_updates_data:
            existing = session.execute(
                select(RecentUpdate).where(
                    RecentUpdate.title == update_data['title'],
                    RecentUpdate.user_id == user.id
                )
            ).scalar_one_or_none()
            
            if not existing:
                recent_update = RecentUpdate.from_parsed_data(update_data, user.id)
                session.add(recent_update)
                session.flush()
                self.created_entities['recent_updates'] += 1
    
    def _sync_project_details(self, session: Session, project: Project, details_data: List[Dict[str, Any]]):
        """Sync project details"""
        # Clear existing details
        from sqlalchemy import delete
        session.execute(
            delete(ProjectDetail).where(ProjectDetail.project_id == project.id)
        )
        
        # Add new details
        for detail_data in details_data:
            detail = ProjectDetail(project_id=project.id, **detail_data)
            session.add(detail)
    
    def _sync_project_technologies(self, session: Session, project: Project, technologies_data: List[Dict[str, Any]]):
        """Sync project technologies"""
        # Clear existing technologies
        from sqlalchemy import delete
        session.execute(
            delete(ProjectTechnology).where(ProjectTechnology.project_id == project.id)
        )
        
        # Add new technologies
        for tech_data in technologies_data:
            technology = ProjectTechnology(project_id=project.id, **tech_data)
            session.add(technology)
    
    def _get_or_create_user(self, session: Session) -> User:
        """Get or create the default user"""
        # Get user configuration from config
        user_config = self.config.get('user', {})
        default_email = user_config.get('email', 'admin@example.com')
        
        # Check if user exists
        user = session.execute(
            select(User).where(User.email == default_email)
        ).scalar_one_or_none()
        
        if user:
            return user
        
        # Create default user
        import bcrypt
        password = user_config.get('password', 'default_password')
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        user = User(
            username=user_config.get('username', 'admin'),
            email=default_email,
            password_hash=password_hash,
            first_name=user_config.get('first_name', 'Admin'),
            last_name=user_config.get('last_name', 'User'),
            bio=user_config.get('bio', 'Default user account'),
            is_admin=True
        )
        session.add(user)
        session.flush()  # Get the user.id
        
        console.print(f"[green]✅ Created default user: {user.id}[/green]")
        self.created_entities['users'] += 1
        return user
    
    def _ensure_languages(self, session: Session) -> List[Language]:
        """Ensure default languages exist"""
        languages = []
        
        default_languages = [
            {'id': 'en', 'name': 'English', 'native_name': 'English'},
            {'id': 'zh', 'name': 'Chinese', 'native_name': '中文'}
        ]
        
        for lang_data in default_languages:
            existing = session.execute(
                select(Language).where(Language.id == lang_data['id'])
            ).scalar_one_or_none()
            
            if not existing:
                language = Language(**lang_data)
                session.add(language)
                languages.append(language)
            else:
                languages.append(existing)
        
        session.commit()
        console.print("[green]✅ Default languages ensured[/green]")
        return languages
    
    def _connect_database(self) -> bool:
        """Connect to database using SQLAlchemy"""
        try:
            self.engine = create_engine(self.database_url)
            self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
            
            # Test connection
            with self.SessionLocal() as session:
                session.execute(select(1))
            
            console.print(f"[green]✅ Connected to {self.db_type} database[/green]")
            return True
            
        except Exception as e:
            console.print(f"[red]❌ Database connection failed: {e}[/red]")
            return False
    
    def _build_database_url(self, config: Dict[str, Any]) -> str:
        """Build database URL from config"""
        if config.get('type') == 'mysql':
            return (
                f"mysql+pymysql://{config.get('user', 'root')}:"
                f"{config.get('password', '')}@"
                f"{config.get('host', 'localhost')}:"
                f"{config.get('port', 3306)}/"
                f"{config.get('database', 'silan_website')}"
                f"?charset=utf8mb4"
            )
        elif config.get('type') == 'postgresql':
            return (
                f"postgresql://{config.get('user', 'postgres')}:"
                f"{config.get('password', '')}@"
                f"{config.get('host', 'localhost')}:"
                f"{config.get('port', 5432)}/"
                f"{config.get('database', 'silan_website')}"
            )
        else:  # SQLite
            return f"sqlite:///{config.get('path', 'portfolio.db')}"
    
    def _display_structure_analysis(self, analysis_results: Dict[str, Any]):
        """Display content structure analysis"""
        table = Table(title="Advanced Content Structure Analysis")
        table.add_column("Content Type", style="cyan")
        table.add_column("Files Found", style="bold")
        table.add_column("Successfully Parsed", style="green")
        table.add_column("Structure Quality", style="yellow")
        
        for content_type, results in analysis_results.items():
            files_count = results['files']
            parsed_count = results['parsed']
            
            if files_count == 0:
                quality = "N/A"
            elif parsed_count == files_count:
                quality = "Excellent"
            elif parsed_count > files_count * 0.8:
                quality = "Good"
            elif parsed_count > files_count * 0.5:
                quality = "Fair"
            else:
                quality = "Poor"
            
            table.add_row(
                content_type.title(),
                str(files_count),
                str(parsed_count),
                quality
            )
        
        console.print(table)
    
    def _display_sync_summary(self):
        """Display sync summary"""
        table = Table(title="Advanced Sync Summary")
        table.add_column("Entity Type", style="cyan")
        table.add_column("Created", style="green")
        table.add_column("Status", style="bold")
        
        for entity_type, count in self.created_entities.items():
            status = "✅ Success" if count > 0 else "⚪ None"
            table.add_row(
                entity_type.replace('_', ' ').title(),
                str(count),
                status
            )
        
        console.print(table)
        
        total_created = sum(self.created_entities.values())
        if total_created > 0:
            console.print(f"[bold green]🎉 Advanced sync completed! Created {total_created} entities total.[/bold green]")
        else:
            console.print("[yellow]⚠️  No new entities created. Data may already exist or needs review.[/yellow]")