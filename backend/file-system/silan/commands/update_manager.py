"""
Update Manager for Silan

Manages recent updates using individual markdown files organized
by year and month for better chronological organization.
"""

import yaml
from pathlib import Path
from typing import Dict, Any, List, Optional
from datetime import datetime, date
from dataclasses import dataclass
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.prompt import Prompt, Confirm
import calendar

console = Console()


@dataclass
class UpdateMetadata:
    """Update metadata structure"""
    title: str
    date: date
    update_type: str
    status: str
    priority: str
    tags: List[str]
    related_projects: List[str]
    created_at: datetime
    file_path: Path


class UpdateManager:
    """Individual MD file-based update manager"""
    
    def __init__(self, workspace_path: Path):
        self.workspace_path = workspace_path
        self.updates_dir = workspace_path / "content" / "updates"
        self.templates_dir = workspace_path / "templates" / "updates"
        
        # Ensure directories exist
        self.updates_dir.mkdir(parents=True, exist_ok=True)
        self.templates_dir.mkdir(parents=True, exist_ok=True)
    
    def create_update(self, title: Optional[str] = None, update_type: Optional[str] = None, 
                     interactive: bool = True) -> bool:
        """Create a new update entry"""
        try:
            # Gather update information
            if interactive:
                update_info = self._gather_update_info(title, update_type)
            else:
                update_info = self._get_default_update_info(title, update_type)
            
            # Generate filename and path
            file_path = self._generate_update_file_path(update_info)
            
            # Check if file already exists
            if file_path.exists():
                if not Confirm.ask(f"Update file {file_path.name} already exists. Overwrite?"):
                    return False
            
            # Create update file
            self._create_update_file(file_path, update_info)
            
            console.print(f"[green]✅ Update '{update_info['title']}' created successfully[/green]")
            console.print(f"[blue]📄 File: {file_path}[/blue]")
            
            return True
            
        except Exception as e:
            console.print(f"[red]❌ Failed to create update: {e}[/red]")
            return False
    
    def _gather_update_info(self, title: Optional[str] = None, update_type: Optional[str] = None) -> Dict[str, Any]:
        """Gather update information interactively"""
        console.print("\n[bold blue]Creating new update[/bold blue]")
        
        # Title
        if not title:
            title = Prompt.ask("Update title")
        
        # Type
        if not update_type:
            update_types = ["project", "work", "education", "research", "publication", "personal"]
            update_type = Prompt.ask("Update type", choices=update_types, default="project")
        
        # Status
        statuses = ["active", "ongoing", "completed"]
        status = Prompt.ask("Status", choices=statuses, default="active")
        
        # Priority
        priorities = ["high", "medium", "low"]
        priority = Prompt.ask("Priority", choices=priorities, default="medium")
        
        # Tags
        tags_input = Prompt.ask("Tags (comma-separated)", default="")
        tags = [tag.strip() for tag in tags_input.split(",") if tag.strip()]
        
        # Related projects
        projects_input = Prompt.ask("Related projects (comma-separated)", default="")
        related_projects = [proj.strip() for proj in projects_input.split(",") if proj.strip()]
        
        # Date (default to today)
        date_input = Prompt.ask("Date (YYYY-MM-DD)", default=date.today().isoformat())
        try:
            update_date = date.fromisoformat(date_input)
        except ValueError:
            update_date = date.today()
        
        return {
            'title': title,
            'date': update_date,
            'type': update_type,
            'status': status,
            'priority': priority,
            'tags': tags,
            'related_projects': related_projects,
            'created_at': datetime.now()
        }
    
    def _get_default_update_info(self, title: Optional[str] = None, update_type: Optional[str] = None) -> Dict[str, Any]:
        """Get default update information"""
        return {
            'title': title or f"Update {datetime.now().strftime('%Y-%m-%d %H:%M')}",
            'date': date.today(),
            'type': update_type or 'project',
            'status': 'active',
            'priority': 'medium',
            'tags': [],
            'related_projects': [],
            'created_at': datetime.now()
        }
    
    def _generate_update_file_path(self, update_info: Dict[str, Any]) -> Path:
        """Generate the file path for the update"""
        update_date = update_info['date']
        year = update_date.year
        month = update_date.month
        
        # Create year and month directories
        month_name = f"{month:02d}-{calendar.month_name[month].lower()}"
        month_dir = self.updates_dir / str(year) / month_name
        month_dir.mkdir(parents=True, exist_ok=True)
        
        # Generate filename
        title_slug = self._slugify(update_info['title'])
        filename = f"{update_date.isoformat()}-{title_slug}.md"
        
        return month_dir / filename
    
    def _slugify(self, text: str) -> str:
        """Convert text to URL-friendly slug"""
        import re
        # Convert to lowercase and replace spaces/special chars with hyphens
        slug = re.sub(r'[^\w\s-]', '', text.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')
    
    def _create_update_file(self, file_path: Path, update_info: Dict[str, Any]):
        """Create the update markdown file"""
        # Load template or create default content
        template_file = self.templates_dir / "update-template.md"
        
        if template_file.exists():
            content = template_file.read_text(encoding='utf-8')
            content = self._replace_update_placeholders(content, update_info)
        else:
            content = self._generate_update_content(update_info)
        
        file_path.write_text(content, encoding='utf-8')
    
    def _replace_update_placeholders(self, content: str, update_info: Dict[str, Any]) -> str:
        """Replace template placeholders with actual values"""
        replacements = {
            '{{UPDATE_TITLE}}': update_info['title'],
            '{{TODAY}}': update_info['date'].isoformat(),
            '{{TYPE}}': update_info['type'],
            '{{STATUS}}': update_info['status'],
            '{{PRIORITY}}': update_info['priority'],
            '{{TAGS}}': str(update_info['tags']),
            '{{RELATED_PROJECTS}}': str(update_info['related_projects']),
        }
        
        for placeholder, value in replacements.items():
            content = content.replace(placeholder, str(value))
        
        return content
    
    def _generate_update_content(self, update_info: Dict[str, Any]) -> str:
        """Generate update content from scratch"""
        return f"""---
title: "{update_info['title']}"
date: "{update_info['date']}"
type: "{update_info['type']}"
status: "{update_info['status']}"
priority: "{update_info['priority']}"
tags: {update_info['tags']}
related_projects: {update_info['related_projects']}
---

# {update_info['title']}

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

## Tags

{', '.join(update_info['tags']) if update_info['tags'] else 'No tags'}

## Related Projects

{', '.join(update_info['related_projects']) if update_info['related_projects'] else 'No related projects'}
"""

    def list_updates(self, year: Optional[int] = None, month: Optional[int] = None, 
                    limit: Optional[int] = None) -> List[Dict[str, Any]]:
        """List updates with optional filtering"""
        updates = []
        
        if not self.updates_dir.exists():
            return updates
        
        # Determine which directories to search
        search_dirs = []
        if year:
            year_dir = self.updates_dir / str(year)
            if year_dir.exists():
                if month:
                    month_name = f"{month:02d}-{calendar.month_name[month].lower()}"
                    month_dir = year_dir / month_name
                    if month_dir.exists():
                        search_dirs = [month_dir]
                else:
                    search_dirs = [d for d in year_dir.iterdir() if d.is_dir()]
        else:
            # Search all years
            for year_dir in self.updates_dir.iterdir():
                if year_dir.is_dir() and year_dir.name.isdigit():
                    for month_dir in year_dir.iterdir():
                        if month_dir.is_dir():
                            search_dirs.append(month_dir)
        
        # Collect update files
        for directory in search_dirs:
            for md_file in directory.glob("*.md"):
                update_info = self._load_update_info(md_file)
                if update_info:
                    updates.append(update_info)
        
        # Sort by date (newest first)
        updates.sort(key=lambda x: x.get('date', date.min), reverse=True)
        
        # Apply limit
        if limit:
            updates = updates[:limit]
        
        return updates
    
    def _load_update_info(self, file_path: Path) -> Optional[Dict[str, Any]]:
        """Load update information from markdown file"""
        try:
            content = file_path.read_text(encoding='utf-8')
            
            update_info = {
                'file_path': str(file_path),
                'filename': file_path.name,
                'size': file_path.stat().st_size,
                'modified': datetime.fromtimestamp(file_path.stat().st_mtime)
            }
            
            # Extract YAML frontmatter
            if content.startswith('---'):
                lines = content.split('\n')
                frontmatter_lines = []
                for line in lines[1:]:
                    if line.strip() == '---':
                        break
                    frontmatter_lines.append(line)
                
                if frontmatter_lines:
                    frontmatter = yaml.safe_load('\n'.join(frontmatter_lines))
                    if frontmatter:
                        update_info.update(frontmatter)
                        
                        # Parse date if it's a string
                        if 'date' in update_info and isinstance(update_info['date'], str):
                            try:
                                update_info['date'] = date.fromisoformat(update_info['date'])
                            except ValueError:
                                pass
            
            return update_info
            
        except Exception as e:
            console.print(f"[yellow]⚠️ Could not load update {file_path.name}: {e}[/yellow]")
            return None
    
    def show_updates(self, year: Optional[int] = None, month: Optional[int] = None, limit: int = 20):
        """Display updates in a formatted table"""
        updates = self.list_updates(year, month, limit)
        
        if not updates:
            console.print("[yellow]No updates found[/yellow]")
            return
        
        # Show filter info
        filter_info = []
        if year:
            filter_info.append(f"Year: {year}")
        if month:
            filter_info.append(f"Month: {calendar.month_name[month]}")
        if limit:
            filter_info.append(f"Limit: {limit}")
        
        title = "Recent Updates"
        if filter_info:
            title += f" ({', '.join(filter_info)})"
        
        table = Table(title=title)
        table.add_column("Date", style="cyan")
        table.add_column("Title", style="bold")
        table.add_column("Type", style="blue")
        table.add_column("Status", style="green")
        table.add_column("Priority", style="yellow")
        table.add_column("Tags", style="dim")
        
        for update in updates:
            update_date = update.get('date', 'Unknown')
            if isinstance(update_date, date):
                update_date = update_date.strftime('%Y-%m-%d')
            
            title = update.get('title', 'Unknown')
            update_type = update.get('type', 'Unknown')
            status = update.get('status', 'Unknown') 
            priority = update.get('priority', 'Unknown')
            tags = ', '.join(update.get('tags', []))[:30]
            
            table.add_row(str(update_date), title, update_type, status, priority, tags)
        
        console.print(table)
    
    def show_update_details(self, update_file: str):
        """Show detailed information about a specific update"""
        # Find the update file
        file_path = None
        
        if update_file.endswith('.md'):
            # Search for the file
            for year_dir in self.updates_dir.iterdir():
                if year_dir.is_dir() and year_dir.name.isdigit():
                    for month_dir in year_dir.iterdir():
                        if month_dir.is_dir():
                            potential_file = month_dir / update_file
                            if potential_file.exists():
                                file_path = potential_file
                                break
                    if file_path:
                        break
        
        if not file_path or not file_path.exists():
            console.print(f"[red]❌ Update file '{update_file}' not found[/red]")
            return
        
        update_info = self._load_update_info(file_path)
        if not update_info:
            console.print(f"[red]❌ Could not load update information[/red]")
            return
        
        # Display update details
        details_table = Table(title=f"Update Details: {update_info.get('title', 'Unknown')}")
        details_table.add_column("Property", style="cyan")
        details_table.add_column("Value", style="bold")
        
        details_table.add_row("Title", update_info.get('title', 'Unknown'))
        details_table.add_row("Date", str(update_info.get('date', 'Unknown')))
        details_table.add_row("Type", update_info.get('type', 'Unknown'))
        details_table.add_row("Status", update_info.get('status', 'Unknown'))
        details_table.add_row("Priority", update_info.get('priority', 'Unknown'))
        details_table.add_row("Tags", ', '.join(update_info.get('tags', [])))
        details_table.add_row("Related Projects", ', '.join(update_info.get('related_projects', [])))
        details_table.add_row("File Path", update_info.get('file_path', str(file_path)))
        details_table.add_row("File Size", f"{update_info.get('size', 0)} bytes")
        details_table.add_row("Last Modified", str(update_info.get('modified', 'Unknown')))
        
        console.print(details_table)
        
        # Show file content preview
        console.print(f"\n[bold blue]Content Preview:[/bold blue]")
        try:
            content = file_path.read_text(encoding='utf-8')
            # Remove frontmatter and show first few lines
            lines = content.split('\n')
            content_start = 0
            frontmatter_end = False
            
            for i, line in enumerate(lines):
                if i == 0 and line.strip() == '---':
                    continue
                if not frontmatter_end and line.strip() == '---':
                    frontmatter_end = True
                    content_start = i + 1
                    break
            
            preview_lines = lines[content_start:content_start + 10]
            preview_content = '\n'.join(preview_lines)
            
            console.print(Panel(preview_content, border_style="dim"))
            
        except Exception as e:
            console.print(f"[red]Could not read file content: {e}[/red]")
    
    def get_update_statistics(self) -> Dict[str, Any]:
        """Get statistics about updates"""
        stats = {
            'total_updates': 0,
            'by_year': {},
            'by_type': {},
            'by_status': {},
            'by_priority': {},
            'recent_activity': []
        }
        
        updates = self.list_updates()
        stats['total_updates'] = len(updates)
        
        for update in updates:
            # By year
            update_date = update.get('date')
            if isinstance(update_date, date):
                year = update_date.year
                stats['by_year'][year] = stats['by_year'].get(year, 0) + 1
            
            # By type
            update_type = update.get('type', 'unknown')
            stats['by_type'][update_type] = stats['by_type'].get(update_type, 0) + 1
            
            # By status
            status = update.get('status', 'unknown')
            stats['by_status'][status] = stats['by_status'].get(status, 0) + 1
            
            # By priority
            priority = update.get('priority', 'unknown')
            stats['by_priority'][priority] = stats['by_priority'].get(priority, 0) + 1
        
        # Recent activity (last 30 days)
        recent_updates = [u for u in updates if isinstance(u.get('date'), date) 
                         and (date.today() - u['date']).days <= 30]
        stats['recent_activity'] = len(recent_updates)
        
        return stats
    
    def show_statistics(self):
        """Display update statistics"""
        stats = self.get_update_statistics()
        
        console.print(f"[bold blue]Update Statistics[/bold blue]\n")
        console.print(f"Total Updates: [bold]{stats['total_updates']}[/bold]")
        console.print(f"Recent Activity (30 days): [bold]{stats['recent_activity']}[/bold]\n")
        
        # By year
        if stats['by_year']:
            year_table = Table(title="Updates by Year")
            year_table.add_column("Year", style="cyan")
            year_table.add_column("Count", style="bold")
            
            for year in sorted(stats['by_year'].keys(), reverse=True):
                year_table.add_row(str(year), str(stats['by_year'][year]))
            
            console.print(year_table)
            console.print()
        
        # By type
        if stats['by_type']:
            type_table = Table(title="Updates by Type")
            type_table.add_column("Type", style="cyan")
            type_table.add_column("Count", style="bold")
            
            for update_type in sorted(stats['by_type'].keys()):
                type_table.add_row(update_type, str(stats['by_type'][update_type]))
            
            console.print(type_table)
    
    def open_update_file(self, update_file: str):
        """Open update file in system editor"""
        # Find the update file
        file_path = None
        
        if update_file.endswith('.md'):
            for year_dir in self.updates_dir.iterdir():
                if year_dir.is_dir() and year_dir.name.isdigit():
                    for month_dir in year_dir.iterdir():
                        if month_dir.is_dir():
                            potential_file = month_dir / update_file
                            if potential_file.exists():
                                file_path = potential_file
                                break
                    if file_path:
                        break
        
        if not file_path or not file_path.exists():
            console.print(f"[red]❌ Update file '{update_file}' not found[/red]")
            return False
        
        import subprocess
        import platform
        
        try:
            system = platform.system()
            if system == "Darwin":  # macOS
                subprocess.run(["open", str(file_path)])
            elif system == "Windows":
                subprocess.run(["notepad", str(file_path)])
            else:  # Linux
                subprocess.run(["xdg-open", str(file_path)])
            
            console.print(f"[green]✅ Opened update file: {file_path}[/green]")
            return True
        except Exception as e:
            console.print(f"[red]❌ Could not open file: {e}[/red]")
            return False 