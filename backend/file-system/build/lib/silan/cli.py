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
    from .cli.init import InitCommand
    
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
    from .cli.backend_manager import BackendManager
    
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
    from .cli.backend_manager import BackendManager
    
    manager = BackendManager()
    success = manager.stop()
    
    if success:
        console.print("[green]✅ Backend server stopped[/green]")
    else:
        console.print("[yellow]⚠️ Backend server was not running[/yellow]")


@backend.command('status')
def backend_status():
    """Check the status of the Go backend server"""
    from .cli.backend_manager import BackendManager
    
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
    from .cli.backend_manager import BackendManager
    
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
    from .cli.backend_manager import BackendManager
    
    manager = BackendManager()
    manager.show_logs(follow, lines)


@backend.command('install')
def backend_install():
    """Install or build the Go backend binary"""
    from .cli.backend_manager import BackendManager
    
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
    from .cli.database_sync_advanced import AdvancedDatabaseSyncCommand
    
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
        from .cli.backend_manager import BackendManager
        
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
    from .cli.backend_manager import BackendManager
    
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


@cli.group()
def workspace():
    """Manage workspace and content organization"""
    pass


@workspace.command('init')
@click.argument('name', required=False)
@click.option('--author', help='Workspace author name')
@click.option('--description', help='Workspace description')
def workspace_init(name: str, author: str, description: str):
    """Initialize a new modern workspace"""
    from .cli.workspace_manager import WorkspaceManager
    
    workspace_name = name or Path.cwd().name
    manager = WorkspaceManager()
    success = manager.initialize_workspace(workspace_name, author, description)
    
    if success:
        console.print(f"[green]✅ Workspace '{workspace_name}' initialized[/green]")


@workspace.command('status')
def workspace_status():
    """Show workspace status and content summary"""
    from .cli.workspace_manager import WorkspaceManager
    
    manager = WorkspaceManager()
    manager.show_status()


@cli.group()
def project():
    """Manage projects with folder-based organization"""
    pass


@project.command('create')
@click.argument('project_name')
@click.option('--template', '-t', help='Project template to use')
@click.option('--no-interactive', is_flag=True, help='Create without interactive prompts')
def project_create(project_name: str, template: str, no_interactive: bool):
    """Create a new project"""
    from .cli.project_manager import ProjectManager
    
    manager = ProjectManager(Path.cwd())
    success = manager.create_project(project_name, template, not no_interactive)
    
    if success:
        console.print(f"[blue]💡 Use 'silan project open {project_name}' to open the project folder[/blue]")


@project.command('list')
def project_list():
    """List all projects"""
    from .cli.project_manager import ProjectManager
    
    manager = ProjectManager(Path.cwd())
    manager.show_projects()


@project.command('show')
@click.argument('project_name')
def project_show(project_name: str):
    """Show detailed project information"""
    from .cli.project_manager import ProjectManager
    
    manager = ProjectManager(Path.cwd())
    manager.show_project_details(project_name)


@project.command('open')
@click.argument('project_name')
def project_open(project_name: str):
    """Open project folder in file manager"""
    from .cli.project_manager import ProjectManager
    
    manager = ProjectManager(Path.cwd())
    manager.open_project_folder(project_name)


@cli.group()
def idea():
    """Manage research ideas with folder-based organization"""
    pass


@idea.command('create')
@click.argument('idea_name')
@click.option('--template', '-t', help='Idea template to use')
@click.option('--no-interactive', is_flag=True, help='Create without interactive prompts')
def idea_create(idea_name: str, template: str, no_interactive: bool):
    """Create a new research idea"""
    from .cli.idea_manager import IdeaManager
    
    manager = IdeaManager(Path.cwd())
    success = manager.create_idea(idea_name, template, not no_interactive)
    
    if success:
        console.print(f"[blue]💡 Use 'silan idea open {idea_name}' to open the idea folder[/blue]")


@idea.command('list')
def idea_list():
    """List all ideas"""
    from .cli.idea_manager import IdeaManager
    
    manager = IdeaManager(Path.cwd())
    manager.show_ideas()


@idea.command('show')
@click.argument('idea_name')
def idea_show(idea_name: str):
    """Show detailed idea information"""
    from .cli.idea_manager import IdeaManager
    
    manager = IdeaManager(Path.cwd())
    manager.show_idea_details(idea_name)


