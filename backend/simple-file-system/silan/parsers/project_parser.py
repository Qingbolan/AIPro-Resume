"""
Project parser for extracting structured project information including
technologies, features, architecture, and implementation details.
"""

import re
from typing import Dict, Any, List, Optional
from datetime import datetime, date
from .base_parser import BaseParser, ExtractedContent


class ProjectParser(BaseParser):
    """
    Specialized parser for project content.
    
    Extracts project metadata, technical details, features, architecture,
    implementation notes, and performance metrics with comprehensive analysis.
    """
    
    def _get_content_type(self) -> str:
        return 'project'
    
    def _parse_content(self, post, extracted: ExtractedContent):
        """Parse project content and extract structured data"""
        metadata = post.metadata
        content = post.content
        
        # Extract main project data
        project_data = self._extract_project_data(metadata, content)
        extracted.main_entity = project_data
        
        # Extract technologies with categorization
        technologies = self._extract_project_technologies(metadata, content)
        extracted.technologies = technologies
        
        # Extract project details from content sections
        project_details = self._extract_project_details(content)
        
        # Extract images and media
        images = self._extract_project_images(content, metadata)
        extracted.images = images
        
        # Extract project relationships
        relationships = self._extract_project_relationships(metadata, content)
        
        # Extract performance metrics
        metrics = self._extract_performance_metrics(content)
        
        # Store all extracted data
        extracted.metadata.update({
            'details': project_details,
            'relationships': relationships,
            'metrics': metrics,
            'sections': self._extract_sections(content)
        })
    
    def _extract_project_data(self, metadata: Dict, content: str) -> Dict[str, Any]:
        """Extract main project information"""
        # Generate slug if not provided
        title = metadata.get('title', '')
        slug = metadata.get('slug', self._generate_slug(title))
        
        # Parse dates
        start_date = self._parse_date(metadata.get('start_date'))
        end_date = self._parse_date(metadata.get('end_date'))
        
        # Determine project status
        status = self._determine_project_status(metadata, end_date)
        
        # Extract project type/difficulty
        project_type = self._extract_project_type(metadata, content)
        
        project_data = {
            'title': title,
            'slug': slug,
            'description': metadata.get('description', ''),
            'project_type': project_type,
            'status': status,
            'start_date': start_date,
            'end_date': end_date,
            'github_url': metadata.get('github_url', ''),
            'demo_url': metadata.get('demo_url', ''),
            'documentation_url': metadata.get('docs_url', metadata.get('documentation_url', '')),
            'thumbnail_url': metadata.get('image', metadata.get('thumbnail', '')),
            'is_featured': metadata.get('featured', False),
            'is_public': metadata.get('public', True),
            'view_count': 0,
            'star_count': metadata.get('stars', 0),
            'sort_order': metadata.get('id', 0)
        }
        
        return project_data
    
    def _extract_project_technologies(self, metadata: Dict, content: str) -> List[Dict[str, Any]]:
        """Extract and categorize technologies used in the project"""
        technologies = []
        
        # Get technologies from metadata
        tech_stack = metadata.get('tech_stack', [])
        
        # Also extract from content sections
        tech_from_content = self._extract_tech_from_content(content)
        
        # Combine and deduplicate
        all_techs = list(set(tech_stack + tech_from_content))
        
        for i, tech in enumerate(all_techs):
            if not tech or not tech.strip():
                continue
            
            tech_name = tech.strip()
            category = self._categorize_technology(tech_name)
            proficiency = self._estimate_tech_proficiency(tech_name, content)
            
            tech_data = {
                'technology_name': tech_name,
                'technology_type': category,
                'sort_order': i
            }
            
            technologies.append(tech_data)
        
        return technologies
    
    def _extract_tech_from_content(self, content: str) -> List[str]:
        """Extract technologies mentioned in content"""
        technologies = []
        
        # Look for technology sections
        tech_section = self._extract_section(content, 'Technical Architecture')
        if not tech_section:
            tech_section = self._extract_section(content, 'Implementation')
        if not tech_section:
            tech_section = content
        
        # Known technology patterns
        tech_patterns = [
            r'\b(React|Vue|Angular|Svelte|Next\.js|Nuxt\.js)\b',
            r'\b(Python|JavaScript|TypeScript|Java|Go|Rust|PHP|Ruby|Swift|Kotlin)\b',
            r'\b(TensorFlow|PyTorch|Keras|Scikit-learn|OpenCV|Pandas|NumPy)\b',
            r'\b(MySQL|PostgreSQL|MongoDB|Redis|SQLite|Elasticsearch)\b',
            r'\b(Docker|Kubernetes|AWS|Azure|GCP|Heroku|Vercel|Netlify)\b',
            r'\b(Express|Flask|Django|Spring|Rails|Laravel|FastAPI)\b',
            r'\b(Webpack|Vite|Babel|ESLint|Prettier|Jest|Cypress)\b'
        ]
        
        for pattern in tech_patterns:
            matches = re.findall(pattern, tech_section, re.IGNORECASE)
            technologies.extend([match for match in matches if match])
        
        return list(set(technologies))
    
    def _estimate_tech_proficiency(self, tech: str, content: str) -> str:
        """Estimate proficiency level based on context"""
        tech_lower = tech.lower()
        content_lower = content.lower()
        
        # Count mentions and context
        mentions = content_lower.count(tech_lower)
        
        # Look for proficiency indicators
        advanced_indicators = ['advanced', 'expert', 'deep', 'extensive', 'optimization', 'performance']
        intermediate_indicators = ['implementation', 'development', 'building', 'creating']
        beginner_indicators = ['learning', 'basic', 'simple', 'started']
        
        context_around_tech = []
        for match in re.finditer(re.escape(tech_lower), content_lower):
            start = max(0, match.start() - 50)
            end = min(len(content_lower), match.end() + 50)
            context_around_tech.append(content_lower[start:end])
        
        context_text = ' '.join(context_around_tech)
        
        if any(indicator in context_text for indicator in advanced_indicators):
            return 'advanced'
        elif any(indicator in context_text for indicator in beginner_indicators):
            return 'beginner'
        elif mentions > 2 or any(indicator in context_text for indicator in intermediate_indicators):
            return 'intermediate'
        else:
            return 'beginner'
    
    def _extract_tech_usage_context(self, tech: str, content: str) -> str:
        """Extract context about how the technology was used"""
        tech_lower = tech.lower()
        content_lower = content.lower()
        
        # Find sentences mentioning the technology
        sentences = re.split(r'[.!?]+', content)
        
        relevant_sentences = []
        for sentence in sentences:
            if tech_lower in sentence.lower():
                relevant_sentences.append(sentence.strip())
        
        if relevant_sentences:
            return '. '.join(relevant_sentences[:2])  # First 2 relevant sentences
        
        return ''
    
    def _extract_project_details(self, content: str) -> List[Dict[str, Any]]:
        """Extract detailed project information from content sections"""
        details = []
        
        # Extract all sections
        sections = self._extract_sections(content)
        
        # Map sections to detail types
        section_mappings = {
            'overview': 'detailed_description',
            'summary': 'detailed_description',
            'about': 'detailed_description',
            'goals': 'goals',
            'objectives': 'goals',
            'challenges': 'challenges',
            'problems': 'challenges',
            'difficulties': 'challenges',
            'solutions': 'solutions',
            'approach': 'solutions',
            'methodology': 'solutions',
            'implementation': 'solutions',
            'lessons learned': 'lessons_learned',
            'lessons': 'lessons_learned',
            'takeaways': 'lessons_learned',
            'learnings': 'lessons_learned',
            'future': 'future_enhancements',
            'roadmap': 'future_enhancements',
            'next steps': 'future_enhancements',
            'enhancements': 'future_enhancements'
        }
        
        # Create detail entries
        detail_data = {}
        
        for section_title, section_content in sections.items():
            section_lower = section_title.lower()
            
            # Find matching detail type
            detail_type = None
            for key, mapped_type in section_mappings.items():
                if key in section_lower:
                    detail_type = mapped_type
                    break
            
            if detail_type:
                if detail_type not in detail_data:
                    detail_data[detail_type] = []
                detail_data[detail_type].append(section_content)
        
        # Convert to detail records
        if detail_data:
            detail_record = {
                'detailed_description': '\n\n'.join(detail_data.get('detailed_description', [])),
                'goals': '\n\n'.join(detail_data.get('goals', [])),
                'challenges': '\n\n'.join(detail_data.get('challenges', [])),
                'solutions': '\n\n'.join(detail_data.get('solutions', [])),
                'lessons_learned': '\n\n'.join(detail_data.get('lessons_learned', [])),
                'future_enhancements': '\n\n'.join(detail_data.get('future_enhancements', [])),
                'license': self._extract_license(content),
                'version': self._extract_version(content)
            }
            details.append(detail_record)
        
        return details
    
    def _extract_project_images(self, content: str, metadata: Dict) -> List[Dict[str, Any]]:
        """Extract project images with detailed metadata"""
        images = []
        
        # Get main thumbnail from metadata
        thumbnail = metadata.get('image', metadata.get('thumbnail', ''))
        if thumbnail:
            images.append({
                'image_url': thumbnail,
                'alt_text': f"{metadata.get('title', '')} thumbnail",
                'caption': metadata.get('title', ''),
                'image_type': 'thumbnail',
                'sort_order': 0
            })
        
        # Extract images from content
        content_images = self._extract_images(content)
        
        # Add content images with enhanced metadata
        for i, img in enumerate(content_images):
            img['sort_order'] = len(images)
            img['image_type'] = self._classify_project_image(img['image_url'], img['alt_text'])
            images.append(img)
        
        return images
    
    def _classify_project_image(self, url: str, alt_text: str) -> str:
        """Classify project image type"""
        url_lower = url.lower()
        alt_lower = alt_text.lower()
        
        if any(keyword in url_lower or keyword in alt_lower for keyword in ['screenshot', 'screen']):
            return 'screenshot'
        elif any(keyword in url_lower or keyword in alt_lower for keyword in ['diagram', 'architecture', 'flow']):
            return 'diagram'
        elif any(keyword in url_lower or keyword in alt_lower for keyword in ['demo', 'preview']):
            return 'demo'
        elif any(keyword in url_lower or keyword in alt_lower for keyword in ['logo', 'icon']):
            return 'logo'
        elif any(keyword in url_lower or keyword in alt_lower for keyword in ['banner', 'header']):
            return 'banner'
        else:
            return 'screenshot'
    
    def _extract_project_relationships(self, metadata: Dict, content: str) -> List[Dict[str, Any]]:
        """Extract relationships with other projects"""
        relationships = []
        
        # Look for dependencies, related projects, or forks
        dependency_patterns = [
            r'based on\s+([^,.]+)',
            r'forked from\s+([^,.]+)',
            r'inspired by\s+([^,.]+)',
            r'depends on\s+([^,.]+)',
            r'related to\s+([^,.]+)',
        ]
        
        for pattern in dependency_patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                related_project = match.group(1).strip()
                relationship_type = match.group(0).split()[0].lower()  # 'based', 'forked', etc.
                
                relationships.append({
                    'target_project_title': related_project,
                    'relationship_type': relationship_type,
                    'description': match.group(0)
                })
        
        return relationships
    
    def _extract_performance_metrics(self, content: str) -> Dict[str, Any]:
        """Extract performance metrics from content"""
        metrics = {}
        
        # Look for performance section
        perf_section = self._extract_section(content, 'Performance')
        if not perf_section:
            perf_section = self._extract_section(content, 'Performance Metrics')
        if not perf_section:
            perf_section = self._extract_section(content, 'Metrics')
        
        if not perf_section:
            perf_section = content
        
        # Extract common metrics
        metric_patterns = {
            'response_time': [
                r'response time[:\s]*(\d+(?:\.\d+)?)\s*(ms|milliseconds|seconds|s)',
                r'latency[:\s]*(\d+(?:\.\d+)?)\s*(ms|milliseconds|seconds|s)'
            ],
            'accuracy': [
                r'accuracy[:\s]*(\d+(?:\.\d+)?)\s*%',
                r'precision[:\s]*(\d+(?:\.\d+)?)\s*%'
            ],
            'uptime': [
                r'uptime[:\s]*(\d+(?:\.\d+)?)\s*%',
                r'availability[:\s]*(\d+(?:\.\d+)?)\s*%'
            ],
            'users': [
                r'(\d+)\s*(?:concurrent\s*)?users',
                r'supports\s*(?:up\s*to\s*)?(\d+)\s*users'
            ],
            'satisfaction': [
                r'satisfaction[:\s]*(\d+(?:\.\d+)?)\s*%',
                r'user\s*satisfaction[:\s]*(\d+(?:\.\d+)?)\s*%'
            ]
        }
        
        for metric_name, patterns in metric_patterns.items():
            for pattern in patterns:
                match = re.search(pattern, perf_section, re.IGNORECASE)
                if match:
                    value = float(match.group(1))
                    unit = match.group(2) if len(match.groups()) > 1 else ''
                    metrics[metric_name] = {'value': value, 'unit': unit}
                    break
        
        return metrics
    
    def _determine_project_status(self, metadata: Dict, end_date: Optional[date]) -> str:
        """Determine project status"""
        status = metadata.get('status', '').lower()
        
        if status in ['completed', 'finished', 'done']:
            return 'COMPLETED'
        elif status in ['active', 'ongoing', 'in-progress', 'development']:
            return 'ACTIVE'
        elif status in ['paused', 'on-hold', 'suspended']:
            return 'PAUSED'
        elif status in ['cancelled', 'abandoned', 'discontinued']:
            return 'CANCELLED'
        elif end_date and end_date < date.today():
            return 'COMPLETED'
        else:
            return 'ACTIVE'
    
    def _extract_project_type(self, metadata: Dict, content: str) -> str:
        """Extract or determine project type"""
        # Check metadata first
        project_type = metadata.get('type', metadata.get('category', ''))
        if project_type:
            return project_type
        
        # Check difficulty mapping
        difficulty = metadata.get('difficulty', '').lower()
        difficulty_mapping = {
            'beginner': 'Learning Project',
            'intermediate': 'Development Project',
            'advanced': 'Professional Project',
            'expert': 'Research Project'
        }
        
        if difficulty in difficulty_mapping:
            return difficulty_mapping[difficulty]
        
        # Analyze content for project type indicators
        content_lower = content.lower()
        
        type_indicators = {
            'Web Application': ['web app', 'website', 'frontend', 'backend', 'full stack'],
            'Mobile App': ['mobile app', 'android', 'ios', 'react native', 'flutter'],
            'Machine Learning': ['machine learning', 'ml', 'ai', 'neural network', 'deep learning'],
            'Data Science': ['data science', 'data analysis', 'visualization', 'analytics'],
            'Game Development': ['game', 'unity', 'unreal', 'pygame', 'game development'],
            'DevOps': ['devops', 'deployment', 'ci/cd', 'infrastructure', 'automation'],
            'API': ['api', 'rest', 'graphql', 'microservice', 'service'],
            'Desktop Application': ['desktop', 'electron', 'tkinter', 'javafx', 'wpf'],
            'Research Project': ['research', 'study', 'analysis', 'investigation'],
            'Open Source': ['open source', 'library', 'package', 'framework']
        }
        
        for project_type, indicators in type_indicators.items():
            if any(indicator in content_lower for indicator in indicators):
                return project_type
        
        return 'Web Application'  # Default
    
    def _calculate_duration_months(self, start_date: Optional[date], end_date: Optional[date]) -> Optional[int]:
        """Calculate project duration in months"""
        if not start_date:
            return None
        
        end = end_date or date.today()
        
        # Calculate months difference
        months = (end.year - start_date.year) * 12 + (end.month - start_date.month)
        
        return max(1, months)  # At least 1 month
    
    def _extract_license(self, content: str) -> str:
        """Extract license information"""
        license_patterns = [
            r'License[:\s]*([A-Z][A-Z0-9\s-]+)',
            r'Licensed under\s+([A-Z][A-Z0-9\s-]+)',
            r'MIT License', r'GPL', r'Apache', r'BSD'
        ]
        
        for pattern in license_patterns:
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                if hasattr(match, 'group') and len(match.groups()) > 0:
                    return match.group(1).strip()
                else:
                    return match.group(0).strip()
        
        return ''
    
    def _extract_version(self, content: str) -> str:
        """Extract version information"""
        version_patterns = [
            r'Version[:\s]*(\d+\.\d+(?:\.\d+)?)',
            r'v(\d+\.\d+(?:\.\d+)?)',
            r'Release[:\s]*(\d+\.\d+(?:\.\d+)?)'
        ]
        
        for pattern in version_patterns:
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                return match.group(1)
        
        return ''
    
    def _validate_content(self, extracted: ExtractedContent):
        """Validate extracted project content"""
        main_entity = extracted.main_entity
        
        # Check required fields
        if not main_entity.get('title'):
            extracted.validation_errors.append('Missing project title')
        
        if not main_entity.get('description'):
            extracted.validation_warnings.append('Missing project description')
        
        if not extracted.technologies:
            extracted.validation_warnings.append('No technologies specified')
        
        # Validate URLs
        urls_to_check = ['github_url', 'demo_url', 'documentation_url']
        for url_field in urls_to_check:
            url = main_entity.get(url_field, '')
            if url and not self._is_valid_url(url):
                extracted.validation_errors.append(f'Invalid {url_field}: {url}')
        
        # Validate dates
        start_date = main_entity.get('start_date')
        end_date = main_entity.get('end_date')
        
        if start_date and end_date and start_date > end_date:
            extracted.validation_errors.append('Start date is after end date')
        
        if start_date and start_date > date.today():
            extracted.validation_warnings.append('Start date is in the future')
    
    def _is_valid_url(self, url: str) -> bool:
        """Basic URL validation"""
        url_pattern = r'^https?://[^\s/$.?#].[^\s]*$'
        return bool(re.match(url_pattern, url))