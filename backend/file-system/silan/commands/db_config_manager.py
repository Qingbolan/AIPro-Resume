"""
Database configuration management command with caching support
"""

from pathlib import Path
from typing import Dict, Any, Optional
import argparse

from rich.console import Console
from rich.table import Table
from rich.prompt import Prompt, Confirm

from ..utils.config import ConfigManager

console = Console()

class DatabaseConfigManager:
    """Manage database configuration with caching"""
    
    def __init__(self, project_dir: Path = None):
        self.project_dir = project_dir or Path.cwd()
        self.config_manager = ConfigManager(self.project_dir)
    
    def execute(self, action: str, **kwargs) -> bool:
        """Execute database configuration management action"""
        
        if action == 'show':
            return self._show_config()
        elif action == 'set':
            return self._set_config(**kwargs)
        elif action == 'cache':
            return self._cache_current_config()
        elif action == 'load-cache':
            return self._load_from_cache()
        elif action == 'clear-cache':
            return self._clear_cache()
        elif action == 'interactive':
            return self._interactive_config()
        elif action == 'last-sync':
            return self._show_last_sync()
        elif action == 'clear-all':
            return self._clear_all_cache()
        else:
            console.print(f"[red]❌ Unknown action: {action}[/red]")
            return False
    
    def _show_config(self) -> bool:
        """Show current database configuration"""
        
        # Get current config
        current_config = self.config_manager.get_db_config_with_fallback()
        cached_config = self.config_manager.get_cached_db_config()
        
        # Create comparison table
        table = Table(title="Database Configuration")
        table.add_column("Setting", style="cyan")
        table.add_column("Current Value", style="green")
        table.add_column("Cached Value", style="yellow")
        
        if current_config:
            for key, value in current_config.items():
                cached_value = cached_config.get(key, 'N/A') if cached_config else 'N/A'
                table.add_row(key, str(value), str(cached_value))
        else:
            table.add_row("No configuration found", "", "")
        
        console.print(table)
        
        # Show cache info
        cache_data = self.config_manager.load_db_cache()
        if cache_data and 'last_updated' in cache_data:
            console.print(f"[blue]📅 Cache last updated: {cache_data['last_updated']}[/blue]")
        
        return True
    
    def _set_config(self, db_type: str = None, **config_params) -> bool:
        """Set database configuration"""
        
        if not db_type:
            console.print("[red]❌ Database type is required[/red]")
            return False
        
        # Build database config based on type
        if db_type.lower() == 'mysql':
            db_config = {
                'type': 'mysql',
                'host': config_params.get('host', 'localhost'),
                'port': int(config_params.get('port', 3306)),
                'user': config_params.get('user', 'root'),
                'password': config_params.get('password', ''),
                'database': config_params.get('database', 'silan_website')
            }
        elif db_type.lower() == 'postgresql':
            db_config = {
                'type': 'postgresql',
                'host': config_params.get('host', 'localhost'),
                'port': int(config_params.get('port', 5432)),
                'user': config_params.get('user', 'postgres'),
                'password': config_params.get('password', ''),
                'database': config_params.get('database', 'silan_website')
            }
        elif db_type.lower() == 'sqlite':
            db_config = {
                'type': 'sqlite',
                'path': config_params.get('path', 'portfolio.db')
            }
        else:
            console.print(f"[red]❌ Unsupported database type: {db_type}[/red]")
            return False
        
        # Set as default and cache
        success = self.config_manager.set_default_db_config(db_config)
        
        if success:
            console.print(f"[green]✅ Database configuration set to {db_type}[/green]")
            self._show_config()
        
        return success
    
    def _cache_current_config(self) -> bool:
        """Cache current database configuration"""
        
        config = self.config_manager.load_config()
        db_config = config.get('database', {})
        
        if not db_config:
            console.print("[yellow]⚠️  No database configuration found to cache[/yellow]")
            return False
        
        success = self.config_manager.update_db_cache(db_config)
        
        if success:
            console.print("[green]✅ Current database configuration cached[/green]")
        
        return success
    
    def _load_from_cache(self) -> bool:
        """Load database configuration from cache"""
        
        cached_config = self.config_manager.get_cached_db_config()
        
        if not cached_config:
            console.print("[yellow]⚠️  No cached database configuration found[/yellow]")
            return False
        
        # Confirm with user
        console.print("[blue]Cached database configuration:[/blue]")
        for key, value in cached_config.items():
            console.print(f"  {key}: {value}")
        
        if Confirm.ask("Load this configuration as default?"):
            success = self.config_manager.set_config_value('database', cached_config)
            
            if success:
                console.print("[green]✅ Database configuration loaded from cache[/green]")
            
            return success
        
        return False
    
    def _clear_cache(self, force: bool = False) -> bool:
        """Clear database configuration cache"""
        
        if force or Confirm.ask("Are you sure you want to clear the database cache?"):
            return self.config_manager.clear_db_cache()
        
        return False
    
    def _interactive_config(self) -> bool:
        """Interactive database configuration setup"""
        
        console.print("[bold blue]🔧 Interactive Database Configuration[/bold blue]")
        
        # Choose database type
        db_type = Prompt.ask(
            "Database type",
            choices=["mysql", "postgresql", "sqlite"],
            default="sqlite"
        )
        
        if db_type == 'sqlite':
            path = Prompt.ask("Database file path", default="portfolio.db")
            db_config = {
                'type': 'sqlite',
                'path': path
            }
        else:
            host = Prompt.ask("Host", default="localhost")
            port = Prompt.ask(
                "Port", 
                default="3306" if db_type == 'mysql' else "5432"
            )
            user = Prompt.ask(
                "Username", 
                default="root" if db_type == 'mysql' else "postgres"
            )
            password = Prompt.ask("Password", password=True, default="")
            database = Prompt.ask("Database name", default="silan_website")
            
            db_config = {
                'type': db_type,
                'host': host,
                'port': int(port),
                'user': user,
                'password': password,
                'database': database
            }
        
        # Preview configuration
        console.print("\n[blue]Configuration preview:[/blue]")
        for key, value in db_config.items():
            # Hide password
            display_value = "***" if key == "password" and value else value
            console.print(f"  {key}: {display_value}")
        
        if Confirm.ask("\nSave this configuration?"):
            success = self.config_manager.set_default_db_config(db_config)
            
            if success:
                console.print("[green]✅ Database configuration saved and cached[/green]")
            
            return success
        
        return False

    def _show_last_sync(self) -> bool:
        """Show last sync configuration information"""
        
        last_sync_info = self.config_manager.get_last_sync_info()
        
        if not last_sync_info:
            console.print("[yellow]⚠️  No previous sync configuration found[/yellow]")
            return True
        
        # Create last sync information table
        table = Table(title="Last Sync Configuration")
        table.add_column("Setting", style="cyan")
        table.add_column("Value", style="green")
        
        # Database configuration
        db_config = last_sync_info.get('database', {})
        if db_config:
            table.add_row("Database Type", str(db_config.get('type', 'N/A')))
            
            if db_config.get('type') == 'sqlite':
                table.add_row("Database Path", str(db_config.get('path', 'N/A')))
            else:
                table.add_row("Host", str(db_config.get('host', 'N/A')))
                table.add_row("Port", str(db_config.get('port', 'N/A')))
                table.add_row("Database", str(db_config.get('database', 'N/A')))
                table.add_row("User", str(db_config.get('user', 'N/A')))
        
        # Sync options
        sync_options = last_sync_info.get('sync_options', {})
        table.add_row("Dry Run", str(sync_options.get('dry_run', False)))
        table.add_row("Create Tables", str(sync_options.get('create_tables', False)))
        table.add_row("Start Backend", str(sync_options.get('start_backend', False)))
        
        # Meta information
        table.add_row("Last Sync Time", str(last_sync_info.get('last_sync_time', 'N/A')))
        table.add_row("Sync Count", str(last_sync_info.get('sync_count', 0)))
        
        console.print(table)
        
        return True

    def _clear_all_cache(self) -> bool:
        """Clear all cache files"""
        
        if not Confirm.ask("Are you sure you want to clear ALL cache files?"):
            return False
        
        success = True
        
        # Clear database cache
        if not self.config_manager.clear_db_cache():
            success = False
        
        # Clear last sync cache
        if not self.config_manager.clear_last_sync_cache():
            success = False
        
        if success:
            console.print("[green]✅ All cache files cleared successfully[/green]")
        else:
            console.print("[yellow]⚠️  Some cache files could not be cleared[/yellow]")
        
        return success


