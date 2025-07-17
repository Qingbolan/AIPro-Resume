# Silan Logs Directory

This directory contains log files for workspace operations, debugging, and monitoring.

## Log Files

### Main Logs
- **workspace.log** - Main workspace operations log
- **commands.log** - CLI command execution log
- **errors.log** - Error and exception tracking
- **performance.log** - Performance metrics and timing

### Component Logs
- **projects.log** - Project-related operations
- **ideas.log** - Idea management operations
- **updates.log** - Update creation and management
- **templates.log** - Template engine operations
- **analytics.log** - Analytics and insights generation

## Log Levels

- **DEBUG** - Detailed diagnostic information
- **INFO** - General information about operations
- **WARNING** - Warning messages for potential issues
- **ERROR** - Error messages for failed operations
- **CRITICAL** - Critical errors that may stop operations

## Log Rotation

Logs are automatically rotated to prevent disk space issues:
- **Max File Size**: 10MB per log file
- **Backup Count**: 5 files (50MB total per log type)
- **Compression**: Old log files are gzipped
- **Retention**: 30 days for all logs

## Log Format

```
[TIMESTAMP] [LEVEL] [COMPONENT] [OPERATION] MESSAGE
```

Example:
```
[2024-12-19 10:30:15] [INFO] [PROJECT] [CREATE] Created new project: data-visualization-tool
[2024-12-19 10:30:16] [DEBUG] [TEMPLATE] [RENDER] Rendered project template with 15 variables
[2024-12-19 10:30:17] [INFO] [WORKSPACE] [HEALTH] Workspace health score: 8.5/10
```

## Viewing Logs

### CLI Commands
```bash
# View recent workspace activity
silan logs tail

# View specific log type
silan logs show --type errors

# Search logs
silan logs search "project create"

# Export logs
silan logs export --format json --days 7
```

### Log Files Location
All log files are stored in `.silan/logs/` directory and can be viewed with any text editor or log viewer.

## Privacy and Security

- **No Sensitive Data**: Logs do not contain passwords, tokens, or personal information
- **Local Only**: Log files remain on your local machine
- **Optional Sharing**: You can optionally share specific log excerpts for debugging support

## Configuration

Logging behavior can be configured in `workspace.yaml`:

```yaml
logging:
  level: "INFO"
  file_logging: true
  console_logging: true
  log_rotation: true
  max_file_size: "10MB"
  backup_count: 5
  retention_days: 30
``` 