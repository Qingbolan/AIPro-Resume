"""
Idea parser for extracting structured idea information including
feasibility analysis, implementation details, and collaboration requirements.
"""

import re
from typing import Dict, Any, List, Optional
from datetime import datetime, date
from .base_parser import BaseParser, ExtractedContent


class IdeaParser(BaseParser):
    """
    Specialized parser for idea content.
    
    Extracts idea metadata, feasibility analysis, implementation requirements,
    collaboration needs, and business potential with detailed scoring.
    """
    
    def _get_content_type(self) -> str:
        return 'idea'
    
    def _parse_content(self, post, extracted: ExtractedContent):
        """Parse idea content and extract structured data"""
        metadata = post.metadata
        content = post.content
        
        # Extract main idea data
        idea_data = self._extract_idea_data(metadata, content)
        extracted.main_entity = idea_data
        
        # Extract technologies and requirements
        technologies = self._extract_idea_technologies(metadata, content)
        extracted.technologies = technologies
        
        # Extract implementation details
        implementation = self._extract_implementation_details(content)
        
        # Extract feasibility analysis
        feasibility = self._analyze_feasibility(content)
        
        # Extract collaboration requirements
        collaboration = self._extract_collaboration_requirements(content)
        
        # Extract business analysis
        business_analysis = self._analyze_business_potential(content)
        
        # Extract market analysis
        market_analysis = self._analyze_market_potential(content)
        
        # Store all extracted data
        extracted.metadata.update({
            'implementation': implementation,
            'feasibility': feasibility,
            'collaboration': collaboration,
            'business_analysis': business_analysis,
            'market_analysis': market_analysis,
            'sections': self._extract_sections(content)
        })
    
    def _extract_idea_data(self, metadata: Dict, content: str) -> Dict[str, Any]:
        """Extract main idea information"""
        title = metadata.get('title', '')
        slug = metadata.get('slug', self._generate_slug(title))
        
        # Extract problem statement
        problem_statement = self._extract_problem_statement(content)
        
        # Extract solution overview
        solution_overview = self._extract_solution_overview(content)
        
        # Calculate scores
        feasibility_score = self._calculate_feasibility_score(metadata, content)
        impact_score = self._calculate_impact_score(metadata, content)
        innovation_score = self._calculate_innovation_score(content)
        
        # Extract financial estimates
        financial_estimates = self._extract_financial_estimates(metadata, content)
        
        # Determine development stage
        development_stage = self._determine_development_stage(content)
        
        # Map collaboration and funding status properly
        collaboration_needed = metadata.get('collaborationOpen', False)
        if isinstance(collaboration_needed, str):
            collaboration_needed = collaboration_needed.lower() in ['true', 'yes', '1']
        
        funding_required = metadata.get('fundingStatus', 'none') != 'none'
        if metadata.get('fundingStatus') == 'seeking':
            funding_required = True
        elif metadata.get('fundingStatus') == 'funded':
            funding_required = False
        
        # Parse duration from string like "6-8 months"
        duration_months = self._extract_duration_months(metadata.get('estimatedDuration', ''))
        
        idea_data = {
            'title': title,
            'slug': slug,
            'abstract': metadata.get('abstract', metadata.get('description', '')),
            'motivation': metadata.get('motivation', ''),
            'methodology': solution_overview or self._extract_methodology(content),
            'expected_outcome': self._extract_expected_outcome(content),
            'status': self._map_idea_status(metadata.get('status', 'draft')),
            'estimated_duration_months': duration_months,
            'collaboration_needed': collaboration_needed,
            'funding_required': funding_required,
            'estimated_budget': financial_estimates.get('budget'),
            'required_resources': self._extract_required_resources_string(content),
            'is_public': metadata.get('is_public', False),
            'view_count': 0,
            'like_count': 0,
            'priority': self._map_priority_level(feasibility_score, impact_score)
        }
        
        return idea_data
    
    def _extract_duration_months(self, duration_str: str) -> Optional[int]:
        """Extract duration in months from string like '6-8 months'"""
        if not duration_str:
            return None
        
        import re
        # Extract numbers from string like "6-8 months" or "12 months"
        numbers = re.findall(r'\d+', duration_str)
        if numbers:
            # If range like "6-8", take the average
            if len(numbers) >= 2:
                return (int(numbers[0]) + int(numbers[1])) // 2
            else:
                return int(numbers[0])
        return None
    
    def _extract_methodology(self, content: str) -> str:
        """Extract methodology from content"""
        # Look for Technical Approach or Implementation sections
        sections = ['technical approach', 'implementation', 'methodology', 'approach']
        for section in sections:
            section_content = self._extract_section(content, section)
            if section_content:
                return section_content[:500]  # Limit length
        return ''
    
    def _extract_expected_outcome(self, content: str) -> str:
        """Extract expected outcomes from content"""
        # Look for Expected Outcomes, Results, or Deliverables sections
        sections = ['expected outcomes', 'expected outcome', 'deliverables', 'results', 'impact metrics']
        for section in sections:
            section_content = self._extract_section(content, section)
            if section_content:
                return section_content[:500]  # Limit length
        return ''
    
    def _extract_required_resources_string(self, content: str) -> str:
        """Extract required resources from content as a string"""
        # Look for resources, requirements, or funding sections
        sections = ['funding requirements', 'resources', 'requirements', 'personnel', 'infrastructure']
        for section in sections:
            section_content = self._extract_section(content, section)
            if section_content:
                return section_content[:500]  # Limit length
        return ''
    
    def _extract_required_resources(self, content: str) -> str:
        """Extract required resources from content"""
        # Look for resources, requirements, or funding sections
        sections = ['funding requirements', 'resources', 'requirements', 'personnel', 'infrastructure']
        for section in sections:
            section_content = self._extract_section(content, section)
            if section_content:
                return section_content[:500]  # Limit length
        return ''
    
    def _map_priority_level(self, feasibility_score: float, impact_score: float) -> str:
        """Map scores to priority levels matching enum"""
        avg_score = (feasibility_score + impact_score) / 2
        if avg_score >= 8.0:
            return 'high'
        elif avg_score >= 6.0:
            return 'medium'
        else:
            return 'low'
    
    def _map_idea_status(self, status: str) -> str:
        """Map status to IdeaStatus enum values"""
        status_lower = status.lower()
        
        status_mapping = {
            'draft': 'draft',
            'hypothesis': 'hypothesis', 
            'experimenting': 'experimenting',
            'validating': 'validating',
            'published': 'published',
            'concluded': 'concluded'
        }
        
        return status_mapping.get(status_lower, 'draft')
    
    def _extract_idea_technologies(self, metadata: Dict, content: str) -> List[Dict[str, Any]]:
        """Extract technologies required for the idea"""
        technologies = []
        
        # Get from metadata
        tech_list = metadata.get('technologies', metadata.get('tech_stack', []))
        
        # Extract from content
        tech_from_content = self._extract_tech_from_content(content)
        
        # Combine and process
        all_techs = list(set(tech_list + tech_from_content))
        
        for i, tech in enumerate(all_techs):
            if not tech or not tech.strip():
                continue
            
            tech_name = tech.strip()
            category = self._categorize_technology(tech_name)
            
            tech_data = {
                'technology_name': tech_name,
                'technology_type': category,
                'required_expertise': self._assess_required_expertise(tech_name, content),
                'availability': self._assess_tech_availability(tech_name),
                'learning_curve': self._assess_learning_curve(tech_name),
                'cost_factor': self._assess_tech_cost(tech_name),
                'sort_order': i
            }
            
            technologies.append(tech_data)
        
        return technologies
    
    def _extract_tech_from_content(self, content: str) -> List[str]:
        """Extract technologies mentioned in idea content"""
        technologies = []
        
        # Look for technology sections
        tech_sections = [
            self._extract_section(content, 'Technology'),
            self._extract_section(content, 'Technical Requirements'),
            self._extract_section(content, 'Tech Stack'),
            self._extract_section(content, 'Implementation')
        ]
        
        tech_content = ' '.join([section for section in tech_sections if section])
        if not tech_content:
            tech_content = content
        
        # Extract using patterns
        tech_patterns = [
            r'\b(React|Vue|Angular|Svelte|Next\.js|Nuxt\.js)\b',
            r'\b(Python|JavaScript|TypeScript|Java|Go|Rust|PHP|Ruby|Swift|Kotlin)\b',
            r'\b(TensorFlow|PyTorch|Keras|Scikit-learn|OpenCV|Pandas|NumPy)\b',
            r'\b(MySQL|PostgreSQL|MongoDB|Redis|SQLite|Elasticsearch)\b',
            r'\b(Docker|Kubernetes|AWS|Azure|GCP|Heroku|Vercel|Netlify)\b',
            r'\b(Express|Flask|Django|Spring|Rails|Laravel|FastAPI)\b',
            r'\b(Blockchain|AI|Machine Learning|Deep Learning|IoT|AR|VR)\b'
        ]
        
        for pattern in tech_patterns:
            matches = re.findall(pattern, tech_content, re.IGNORECASE)
            technologies.extend(matches)
        
        return list(set(technologies))
    
    def _extract_problem_statement(self, content: str) -> str:
        """Extract the problem statement from content"""
        problem_section = self._extract_section(content, 'Problem')
        if problem_section:
            return problem_section
        
        # Look for problem indicators in first few paragraphs
        paragraphs = content.split('\n\n')[:3]
        
        for paragraph in paragraphs:
            paragraph = paragraph.strip()
            if any(indicator in paragraph.lower() for indicator in 
                   ['problem', 'issue', 'challenge', 'difficulty', 'pain point']):
                return paragraph
        
        return ''
    
    def _extract_solution_overview(self, content: str) -> str:
        """Extract the solution overview from content"""
        solution_sections = [
            self._extract_section(content, 'Solution'),
            self._extract_section(content, 'Approach'),
            self._extract_section(content, 'Overview'),
            self._extract_section(content, 'Concept')
        ]
        
        for section in solution_sections:
            if section:
                return section
        
        # Fallback to first substantial paragraph
        paragraphs = content.split('\n\n')
        for paragraph in paragraphs:
            paragraph = paragraph.strip()
            if len(paragraph) > 100 and not paragraph.startswith('#'):
                return paragraph
        
        return ''
    
    def _extract_implementation_details(self, content: str) -> Dict[str, Any]:
        """Extract implementation details and requirements"""
        implementation = {
            'phases': self._extract_implementation_phases(content),
            'resources_needed': self._extract_required_resources_dict(content),
            'timeline': self._extract_timeline(content),
            'milestones': self._extract_milestones(content),
            'risks': self._extract_risks(content),
            'dependencies': self._extract_dependencies(content)
        }
        
        return implementation
    
    def _extract_implementation_phases(self, content: str) -> List[Dict[str, Any]]:
        """Extract implementation phases"""
        phases = []
        
        # Look for phase sections
        phase_section = self._extract_section(content, 'Implementation')
        if not phase_section:
            phase_section = self._extract_section(content, 'Phases')
        if not phase_section:
            phase_section = self._extract_section(content, 'Plan')
        
        if phase_section:
            # Look for numbered or bullet points
            phase_items = self._extract_list_items(phase_section)
            
            for i, item in enumerate(phase_items):
                phases.append({
                    'phase_number': i + 1,
                    'name': f'Phase {i + 1}',
                    'description': item,
                    'estimated_duration': self._extract_phase_duration(item),
                    'dependencies': []
                })
        
        return phases
    
    def _extract_required_resources_dict(self, content: str) -> Dict[str, List[str]]:
        """Extract required resources as a dictionary"""
        resources = {
            'human_resources': [],
            'technical_resources': [],
            'financial_resources': [],
            'other_resources': []
        }
        
        # Look for resource sections
        resource_section = self._extract_section(content, 'Resources')
        if not resource_section:
            resource_section = self._extract_section(content, 'Requirements')
        
        if resource_section:
            # Categorize resources
            items = self._extract_list_items(resource_section)
            
            for item in items:
                item_lower = item.lower()
                if any(keyword in item_lower for keyword in ['developer', 'designer', 'manager', 'team', 'person', 'expert']):
                    resources['human_resources'].append(item)
                elif any(keyword in item_lower for keyword in ['server', 'api', 'database', 'software', 'tool', 'platform']):
                    resources['technical_resources'].append(item)
                elif any(keyword in item_lower for keyword in ['budget', 'funding', 'cost', 'money', 'investment']):
                    resources['financial_resources'].append(item)
                else:
                    resources['other_resources'].append(item)
        
        return resources
    
    def _extract_timeline(self, content: str) -> Dict[str, Any]:
        """Extract project timeline"""
        timeline = {
            'total_duration': None,
            'start_date': None,
            'milestones': []
        }
        
        # Look for timeline indicators
        timeline_section = self._extract_section(content, 'Timeline')
        if timeline_section:
            # Extract duration
            duration_match = re.search(r'(\d+)\s*(months?|weeks?|years?)', timeline_section, re.IGNORECASE)
            if duration_match:
                timeline['total_duration'] = f"{duration_match.group(1)} {duration_match.group(2)}"
        
        return timeline
    
    def _extract_milestones(self, content: str) -> List[Dict[str, Any]]:
        """Extract project milestones"""
        milestones = []
        
        milestone_section = self._extract_section(content, 'Milestones')
        if milestone_section:
            milestone_items = self._extract_list_items(milestone_section)
            
            for i, item in enumerate(milestone_items):
                milestones.append({
                    'name': f'Milestone {i + 1}',
                    'description': item,
                    'target_date': None,
                    'dependencies': []
                })
        
        return milestones
    
    def _extract_risks(self, content: str) -> List[Dict[str, Any]]:
        """Extract project risks"""
        risks = []
        
        risk_section = self._extract_section(content, 'Risks')
        if not risk_section:
            risk_section = self._extract_section(content, 'Challenges')
        
        if risk_section:
            risk_items = self._extract_list_items(risk_section)
            
            for item in risk_items:
                risks.append({
                    'description': item,
                    'probability': self._assess_risk_probability(item),
                    'impact': self._assess_risk_impact(item),
                    'mitigation': ''
                })
        
        return risks
    
    def _extract_dependencies(self, content: str) -> List[str]:
        """Extract project dependencies"""
        dependencies = []
        
        dep_section = self._extract_section(content, 'Dependencies')
        if dep_section:
            dependencies = self._extract_list_items(dep_section)
        
        return dependencies
    
    def _analyze_feasibility(self, content: str) -> Dict[str, Any]:
        """Analyze idea feasibility"""
        feasibility = {
            'technical_feasibility': self._assess_technical_feasibility(content),
            'market_feasibility': self._assess_market_feasibility(content),
            'financial_feasibility': self._assess_financial_feasibility(content),
            'operational_feasibility': self._assess_operational_feasibility(content),
            'overall_score': 0.0
        }
        
        # Calculate overall score
        scores = [feasibility[key] for key in feasibility if key != 'overall_score' and isinstance(feasibility[key], (int, float))]
        if scores:
            feasibility['overall_score'] = sum(scores) / len(scores)
        
        return feasibility
    
    def _extract_collaboration_requirements(self, content: str) -> Dict[str, Any]:
        """Extract collaboration requirements"""
        collaboration = {
            'team_size_needed': self._estimate_team_size(content),
            'skills_needed': self._extract_required_skills(content),
            'roles_needed': self._extract_required_roles(content),
            'collaboration_type': self._determine_collaboration_type(content),
            'remote_friendly': self._assess_remote_feasibility(content)
        }
        
        return collaboration
    
    def _analyze_business_potential(self, content: str) -> Dict[str, Any]:
        """Analyze business potential"""
        business = {
            'monetization_potential': self._assess_monetization_potential(content),
            'scalability': self._assess_scalability(content),
            'competitive_advantage': self._extract_competitive_advantage(content),
            'target_users': self._extract_target_users(content),
            'business_model': self._extract_business_model(content)
        }
        
        return business
    
    def _analyze_market_potential(self, content: str) -> Dict[str, Any]:
        """Analyze market potential"""
        market = {
            'market_size': self._assess_market_size(content),
            'growth_potential': self._assess_growth_potential(content),
            'competition_level': self._assess_competition_level(content),
            'market_trends': self._extract_market_trends(content),
            'barriers_to_entry': self._extract_barriers_to_entry(content)
        }
        
        return market
    
    def _categorize_idea(self, content: str) -> str:
        """Categorize the idea"""
        content_lower = content.lower()
        
        categories = {
            'AI/ML': ['artificial intelligence', 'machine learning', 'ai', 'ml', 'neural network', 'deep learning'],
            'Web Development': ['web app', 'website', 'frontend', 'backend', 'full stack'],
            'Mobile App': ['mobile app', 'android', 'ios', 'react native', 'flutter'],
            'IoT': ['iot', 'internet of things', 'sensors', 'smart device'],
            'Blockchain': ['blockchain', 'cryptocurrency', 'smart contract', 'defi'],
            'Health Tech': ['health', 'medical', 'healthcare', 'fitness', 'wellness'],
            'Fintech': ['financial', 'banking', 'payment', 'fintech', 'investment'],
            'Education': ['education', 'learning', 'teaching', 'edtech', 'training'],
            'Gaming': ['game', 'gaming', 'entertainment', 'vr', 'ar'],
            'Social': ['social', 'community', 'networking', 'collaboration'],
            'Business': ['business', 'enterprise', 'b2b', 'saas', 'productivity'],
            'Environment': ['environment', 'sustainability', 'green', 'climate']
        }
        
        for category, keywords in categories.items():
            if any(keyword in content_lower for keyword in keywords):
                return category
        
        return 'Other'
    
    def _determine_development_stage(self, content: str) -> str:
        """Determine the development stage"""
        content_lower = content.lower()
        
        if any(keyword in content_lower for keyword in ['concept', 'idea', 'brainstorming', 'initial']):
            return 'concept'
        elif any(keyword in content_lower for keyword in ['research', 'analysis', 'planning', 'design']):
            return 'research'
        elif any(keyword in content_lower for keyword in ['prototype', 'mvp', 'proof of concept', 'demo']):
            return 'prototype'
        elif any(keyword in content_lower for keyword in ['development', 'building', 'coding', 'implementation']):
            return 'development'
        elif any(keyword in content_lower for keyword in ['testing', 'beta', 'trial', 'validation']):
            return 'testing'
        elif any(keyword in content_lower for keyword in ['launch', 'production', 'deployed', 'live']):
            return 'launched'
        else:
            return 'concept'
    
    def _extract_duration(self, metadata: Dict, content: str) -> Optional[int]:
        """Extract estimated duration in months"""
        # Check metadata first
        duration = metadata.get('estimated_duration_months')
        if duration:
            return int(duration)
        
        # Extract from content
        duration_patterns = [
            r'(\d+)\s*months?',
            r'(\d+)\s*weeks?',  # Convert to months
            r'(\d+)\s*years?'   # Convert to months
        ]
        
        for pattern in duration_patterns:
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                value = int(match.group(1))
                if 'week' in pattern:
                    return max(1, value // 4)  # Convert weeks to months
                elif 'year' in pattern:
                    return value * 12  # Convert years to months
                else:
                    return value
        
        return None
    
    def _needs_collaboration(self, content: str) -> bool:
        """Determine if collaboration is needed"""
        content_lower = content.lower()
        
        collaboration_indicators = [
            'team', 'collaboration', 'partner', 'co-founder', 'help needed',
            'looking for', 'seeking', 'need help', 'require assistance'
        ]
        
        return any(indicator in content_lower for indicator in collaboration_indicators)
    
    def _requires_funding(self, content: str) -> bool:
        """Determine if funding is required"""
        content_lower = content.lower()
        
        funding_indicators = [
            'funding', 'investment', 'budget', 'cost', 'money needed',
            'capital', 'financial support', 'investor', 'venture capital'
        ]
        
        return any(indicator in content_lower for indicator in funding_indicators)
    
    def _extract_financial_estimates(self, metadata: Dict, content: str) -> Dict[str, Optional[float]]:
        """Extract financial estimates"""
        estimates = {
            'budget': metadata.get('estimated_budget'),
            'revenue_potential': None
        }
        
        # Extract budget from content
        if not estimates['budget']:
            budget_patterns = [
                r'\$(\d+(?:,\d{3})*(?:\.\d{2})?)',
                r'budget[:\s]*\$?(\d+(?:,\d{3})*)',
                r'cost[:\s]*\$?(\d+(?:,\d{3})*)'
            ]
            
            for pattern in budget_patterns:
                match = re.search(pattern, content, re.IGNORECASE)
                if match:
                    budget_str = match.group(1).replace(',', '')
                    estimates['budget'] = float(budget_str)
                    break
        
        # Extract revenue potential
        revenue_patterns = [
            r'revenue[:\s]*\$?(\d+(?:,\d{3})*)',
            r'profit[:\s]*\$?(\d+(?:,\d{3})*)',
            r'earning potential[:\s]*\$?(\d+(?:,\d{3})*)'
        ]
        
        for pattern in revenue_patterns:
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                revenue_str = match.group(1).replace(',', '')
                estimates['revenue_potential'] = float(revenue_str)
                break
        
        return estimates
    
    def _calculate_feasibility_score(self, metadata: Dict, content: str) -> float:
        """Calculate feasibility score (1-10)"""
        score = metadata.get('feasibility_score', 5.0)
        
        if score is None:
            # Calculate based on content analysis
            score = 5.0  # Base score
            
            content_lower = content.lower()
            
            # Positive factors
            if any(keyword in content_lower for keyword in ['simple', 'straightforward', 'proven', 'existing technology']):
                score += 1
            
            if any(keyword in content_lower for keyword in ['prototype', 'tested', 'validated']):
                score += 1
            
            # Negative factors
            if any(keyword in content_lower for keyword in ['complex', 'challenging', 'unproven', 'cutting-edge']):
                score -= 1
            
            if any(keyword in content_lower for keyword in ['research needed', 'experimental', 'theoretical']):
                score -= 1
        
        return max(1.0, min(10.0, float(score)))
    
    def _calculate_impact_score(self, metadata: Dict, content: str) -> float:
        """Calculate impact score (1-10)"""
        score = metadata.get('impact_score', 5.0)
        
        if score is None:
            score = 5.0  # Base score
            
            content_lower = content.lower()
            
            # High impact indicators
            if any(keyword in content_lower for keyword in ['revolutionary', 'game-changing', 'disrupting', 'transformative']):
                score += 2
            
            if any(keyword in content_lower for keyword in ['millions of users', 'global', 'widespread']):
                score += 1
            
            # Lower impact indicators
            if any(keyword in content_lower for keyword in ['niche', 'small market', 'limited scope']):
                score -= 1
        
        return max(1.0, min(10.0, float(score)))
    
    def _calculate_innovation_score(self, content: str) -> float:
        """Calculate innovation score (1-10)"""
        score = 5.0  # Base score
        content_lower = content.lower()
        
        # Innovation indicators
        if any(keyword in content_lower for keyword in ['novel', 'innovative', 'first-of-its-kind', 'breakthrough']):
            score += 2
        
        if any(keyword in content_lower for keyword in ['new approach', 'unique', 'original']):
            score += 1
        
        # Existing solution indicators
        if any(keyword in content_lower for keyword in ['similar to', 'based on existing', 'incremental improvement']):
            score -= 1
        
        return max(1.0, min(10.0, score))
    
    def _calculate_priority_level(self, feasibility: float, impact: float) -> str:
        """Calculate priority level based on feasibility and impact"""
        if feasibility >= 7 and impact >= 7:
            return 'high'
        elif feasibility >= 5 and impact >= 5:
            return 'medium'
        else:
            return 'low'
    
    # Additional helper methods for detailed analysis
    def _assess_technical_feasibility(self, content: str) -> float:
        """Assess technical feasibility (1-10)"""
        # Simplified implementation
        return 7.0
    
    def _assess_market_feasibility(self, content: str) -> float:
        """Assess market feasibility (1-10)"""
        return 6.0
    
    def _assess_financial_feasibility(self, content: str) -> float:
        """Assess financial feasibility (1-10)"""
        return 5.0
    
    def _assess_operational_feasibility(self, content: str) -> float:
        """Assess operational feasibility (1-10)"""
        return 6.0
    
    def _validate_content(self, extracted: ExtractedContent):
        """Validate extracted idea content"""
        main_entity = extracted.main_entity
        
        # Check required fields
        if not main_entity.get('title'):
            extracted.validation_errors.append('Missing idea title')
        
        if not main_entity.get('content'):
            extracted.validation_errors.append('Missing idea content')
        
        if not main_entity.get('problem_statement'):
            extracted.validation_warnings.append('Missing problem statement')
        
        if not main_entity.get('solution_overview'):
            extracted.validation_warnings.append('Missing solution overview')
        
        # Validate scores
        for score_field in ['feasibility_score', 'impact_score', 'innovation_score']:
            score = main_entity.get(score_field, 0)
            if score < 1 or score > 10:
                extracted.validation_errors.append(f'Invalid {score_field}: must be between 1-10')
        
        # Validate financial data
        budget = main_entity.get('estimated_budget')
        if budget is not None and budget < 0:
            extracted.validation_errors.append('Budget cannot be negative')
        
        # Validate duration
        duration = main_entity.get('estimated_duration_months')
        if duration is not None and duration <= 0:
            extracted.validation_errors.append('Duration must be positive')
    
    # Placeholder methods for complex analysis (would need ML/NLP in real implementation)
    def _extract_target_market(self, content: str) -> str:
        return 'General'
    
    def _assess_competition_level(self, content: str) -> str:
        return 'medium'
    
    def _assess_technical_complexity(self, content: str) -> str:
        return 'medium'
    
    def _estimate_team_size(self, content: str) -> int:
        return 3
    
    def _extract_required_skills(self, content: str) -> List[str]:
        return []
    
    def _extract_required_roles(self, content: str) -> List[str]:
        return []
    
    def _determine_collaboration_type(self, content: str) -> str:
        return 'team-based'
    
    def _assess_remote_feasibility(self, content: str) -> bool:
        return True
    
    def _assess_monetization_potential(self, content: str) -> str:
        return 'medium'
    
    def _assess_scalability(self, content: str) -> str:
        return 'medium'
    
    def _extract_competitive_advantage(self, content: str) -> str:
        return ''
    
    def _extract_target_users(self, content: str) -> str:
        return ''
    
    def _extract_business_model(self, content: str) -> str:
        return ''
    
    def _assess_market_size(self, content: str) -> str:
        return 'medium'
    
    def _assess_growth_potential(self, content: str) -> str:
        return 'medium'
    
    def _extract_market_trends(self, content: str) -> List[str]:
        return []
    
    def _extract_barriers_to_entry(self, content: str) -> List[str]:
        return []
    
    def _extract_phase_duration(self, item: str) -> Optional[str]:
        return None
    
    def _assess_risk_probability(self, item: str) -> str:
        return 'medium'
    
    def _assess_risk_impact(self, item: str) -> str:
        return 'medium'
    
    def _assess_required_expertise(self, tech_name: str, content: str) -> str:
        return 'intermediate'
    
    def _assess_tech_availability(self, tech_name: str) -> str:
        return 'available'
    
    def _assess_learning_curve(self, tech_name: str) -> str:
        return 'medium'
    
    def _assess_tech_cost(self, tech_name: str) -> str:
        return 'medium'