def main():
    """CLI entry point for database configuration management"""
    parser = argparse.ArgumentParser(description="Manage database configuration")
    parser.add_argument('action', choices=[
        'show', 'set', 'cache', 'load-cache', 'clear-cache', 'interactive', 'last-sync', 'clear-all'
    ], help="Action to perform")
    
    # Set action arguments
    parser.add_argument('--type', help="Database type (mysql, postgresql, sqlite)")
    parser.add_argument('--host', help="Database host")
    parser.add_argument('--port', help="Database port")
    parser.add_argument('--user', help="Database user")
    parser.add_argument('--password', help="Database password")
    parser.add_argument('--database', help="Database name")
    parser.add_argument('--path', help="SQLite database file path")
    
    args = parser.parse_args()
    
    manager = DatabaseConfigManager()
    
    # Prepare kwargs for set action
    kwargs = {}
    if args.action == 'set':
        kwargs = {
            'db_type': args.type,
            'host': args.host,
            'port': args.port,
            'user': args.user,
            'password': args.password,
            'database': args.database,
            'path': args.path
        }
        # Remove None values
        kwargs = {k: v for k, v in kwargs.items() if v is not None}
    
    success = manager.execute(args.action, **kwargs)
    
    if not success:
        exit(1)


if __name__ == '__main__':
    main()