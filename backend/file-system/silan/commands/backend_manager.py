"""Backend Manager for Go server management"""

import os
import subprocess
import signal
import time
import yaml
import requests
from pathlib import Path
from typing import Dict, Any, Optional
import psutil

from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.panel import Panel

console = Console()


class BackendManager:
    """Manage the Go backend server lifecycle"""
    
    def __init__(self):
        self.project_dir = Path.cwd()
        self.backend_dir = self.project_dir / ".silan" / "backend"
        self.pid_file = self.backend_dir / "backend.pid"
        self.log_file = self.backend_dir / "backend.log"
        self.config_file = self.backend_dir / "backend-config.yaml"
        
        # Create backend directory if it doesn't exist
        self.backend_dir.mkdir(parents=True, exist_ok=True)
        
        # Look for backend binary
        self.backend_binary = self._find_backend_binary()
    
    def start(self, config: Dict[str, Any]) -> bool:
        """Start the Go backend server"""
        if self.is_running():
            console.print("[yellow]⚠️ Backend server is already running[/yellow]")
            return True
        
        if not self.backend_binary:
            console.print("[red]❌ Backend binary not found[/red]")
            console.print("[blue]💡 Try: silan backend install[/blue]")
            return False
        
        try:
            # Prepare environment variables
            env = os.environ.copy()
            db_config = config['database']
            
            # Set database environment variables
            if db_config['type'] == 'sqlite':
                env['DB_DRIVER'] = 'sqlite3'
                env['DB_SOURCE'] = str(self.project_dir / db_config.get('path', 'portfolio.db'))
            elif db_config['type'] == 'mysql':
                env['DB_DRIVER'] = 'mysql'
                env['DB_HOST'] = db_config['host']
                env['DB_PORT'] = str(db_config['port'])
                env['DB_USER'] = db_config['user']
                env['DB_PASSWORD'] = db_config['password']
                env['DB_NAME'] = db_config['database']
            elif db_config['type'] == 'postgresql':
                env['DB_DRIVER'] = 'postgres'
                env['DB_HOST'] = db_config['host']
                env['DB_PORT'] = str(db_config['port'])
                env['DB_USER'] = db_config['user']
                env['DB_PASSWORD'] = db_config['password']
                env['DB_NAME'] = db_config['database']
            
            # Server configuration
            server_config = config.get('server', {})
            host = server_config.get('host', '0.0.0.0')
            port = server_config.get('port', 8888)
            
            # Build command arguments
            cmd = [
                str(self.backend_binary),
                '--host', host,
                '--port', str(port)
            ]
            
            # Add config file if specified
            if config.get('config_file'):
                cmd.extend(['-f', config['config_file']])
            
            console.print(f"[blue]🚀 Starting backend server on {host}:{port}[/blue]")
            console.print(f"[dim]Database: {db_config['type']}[/dim]")
            
            # Start the process
            if config.get('daemon', False):
                # Run as daemon
                with open(self.log_file, 'w') as log:
                    process = subprocess.Popen(
                        cmd,
                        env=env,
                        stdout=log,
                        stderr=subprocess.STDOUT,
                        cwd=str(self.project_dir),
                        start_new_session=True
                    )
                
                # Save PID
                with open(self.pid_file, 'w') as f:
                    f.write(str(process.pid))
                
                # Wait a moment to check if it started successfully
                time.sleep(2)
                if self.is_running():
                    console.print(f"[green]✅ Backend started as daemon (PID: {process.pid})[/green]")
                    return True
                else:
                    console.print("[red]❌ Backend failed to start[/red]")
                    return False
            else:
                # Run in foreground
                console.print("[blue]🔧 Running in foreground mode. Press Ctrl+C to stop.[/blue]")
                try:
                    process = subprocess.run(
                        cmd,
                        env=env,
                        cwd=str(self.project_dir),
                        check=True
                    )
                    return True
                except subprocess.CalledProcessError as e:
                    console.print(f"[red]❌ Backend exited with error code {e.returncode}[/red]")
                    return False
                except KeyboardInterrupt:
                    console.print("\n[yellow]🛑 Backend stopped by user[/yellow]")
                    return True
                    
        except Exception as e:
            console.print(f"[red]❌ Failed to start backend: {e}[/red]")
            return False
    
    def stop(self) -> bool:
        """Stop the Go backend server"""
        if not self.is_running():
            return False
        
        try:
            pid = self._get_pid()
            if pid:
                console.print(f"[yellow]🛑 Stopping backend server (PID: {pid})[/yellow]")
                
                # Try graceful shutdown first
                os.kill(pid, signal.SIGTERM)
                
                # Wait for graceful shutdown
                for _ in range(10):
                    if not self.is_running():
                        break
                    time.sleep(0.5)
                
                # Force kill if still running
                if self.is_running():
                    console.print("[yellow]⚠️ Forcing shutdown...[/yellow]")
                    os.kill(pid, signal.SIGKILL)
                    time.sleep(1)
                
                # Clean up PID file
                if self.pid_file.exists():
                    self.pid_file.unlink()
                
                return not self.is_running()
            
        except ProcessLookupError:
            # Process doesn't exist
            if self.pid_file.exists():
                self.pid_file.unlink()
            return True
        except Exception as e:
            console.print(f"[red]❌ Error stopping backend: {e}[/red]")
            return False
        
        return False
    
    def restart(self) -> bool:
        """Restart the Go backend server"""
        console.print("[blue]🔄 Restarting backend server...[/blue]")
        
        # Get current config
        config = self._get_current_config()
        
        # Stop first
        if self.is_running():
            self.stop()
            time.sleep(1)
        
        # Start again
        return self.start(config)
    
    def status(self) -> Dict[str, Any]:
        """Get the status of the backend server"""
        if not self.is_running():
            return {
                'running': False,
                'pid': None,
                'url': None,
                'database': None
            }
        
        pid = self._get_pid()
        config = self._get_current_config()
        
        server_config = config.get('server', {})
        host = server_config.get('host', '0.0.0.0')
        port = server_config.get('port', 8888)
        
        # Display host properly for external access
        display_host = host if host != '0.0.0.0' else 'localhost'
        url = f"http://{display_host}:{port}"
        
        db_config = config.get('database', {})
        db_type = db_config.get('type', 'unknown')
        
        return {
            'running': True,
            'pid': pid,
            'url': url,
            'database': db_type,
            'config': config
        }
    
    def show_logs(self, follow: bool = False, lines: int = 50):
        """Show backend server logs"""
        if not self.log_file.exists():
            console.print("[yellow]⚠️ No log file found[/yellow]")
            return
        
        try:
            if follow:
                console.print("[blue]📜 Following logs (Press Ctrl+C to stop)...[/blue]")
                subprocess.run(['tail', '-f', str(self.log_file)])
            else:
                console.print(f"[blue]📜 Last {lines} lines of logs:[/blue]")
                subprocess.run(['tail', '-n', str(lines), str(self.log_file)])
                
        except KeyboardInterrupt:
            console.print("\n[yellow]🛑 Stopped following logs[/yellow]")
        except FileNotFoundError:
            # Fallback for systems without tail command
            with open(self.log_file, 'r') as f:
                all_lines = f.readlines()
                recent_lines = all_lines[-lines:] if lines < len(all_lines) else all_lines
                for line in recent_lines:
                    console.print(line.rstrip())
    
    def is_running(self) -> bool:
        """Check if the backend server is running"""
        pid = self._get_pid()
        if not pid:
            return False
        
        try:
            # Check if process exists and is the right process
            process = psutil.Process(pid)
            return process.is_running() and 'backend' in process.name().lower()
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            return False
    
    def health_check(self) -> bool:
        """Perform a health check on the backend server"""
        status = self.status()
        if not status['running']:
            return False
        
        try:
            response = requests.get(f"{status['url']}/health", timeout=5)
            return response.status_code == 200
        except requests.RequestException:
            return False
    
    def _get_pid(self) -> Optional[int]:
        """Get the PID of the backend server"""
        if not self.pid_file.exists():
            return None
        
        try:
            with open(self.pid_file, 'r') as f:
                return int(f.read().strip())
        except (ValueError, IOError):
            return None
    
    def _get_current_config(self) -> Dict[str, Any]:
        """Get the current backend configuration"""
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r') as f:
                    return yaml.safe_load(f) or {}
            except yaml.YAMLError:
                pass
        
        # Return default config
        return {
            'database': {'type': 'sqlite', 'path': 'portfolio.db'},
            'server': {'host': '0.0.0.0', 'port': 8888}
        }
    
    def _save_config(self, config: Dict[str, Any]):
        """Save backend configuration"""
        try:
            with open(self.config_file, 'w') as f:
                yaml.dump(config, f, default_flow_style=False, indent=2)
        except Exception as e:
            console.print(f"[yellow]⚠️ Failed to save config: {e}[/yellow]")
    
    def _find_backend_binary(self) -> Optional[Path]:
        """Find the Go backend binary"""
        # Possible locations for the backend binary
        possible_paths = [
            # In the Python package (when installed via pip)
            Path(__file__).parent.parent / "bin" / "silan-backend",
            Path(__file__).parent.parent / "bin" / "silan-backend.exe",
            
            # In the project directory (development)
            self.project_dir / "backend" / "hybrid-database-system" / "go-backend" / "backend",
            self.project_dir / "backend" / "hybrid-database-system" / "go-backend" / "backend.exe",
            
            # In the backend directory
            self.backend_dir / "silan-backend",
            self.backend_dir / "silan-backend.exe",
            
            # System PATH
        ]
        
        # Check local paths first
        for path in possible_paths:
            if path.exists() and path.is_file():
                return path
        
        # Check system PATH
        import shutil
        system_binary = shutil.which("silan-backend")
        if system_binary:
            return Path(system_binary)
        
        return None
    
    def install_backend(self) -> bool:
        """Install or download the Go backend binary"""
        console.print("[blue]📦 Installing Go backend binary...[/blue]")
        
        # For now, we'll assume the binary should be built from source
        # In a real implementation, you might download pre-built binaries
        
        go_backend_dir = (
            Path(__file__).parent.parent.parent.parent / 
            "hybrid-database-system" / "go-backend"
        )
        
        if not go_backend_dir.exists():
            console.print("[red]❌ Go backend source not found[/red]")
            console.print(f"[dim]Expected location: {go_backend_dir}[/dim]")
            return False
        
        try:
            with Progress(
                SpinnerColumn(),
                TextColumn("[progress.description]{task.description}"),
                console=console,
            ) as progress:
                task = progress.add_task("Building Go backend...", total=None)
                
                # Build the Go binary
                result = subprocess.run(
                    ["go", "build", "-o", str(self.backend_dir / "silan-backend"), "."],
                    cwd=str(go_backend_dir),
                    capture_output=True,
                    text=True
                )
                
                progress.update(task, description="Build complete")
                
                if result.returncode == 0:
                    console.print("[green]✅ Backend binary installed successfully[/green]")
                    return True
                else:
                    console.print("[red]❌ Failed to build backend binary[/red]")
                    console.print(f"[dim]Error: {result.stderr}[/dim]")
                    return False
                    
        except FileNotFoundError:
            console.print("[red]❌ Go compiler not found. Please install Go first.[/red]")
            return False
        except Exception as e:
            console.print(f"[red]❌ Installation failed: {e}[/red]")
            return False 