@idea.command('open')
@click.argument('idea_name')
def idea_open(idea_name: str):
    """Open idea folder in file manager"""
    from .cli.idea_manager import IdeaManager
    
    manager = IdeaManager(Path.cwd())
    manager.open_idea_folder(idea_name)


@idea.command('stats')
def idea_stats():
    """Show idea statistics"""
    from .cli.idea_manager import IdeaManager
    
    manager = IdeaManager(Path.cwd())
    manager.show_statistics()


@cli.group()
def update():
    """Manage updates with individual markdown files"""
    pass


@update.command('create')
@click.option('--title', '-t', help='Update title')
@click.option('--type', help='Update type (project, work, education, research, publication)')
@click.option('--no-interactive', is_flag=True, help='Create without interactive prompts')
def update_create(title: str, type: str, no_interactive: bool):
    """Create a new update entry"""
    from .cli.update_manager import UpdateManager
    
    manager = UpdateManager(Path.cwd())
    success = manager.create_update(title, type, not no_interactive)
    
    if success:
        console.print(f"[blue]💡 Use 'silan update list' to see all updates[/blue]")


@update.command('list')
@click.option('--year', type=int, help='Filter by year')
@click.option('--month', type=int, help='Filter by month (1-12)')
@click.option('--limit', type=int, default=20, help='Limit number of results')
def update_list(year: int, month: int, limit: int):
    """List recent updates"""
    from .cli.update_manager import UpdateManager
    
    manager = UpdateManager(Path.cwd())
    manager.show_updates(year, month, limit)


@update.command('show')
@click.argument('update_file')
def update_show(update_file: str):
    """Show detailed update information"""
    from .cli.update_manager import UpdateManager
    
    manager = UpdateManager(Path.cwd())
    manager.show_update_details(update_file)


@update.command('open')
@click.argument('update_file')
def update_open(update_file: str):
    """Open update file in editor"""
    from .cli.update_manager import UpdateManager
    
    manager = UpdateManager(Path.cwd())
    manager.open_update_file(update_file)


@update.command('stats')
def update_stats():
    """Show update statistics"""
    from .cli.update_manager import UpdateManager
    
    manager = UpdateManager(Path.cwd())
    manager.show_statistics()


@cli.group()
def template():
    """Manage content templates"""
    pass


@template.command('list')
@click.option('--type', help='Template type (projects, ideas, updates, blog)')
def template_list(type: str):
    """List available templates"""
    from .cli.template_manager import TemplateManager
    
    manager = TemplateManager(Path.cwd())
    if type:
        templates = manager.list_templates(type)
        if templates:
            console.print(f"[bold blue]{type.title()} Templates:[/bold blue]")
            for template in templates:
                console.print(f"  • {template}")
        else:
            console.print(f"[yellow]No {type} templates found[/yellow]")
    else:
        manager.show_templates()


@template.command('create')
@click.argument('template_type')
@click.argument('template_name')
@click.option('--from-path', type=click.Path(exists=True), help='Create template from existing content')
def template_create(template_type: str, template_name: str, from_path: str):
    """Create a new template"""
    from .cli.template_manager import TemplateManager
    
    manager = TemplateManager(Path.cwd())
    source_path = Path(from_path) if from_path else None
    success = manager.create_template(template_type, template_name, source_path)
    
    if success:
        console.print(f"[blue]💡 Use 'silan template show {template_type} {template_name}' to view template details[/blue]")


@template.command('show')
@click.argument('template_type')
@click.argument('template_name')
def template_show(template_type: str, template_name: str):
    """Show template details"""
    from .cli.template_manager import TemplateManager
    
    manager = TemplateManager(Path.cwd())
    manager.show_template_details(template_type, template_name)


@template.command('delete')
@click.argument('template_type')
@click.argument('template_name')
def template_delete(template_type: str, template_name: str):
    """Delete a template"""
    from .cli.template_manager import TemplateManager
    
    manager = TemplateManager(Path.cwd())
    manager.delete_template(template_type, template_name)


@cli.command('quick')
@click.argument('content_type', type=click.Choice(['project', 'idea', 'update']))
@click.argument('name')
@click.option('--template', '-t', help='Template to use')
def quick_create(content_type: str, name: str, template: str):
    """Quick create content from templates"""
    from .cli.template_manager import TemplateManager
    
    manager = TemplateManager(Path.cwd())
    success = manager.quick_create(content_type, name, template)
    
    if success:
        console.print(f"[blue]💡 Content created successfully![/blue]")


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