# Silan Cache Directory

This directory contains cached data to improve workspace performance and reduce redundant operations.

## Cache Types

### Analysis Cache
- **File**: `analysis_cache.json`
- **Purpose**: Caches workspace analysis results to avoid recomputation
- **TTL**: 1 hour
- **Max Size**: 50MB

### Search Index
- **File**: `search_index.json`
- **Purpose**: Pre-computed search index for fast content discovery
- **TTL**: 24 hours
- **Max Size**: 100MB

### Metadata Cache
- **File**: `metadata_cache.json`
- **Purpose**: Cached metadata for all content items
- **TTL**: 6 hours
- **Max Size**: 25MB

### Template Cache
- **File**: `template_cache.json`
- **Purpose**: Compiled template cache for faster rendering
- **TTL**: Never (invalidated on template changes)
- **Max Size**: 10MB

## Cache Management

### Automatic Cleanup
The cache is automatically cleaned up when:
- Cache files exceed their TTL
- Total cache size exceeds 200MB
- Workspace is idle for more than 7 days

### Manual Cleanup
```bash
# Clear all cache
silan cache clear

# Clear specific cache type
silan cache clear --type analysis

# Show cache status
silan cache status
```

## Cache Files

- `analysis_cache.json` - Workspace analysis results
- `search_index.json` - Full-text search index
- `metadata_cache.json` - Content metadata cache
- `template_cache.json` - Compiled templates
- `performance_cache.json` - Performance metrics cache

## Configuration

Cache behavior can be configured in `workspace.yaml`:

```yaml
cache:
  enabled: true
  max_size: "200MB"
  default_ttl: 3600  # 1 hour
  auto_cleanup: true
``` 