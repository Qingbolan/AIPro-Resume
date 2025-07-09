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
@click.option('--with-backend', is_flag=True, help='Initialize with Go backend configuration')
def init(project_name: str, language: str, with_backend: bool):
    """Initialize a new project with content templates"""
    from .commands.init import InitCommand
    
    console.print(f"[bold green]🚀 Initializing project '{project_name}'[/bold green]")
    console.print(f"[blue]Language: {language}[/blue]")
    if with_backend:
        console.print("[blue]🔧 With Go backend support[/blue]")
    
    cmd = InitCommand(project_name, language, with_backend)
    success = cmd.execute()
    
    if not success:
        console.print("[red]❌ Project initialization failed[/red]")


@cli.group()
def backend():
    """Manage the Go backend server"""
    pass


@backend.command('start')
@click.option('--db-type', default='sqlite', type=click.Choice(['mysql', 'postgresql', 'sqlite']),
              help='Database type')
@click.option('--host', default='localhost', help='Database host (MySQL/PostgreSQL only)')
@click.option('--port', type=int, help='Database port (MySQL/PostgreSQL only)')
@click.option('--user', help='Database user (MySQL/PostgreSQL only)')
@click.option('--password', help='Database password (MySQL/PostgreSQL only)')
@click.option('--database', help='Database name (MySQL/PostgreSQL only)')
@click.option('--db-path', default='portfolio.db', help='Database file path (SQLite only)')
@click.option('--server-host', default='0.0.0.0', help='Backend server host')
@click.option('--server-port', default=8888, help='Backend server port')
@click.option('--daemon', '-d', is_flag=True, help='Run backend as daemon')
@click.option('--config-file', help='Custom backend configuration file')
def backend_start(db_type: str, host: str, port: int, user: str, password: str, 
                 database: str, db_path: str, server_host: str, server_port: int,
                 daemon: bool, config_file: str):
    """Start the Go backend server"""
    from .commands.backend_manager import BackendManager
    
    # Build database configuration
    if db_type in ['mysql', 'postgresql']:
        if port is None:
            port = 3306 if db_type == 'mysql' else 5432
        if not user:
            user = click.prompt('Database user', default='root' if db_type == 'mysql' else 'postgres')
        if not password:
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
    
    backend_config = {
        'database': db_config,
        'server': {
            'host': server_host,
            'port': server_port
        },
        'daemon': daemon,
        'config_file': config_file
    }
    
    manager = BackendManager()
    success = manager.start(backend_config)
    
    if success:
        console.print(f"[green]✅ Backend server started successfully[/green]")
        console.print(f"[blue]🌐 Server running at http://{server_host}:{server_port}[/blue]")
    else:
        console.print("[red]❌ Failed to start backend server[/red]")


@backend.command('stop')
def backend_stop():
    """Stop the Go backend server"""
    from .commands.backend_manager import BackendManager
    
    manager = BackendManager()
    success = manager.stop()
    
    if success:
        console.print("[green]✅ Backend server stopped[/green]")
    else:
        console.print("[yellow]⚠️ Backend server was not running[/yellow]")


@backend.command('status')
def backend_status():
    """Check the status of the Go backend server"""
    from .commands.backend_manager import BackendManager
    
    manager = BackendManager()
    status = manager.status()
    
    if status['running']:
        console.print(f"[green]✅ Backend server is running[/green]")
        console.print(f"[blue]PID: {status['pid']}[/blue]")
        console.print(f"[blue]URL: {status['url']}[/blue]")
        console.print(f"[blue]Database: {status['database']}[/blue]")
    else:
        console.print("[red]❌ Backend server is not running[/red]")


@backend.command('restart')
def backend_restart():
    """Restart the Go backend server"""
    from .commands.backend_manager import BackendManager
    
    manager = BackendManager()
    success = manager.restart()
    
    if success:
        console.print("[green]✅ Backend server restarted successfully[/green]")
    else:
        console.print("[red]❌ Failed to restart backend server[/red]")


@backend.command('logs')
@click.option('--follow', '-f', is_flag=True, help='Follow log output')
@click.option('--lines', '-n', default=50, help='Number of lines to show')
def backend_logs(follow: bool, lines: int):
    """Show backend server logs"""
    from .commands.backend_manager import BackendManager
    
    manager = BackendManager()
    manager.show_logs(follow, lines)


@backend.command('install')
def backend_install():
    """Install or build the Go backend binary"""
    from .commands.backend_manager import BackendManager
    
    manager = BackendManager()
    success = manager.install_backend()
    
    if success:
        console.print("[green]✅ Backend binary installed successfully[/green]")
        console.print("[blue]💡 You can now start the backend with: silan backend start[/blue]")
    else:
        console.print("[red]❌ Failed to install backend binary[/red]")


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
@click.option('--start-backend', is_flag=True, help='Start backend server after sync')
def db_sync(db_type: str, host: str, port: int, user: str, password: str, 
           database: str, db_path: str, dry_run: bool, create_tables: bool, start_backend: bool):
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
    success = cmd.execute()
    
    # Start backend if requested and sync was successful
    if start_backend and success and not dry_run:
        console.print("\n[bold blue]🚀 Starting backend server...[/bold blue]")
        from .commands.backend_manager import BackendManager
        
        backend_config = {
            'database': db_config,
            'server': {'host': '0.0.0.0', 'port': 8888},
            'daemon': False
        }
        
        manager = BackendManager()
        if manager.start(backend_config):
            console.print("[green]✅ Backend server started successfully[/green]")
        else:
            console.print("[red]❌ Failed to start backend server[/red]")


@cli.command()
def status():
    """Show content summary and database configuration"""
    from .utils.config import ConfigManager
    from .commands.backend_manager import BackendManager
    
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
    
    # Backend status
    console.print("\n")
    manager = BackendManager()
    backend_status = manager.status()
    
    if backend_status['running']:
        console.print(f"[green]🚀 Backend: Running at {backend_status['url']}[/green]")
    else:
        console.print("[yellow]🚀 Backend: Not running[/yellow]")


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