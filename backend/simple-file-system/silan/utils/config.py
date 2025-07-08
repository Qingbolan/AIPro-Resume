"""Configuration management utilities"""

import yaml
from pathlib import Path
from typing import Dict, Any, Optional

from rich.console import Console

console = Console()

class ConfigManager:
    """Manage configuration files for the project"""
    
    def __init__(self, project_dir: Path):
        self.project_dir = project_dir
        self.config_file = project_dir / 'silan.yaml'
        self._config_cache: Optional[Dict[str, Any]] = None

    def load_config(self) -> Dict[str, Any]:
        """Load configuration from silan.yaml"""
        if self._config_cache is not None:
            return self._config_cache

        if not self.config_file.exists():
            console.print(f"[red]❌ Configuration file not found: {self.config_file}[/red]")
            console.print("[yellow]💡 Run 'silan init <project-name>' to create a new project[/yellow]")
            return self._get_default_config()

        try:
            with open(self.config_file, 'r', encoding='utf-8') as f:
                config = yaml.safe_load(f)
            
            # Validate and merge with defaults
            if config is None:
                config = {}
            config = self._validate_and_merge_config(config)
            self._config_cache = config
            return config
            
        except yaml.YAMLError as e:
            console.print(f"[red]❌ Invalid YAML in config file: {e}[/red]")
            return self._get_default_config()
        except Exception as e:
            console.print(f"[red]❌ Error loading config: {e}[/red]")
            return self._get_default_config()

    def save_config(self, config: Dict[str, Any]) -> bool:
        """Save configuration to silan.yaml"""
        try:
            with open(self.config_file, 'w', encoding='utf-8') as f:
                yaml.dump(config, f, default_flow_style=False, allow_unicode=True, indent=2)
            
            self._config_cache = config
            console.print(f"[green]✅ Configuration saved to {self.config_file}[/green]")
            return True
            
        except Exception as e:
            console.print(f"[red]❌ Error saving config: {e}[/red]")
            return False

    def update_config(self, updates: Dict[str, Any]) -> bool:
        """Update specific configuration values"""
        config = self.load_config()
        
        # Deep merge updates
        self._deep_merge(config, updates)
        
        return self.save_config(config)

    def get_config_value(self, key_path: str, default: Any = None) -> Any:
        """Get a configuration value using dot notation (e.g., 'user.username')"""
        config = self.load_config()
        
        keys = key_path.split('.')
        value = config
        
        try:
            for key in keys:
                value = value[key]
            return value
        except (KeyError, TypeError):
            return default

    def set_config_value(self, key_path: str, value: Any) -> bool:
        """Set a configuration value using dot notation"""
        config = self.load_config()
        
        keys = key_path.split('.')
        target = config
        
        # Navigate to the parent of the target key
        for key in keys[:-1]:
            if key not in target:
                target[key] = {}
            target = target[key]
        
        # Set the final value
        target[keys[-1]] = value
        
        return self.save_config(config)

    def _validate_and_merge_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Validate configuration and merge with defaults"""
        default_config = self._get_default_config()
        
        # Deep merge user config with defaults
        merged_config = default_config.copy()
        self._deep_merge(merged_config, config)
        
        return merged_config

    def _deep_merge(self, target: Dict[str, Any], source: Dict[str, Any]):
        """Deep merge source dictionary into target dictionary"""
        for key, value in source.items():
            if key in target and isinstance(target[key], dict) and isinstance(value, dict):
                self._deep_merge(target[key], value)
            else:
                target[key] = value

    def _get_default_config(self) -> Dict[str, Any]:
        """Get default configuration"""
        return {
            "project_name": "Personal Website",
            "description": "Personal website showcasing my work and ideas",
            "version": "1.0.0",
            "language": "en",
            
            "user": {
                "username": "admin",
                "email": "admin@example.com",
                "password": "secure_password",
                "first_name": "Your",
                "last_name": "Name",
                "bio": "Portfolio administrator and content manager"
            },
            
            "database": {
                "type": "sqlite",
                "sqlite": {
                    "path": "portfolio.db"
                }
            },
            
            "content": {
                "base_dir": "content",
                "resume_dir": "content/resume",
                "projects_dir": "content/projects",
                "blog_dir": "content/blog",
                "ideas_dir": "content/ideas",
                "plans_dir": "content/plans",
                "research_dir": "content/research",
                "education_dir": "content/education",
                "experience_dir": "content/experience"
            },
            
            "sync": {
                "create_tables": True,
                "backup_before_sync": True,
                "auto_migrate": True,
                "process_markdown": True,
                "generate_html": True,
                "extract_metadata": True,
                "validate_frontmatter": True,
                "watch_files": False,
                "ignore_patterns": ["*.tmp", "*.bak", ".DS_Store", "Thumbs.db"],
                "log_level": "info",
                "log_file": "sync.log"
            },
            
            "languages": {
                "default": "en",
                "supported": [
                    {"code": "en", "name": "English", "native_name": "English"},
                    {"code": "zh", "name": "Chinese", "native_name": "中文"}
                ]
            },
            
            "content_types": {
                "resume": {"enabled": True, "template": "resume_template.md"},
                "projects": {"enabled": True, "template": "project_template.md"},
                "blog": {"enabled": True, "template": "blog_template.md"},
                "ideas": {"enabled": True, "template": "idea_template.md"},
                "plans": {"enabled": True, "template": "plan_template.md"}
            },
            
            "api": {
                "enabled": True,
                "host": "localhost",
                "port": 8000,
                "cors_origins": ["http://localhost:3000"],
                "rate_limiting": True,
                "authentication": True
            },
            
            "development": {
                "debug": True,
                "hot_reload": True,
                "test_data": True,
                "mock_external_apis": False
            }
        }


class ThemeManager:
    """Manage themes for the project"""
    
    def __init__(self, project_dir: Path):
        self.project_dir = project_dir
        self.themes_dir = project_dir / 'themes'

    def list_themes(self) -> list[str]:
        """List available themes"""
        if not self.themes_dir.exists():
            return []
        
        themes = []
        for theme_dir in self.themes_dir.iterdir():
            if theme_dir.is_dir() and (theme_dir / 'templates').exists():
                themes.append(theme_dir.name)
        
        return sorted(themes)

    def get_current_theme(self) -> str:
        """Get the currently active theme"""
        config_manager = ConfigManager(self.project_dir)
        theme_name = config_manager.get_config_value('theme.name', 'default')
        return str(theme_name) if theme_name is not None else 'default'

    def set_theme(self, theme_name: str) -> bool:
        """Set the active theme"""
        available_themes = self.list_themes()
        
        if theme_name not in available_themes:
            console.print(f"[red]❌ Theme '{theme_name}' not found[/red]")
            console.print(f"[yellow]Available themes: {', '.join(available_themes)}[/yellow]")
            return False
        
        config_manager = ConfigManager(self.project_dir)
        return config_manager.set_config_value('theme.name', theme_name)

    def install_theme(self, theme_name: str, source: Optional[str] = None) -> bool:
        """Install a theme from a source"""
        # This would be expanded to support downloading themes
        # For now, just create a basic theme structure
        
        theme_dir = self.themes_dir / theme_name
        if theme_dir.exists():
            console.print(f"[yellow]⚠️  Theme '{theme_name}' already exists[/yellow]")
            return False
        
        # Create basic theme structure
        theme_dir.mkdir(parents=True, exist_ok=True)
        (theme_dir / 'templates').mkdir(exist_ok=True)
        (theme_dir / 'static' / 'css').mkdir(parents=True, exist_ok=True)
        (theme_dir / 'static' / 'js').mkdir(parents=True, exist_ok=True)
        
        # Create basic theme.yaml
        theme_config = {
            "name": theme_name,
            "version": "1.0.0",
            "description": f"Custom theme: {theme_name}",
            "author": "Unknown"
        }
        
        theme_config_file = theme_dir / 'theme.yaml'
        with open(theme_config_file, 'w', encoding='utf-8') as f:
            yaml.dump(theme_config, f, default_flow_style=False, allow_unicode=True, indent=2)
        
        console.print(f"[green]✅ Theme '{theme_name}' installed successfully[/green]")
        console.print(f"[blue]📁 Theme directory: {theme_dir}[/blue]")
        return True