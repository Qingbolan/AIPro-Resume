"""
Template Manager for Silan

Manages templates for quick creation of projects, ideas, updates, and other content.
Provides customizable templates and easy template creation cli.
"""

import yaml
import json
from pathlib import Path
from typing import Dict, Any, List, Optional
from datetime import datetime, date
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.prompt import Prompt, Confirm

console = Console()


class TemplateManager:
    """Template creation and management system"""
    
    def __init__(self, workspace_path: Path):
        self.workspace_path = workspace_path
        self.templates_dir = workspace_path / "templates"
        self.content_dir = workspace_path / "content"
        
        # Ensure directories exist
        self.templates_dir.mkdir(parents=True, exist_ok=True)
        (self.templates_dir / "projects").mkdir(exist_ok=True)
        (self.templates_dir / "ideas").mkdir(exist_ok=True)
        (self.templates_dir / "updates").mkdir(exist_ok=True)
        (self.templates_dir / "blog").mkdir(exist_ok=True)
    
    def create_project_from_template(self, project_name: str, template_name: str = None) -> bool:
        """Quick create project from template in specified directory"""
        from .project_manager import ProjectManager
        
        if not template_name:
            available_templates = self.list_templates("projects")
            if not available_templates:
                console.print("[red]❌ No project templates available[/red]")
                return False
            
            console.print("[bold blue]Available project templates:[/bold blue]")
            for i, template in enumerate(available_templates, 1):
                console.print(f"{i}. {template}")
            
            choice = Prompt.ask("Select template number", default="1")
            try:
                template_name = available_templates[int(choice) - 1]
            except (ValueError, IndexError):
                template_name = available_templates[0]
        
        # Check if we're in a project directory or need to specify path
        target_dir = self._get_target_directory("projects", project_name)
        if not target_dir:
            return False
        
        project_manager = ProjectManager(self.workspace_path)
        return project_manager.create_project(project_name, template_name, interactive=False)
    
    def create_idea_from_template(self, idea_name: str, template_name: str = None) -> bool:
        """Quick create idea from template in specified directory"""
        from .idea_manager import IdeaManager
        
        if not template_name:
            available_templates = self.list_templates("ideas")
            if not available_templates:
                console.print("[red]❌ No idea templates available[/red]")
                return False
            
            console.print("[bold blue]Available idea templates:[/bold blue]")
            for i, template in enumerate(available_templates, 1):
                console.print(f"{i}. {template}")
            
            choice = Prompt.ask("Select template number", default="1")
            try:
                template_name = available_templates[int(choice) - 1]
            except (ValueError, IndexError):
                template_name = available_templates[0]
        
        target_dir = self._get_target_directory("ideas", idea_name)
        if not target_dir:
            return False
        
        idea_manager = IdeaManager(self.workspace_path)
        return idea_manager.create_idea(idea_name, template_name, interactive=False)
    
    def create_update_from_template(self, title: str = None) -> bool:
        """Quick create update from template"""
        from .update_manager import UpdateManager
        
        update_manager = UpdateManager(self.workspace_path)
        return update_manager.create_update(title, interactive=False)
    
    def _get_target_directory(self, content_type: str, item_name: str) -> Optional[Path]:
        """Get or create target directory for content"""
        target_dir = self.content_dir / content_type
        target_dir.mkdir(parents=True, exist_ok=True)
        return target_dir
    
    def list_templates(self, template_type: str = None) -> List[str]:
        """List available templates by type"""
        if template_type:
            template_dir = self.templates_dir / template_type
            if not template_dir.exists():
                return []
            return [d.name for d in template_dir.iterdir() if d.is_dir()]
        else:
            # List all templates
            all_templates = {}
            for type_dir in self.templates_dir.iterdir():
                if type_dir.is_dir():
                    templates = [d.name for d in type_dir.iterdir() if d.is_dir()]
                    if templates:
                        all_templates[type_dir.name] = templates
            return all_templates
    
    def show_templates(self):
        """Display available templates in a formatted view"""
        all_templates = self.list_templates()
        
        if not all_templates:
            console.print("[yellow]No templates found[/yellow]")
            return
        
        for template_type, templates in all_templates.items():
            table = Table(title=f"{template_type.title()} Templates")
            table.add_column("Template Name", style="cyan")
            table.add_column("Description", style="dim")
            table.add_column("Files", style="green")
            
            for template in templates:
                template_path = self.templates_dir / template_type / template
                description = self._get_template_description(template_path)
                file_count = len(list(template_path.rglob("*"))) if template_path.exists() else 0
                
                table.add_row(template, description, str(file_count))
            
            console.print(table)
            console.print()
    
    def _get_template_description(self, template_path: Path) -> str:
        """Get template description from README or config"""
        # Try to get description from README
        readme_path = template_path / "README.md"
        if readme_path.exists():
            try:
                content = readme_path.read_text(encoding='utf-8')
                lines = content.split('\n')
                for line in lines:
                    if line.strip() and not line.startswith('#'):
                        return line.strip()[:50] + "..." if len(line) > 50 else line.strip()
            except:
                pass
        
        # Try to get from config
        config_path = template_path / "config.yaml"
        if config_path.exists():
            try:
                with open(config_path, 'r', encoding='utf-8') as f:
                    config = yaml.safe_load(f)
                    if config and 'description' in config:
                        desc = config['description']
                        return desc[:50] + "..." if len(desc) > 50 else desc
            except:
                pass
        
        return "No description available"
    
    def create_template(self, template_type: str, template_name: str, 
                       source_path: Optional[Path] = None) -> bool:
        """Create a new template from existing content or interactively"""
        try:
            template_path = self.templates_dir / template_type / template_name
            
            if template_path.exists():
                if not Confirm.ask(f"Template '{template_name}' already exists. Overwrite?"):
                    return False
            
            template_path.mkdir(parents=True, exist_ok=True)
            
            if source_path and source_path.exists():
                # Copy from existing content
                self._copy_content_to_template(source_path, template_path)
                console.print(f"[green]✅ Template '{template_name}' created from {source_path}[/green]")
            else:
                # Create interactively
                self._create_template_interactively(template_type, template_path)
                console.print(f"[green]✅ Template '{template_name}' created interactively[/green]")
            
            return True
            
        except Exception as e:
            console.print(f"[red]❌ Failed to create template: {e}[/red]")
            return False
    
    def _copy_content_to_template(self, source_path: Path, template_path: Path):
        """Copy existing content to create a template"""
        import shutil
        
        for item in source_path.iterdir():
            if item.name.startswith('.'):
                continue
                
            target_item = template_path / item.name
            
            if item.is_file():
                # Copy file and templatize content
                content = item.read_text(encoding='utf-8')
                templatized_content = self._templatize_content(content, source_path.name)
                target_item.write_text(templatized_content, encoding='utf-8')
            elif item.is_dir():
                shutil.copytree(item, target_item, dirs_exist_ok=True)
    
    def _templatize_content(self, content: str, original_name: str) -> str:
        """Convert content to template format with placeholders"""
        # Replace specific values with placeholders
        replacements = {
            original_name: "{{PROJECT_NAME}}",
            original_name.replace('-', ' ').title(): "{{PROJECT_TITLE}}",
            original_name.replace('-', '_'): "{{PROJECT_NAME_UNDERSCORE}}",
        }
        
        # Add date placeholders
        today = date.today().isoformat()
        content = content.replace(today, "{{TODAY}}")
        
        # Replace known patterns
        for old_value, placeholder in replacements.items():
            content = content.replace(old_value, placeholder)
        
        return content
    
    def _create_template_interactively(self, template_type: str, template_path: Path):
        """Create template interactively based on type"""
        console.print(f"\n[bold blue]Creating {template_type} template interactively[/bold blue]")
        
        if template_type == "projects":
            self._create_project_template_interactive(template_path)
        elif template_type == "ideas":
            self._create_idea_template_interactive(template_path)
        elif template_type == "updates":
            self._create_update_template_interactive(template_path)
        elif template_type == "blog":
            self._create_blog_template_interactive(template_path)
        else:
            self._create_generic_template_interactive(template_path)
    
    def _create_project_template_interactive(self, template_path: Path):
        """Create project template interactively"""
        # Get template details
        description = Prompt.ask("Template description", default="Custom project template")
        project_type = Prompt.ask("Default project type", default="web-application")
        
        # Create README template
        readme_content = f"""---
title: "{{{{PROJECT_NAME}}}}"
description: "{{{{PROJECT_DESCRIPTION}}}}"
type: "{project_type}"
status: "planning"
technologies: []
github_url: ""
demo_url: ""
start_date: "{{{{TODAY}}}}"
featured: false
difficulty: "intermediate"
team_size: 1
---

# {{{{PROJECT_NAME}}}}

## Overview

{{{{PROJECT_DESCRIPTION}}}}

## Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Technology Stack

### Frontend
- Framework: 
- Language: 
- Styling: 

### Backend
- Framework: 
- Database: 
- Authentication: 

## Getting Started

### Prerequisites

List prerequisites here.

### Installation

1. Clone the repository
2. Install dependencies
3. Configure environment
4. Run the application

## Development

See development notes in the `notes/` directory.

## Contributing

Instructions for contributing to this project.

## License

Specify the project license.
"""
        
        # Create config template
        config_content = f"""# Project Configuration
project:
  name: "{{{{PROJECT_NAME}}}}"
  type: "{project_type}"
  version: "1.0.0"
  description: "{description}"
  
# Technology stack
technologies:
  frontend: []
  backend: []
  database: []
  tools: []

# Project URLs
urls:
  github: ""
  demo: ""
  documentation: ""

# Project metadata
metadata:
  difficulty: "intermediate"
  team_size: 1
  estimated_duration: "3 months"
  license: "MIT"
  
# Asset paths
assets:
  images: "assets/images"
  videos: "assets/videos"
  documents: "assets/docs"
"""
        
        # Write files
        (template_path / "README.md").write_text(readme_content, encoding='utf-8')
        (template_path / "config.yaml").write_text(config_content, encoding='utf-8')
        
        # Create directory structure
        dirs = ["assets/images", "assets/videos", "assets/docs", "notes", "research"]
        for dir_path in dirs:
            (template_path / dir_path).mkdir(parents=True, exist_ok=True)
            (template_path / dir_path / ".gitkeep").touch()
    
    def _create_idea_template_interactive(self, template_path: Path):
        """Create idea template interactively"""
        description = Prompt.ask("Template description", default="Custom idea template")
        category = Prompt.ask("Default category", default="research")
        field = Prompt.ask("Default field", default="computer-science")
        
        readme_content = f"""---
title: "{{{{IDEA_NAME}}}}"
description: "{{{{IDEA_DESCRIPTION}}}}"
category: "{category}"
status: "draft"
priority: "medium"
field: "{field}"
keywords: []
created_date: "{{{{TODAY}}}}"
estimated_duration: ""
collaboration_needed: false
funding_required: false
---

# {{{{IDEA_NAME}}}}

## Abstract

{{{{IDEA_DESCRIPTION}}}}

## Motivation

Why is this idea important? What problem does it solve?

## Background

Relevant background information and context.

## Proposed Approach

Describe your proposed approach or solution.

## Methodology

How would you implement or test this idea?

## Expected Impact

What impact could this idea have?

## Next Steps

1. Literature review
2. Methodology development
3. Implementation/experimentation
4. Evaluation

## Resources Needed

- Research materials
- Tools and software
- Collaboration opportunities
"""
        
        config_content = f"""# Idea Configuration
idea:
  name: "{{{{IDEA_NAME}}}}"
  category: "{category}"
  field: "{field}"
  description: "{description}"
  
# Metadata
metadata:
  priority: "medium"
  status: "draft"
  estimated_duration: ""
  
# Requirements
requirements:
  collaboration_needed: false
  funding_required: false
  resources: []
  
# Research aspects
research:
  keywords: []
  related_papers: []
  potential_venues: []
"""
        
        (template_path / "README.md").write_text(readme_content, encoding='utf-8')
        (template_path / "config.yaml").write_text(config_content, encoding='utf-8')
        
        # Create directory structure
        dirs = ["research", "notes", "experiments", "references", "prototypes", "assets"]
        for dir_path in dirs:
            (template_path / dir_path).mkdir(parents=True, exist_ok=True)
            (template_path / dir_path / ".gitkeep").touch()
    
    def _create_update_template_interactive(self, template_path: Path):
        """Create update template interactively"""
        update_content = """---
title: "{{UPDATE_TITLE}}"
date: "{{TODAY}}"
type: "project"
status: "active"
priority: "medium"
tags: []
related_projects: []
---

# {{UPDATE_TITLE}}

## Summary

Brief summary of this update.

## Details

Detailed description of what happened, what was accomplished, or what was learned.

## Progress

- What was completed
- What's in progress
- What's next

## Challenges

Any challenges encountered and how they were addressed.

## Resources

- Links to relevant resources
- References
- Documentation

## Next Steps

1. Next step 1
2. Next step 2
3. Next step 3
"""
        
        (template_path / "update-template.md").write_text(update_content, encoding='utf-8')
    
    def _create_blog_template_interactive(self, template_path: Path):
        """Create blog template interactively"""
        blog_content = """---
title: "{{BLOG_TITLE}}"
date: "{{TODAY}}"
author: "{{AUTHOR}}"
category: "technology"
tags: []
summary: "Brief summary of the blog post"
featured: false
reading_time: "5 min"
---

# {{BLOG_TITLE}}

## Introduction

Introduction to your blog post.

## Main Content

Main content of your blog post.

### Subsection

Content for subsection.

## Conclusion

Conclusion and key takeaways.

## References

- Reference 1
- Reference 2
"""
        
        (template_path / "post-template.md").write_text(blog_content, encoding='utf-8')
    
    def _create_generic_template_interactive(self, template_path: Path):
        """Create generic template interactively"""
        console.print("[yellow]Creating generic template[/yellow]")
        
        # Create a basic template structure
        readme_content = """# {{ITEM_NAME}}

## Description

{{ITEM_DESCRIPTION}}

## Content

Add your content here.

## Notes

- Created on {{TODAY}}
- Type: Generic template
"""
        
        (template_path / "README.md").write_text(readme_content, encoding='utf-8')
    
    def delete_template(self, template_type: str, template_name: str) -> bool:
        """Delete a template"""
        template_path = self.templates_dir / template_type / template_name
        
        if not template_path.exists():
            console.print(f"[red]❌ Template '{template_name}' not found[/red]")
            return False
        
        if not Confirm.ask(f"Are you sure you want to delete template '{template_name}'?"):
            return False
        
        try:
            import shutil
            shutil.rmtree(template_path)
            console.print(f"[green]✅ Template '{template_name}' deleted[/green]")
            return True
        except Exception as e:
            console.print(f"[red]❌ Failed to delete template: {e}[/red]")
            return False
    
    def show_template_details(self, template_type: str, template_name: str):
        """Show detailed information about a template"""
        template_path = self.templates_dir / template_type / template_name
        
        if not template_path.exists():
            console.print(f"[red]❌ Template '{template_name}' not found[/red]")
            return
        
        # Template details
        details_table = Table(title=f"Template Details: {template_name}")
        details_table.add_column("Property", style="cyan")
        details_table.add_column("Value", style="bold")
        
        details_table.add_row("Name", template_name)
        details_table.add_row("Type", template_type)
        details_table.add_row("Path", str(template_path))
        details_table.add_row("Description", self._get_template_description(template_path))
        
        # Count files
        files = list(template_path.rglob("*"))
        file_count = len([f for f in files if f.is_file()])
        dir_count = len([f for f in files if f.is_dir()])
        
        details_table.add_row("Files", str(file_count))
        details_table.add_row("Directories", str(dir_count))
        details_table.add_row("Total Size", f"{sum(f.stat().st_size for f in files if f.is_file())} bytes")
        
        console.print(details_table)
        
        # Show structure
        console.print(f"\n[bold blue]Template Structure:[/bold blue]")
        self._show_directory_tree(template_path)
    
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
    
    def quick_create(self, content_type: str, name: str, template: str = None) -> bool:
        """Quick create content from template in current directory or specified location"""
        console.print(f"[bold blue]Quick creating {content_type}: {name}[/bold blue]")
        
        if content_type == "project":
            return self.create_project_from_template(name, template)
        elif content_type == "idea":
            return self.create_idea_from_template(name, template)
        elif content_type == "update":
            return self.create_update_from_template(name)
        else:
            console.print(f"[red]❌ Unknown content type: {content_type}[/red]")
            return False
    
    def export_template(self, template_type: str, template_name: str, export_path: Path) -> bool:
        """Export template to external location"""
        template_path = self.templates_dir / template_type / template_name
        
        if not template_path.exists():
            console.print(f"[red]❌ Template '{template_name}' not found[/red]")
            return False
        
        try:
            import shutil
            shutil.copytree(template_path, export_path / template_name, dirs_exist_ok=True)
            console.print(f"[green]✅ Template exported to {export_path / template_name}[/green]")
            return True
        except Exception as e:
            console.print(f"[red]❌ Failed to export template: {e}[/red]")
            return False
    
    def import_template(self, template_type: str, template_name: str, import_path: Path) -> bool:
        """Import template from external location"""
        if not import_path.exists():
            console.print(f"[red]❌ Import path does not exist: {import_path}[/red]")
            return False
        
        template_path = self.templates_dir / template_type / template_name
        
        if template_path.exists():
            if not Confirm.ask(f"Template '{template_name}' already exists. Overwrite?"):
                return False
        
        try:
            import shutil
            if template_path.exists():
                shutil.rmtree(template_path)
            shutil.copytree(import_path, template_path)
            console.print(f"[green]✅ Template imported as {template_name}[/green]")
            return True
        except Exception as e:
            console.print(f"[red]❌ Failed to import template: {e}[/red]")
            return False 