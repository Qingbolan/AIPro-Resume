#!/usr/bin/env python3
"""
Silan Database Tools CLI

A command-line tool for syncing markdown content to databases.
"""

import click
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from pathlib import Path

console = Console()

@click.group()
@click.version_option(version='1.0.0')
@click.option('--verbose', '-v', is_flag=True, help='Enable verbose output')
def cli(verbose):
    """Silan Database Tools - Sync markdown content to databases with ease"""
    if verbose:
        console.print("[dim]Verbose mode enabled[/dim]")
    
    console.print(Panel.fit(
        "[bold blue]Silan Database Tools v1.0.0[/bold blue]\n"
        "[dim]Sync markdown content to databases with ease[/dim]\n\n"
        "[green]🗄️ Multi-Database Support[/green]\n"
        "[green]📝 Markdown-Based Content[/green]\n" 
        "[green]🔄 Automated Schema Management[/green]\n"
        "[green]⚡ Fast & Reliable Sync[/green]",
        title="🌟 Welcome"
    ))


@cli.command()
@click.argument('project_name')
@click.option('--language', default='en', 
              type=click.Choice(['en', 'zh', 'both']),
              help='Default language for content')
def init(project_name: str, language: str):
    """Initialize a new project with content templates"""
    from .commands.init import InitCommand
    
    console.print(f"[bold green]🚀 Initializing project '{project_name}'[/bold green]")
    console.print(f"[blue]Language: {language}[/blue]")
    
    cmd = InitCommand(project_name, language)
    success = cmd.execute()
    
    if not success:
        console.print("[red]❌ Project initialization failed[/red]")


@cli.command('db-sync')
@click.option('--db-type', default='sqlite', type=click.Choice(['mysql', 'postgresql', 'sqlite']),
              help='Database type')
@click.option('--host', default='localhost', help='Database host (MySQL/PostgreSQL only)')
@click.option('--port', type=int, help='Database port (MySQL/PostgreSQL only)')
@click.option('--user', help='Database user (MySQL/PostgreSQL only)')
@click.option('--password', help='Database password (MySQL/PostgreSQL only)')
@click.option('--database', help='Database name (MySQL/PostgreSQL only)')
@click.option('--db-path', default='portfolio.db', help='Database file path (SQLite only)')
@click.option('--dry-run', is_flag=True, help='Show what would be synced without actually syncing')
@click.option('--create-tables', is_flag=True, help='Create database tables if they don\'t exist')
def db_sync(db_type: str, host: str, port: int, user: str, password: str, 
           database: str, db_path: str, dry_run: bool, create_tables: bool):
    """Sync content files to database (MySQL/PostgreSQL/SQLite)"""
    from .commands.database_sync_advanced import AdvancedDatabaseSyncCommand
    
    # Set default ports if not specified
    if port is None:
        port = 3306 if db_type == 'mysql' else 5432 if db_type == 'postgresql' else None
    
    if db_type in ['mysql', 'postgresql']:
        # Prompt for required fields if not provided
        if not user:
            user = click.prompt('Database user', default='root' if db_type == 'mysql' else 'postgres')
        if not password and not dry_run:
            password = click.prompt('Database password', hide_input=True, default='')
        if not database:
            database = click.prompt('Database name', default='silan_portfolio')
        
        db_config = {
            'type': db_type,
            'host': host,
            'port': port,
            'user': user,
            'password': password or '',
            'database': database
        }
    else:
        db_config = {
            'type': 'sqlite',
            'path': db_path
        }
    
    console.print(f"[bold blue]🔄 Syncing to {db_type} database[/bold blue]")
    if dry_run:
        console.print("[yellow]🧪 Dry run mode enabled[/yellow]")
    
    cmd = AdvancedDatabaseSyncCommand(db_config, dry_run)
    cmd.execute()

@cli.command()
def status():
    """Show content summary and database configuration"""
    from .utils.config import ConfigManager
    
    config_manager = ConfigManager(Path.cwd())
    config = config_manager.load_config()
    
    # Content summary
    content_dir = Path.cwd() / "content"
    if content_dir.exists():
        content_table = Table(title="Content Summary")
        content_table.add_column("Content Type", style="cyan")
        content_table.add_column("Files", style="bold")
        
        content_types = ['projects', 'blog', 'ideas', 'plans']
        for content_type in content_types:
            type_dir = content_dir / content_type
            count = len(list(type_dir.glob("**/*.md"))) if type_dir.exists() else 0
            content_table.add_row(content_type.title(), str(count))
        
        console.print(content_table)
    else:
        console.print("[yellow]No content directory found[/yellow]")

@cli.command()
def clean():
    """Clean temporary files"""
    console.print("[bold yellow]🧹 Cleaning temporary files...[/bold yellow]")
    
    # Clean temporary files
    temp_patterns = ["**/*.pyc", "**/__pycache__", "**/.DS_Store", "**/Thumbs.db"]
    for pattern in temp_patterns:
        for file in Path.cwd().glob(pattern):
            if file.is_file():
                file.unlink()
            elif file.is_dir():
                import shutil
                shutil.rmtree(file)
    
    console.print("[green]✅ Cleanup completed[/green]")

if __name__ == '__main__':
    cli()