"""
Project Manager for Silan

Manages projects using a folder-based approach where each project
has its own directory with structured content and configuration.
"""

import yaml
import shutil
from pathlib import Path
from typing import Dict, Any, List, Optional
from datetime import datetime, date
from dataclasses import dataclass
from rich.console import Console
from rich.table import Table
from rich.prompt import Prompt, Confirm

console = Console()


@dataclass
class ProjectMetadata:
    """Project metadata structure"""
    name: str
    title: str
    description: str
    project_type: str
    status: str
    technologies: List[str]
    start_date: Optional[date]
    end_date: Optional[date]
    github_url: Optional[str]
    demo_url: Optional[str]
    featured: bool
    difficulty: str
    team_size: int
    created_at: datetime
    updated_at: datetime


class ProjectManager:
    """Folder-based project manager"""
    
    def __init__(self, workspace_path: Path):
        self.workspace_path = workspace_path
        self.projects_dir = workspace_path / "content" / "projects"
        self.templates_dir = workspace_path / "templates" / "projects"
        
        # Ensure directories exist
        self.projects_dir.mkdir(parents=True, exist_ok=True)
        self.templates_dir.mkdir(parents=True, exist_ok=True)
    
    def create_project(self, project_name: str, template: Optional[str] = None, 
                      interactive: bool = True) -> bool:
        """Create a new project from template or interactively"""
        try:
            # Validate project name
            if not self._is_valid_project_name(project_name):
                console.print("[red]❌ Invalid project name. Use lowercase letters, numbers, and hyphens only.[/red]")
                return False
            
            project_path = self.projects_dir / project_name
            
            # Check if project already exists
            if project_path.exists():
                console.print(f"[red]❌ Project '{project_name}' already exists[/red]")
                return False
            
            # Gather project information
            if interactive:
                project_info = self._gather_project_info(project_name)
            else:
                project_info = self._get_default_project_info(project_name)
            
            # Create project structure
            self._create_project_structure(project_path, project_info, template)
            
            console.print(f"[green]✅ Project '{project_name}' created successfully[/green]")
            console.print(f"[blue]📁 Location: {project_path}[/blue]")
            
            return True
            
        except Exception as e:
            console.print(f"[red]❌ Failed to create project: {e}[/red]")
            return False
    
    def _is_valid_project_name(self, name: str) -> bool:
        """Validate project name format"""
        import re
        return bool(re.match(r'^[a-z0-9-]+$', name)) and len(name) >= 2
    
    def _gather_project_info(self, project_name: str) -> Dict[str, Any]:
        """Gather project information interactively"""
        console.print(f"\n[bold blue]Creating project: {project_name}[/bold blue]")
        
        # Basic information
        title = Prompt.ask("Project title", default=project_name.replace('-', ' ').title())
        description = Prompt.ask("Project description", default="")
        
        # Project type
        project_types = ["web-application", "mobile-app", "desktop-app", "library", "research", "other"]
        project_type = Prompt.ask("Project type", choices=project_types, default="web-application")
        
        # Status
        statuses = ["planning", "active", "completed", "paused", "cancelled"]
        status = Prompt.ask("Initial status", choices=statuses, default="planning")
        
        # Difficulty
        difficulties = ["beginner", "intermediate", "advanced"]
        difficulty = Prompt.ask("Difficulty level", choices=difficulties, default="intermediate")
        
        # URLs
        github_url = Prompt.ask("GitHub URL (optional)", default="")
        demo_url = Prompt.ask("Demo URL (optional)", default="")
        
        # Flags
        featured = Confirm.ask("Mark as featured project?", default=False)
        
        # Team size
        team_size = int(Prompt.ask("Team size", default="1"))
        
        # Technologies
        technologies_input = Prompt.ask("Technologies (comma-separated)", default="")
        technologies = [tech.strip() for tech in technologies_input.split(",") if tech.strip()]
        
        return {
            'name': project_name,
            'title': title,
            'description': description,
            'project_type': project_type,
            'status': status,
            'difficulty': difficulty,
            'github_url': github_url if github_url else None,
            'demo_url': demo_url if demo_url else None,
            'featured': featured,
            'team_size': team_size,
            'technologies': technologies,
            'start_date': date.today(),
            'end_date': None,
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
    
    def _get_default_project_info(self, project_name: str) -> Dict[str, Any]:
        """Get default project information"""
        return {
            'name': project_name,
            'title': project_name.replace('-', ' ').title(),
            'description': f"Description for {project_name}",
            'project_type': 'web-application',
            'status': 'planning',
            'difficulty': 'intermediate',
            'github_url': None,
            'demo_url': None,
            'featured': False,
            'team_size': 1,
            'technologies': [],
            'start_date': date.today(),
            'end_date': None,
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
    
    def _create_project_structure(self, project_path: Path, project_info: Dict[str, Any], template: Optional[str]):
        """Create the project directory structure"""
        # Create main project directory
        project_path.mkdir(parents=True, exist_ok=True)
        
        # Create subdirectories
        subdirs = [
            "assets/images",
            "assets/videos", 
            "assets/docs",
            "notes",
            "research"  # For research projects
        ]
        
        for subdir in subdirs:
            (project_path / subdir).mkdir(parents=True, exist_ok=True)
        
        # Copy from template if specified
        if template and (self.templates_dir / template).exists():
            self._copy_template(self.templates_dir / template, project_path, project_info)
        else:
            # Create default files
            self._create_default_project_files(project_path, project_info)
    
    def _copy_template(self, template_path: Path, project_path: Path, project_info: Dict[str, Any]):
        """Copy template files to project directory"""
        for item in template_path.iterdir():
            if item.is_file():
                target_path = project_path / item.name
                # Read template content and replace placeholders
                content = item.read_text(encoding='utf-8')
                content = self._replace_template_placeholders(content, project_info)
                target_path.write_text(content, encoding='utf-8')
            elif item.is_dir() and item.name not in ['assets', 'notes', 'research']:
                # Copy directory structure but skip our standard dirs
                shutil.copytree(item, project_path / item.name, dirs_exist_ok=True)
    
    def _create_default_project_files(self, project_path: Path, project_info: Dict[str, Any]):
        """Create default project files"""
        # Main README.md
        readme_content = self._generate_readme_content(project_info)
        (project_path / "README.md").write_text(readme_content, encoding='utf-8')
        
        # Project configuration
        config_content = self._generate_config_content(project_info)
        (project_path / "config.yaml").write_text(config_content, encoding='utf-8')
        
        # Development notes template
        notes_content = f"""# Development Notes for {project_info['title']}

## Setup Instructions

1. Initial setup steps
2. Environment configuration
3. Dependencies installation

## Development Log

### {date.today().strftime('%Y-%m-%d')}
- Project created
- Initial structure set up

## Known Issues

- List any known issues here

## TODOs

- [ ] Set up development environment
- [ ] Create initial prototype
- [ ] Write documentation
"""
        (project_path / "notes" / "development.md").write_text(notes_content, encoding='utf-8')
        
        # Create placeholder files
        (project_path / "assets" / "images" / ".gitkeep").touch()
        (project_path / "assets" / "videos" / ".gitkeep").touch()
        (project_path / "assets" / "docs" / ".gitkeep").touch()
    
    def _replace_template_placeholders(self, content: str, project_info: Dict[str, Any]) -> str:
        """Replace template placeholders with actual values"""
        replacements = {
            '{{PROJECT_NAME}}': project_info['name'],
            '{{PROJECT_TITLE}}': project_info['title'],
            '{{PROJECT_DESCRIPTION}}': project_info['description'],
            '{{PROJECT_TYPE}}': project_info['project_type'],
            '{{TODAY}}': date.today().isoformat(),
            '{{AUTHOR}}': "Your Name",  # This could be from workspace config
            '{{TECHNOLOGIES}}': ', '.join(project_info.get('technologies', [])),
            '{{GITHUB_URL}}': project_info.get('github_url', ''),
            '{{DEMO_URL}}': project_info.get('demo_url', ''),
        }
        
        for placeholder, value in replacements.items():
            content = content.replace(placeholder, str(value))
        
        return content
    
    def _generate_readme_content(self, project_info: Dict[str, Any]) -> str:
        """Generate README.md content"""
        technologies_list = '\n'.join([f"- {tech}" for tech in project_info.get('technologies', [])])
        
        return f"""---
title: "{project_info['title']}"
description: "{project_info['description']}"
type: "{project_info['project_type']}"
status: "{project_info['status']}"
technologies: {project_info.get('technologies', [])}
github_url: "{project_info.get('github_url', '')}"
demo_url: "{project_info.get('demo_url', '')}"
start_date: "{project_info['start_date']}"
featured: {str(project_info['featured']).lower()}
difficulty: "{project_info['difficulty']}"
team_size: {project_info['team_size']}
---

# {project_info['title']}

## Overview

{project_info['description']}

## Features

- Feature 1: Description
- Feature 2: Description  
- Feature 3: Description

## Technology Stack

{technologies_list if technologies_list else "- To be defined"}

## Getting Started

### Prerequisites

List any prerequisites here.

### Installation

1. Clone the repository
2. Install dependencies
3. Configure environment
4. Run the application

## Project Structure

```
{project_info['name']}/
├── README.md           # Project documentation
├── config.yaml         # Project configuration
├── assets/             # Project assets
│   ├── images/         # Screenshots, diagrams
│   ├── videos/         # Demo videos
│   └── docs/           # Additional documentation
├── notes/              # Development notes
│   └── development.md  # Development log
└── research/           # Research materials
```

## Development

See `notes/development.md` for development instructions and logs.

## Screenshots

Add project screenshots to `assets/images/` and reference them here.

## Contributing

Instructions for contributing to this project.

## License

Specify the project license.

## Contact

Your contact information.
"""

    def _generate_config_content(self, project_info: Dict[str, Any]) -> str:
        """Generate config.yaml content"""
        return f"""# Project Configuration for {project_info['title']}
project:
  name: "{project_info['name']}"
  title: "{project_info['title']}"
  description: "{project_info['description']}"
  type: "{project_info['project_type']}"
  version: "1.0.0"
  
# Status and metadata
metadata:
  status: "{project_info['status']}"
  difficulty: "{project_info['difficulty']}"
  team_size: {project_info['team_size']}
  featured: {str(project_info['featured']).lower()}
  start_date: "{project_info['start_date']}"
  end_date: {f'"{project_info["end_date"]}"' if project_info.get('end_date') else 'null'}
  created_at: "{project_info['created_at'].isoformat()}"
  updated_at: "{project_info['updated_at'].isoformat()}"

# Technology stack
technologies: {project_info.get('technologies', [])}

# Project URLs
urls:
  github: "{project_info.get('github_url', '')}"
  demo: "{project_info.get('demo_url', '')}"
  documentation: ""

# Asset paths (relative to project root)
assets:
  images: "assets/images"
  videos: "assets/videos"
  documents: "assets/docs"
  
# Notes and documentation
notes:
  development: "notes/development.md"
  research: "research/"
"""

    def list_projects(self) -> List[Dict[str, Any]]:
        """List all projects with their metadata"""
        projects = []
        
        if not self.projects_dir.exists():
            return projects
        
        for project_dir in self.projects_dir.iterdir():
            if project_dir.is_dir():
                project_info = self._load_project_info(project_dir)
                if project_info:
                    projects.append(project_info)
        
        return sorted(projects, key=lambda x: x.get('created_at', datetime.min), reverse=True)
    
    def _load_project_info(self, project_path: Path) -> Optional[Dict[str, Any]]:
        """Load project information from directory"""
        config_file = project_path / "config.yaml"
        readme_file = project_path / "README.md"
        
        project_info = {
            'name': project_path.name,
            'path': str(project_path),
            'has_config': config_file.exists(),
            'has_readme': readme_file.exists(),
        }
        
        # Load from config.yaml if exists
        if config_file.exists():
            try:
                with open(config_file, 'r', encoding='utf-8') as f:
                    config_data = yaml.safe_load(f)
                    if config_data and 'project' in config_data:
                        project_info.update(config_data['project'])
                        project_info.update(config_data.get('metadata', {}))
                        project_info['technologies'] = config_data.get('technologies', [])
                        project_info['urls'] = config_data.get('urls', {})
            except Exception as e:
                console.print(f"[yellow]⚠️ Could not load config for {project_path.name}: {e}[/yellow]")
        
        # Load from README.md frontmatter if no config
        elif readme_file.exists():
            try:
                content = readme_file.read_text(encoding='utf-8')
                if content.startswith('---'):
                    # Extract YAML frontmatter
                    lines = content.split('\n')
                    frontmatter_lines = []
                    in_frontmatter = False
                    for line in lines[1:]:  # Skip first ---
                        if line.strip() == '---':
                            break
                        frontmatter_lines.append(line)
                    
                    if frontmatter_lines:
                        frontmatter = yaml.safe_load('\n'.join(frontmatter_lines))
                        if frontmatter:
                            project_info.update(frontmatter)
            except Exception as e:
                console.print(f"[yellow]⚠️ Could not load README for {project_path.name}: {e}[/yellow]")
        
        return project_info
    
    def show_projects(self):
        """Display projects in a formatted table"""
        projects = self.list_projects()
        
        if not projects:
            console.print("[yellow]No projects found[/yellow]")
            return
        
        table = Table(title="Projects")
        table.add_column("Name", style="cyan")
        table.add_column("Title", style="bold")
        table.add_column("Type", style="blue")
        table.add_column("Status", style="green")
        table.add_column("Technologies", style="yellow")
        table.add_column("Created", style="dim")
        
        for project in projects:
            name = project.get('name', 'Unknown')
            title = project.get('title', project.get('name', 'Unknown'))
            project_type = project.get('type', project.get('project_type', 'Unknown'))
            status = project.get('status', 'Unknown')
            technologies = ', '.join(project.get('technologies', []))[:30]
            created_date = project.get('created_at', 'Unknown')
            if isinstance(created_date, str):
                try:
                    created_date = datetime.fromisoformat(created_date).strftime('%Y-%m-%d')
                except:
                    created_date = str(created_date)[:10]
            
            table.add_row(name, title, project_type, status, technologies, str(created_date))
        
        console.print(table)
    
    def get_available_templates(self) -> List[str]:
        """Get list of available project templates"""
        if not self.templates_dir.exists():
            return []
        
        return [d.name for d in self.templates_dir.iterdir() if d.is_dir()]
    
    def show_project_details(self, project_name: str):
        """Show detailed information about a project"""
        project_path = self.projects_dir / project_name
        
        if not project_path.exists():
            console.print(f"[red]❌ Project '{project_name}' not found[/red]")
            return
        
        project_info = self._load_project_info(project_path)
        if not project_info:
            console.print(f"[red]❌ Could not load project information for '{project_name}'[/red]")
            return
        
        # Display project details
        details_table = Table(title=f"Project Details: {project_info.get('title', project_name)}")
        details_table.add_column("Property", style="cyan")
        details_table.add_column("Value", style="bold")
        
        details_table.add_row("Name", project_info.get('name', 'Unknown'))
        details_table.add_row("Description", project_info.get('description', 'No description'))
        details_table.add_row("Type", project_info.get('type', project_info.get('project_type', 'Unknown')))
        details_table.add_row("Status", project_info.get('status', 'Unknown'))
        details_table.add_row("Difficulty", project_info.get('difficulty', 'Unknown'))
        details_table.add_row("Team Size", str(project_info.get('team_size', 'Unknown')))
        details_table.add_row("Featured", str(project_info.get('featured', False)))
        details_table.add_row("Technologies", ', '.join(project_info.get('technologies', [])))
        
        urls = project_info.get('urls', {})
        if isinstance(urls, dict):
            if urls.get('github'):
                details_table.add_row("GitHub", urls['github'])
            if urls.get('demo'):
                details_table.add_row("Demo", urls['demo'])
        
        details_table.add_row("Path", project_info.get('path', str(project_path)))
        
        console.print(details_table)
        
        # Show project structure
        console.print(f"\n[bold blue]Project Structure:[/bold blue]")
        self._show_directory_tree(project_path)
    
    def _show_directory_tree(self, path: Path, prefix: str = "", max_depth: int = 3, current_depth: int = 0):
        """Show directory tree structure"""
        if current_depth > max_depth:
            return
        
        items = sorted([p for p in path.iterdir() if not p.name.startswith('.')], 
                       key=lambda x: (x.is_file(), x.name))
        
        for i, item in enumerate(items):
            is_last = i == len(items) - 1
            current_prefix = "└── " if is_last else "├── "
            
            if item.is_dir():
                console.print(f"{prefix}{current_prefix}[bold blue]{item.name}/[/bold blue]")
                extension_prefix = "    " if is_last else "│   "
                self._show_directory_tree(item, prefix + extension_prefix, max_depth, current_depth + 1)
            else:
                file_color = "green" if item.suffix == '.md' else "yellow" if item.suffix == '.yaml' else "white"
                console.print(f"{prefix}{current_prefix}[{file_color}]{item.name}[/{file_color}]")
    
    def open_project_folder(self, project_name: str):
        """Open project folder in system file manager"""
        project_path = self.projects_dir / project_name
        
        if not project_path.exists():
            console.print(f"[red]❌ Project '{project_name}' not found[/red]")
            return False
        
        import subprocess
        import platform
        
        try:
            system = platform.system()
            if system == "Darwin":  # macOS
                subprocess.run(["open", str(project_path)])
            elif system == "Windows":
                subprocess.run(["explorer", str(project_path)])
            else:  # Linux
                subprocess.run(["xdg-open", str(project_path)])
            
            console.print(f"[green]✅ Opened project folder: {project_path}[/green]")
            return True
        except Exception as e:
            console.print(f"[red]❌ Could not open folder: {e}[/red]")
            return False 