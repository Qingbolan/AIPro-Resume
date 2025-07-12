"""
Idea Manager for Silan

Manages research ideas and creative concepts using a folder-based approach
where each idea has its own directory with research materials and notes.
"""

import yaml
import shutil
from pathlib import Path
from typing import Dict, Any, List, Optional
from datetime import datetime, date
from dataclasses import dataclass
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.prompt import Prompt, Confirm

console = Console()


@dataclass
class IdeaMetadata:
    """Idea metadata structure"""
    name: str
    title: str
    description: str
    category: str
    status: str
    priority: str
    field: str
    keywords: List[str]
    estimated_duration: Optional[str]
    collaboration_needed: bool
    funding_required: bool
    created_at: datetime
    updated_at: datetime


class IdeaManager:
    """Folder-based idea manager"""
    
    def __init__(self, workspace_path: Path):
        self.workspace_path = workspace_path
        self.ideas_dir = workspace_path / "content" / "ideas"
        self.templates_dir = workspace_path / "templates" / "ideas"
        
        # Ensure directories exist
        self.ideas_dir.mkdir(parents=True, exist_ok=True)
        self.templates_dir.mkdir(parents=True, exist_ok=True)
    
    def create_idea(self, idea_name: str, template: Optional[str] = None, 
                   interactive: bool = True) -> bool:
        """Create a new idea from template or interactively"""
        try:
            # Validate idea name
            if not self._is_valid_idea_name(idea_name):
                console.print("[red]❌ Invalid idea name. Use lowercase letters, numbers, and hyphens only.[/red]")
                return False
            
            idea_path = self.ideas_dir / idea_name
            
            # Check if idea already exists
            if idea_path.exists():
                console.print(f"[red]❌ Idea '{idea_name}' already exists[/red]")
                return False
            
            # Gather idea information
            if interactive:
                idea_info = self._gather_idea_info(idea_name)
            else:
                idea_info = self._get_default_idea_info(idea_name)
            
            # Create idea structure
            self._create_idea_structure(idea_path, idea_info, template)
            
            console.print(f"[green]✅ Idea '{idea_name}' created successfully[/green]")
            console.print(f"[blue]📁 Location: {idea_path}[/blue]")
            
            return True
            
        except Exception as e:
            console.print(f"[red]❌ Failed to create idea: {e}[/red]")
            return False
    
    def _is_valid_idea_name(self, name: str) -> bool:
        """Validate idea name format"""
        import re
        return bool(re.match(r'^[a-z0-9-]+$', name)) and len(name) >= 2
    
    def _gather_idea_info(self, idea_name: str) -> Dict[str, Any]:
        """Gather idea information interactively"""
        console.print(f"\n[bold blue]Creating idea: {idea_name}[/bold blue]")
        
        # Basic information
        title = Prompt.ask("Idea title", default=idea_name.replace('-', ' ').title())
        description = Prompt.ask("Idea description", default="")
        
        # Category
        categories = ["research", "startup", "improvement", "innovation", "experiment", "theory", "other"]
        category = Prompt.ask("Category", choices=categories, default="research")
        
        # Status
        statuses = ["draft", "hypothesis", "experimenting", "validating", "published", "concluded"]
        status = Prompt.ask("Initial status", choices=statuses, default="draft")
        
        # Priority
        priorities = ["low", "medium", "high", "urgent"]
        priority = Prompt.ask("Priority", choices=priorities, default="medium")
        
        # Research field
        fields = ["computer-science", "engineering", "mathematics", "physics", "biology", "chemistry", 
                 "medicine", "business", "design", "social-science", "other"]
        field = Prompt.ask("Research field", choices=fields, default="computer-science")
        
        # Keywords
        keywords_input = Prompt.ask("Keywords (comma-separated)", default="")
        keywords = [kw.strip() for kw in keywords_input.split(",") if kw.strip()]
        
        # Duration estimate
        duration = Prompt.ask("Estimated duration (e.g., '3 months', '1 year')", default="")
        
        # Collaboration and funding
        collaboration_needed = Confirm.ask("Does this idea need collaboration?", default=False)
        funding_required = Confirm.ask("Does this idea require funding?", default=False)
        
        return {
            'name': idea_name,
            'title': title,
            'description': description,
            'category': category,
            'status': status,
            'priority': priority,
            'field': field,
            'keywords': keywords,
            'estimated_duration': duration if duration else None,
            'collaboration_needed': collaboration_needed,
            'funding_required': funding_required,
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
    
    def _get_default_idea_info(self, idea_name: str) -> Dict[str, Any]:
        """Get default idea information"""
        return {
            'name': idea_name,
            'title': idea_name.replace('-', ' ').title(),
            'description': f"Description for {idea_name}",
            'category': 'research',
            'status': 'draft',
            'priority': 'medium',
            'field': 'computer-science',
            'keywords': [],
            'estimated_duration': None,
            'collaboration_needed': False,
            'funding_required': False,
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
    
    def _create_idea_structure(self, idea_path: Path, idea_info: Dict[str, Any], template: Optional[str]):
        """Create the idea directory structure"""
        # Create main idea directory
        idea_path.mkdir(parents=True, exist_ok=True)
        
        # Create subdirectories
        subdirs = [
            "research",           # Research materials and papers
            "notes",             # Development notes and thoughts
            "experiments",       # Experimental code and results
            "references",        # Reference materials
            "prototypes",        # Early prototypes or demos
            "assets"             # Images, diagrams, etc.
        ]
        
        for subdir in subdirs:
            (idea_path / subdir).mkdir(parents=True, exist_ok=True)
        
        # Copy from template if specified
        if template and (self.templates_dir / template).exists():
            self._copy_template(self.templates_dir / template, idea_path, idea_info)
        else:
            # Create default files
            self._create_default_idea_files(idea_path, idea_info)
    
    def _copy_template(self, template_path: Path, idea_path: Path, idea_info: Dict[str, Any]):
        """Copy template files to idea directory"""
        for item in template_path.iterdir():
            if item.is_file():
                target_path = idea_path / item.name
                # Read template content and replace placeholders
                content = item.read_text(encoding='utf-8')
                content = self._replace_idea_placeholders(content, idea_info)
                target_path.write_text(content, encoding='utf-8')
            elif item.is_dir() and item.name not in ['research', 'notes', 'experiments', 'references', 'prototypes', 'assets']:
                # Copy directory structure but skip our standard dirs
                shutil.copytree(item, idea_path / item.name, dirs_exist_ok=True)
    
    def _create_default_idea_files(self, idea_path: Path, idea_info: Dict[str, Any]):
        """Create default idea files"""
        # Main README.md
        readme_content = self._generate_readme_content(idea_info)
        (idea_path / "README.md").write_text(readme_content, encoding='utf-8')
        
        # Idea configuration
        config_content = self._generate_config_content(idea_info)
        (idea_path / "config.yaml").write_text(config_content, encoding='utf-8')
        
        # Research notes template
        research_notes = f"""# Research Notes for {idea_info['title']}

## Background Research

### Key Papers
- [ ] Paper 1: Title and link
- [ ] Paper 2: Title and link
- [ ] Paper 3: Title and link

### Related Work
- Existing solutions and their limitations
- Gap in current research/technology

## Methodology

### Approach
Describe your proposed approach here.

### Steps
1. Step 1: Literature review
2. Step 2: Define methodology
3. Step 3: Implement/experiment
4. Step 4: Evaluate results

## Notes and Insights

### {date.today().strftime('%Y-%m-%d')}
- Initial idea created
- Need to research existing solutions

## References

### Papers
- Reference 1
- Reference 2

### Tools and Resources
- Tool 1
- Tool 2

## TODO
- [ ] Complete literature review
- [ ] Define clear research questions
- [ ] Identify collaboration opportunities
"""
        (idea_path / "notes" / "research.md").write_text(research_notes, encoding='utf-8')
        
        # Experiment log template
        experiment_log = f"""# Experiment Log for {idea_info['title']}

## Experiment Planning

### Hypothesis
State your hypothesis here.

### Variables
- Independent variables:
- Dependent variables:
- Control variables:

## Experiments

### Experiment 1 - {date.today().strftime('%Y-%m-%d')}
**Objective:** What are you trying to test?

**Method:** How will you test it?

**Results:** What did you observe?

**Conclusion:** What does this mean for your idea?

## Next Experiments
- [ ] Experiment 2: Description
- [ ] Experiment 3: Description
"""
        (idea_path / "experiments" / "log.md").write_text(experiment_log, encoding='utf-8')
        
        # Create placeholder files
        (idea_path / "research" / ".gitkeep").touch()
        (idea_path / "references" / ".gitkeep").touch()
        (idea_path / "prototypes" / ".gitkeep").touch()
        (idea_path / "assets" / ".gitkeep").touch()
    
    def _replace_idea_placeholders(self, content: str, idea_info: Dict[str, Any]) -> str:
        """Replace template placeholders with actual values"""
        replacements = {
            '{{IDEA_NAME}}': idea_info['name'],
            '{{IDEA_TITLE}}': idea_info['title'],
            '{{IDEA_DESCRIPTION}}': idea_info['description'],
            '{{CATEGORY}}': idea_info['category'],
            '{{FIELD}}': idea_info['field'],
            '{{TODAY}}': date.today().isoformat(),
            '{{KEYWORDS}}': ', '.join(idea_info.get('keywords', [])),
            '{{ESTIMATED_DURATION}}': idea_info.get('estimated_duration', ''),
            '{{PRIORITY}}': idea_info['priority'],
            '{{STATUS}}': idea_info['status'],
        }
        
        for placeholder, value in replacements.items():
            content = content.replace(placeholder, str(value))
        
        return content
    
    def _generate_readme_content(self, idea_info: Dict[str, Any]) -> str:
        """Generate README.md content"""
        keywords_list = '\n'.join([f"- {kw}" for kw in idea_info.get('keywords', [])])
        
        return f"""---
title: "{idea_info['title']}"
description: "{idea_info['description']}"
category: "{idea_info['category']}"
status: "{idea_info['status']}"
priority: "{idea_info['priority']}"
field: "{idea_info['field']}"
keywords: {idea_info.get('keywords', [])}
created_date: "{idea_info['created_at'].date()}"
estimated_duration: "{idea_info.get('estimated_duration', '')}"
collaboration_needed: {str(idea_info['collaboration_needed']).lower()}
funding_required: {str(idea_info['funding_required']).lower()}
---

# {idea_info['title']}

## Abstract

{idea_info['description']}

## Motivation

Why is this idea important? What problem does it solve?

## Background

Relevant background information and context.

## Proposed Approach

Describe your proposed approach or solution.

## Methodology

How would you implement or test this idea?

### Research Plan
1. Literature review
2. Methodology development
3. Implementation/experimentation
4. Evaluation and validation

## Expected Impact

What impact could this idea have?

## Keywords

{keywords_list if keywords_list else "- To be defined"}

## Requirements

### Collaboration
{'Yes - seeking collaborators' if idea_info['collaboration_needed'] else 'No - individual work'}

### Funding
{'Yes - funding required' if idea_info['funding_required'] else 'No - self-funded'}

### Estimated Duration
{idea_info.get('estimated_duration', 'To be determined')}

## Resources

### Research Materials
See `research/` directory for papers and references.

### Experimental Work
See `experiments/` directory for experimental plans and results.

### Notes
See `notes/` directory for development notes and insights.

## Directory Structure

```
{idea_info['name']}/
├── README.md           # This file
├── config.yaml         # Idea configuration
├── research/           # Research papers and materials
├── notes/              # Development notes
│   └── research.md     # Research notes
├── experiments/        # Experimental work
│   └── log.md          # Experiment log
├── references/         # Reference materials
├── prototypes/         # Early prototypes
└── assets/             # Images, diagrams, etc.
```

## Status

Current status: **{idea_info['status'].title()}**

Priority: **{idea_info['priority'].title()}**

## Next Steps

1. Complete background research
2. Define clear research questions
3. Develop methodology
4. Begin implementation/experimentation

## Related Work

Document similar ideas or research in this area.

## Notes

- Created on {idea_info['created_at'].strftime('%Y-%m-%d')}
- Field: {idea_info['field']}
- Category: {idea_info['category']}
"""

    def _generate_config_content(self, idea_info: Dict[str, Any]) -> str:
        """Generate config.yaml content"""
        return f"""# Idea Configuration for {idea_info['title']}
idea:
  name: "{idea_info['name']}"
  title: "{idea_info['title']}"
  description: "{idea_info['description']}"
  category: "{idea_info['category']}"
  field: "{idea_info['field']}"
  
# Status and metadata
metadata:
  status: "{idea_info['status']}"
  priority: "{idea_info['priority']}"
  estimated_duration: "{idea_info.get('estimated_duration', '')}"
  created_at: "{idea_info['created_at'].isoformat()}"
  updated_at: "{idea_info['updated_at'].isoformat()}"

# Research metadata
research:
  keywords: {idea_info.get('keywords', [])}
  
# Requirements
requirements:
  collaboration_needed: {str(idea_info['collaboration_needed']).lower()}
  funding_required: {str(idea_info['funding_required']).lower()}
  
# Directory paths (relative to idea root)
paths:
  research: "research/"
  notes: "notes/"
  experiments: "experiments/"
  references: "references/"
  prototypes: "prototypes/"
  assets: "assets/"

# Research tracking
tracking:
  papers_reviewed: []
  experiments_completed: []
  prototypes_built: []
  collaborators: []
"""

    def list_ideas(self) -> List[Dict[str, Any]]:
        """List all ideas with their metadata"""
        ideas = []
        
        if not self.ideas_dir.exists():
            return ideas
        
        for idea_dir in self.ideas_dir.iterdir():
            if idea_dir.is_dir():
                idea_info = self._load_idea_info(idea_dir)
                if idea_info:
                    ideas.append(idea_info)
        
        return sorted(ideas, key=lambda x: x.get('created_at', datetime.min), reverse=True)
    
    def _load_idea_info(self, idea_path: Path) -> Optional[Dict[str, Any]]:
        """Load idea information from directory"""
        config_file = idea_path / "config.yaml"
        readme_file = idea_path / "README.md"
        
        idea_info = {
            'name': idea_path.name,
            'path': str(idea_path),
            'has_config': config_file.exists(),
            'has_readme': readme_file.exists(),
        }
        
        # Load from config.yaml if exists
        if config_file.exists():
            try:
                with open(config_file, 'r', encoding='utf-8') as f:
                    config_data = yaml.safe_load(f)
                    if config_data and 'idea' in config_data:
                        idea_info.update(config_data['idea'])
                        idea_info.update(config_data.get('metadata', {}))
                        idea_info.update(config_data.get('research', {}))
                        idea_info.update(config_data.get('requirements', {}))
            except Exception as e:
                console.print(f"[yellow]⚠️ Could not load config for {idea_path.name}: {e}[/yellow]")
        
        # Load from README.md frontmatter if no config
        elif readme_file.exists():
            try:
                content = readme_file.read_text(encoding='utf-8')
                if content.startswith('---'):
                    # Extract YAML frontmatter
                    lines = content.split('\n')
                    frontmatter_lines = []
                    for line in lines[1:]:  # Skip first ---
                        if line.strip() == '---':
                            break
                        frontmatter_lines.append(line)
                    
                    if frontmatter_lines:
                        frontmatter = yaml.safe_load('\n'.join(frontmatter_lines))
                        if frontmatter:
                            idea_info.update(frontmatter)
            except Exception as e:
                console.print(f"[yellow]⚠️ Could not load README for {idea_path.name}: {e}[/yellow]")
        
        return idea_info
    
    def show_ideas(self):
        """Display ideas in a formatted table"""
        ideas = self.list_ideas()
        
        if not ideas:
            console.print("[yellow]No ideas found[/yellow]")
            return
        
        table = Table(title="Ideas")
        table.add_column("Name", style="cyan")
        table.add_column("Title", style="bold")
        table.add_column("Category", style="blue")
        table.add_column("Status", style="green")
        table.add_column("Priority", style="yellow")
        table.add_column("Field", style="magenta")
        table.add_column("Keywords", style="dim")
        
        for idea in ideas:
            name = idea.get('name', 'Unknown')
            title = idea.get('title', idea.get('name', 'Unknown'))
            category = idea.get('category', 'Unknown')
            status = idea.get('status', 'Unknown')
            priority = idea.get('priority', 'Unknown')
            field = idea.get('field', 'Unknown')
            keywords = ', '.join(idea.get('keywords', []))[:25]
            
            table.add_row(name, title, category, status, priority, field, keywords)
        
        console.print(table)
    
    def show_idea_details(self, idea_name: str):
        """Show detailed information about an idea"""
        idea_path = self.ideas_dir / idea_name
        
        if not idea_path.exists():
            console.print(f"[red]❌ Idea '{idea_name}' not found[/red]")
            return
        
        idea_info = self._load_idea_info(idea_path)
        if not idea_info:
            console.print(f"[red]❌ Could not load idea information for '{idea_name}'[/red]")
            return
        
        # Display idea details
        details_table = Table(title=f"Idea Details: {idea_info.get('title', idea_name)}")
        details_table.add_column("Property", style="cyan")
        details_table.add_column("Value", style="bold")
        
        details_table.add_row("Name", idea_info.get('name', 'Unknown'))
        details_table.add_row("Description", idea_info.get('description', 'No description'))
        details_table.add_row("Category", idea_info.get('category', 'Unknown'))
        details_table.add_row("Status", idea_info.get('status', 'Unknown'))
        details_table.add_row("Priority", idea_info.get('priority', 'Unknown'))
        details_table.add_row("Field", idea_info.get('field', 'Unknown'))
        details_table.add_row("Keywords", ', '.join(idea_info.get('keywords', [])))
        details_table.add_row("Estimated Duration", idea_info.get('estimated_duration', 'Not specified'))
        details_table.add_row("Collaboration Needed", str(idea_info.get('collaboration_needed', False)))
        details_table.add_row("Funding Required", str(idea_info.get('funding_required', False)))
        details_table.add_row("Path", idea_info.get('path', str(idea_path)))
        
        console.print(details_table)
        
        # Show idea structure
        console.print(f"\n[bold blue]Idea Structure:[/bold blue]")
        self._show_directory_tree(idea_path)
    
    def _show_directory_tree(self, path: Path, prefix: str = "", max_depth: int = 2, current_depth: int = 0):
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
    
    def get_available_templates(self) -> List[str]:
        """Get list of available idea templates"""
        if not self.templates_dir.exists():
            return []
        
        return [d.name for d in self.templates_dir.iterdir() if d.is_dir()]
    
    def open_idea_folder(self, idea_name: str):
        """Open idea folder in system file manager"""
        idea_path = self.ideas_dir / idea_name
        
        if not idea_path.exists():
            console.print(f"[red]❌ Idea '{idea_name}' not found[/red]")
            return False
        
        import subprocess
        import platform
        
        try:
            system = platform.system()
            if system == "Darwin":  # macOS
                subprocess.run(["open", str(idea_path)])
            elif system == "Windows":
                subprocess.run(["explorer", str(idea_path)])
            else:  # Linux
                subprocess.run(["xdg-open", str(idea_path)])
            
            console.print(f"[green]✅ Opened idea folder: {idea_path}[/green]")
            return True
        except Exception as e:
            console.print(f"[red]❌ Could not open folder: {e}[/red]")
            return False
    
    def get_idea_statistics(self) -> Dict[str, Any]:
        """Get statistics about ideas"""
        ideas = self.list_ideas()
        
        stats = {
            'total_ideas': len(ideas),
            'by_category': {},
            'by_status': {},
            'by_priority': {},
            'by_field': {},
            'collaboration_needed': 0,
            'funding_required': 0,
        }
        
        for idea in ideas:
            # By category
            category = idea.get('category', 'unknown')
            stats['by_category'][category] = stats['by_category'].get(category, 0) + 1
            
            # By status
            status = idea.get('status', 'unknown')
            stats['by_status'][status] = stats['by_status'].get(status, 0) + 1
            
            # By priority
            priority = idea.get('priority', 'unknown')
            stats['by_priority'][priority] = stats['by_priority'].get(priority, 0) + 1
            
            # By field
            field = idea.get('field', 'unknown')
            stats['by_field'][field] = stats['by_field'].get(field, 0) + 1
            
            # Requirements
            if idea.get('collaboration_needed'):
                stats['collaboration_needed'] += 1
            if idea.get('funding_required'):
                stats['funding_required'] += 1
        
        return stats
    
    def show_statistics(self):
        """Display idea statistics"""
        stats = self.get_idea_statistics()
        
        console.print(f"[bold blue]Idea Statistics[/bold blue]\n")
        console.print(f"Total Ideas: [bold]{stats['total_ideas']}[/bold]")
        console.print(f"Need Collaboration: [bold]{stats['collaboration_needed']}[/bold]")
        console.print(f"Need Funding: [bold]{stats['funding_required']}[/bold]\n")
        
        # By category
        if stats['by_category']:
            category_table = Table(title="Ideas by Category")
            category_table.add_column("Category", style="cyan")
            category_table.add_column("Count", style="bold")
            
            for category in sorted(stats['by_category'].keys()):
                category_table.add_row(category, str(stats['by_category'][category]))
            
            console.print(category_table)
            console.print()
        
        # By status
        if stats['by_status']:
            status_table = Table(title="Ideas by Status")
            status_table.add_column("Status", style="cyan")
            status_table.add_column("Count", style="bold")
            
            for status in sorted(stats['by_status'].keys()):
                status_table.add_row(status, str(stats['by_status'][status])) 