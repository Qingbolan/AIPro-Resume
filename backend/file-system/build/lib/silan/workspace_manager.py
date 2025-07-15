"""
Comprehensive workspace manager for unified content management.

This module provides a centralized interface for managing all content types:
- Projects (folder-based)
- Ideas (folder-based) 
- Updates (individual MD files)
- Templates (for quick content creation)
- Global workspace configuration and synchronization
"""

import yaml
from pathlib import Path
from typing import Dict, Any, List, Optional, Union
from datetime import datetime, date
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn

from .cli.project_manager import ProjectManager
from .cli.idea_manager import IdeaManager
from .cli.update_manager import UpdateManager
from .cli.template_manager import TemplateManager
from .parsers import ParserFactory, ExtractedContent
from .utils.config import Config

console = Console()


class WorkspaceManager:
    """
    Unified workspace manager for all content types.
    
    Provides centralized management, synchronization, and analysis
    across projects, ideas, updates, and templates.
    """
    
    def __init__(self, workspace_path: Path):
        self.workspace_path = Path(workspace_path)
        self.config_file = self.workspace_path / 'workspace.yaml'
        
        # Initialize managers
        self.project_manager = ProjectManager(workspace_path)
        self.idea_manager = IdeaManager(workspace_path)
        self.update_manager = UpdateManager(workspace_path)
        self.template_manager = TemplateManager(workspace_path)
        
        # Load workspace configuration
        self.config = self._load_workspace_config()
        
        # Ensure workspace structure
        self._ensure_workspace_structure()
    
    def _load_workspace_config(self) -> Dict[str, Any]:
        """Load workspace configuration from workspace.yaml"""
        default_config = {
            'workspace': {
                'name': 'My Portfolio Workspace',
                'description': 'AI-powered portfolio and content management system',
                'created_at': datetime.now().isoformat(),
                'version': '2.0.0'
            },
            'content': {
                'projects_enabled': True,
                'ideas_enabled': True,
                'updates_enabled': True,
                'blog_enabled': True
            },
            'sync': {
                'auto_sync': True,
                'sync_interval_minutes': 30,
                'backup_enabled': True,
                'backup_retention_days': 30
            },
            'analysis': {
                'auto_analysis': True,
                'content_insights': True,
                'productivity_tracking': True
            },
            'paths': {
                'projects': 'projects',
                'ideas': 'ideas',
                'updates': 'updates',
                'templates': 'templates',
                'blog': 'blog',
                'assets': 'assets',
                'exports': 'exports'
            }
        }
        
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r', encoding='utf-8') as f:
                    loaded_config = yaml.safe_load(f) or {}
                
                # Merge with defaults
                config = default_config.copy()
                self._deep_merge_dict(config, loaded_config)
                return config
            except Exception as e:
                console.print(f"[yellow]⚠️ Error loading workspace config: {e}[/yellow]")
                console.print("[yellow]Using default configuration[/yellow]")
        
        return default_config
    
    def _deep_merge_dict(self, target: Dict, source: Dict):
        """Deep merge source dict into target dict"""
        for key, value in source.items():
            if key in target and isinstance(target[key], dict) and isinstance(value, dict):
                self._deep_merge_dict(target[key], value)
            else:
                target[key] = value
    
    def _ensure_workspace_structure(self):
        """Ensure all required workspace directories exist"""
        required_dirs = [
            self.config['paths']['projects'],
            self.config['paths']['ideas'],
            self.config['paths']['updates'],
            self.config['paths']['templates'],
            self.config['paths']['assets'],
            self.config['paths']['exports']
        ]
        
        for dir_path in required_dirs:
            full_path = self.workspace_path / dir_path
            full_path.mkdir(parents=True, exist_ok=True)
    
    def save_config(self):
        """Save workspace configuration"""
        try:
            with open(self.config_file, 'w', encoding='utf-8') as f:
                yaml.dump(self.config, f, default_flow_style=False, sort_keys=False)
            console.print(f"[green]✅ Workspace configuration saved[/green]")
        except Exception as e:
            console.print(f"[red]❌ Error saving workspace config: {e}[/red]")
    
    def get_workspace_status(self) -> Dict[str, Any]:
        """Get comprehensive workspace status"""
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console
        ) as progress:
            
            # Collect statistics
            task = progress.add_task("Analyzing workspace...", total=4)
            
            progress.update(task, description="Scanning projects...")
            projects_stats = self.project_manager.get_stats()
            progress.advance(task)
            
            progress.update(task, description="Scanning ideas...")
            ideas_stats = self.idea_manager.get_stats()
            progress.advance(task)
            
            progress.update(task, description="Scanning updates...")
            updates_stats = self.update_manager.get_stats()
            progress.advance(task)
            
            progress.update(task, description="Scanning templates...")
            templates_stats = self.template_manager.get_stats()
            progress.advance(task)
        
        # Calculate workspace metrics
        total_content_items = (
            projects_stats['total_count'] + 
            ideas_stats['total_count'] + 
            updates_stats['total_count']
        )
        
        # Recent activity (last 30 days)
        recent_activity = self._calculate_recent_activity()
        
        # Content health score
        health_score = self._calculate_health_score(projects_stats, ideas_stats, updates_stats)
        
        status = {
            'workspace': {
                'name': self.config['workspace']['name'],
                'path': str(self.workspace_path),
                'total_items': total_content_items,
                'health_score': health_score,
                'last_updated': datetime.now().isoformat()
            },
            'content_summary': {
                'projects': projects_stats,
                'ideas': ideas_stats,
                'updates': updates_stats,
                'templates': templates_stats
            },
            'recent_activity': recent_activity,
            'recommendations': self._generate_recommendations(projects_stats, ideas_stats, updates_stats)
        }
        
        return status
    
    def display_workspace_status(self):
        """Display formatted workspace status"""
        status = self.get_workspace_status()
        
        # Workspace overview panel
        workspace_info = status['workspace']
        overview_text = f"""
[bold]{workspace_info['name']}[/bold]
Path: {workspace_info['path']}
Total Items: {workspace_info['total_items']}
Health Score: {workspace_info['health_score']:.1f}/10.0
        """.strip()
        
        console.print(Panel(overview_text, title="📁 Workspace Overview", border_style="blue"))
        
        # Content summary table
        table = Table(title="📊 Content Summary")
        table.add_column("Type", style="cyan", no_wrap=True)
        table.add_column("Total", justify="right")
        table.add_column("Active", justify="right")
        table.add_column("Recent", justify="right")
        table.add_column("Status", style="green")
        
        content_summary = status['content_summary']
        
        # Projects row
        proj_stats = content_summary['projects']
        table.add_row(
            "🚀 Projects",
            str(proj_stats['total_count']),
            str(proj_stats.get('active_count', 0)),
            str(proj_stats.get('recent_count', 0)),
            "✅ Enabled" if self.config['content']['projects_enabled'] else "❌ Disabled"
        )
        
        # Ideas row
        idea_stats = content_summary['ideas']
        table.add_row(
            "💡 Ideas",
            str(idea_stats['total_count']),
            str(idea_stats.get('active_count', 0)),
            str(idea_stats.get('recent_count', 0)),
            "✅ Enabled" if self.config['content']['ideas_enabled'] else "❌ Disabled"
        )
        
        # Updates row
        update_stats = content_summary['updates']
        table.add_row(
            "📈 Updates",
            str(update_stats['total_count']),
            str(update_stats.get('recent_count', 0)),
            str(update_stats.get('this_month_count', 0)),
            "✅ Enabled" if self.config['content']['updates_enabled'] else "❌ Disabled"
        )
        
        # Templates row
        template_stats = content_summary['templates']
        table.add_row(
            "📝 Templates",
            str(template_stats['total_count']),
            str(template_stats.get('project_templates', 0)),
            str(template_stats.get('idea_templates', 0)),
            "✅ Available"
        )
        
        console.print(table)
        
        # Recent activity
        if status['recent_activity']:
            console.print("\n[bold cyan]📅 Recent Activity (Last 7 Days)[/bold cyan]")
            for activity in status['recent_activity'][:5]:  # Show last 5 activities
                date_str = activity['date'].strftime('%Y-%m-%d')
                console.print(f"  • {date_str}: {activity['description']}")
        
        # Recommendations
        recommendations = status['recommendations']
        if recommendations:
            console.print("\n[bold yellow]💡 Recommendations[/bold yellow]")
            for rec in recommendations[:3]:  # Show top 3 recommendations
                console.print(f"  • {rec}")
    
    def sync_all_content(self) -> Dict[str, Any]:
        """Synchronize all content types"""
        sync_results = {
            'projects': {'success': 0, 'errors': 0, 'updated': []},
            'ideas': {'success': 0, 'errors': 0, 'updated': []},
            'updates': {'success': 0, 'errors': 0, 'updated': []},
            'total_processed': 0,
            'sync_time': datetime.now().isoformat()
        }
        
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console
        ) as progress:
            
            task = progress.add_task("Synchronizing content...", total=3)
            
            # Sync projects
            progress.update(task, description="Syncing projects...")
            try:
                project_results = self._sync_projects()
                sync_results['projects'] = project_results
                sync_results['total_processed'] += project_results['success']
            except Exception as e:
                console.print(f"[red]❌ Error syncing projects: {e}[/red]")
                sync_results['projects']['errors'] += 1
            progress.advance(task)
            
            # Sync ideas
            progress.update(task, description="Syncing ideas...")
            try:
                idea_results = self._sync_ideas()
                sync_results['ideas'] = idea_results
                sync_results['total_processed'] += idea_results['success']
            except Exception as e:
                console.print(f"[red]❌ Error syncing ideas: {e}[/red]")
                sync_results['ideas']['errors'] += 1
            progress.advance(task)
            
            # Sync updates
            progress.update(task, description="Syncing updates...")
            try:
                update_results = self._sync_updates()
                sync_results['updates'] = update_results
                sync_results['total_processed'] += update_results['success']
            except Exception as e:
                console.print(f"[red]❌ Error syncing updates: {e}[/red]")
                sync_results['updates']['errors'] += 1
            progress.advance(task)
        
        console.print(f"[green]✅ Sync completed: {sync_results['total_processed']} items processed[/green]")
        return sync_results
    
    def search_content(self, query: str, content_types: Optional[List[str]] = None) -> List[Dict[str, Any]]:
        """Search across all content types"""
        if content_types is None:
            content_types = ['projects', 'ideas', 'updates']
        
        results = []
        
        # Search projects
        if 'projects' in content_types:
            project_results = self.project_manager.search_projects(query)
            for result in project_results:
                results.append({
                    'type': 'project',
                    'title': result.get('title', ''),
                    'path': result.get('path', ''),
                    'relevance_score': result.get('score', 0),
                    'summary': result.get('description', '')[:100]
                })
        
        # Search ideas
        if 'ideas' in content_types:
            idea_results = self.idea_manager.search_ideas(query)
            for result in idea_results:
                results.append({
                    'type': 'idea',
                    'title': result.get('title', ''),
                    'path': result.get('path', ''),
                    'relevance_score': result.get('score', 0),
                    'summary': result.get('abstract', '')[:100]
                })
        
        # Search updates
        if 'updates' in content_types:
            update_results = self.update_manager.search_updates(query)
            for result in update_results:
                results.append({
                    'type': 'update',
                    'title': result.get('title', ''),
                    'path': result.get('path', ''),
                    'relevance_score': result.get('score', 0),
                    'summary': result.get('summary', '')[:100]
                })
        
        # Sort by relevance score
        results.sort(key=lambda x: x['relevance_score'], reverse=True)
        
        return results[:20]  # Return top 20 results
    
    def get_content_insights(self) -> Dict[str, Any]:
        """Generate insights about workspace content"""
        insights = {
            'productivity': self._analyze_productivity(),
            'content_patterns': self._analyze_content_patterns(),
            'technology_trends': self._analyze_technology_trends(),
            'collaboration_opportunities': self._find_collaboration_opportunities(),
            'next_actions': self._suggest_next_actions()
        }
        
        return insights
    
    def export_workspace(self, export_format: str = 'json', include_assets: bool = False) -> Path:
        """Export entire workspace in specified format"""
        export_dir = self.workspace_path / self.config['paths']['exports']
        export_dir.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        export_name = f"workspace_export_{timestamp}"
        
        if export_format.lower() == 'json':
            return self._export_to_json(export_dir / f"{export_name}.json", include_assets)
        elif export_format.lower() == 'markdown':
            return self._export_to_markdown(export_dir / export_name, include_assets)
        else:
            raise ValueError(f"Unsupported export format: {export_format}")
    
    def _sync_projects(self) -> Dict[str, Any]:
        """Sync project content"""
        projects_dir = self.workspace_path / self.config['paths']['projects']
        results = {'success': 0, 'errors': 0, 'updated': []}
        
        if not projects_dir.exists():
            return results
        
        for project_folder in projects_dir.iterdir():
            if project_folder.is_dir():
                try:
                    # Parse project folder
                    parser = ParserFactory.create_parser(self.workspace_path, 'project')
                    extracted = parser.parse_folder(project_folder)
                    
                    if extracted:
                        results['success'] += 1
                        results['updated'].append(project_folder.name)
                    else:
                        results['errors'] += 1
                except Exception as e:
                    console.print(f"[yellow]⚠️ Error syncing project {project_folder.name}: {e}[/yellow]")
                    results['errors'] += 1
        
        return results
    
    def _sync_ideas(self) -> Dict[str, Any]:
        """Sync idea content"""
        ideas_dir = self.workspace_path / self.config['paths']['ideas']
        results = {'success': 0, 'errors': 0, 'updated': []}
        
        if not ideas_dir.exists():
            return results
        
        for idea_folder in ideas_dir.iterdir():
            if idea_folder.is_dir():
                try:
                    # Parse idea folder
                    parser = ParserFactory.create_parser(self.workspace_path, 'idea')
                    extracted = parser.parse_folder(idea_folder)
                    
                    if extracted:
                        results['success'] += 1
                        results['updated'].append(idea_folder.name)
                    else:
                        results['errors'] += 1
                except Exception as e:
                    console.print(f"[yellow]⚠️ Error syncing idea {idea_folder.name}: {e}[/yellow]")
                    results['errors'] += 1
        
        return results
    
    def _sync_updates(self) -> Dict[str, Any]:
        """Sync update content"""
        updates_dir = self.workspace_path / self.config['paths']['updates']
        results = {'success': 0, 'errors': 0, 'updated': []}
        
        if not updates_dir.exists():
            return results
        
        for update_file in updates_dir.rglob('*.md'):
            try:
                # Parse update file
                parser = ParserFactory.create_parser(self.workspace_path, 'update')
                extracted = parser.parse_file(update_file)
                
                if extracted:
                    results['success'] += 1
                    results['updated'].append(update_file.name)
                else:
                    results['errors'] += 1
            except Exception as e:
                console.print(f"[yellow]⚠️ Error syncing update {update_file.name}: {e}[/yellow]")
                results['errors'] += 1
        
        return results
    
    def _calculate_recent_activity(self) -> List[Dict[str, Any]]:
        """Calculate recent workspace activity"""
        activities = []
        
        # Check for recent projects
        projects_dir = self.workspace_path / self.config['paths']['projects']
        if projects_dir.exists():
            for project_folder in projects_dir.iterdir():
                if project_folder.is_dir():
                    modified_time = datetime.fromtimestamp(project_folder.stat().st_mtime)
                    if (datetime.now() - modified_time).days <= 7:
                        activities.append({
                            'type': 'project',
                            'name': project_folder.name,
                            'action': 'modified',
                            'date': modified_time,
                            'description': f"Project '{project_folder.name}' was modified"
                        })
        
        # Check for recent ideas
        ideas_dir = self.workspace_path / self.config['paths']['ideas']
        if ideas_dir.exists():
            for idea_folder in ideas_dir.iterdir():
                if idea_folder.is_dir():
                    modified_time = datetime.fromtimestamp(idea_folder.stat().st_mtime)
                    if (datetime.now() - modified_time).days <= 7:
                        activities.append({
                            'type': 'idea',
                            'name': idea_folder.name,
                            'action': 'modified',
                            'date': modified_time,
                            'description': f"Idea '{idea_folder.name}' was modified"
                        })
        
        # Check for recent updates
        updates_dir = self.workspace_path / self.config['paths']['updates']
        if updates_dir.exists():
            for update_file in updates_dir.rglob('*.md'):
                modified_time = datetime.fromtimestamp(update_file.stat().st_mtime)
                if (datetime.now() - modified_time).days <= 7:
                    activities.append({
                        'type': 'update',
                        'name': update_file.stem,
                        'action': 'created' if (datetime.now() - modified_time).days <= 1 else 'modified',
                        'date': modified_time,
                        'description': f"Update '{update_file.stem}' was created"
                    })
        
        # Sort by date (newest first)
        activities.sort(key=lambda x: x['date'], reverse=True)
        
        return activities
    
    def _calculate_health_score(self, projects_stats: Dict, ideas_stats: Dict, updates_stats: Dict) -> float:
        """Calculate workspace health score (0-10)"""
        score = 5.0  # Base score
        
        # Content diversity factor
        content_types = 0
        if projects_stats['total_count'] > 0:
            content_types += 1
        if ideas_stats['total_count'] > 0:
            content_types += 1
        if updates_stats['total_count'] > 0:
            content_types += 1
        
        score += content_types * 1.0  # +1 per content type
        
        # Activity factor
        recent_activity = len(self._calculate_recent_activity())
        if recent_activity > 10:
            score += 2.0
        elif recent_activity > 5:
            score += 1.0
        elif recent_activity > 0:
            score += 0.5
        
        # Quality factor (based on folder structure)
        if projects_stats.get('active_count', 0) > 0:
            score += 1.0
        if ideas_stats.get('active_count', 0) > 0:
            score += 1.0
        
        return min(10.0, max(0.0, score))
    
    def _generate_recommendations(self, projects_stats: Dict, ideas_stats: Dict, updates_stats: Dict) -> List[str]:
        """Generate workspace recommendations"""
        recommendations = []
        
        # Content creation recommendations
        if projects_stats['total_count'] == 0:
            recommendations.append("Create your first project to start building your portfolio")
        elif projects_stats['total_count'] < 3:
            recommendations.append("Consider adding more projects to showcase your skills")
        
        if ideas_stats['total_count'] == 0:
            recommendations.append("Start documenting your ideas for future projects")
        elif ideas_stats.get('active_count', 0) == 0:
            recommendations.append("Convert some ideas into active projects")
        
        if updates_stats.get('this_month_count', 0) == 0:
            recommendations.append("Share a recent update about your progress")
        
        # Activity recommendations
        recent_activity = self._calculate_recent_activity()
        if len(recent_activity) == 0:
            recommendations.append("Your workspace seems quiet - consider updating a project or idea")
        
        # Organization recommendations
        if not (self.workspace_path / self.config['paths']['templates']).exists():
            recommendations.append("Set up templates to speed up content creation")
        
        return recommendations
    
    def _analyze_productivity(self) -> Dict[str, Any]:
        """Analyze productivity patterns"""
        # This would analyze patterns in updates, project progress, etc.
        return {
            'weekly_activity': [],
            'peak_productivity_hours': [],
            'content_creation_rate': 0.0,
            'completion_rate': 0.0
        }
    
    def _analyze_content_patterns(self) -> Dict[str, Any]:
        """Analyze content patterns and trends"""
        # This would analyze content types, topics, etc.
        return {
            'common_topics': [],
            'content_length_trends': {},
            'update_frequency': {}
        }
    
    def _analyze_technology_trends(self) -> Dict[str, Any]:
        """Analyze technology usage trends"""
        # This would analyze technologies mentioned across content
        return {
            'most_used_technologies': [],
            'emerging_technologies': [],
            'skill_progression': {}
        }
    
    def _find_collaboration_opportunities(self) -> List[Dict[str, Any]]:
        """Find potential collaboration opportunities"""
        # This would analyze ideas and projects for collaboration potential
        return []
    
    def _suggest_next_actions(self) -> List[str]:
        """Suggest next actions based on workspace state"""
        suggestions = []
        
        # Analyze current state and suggest actions
        status = self.get_workspace_status()
        
        if status['content_summary']['projects']['total_count'] == 0:
            suggestions.append("Create your first project")
        
        if status['content_summary']['updates']['total_count'] == 0:
            suggestions.append("Share your first update")
        
        return suggestions
    
    def _export_to_json(self, export_path: Path, include_assets: bool) -> Path:
        """Export workspace to JSON format"""
        # Implementation for JSON export
        export_data = {
            'workspace': self.config,
            'content': self.get_workspace_status(),
            'exported_at': datetime.now().isoformat()
        }
        
        import json
        with open(export_path, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, default=str)
        
        return export_path
    
    def _export_to_markdown(self, export_dir: Path, include_assets: bool) -> Path:
        """Export workspace to Markdown format"""
        export_dir.mkdir(exist_ok=True)
        
        # Create index file
        index_content = f"""# {self.config['workspace']['name']}

{self.config['workspace']['description']}

## Workspace Overview

- **Total Projects**: {self.project_manager.get_stats()['total_count']}
- **Total Ideas**: {self.idea_manager.get_stats()['total_count']}  
- **Total Updates**: {self.update_manager.get_stats()['total_count']}

Exported on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        
        with open(export_dir / 'README.md', 'w', encoding='utf-8') as f:
            f.write(index_content)
        
        return export_dir 