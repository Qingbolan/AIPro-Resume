"""Content management business logic"""

import hashlib
from pathlib import Path
from typing import Dict, Any, List, Optional

from ..core.exceptions import ParsingError
from ..parsers import ParserFactory
from ..utils import ModernLogger, FileOperations, ContentValidator


class ContentLogger(ModernLogger):
    """Specialized logger for content operations"""
    
    def __init__(self):
        super().__init__(name="content", level="info")
    
    def content_scan_start(self, directory: str) -> None:
        """Log content scanning start"""
        self.info(f"📁 Scanning content directory: {directory}")
    
    def content_found(self, count: int, content_type: str) -> None:
        """Log content found"""
        self.debug(f"Found {count} {content_type} files")
    
    def content_parsed(self, file_path: str) -> None:
        """Log successful content parsing"""
        self.debug(f"✅ Parsed: {file_path}")
    
    def content_parse_error(self, file_path: str, error: str) -> None:
        """Log content parsing error"""
        self.error(f"❌ Parse failed: {file_path} - {error}")


class ContentLogic(ContentLogger):
    """Business logic for content file operations and management"""
    
    def __init__(self):
        super().__init__()
        self.file_ops = FileOperations(self)
        self.parser_factory = ParserFactory()
        
        # Configuration
        self.project_dir = Path.cwd()
        self.content_dir = self.project_dir / "content"
        
        # Content type mappings
        self.content_types = {
            'blog': self.content_dir / 'blog',
            'projects': self.content_dir / 'projects',
            'ideas': self.content_dir / 'ideas',
            'updates': self.content_dir / 'updates'
        }
        
        # Cache
        self._content_cache: Optional[List[Dict[str, Any]]] = None
    
    def analyze_content_for_sync(self) -> Dict[str, Any]:
        """Analyze content directory for synchronization"""
        try:
            if not self.content_dir.exists():
                return {
                    'status': 'No content directory found',
                    'total_files': 0,
                    'content_types': {},
                    'recommendations': ['Run "silan init <project>" to create content structure']
                }
            
            analysis = {
                'status': 'Content directory found',
                'total_files': 0,
                'content_types': {},
                'last_modified': None,
                'recommendations': []
            }
            
            latest_modification = None
            
            for content_type, type_dir in self.content_types.items():
                if type_dir.exists():
                    md_files = self.file_ops.find_files(type_dir, '*.md', recursive=True)
                    count = len(md_files)
                    analysis['content_types'][content_type] = count
                    analysis['total_files'] += count
                    
                    # Track latest modification
                    for file_path in md_files:
                        file_info = self.file_ops.get_file_info(file_path)
                        if latest_modification is None or file_info['modified'] > latest_modification:
                            latest_modification = file_info['modified']
                else:
                    analysis['content_types'][content_type] = 0
            
            if latest_modification:
                analysis['last_modified'] = latest_modification.isoformat()
            
            # Add recommendations
            if analysis['total_files'] == 0:
                analysis['recommendations'].append('No content files found - add .md files to content/ directories')
            
            return analysis
            
        except Exception as e:
            self.error(f"Failed to analyze content: {e}")
            return {
                'status': f'Analysis failed: {e}',
                'total_files': 0,
                'content_types': {},
                'recommendations': ['Check content directory permissions']
            }
    
    def get_all_content_with_hashes(self) -> List[Dict[str, Any]]:
        """Get all content with file hashes for change detection"""
        if self._content_cache is not None:
            return self._content_cache
        
        try:
            self.content_scan_start(str(self.content_dir))
            content_items = []
            
            for content_type, type_dir in self.content_types.items():
                if not type_dir.exists():
                    continue
                
                md_files = self.file_ops.find_files(type_dir, '*.md', recursive=True)
                self.content_found(len(md_files), content_type)
                
                for file_path in md_files:
                    try:
                        # Read and hash content
                        content = self.file_ops.read_file(file_path)
                        content_hash = hashlib.md5(content.encode('utf-8')).hexdigest()
                        
                        # Generate content ID
                        content_id = self._generate_content_id(content_type, file_path)
                        
                        content_item = {
                            'id': content_id,
                            'type': content_type,
                            'name': file_path.name,
                            'path': str(file_path),
                            'relative_path': str(file_path.relative_to(self.content_dir)),
                            'hash': content_hash,
                            'file_info': self.file_ops.get_file_info(file_path)
                        }
                        
                        content_items.append(content_item)
                        
                    except Exception as e:
                        self.content_parse_error(str(file_path), str(e))
                        continue
            
            self._content_cache = content_items
            self.info(f"📚 Found {len(content_items)} content files")
            return content_items
            
        except Exception as e:
            self.error(f"Failed to get content with hashes: {e}")
            return []
    
    def get_all_content_for_sync(self) -> List[Dict[str, Any]]:
        """Get all parsed content ready for database synchronization"""
        try:
            content_items = []
            
            for content_type, type_dir in self.content_types.items():
                if not type_dir.exists():
                    continue
                
                md_files = self.file_ops.find_files(type_dir, '*.md', recursive=True)
                
                for file_path in md_files:
                    try:
                        content_item = self._parse_content_file(file_path, content_type)
                        if content_item:
                            content_items.append(content_item)
                            self.content_parsed(str(file_path))
                        
                    except Exception as e:
                        self.content_parse_error(str(file_path), str(e))
                        continue
            
            self.info(f"📝 Parsed {len(content_items)} content files for sync")
            return content_items
            
        except Exception as e:
            self.error(f"Failed to get content for sync: {e}")
            return []
    
    def _parse_content_file(self, file_path: Path, content_type: str) -> Optional[Dict[str, Any]]:
        """Parse a single content file for synchronization"""
        try:
            # Read file content
            content = self.file_ops.read_file(file_path)
            content_hash = hashlib.md5(content.encode('utf-8')).hexdigest()
            
            # Get parser for content type
            parser_class = self.parser_factory.get_parser(content_type)
            if not parser_class:
                raise ParsingError(f"No parser available for content type: {content_type}")
            
            # Parse content
            parser = parser_class(self.content_dir)
            extracted_content = parser.parse_file(file_path)
            parsed_data = extracted_content.main_entity if extracted_content else {}
            
            # Validate frontmatter if validator exists
            if hasattr(ContentValidator, f'validate_{content_type}_frontmatter'):
                validator_method = getattr(ContentValidator, f'validate_{content_type}_frontmatter')
                try:
                    validated_frontmatter = validator_method(parsed_data.get('frontmatter', {}))
                    parsed_data['frontmatter'] = validated_frontmatter
                except Exception as e:
                    self.warning(f"Frontmatter validation failed for {file_path}: {e}")
            
            # Create content item for sync
            content_id = self._generate_content_id(content_type, file_path)
            
            content_item = {
                'id': content_id,
                'type': content_type,
                'name': file_path.stem,
                'path': str(file_path),
                'relative_path': str(file_path.relative_to(self.content_dir)),
                'hash': content_hash,
                'data': parsed_data,
                'file_info': self.file_ops.get_file_info(file_path)
            }
            
            return content_item
            
        except Exception as e:
            self.error(f"Failed to parse content file {file_path}: {e}")
            return None
    
    def _generate_content_id(self, content_type: str, file_path: Path) -> str:
        """Generate unique content ID based on type and file path"""
        try:
            relative_path = file_path.relative_to(self.content_dir)
            # Remove .md extension and use path as ID
            content_id = str(relative_path.with_suffix(''))
            # Replace path separators for database compatibility
            content_id = content_id.replace('/', '_').replace('\\', '_')
            return f"{content_type}_{content_id}"
        except Exception:
            # Fallback to just filename
            return f"{content_type}_{file_path.stem}"
    
    def validate_content_structure(self) -> Dict[str, Any]:
        """Validate content directory structure"""
        validation_result = {
            'valid': True,
            'issues': [],
            'warnings': [],
            'recommendations': []
        }
        
        try:
            # Check content directory exists
            if not self.content_dir.exists():
                validation_result['valid'] = False
                validation_result['issues'].append(f"Content directory not found: {self.content_dir}")
                validation_result['recommendations'].append('Run "silan init <project>" to create structure')
                return validation_result
            
            # Check content type directories
            for content_type, type_dir in self.content_types.items():
                if not type_dir.exists():
                    validation_result['warnings'].append(f"Content type directory missing: {content_type}")
                    validation_result['recommendations'].append(f'Create {content_type} directory: mkdir -p {type_dir}')
            
            # Validate content files
            all_content = self.get_all_content_for_sync()
            for item in all_content:
                file_path = Path(item['path'])
                
                # Check file extension
                if not file_path.suffix == '.md':
                    validation_result['issues'].append(f"Non-markdown file: {file_path}")
                    validation_result['valid'] = False
                
                # Check frontmatter
                frontmatter = item['data'].get('frontmatter', {})
                if not frontmatter:
                    validation_result['warnings'].append(f"Missing frontmatter: {file_path}")
                
                # Content-type specific validation
                content_type = item['type']
                if content_type == 'blog':
                    required_fields = ['title', 'date', 'slug']
                    for field in required_fields:
                        if field not in frontmatter:
                            validation_result['issues'].append(f"Blog missing {field}: {file_path}")
                            validation_result['valid'] = False
                
                elif content_type == 'project':
                    required_fields = ['title', 'description', 'status']
                    for field in required_fields:
                        if field not in frontmatter:
                            validation_result['issues'].append(f"Project missing {field}: {file_path}")
                            validation_result['valid'] = False
            
            # Add recommendations based on findings
            if validation_result['valid'] and not validation_result['warnings']:
                validation_result['recommendations'].append('Content structure is valid and complete')
            
            return validation_result
            
        except Exception as e:
            validation_result['valid'] = False
            validation_result['issues'].append(f"Validation error: {e}")
            return validation_result
    
    def get_content_summary(self) -> Dict[str, Any]:
        """Get summary of content for display"""
        try:
            summary = {
                'total_files': 0,
                'content_types': {},
                'recent_files': []
            }
            
            all_content = self.get_all_content_with_hashes()
            summary['total_files'] = len(all_content)
            
            # Count by type
            for item in all_content:
                content_type = item['type']
                summary['content_types'][content_type] = summary['content_types'].get(content_type, 0) + 1
            
            # Get recent files (last 5 modified)
            sorted_content = sorted(all_content, 
                                  key=lambda x: x['file_info']['modified'], 
                                  reverse=True)
            summary['recent_files'] = [
                {
                    'name': item['name'],
                    'type': item['type'],
                    'modified': item['file_info']['modified'].isoformat()
                }
                for item in sorted_content[:5]
            ]
            
            return summary
            
        except Exception as e:
            self.error(f"Failed to get content summary: {e}")
            return {'total_files': 0, 'content_types': {}, 'recent_files': []}
    
    def refresh_cache(self) -> None:
        """Clear and refresh content cache"""
        self._content_cache = None
        self.get_all_content_with_hashes()
    
    def cleanup(self) -> None:
        """Clean up resources"""
        self._content_cache = None