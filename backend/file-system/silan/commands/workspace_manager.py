"""
Workspace Manager for Silan

Provides unified management of projects, ideas, updates, and other content
with a modern folder-based organization approach.
"""

import yaml
from pathlib import Path
from typing import Dict, Any, List, Optional
from datetime import datetime
from dataclasses import dataclass
from rich.console import Console
from rich.table import Table

console = Console()


@dataclass
class WorkspaceConfig:
    """Workspace configuration"""
    name: str
    author: str
    description: str
    created_at: datetime
    default_language: str = "en"
    supported_languages: Optional[List[str]] = None
    
    def __post_init__(self):
        if self.supported_languages is None:
            self.supported_languages = [self.default_language]


@dataclass
class ContentItem:
    """Base content item"""
    name: str
    path: Path
    content_type: str
    created_at: datetime
    updated_at: datetime
    metadata: Dict[str, Any]


class WorkspaceManager:
    """Unified workspace manager for all content types"""
    
    def __init__(self, workspace_path: Optional[Path] = None):
        self.workspace_path = workspace_path or Path.cwd()
        self.config_file = self.workspace_path / "silan-workspace.yaml"
        self.content_dir = self.workspace_path / "content"
        self.templates_dir = self.workspace_path / "templates"
        self.silan_dir = self.workspace_path / ".silan"
        self.config: WorkspaceConfig = WorkspaceConfig(
            name="default",
            author="Unknown", 
            description="",
            created_at=datetime.now()
        )
        
        self._load_or_create_config()
    
    def _load_or_create_config(self):
        """Load existing workspace config or create default"""
        if self.config_file.exists():
            with open(self.config_file, 'r', encoding='utf-8') as f:
                data = yaml.safe_load(f)
                self.config = WorkspaceConfig(
                    name=data.get('name', self.workspace_path.name),
                    author=data.get('author', 'Unknown'),
                    description=data.get('description', ''),
                    created_at=datetime.fromisoformat(data.get('created_at', datetime.now().isoformat())),
                    default_language=data.get('default_language', 'en'),
                    supported_languages=data.get('supported_languages', ['en'])
                )
        else:
            self.config = WorkspaceConfig(
                name=self.workspace_path.name,
                author="Unknown",
                description=f"Silan workspace for {self.workspace_path.name}",
                created_at=datetime.now()
            )
    
    def save_config(self):
        """Save workspace configuration"""
        config_data = {
            'name': self.config.name,
            'author': self.config.author,
            'description': self.config.description,
            'created_at': self.config.created_at.isoformat(),
            'default_language': self.config.default_language,
            'supported_languages': self.config.supported_languages,
            'version': '2.0.0'
        }
        
        with open(self.config_file, 'w', encoding='utf-8') as f:
            yaml.dump(config_data, f, default_flow_style=False, indent=2)
    
    def initialize_workspace(self, name: Optional[str] = None, author: Optional[str] = None, description: Optional[str] = None):
        """Initialize a new workspace with modern structure"""
        if name:
            self.config.name = name
        if author:
            self.config.author = author
        if description:
            self.config.description = description
        
        # Create directory structure
        directories = [
            # Content directories
            self.content_dir / "projects",
            self.content_dir / "ideas", 
            self.content_dir / "updates" / str(datetime.now().year),
            self.content_dir / "blog" / "posts",
            self.content_dir / "blog" / "drafts",
            self.content_dir / "resume",
            
            # Template directories
            self.templates_dir / "projects" / "web-app",
            self.templates_dir / "projects" / "mobile-app",
            self.templates_dir / "projects" / "research",
            self.templates_dir / "ideas" / "research",
            self.templates_dir / "ideas" / "startup",
            self.templates_dir / "ideas" / "improvement",
            self.templates_dir / "updates",
            self.templates_dir / "blog",
            
            # System directories
            self.silan_dir / "cache",
            self.silan_dir / "logs",
        ]
        
        for directory in directories:
            directory.mkdir(parents=True, exist_ok=True)
        
        # Create template files
        self._create_default_templates()
        
        # Save configuration
        self.save_config()
        
        console.print(f"[green]✅ Workspace '{self.config.name}' initialized successfully[/green]")
        return True
    
    def _create_default_templates(self):
        """Create default template files"""
        templates = {
            # Project templates
            self.templates_dir / "projects" / "web-app" / "README.md": self._get_web_app_template(),
            self.templates_dir / "projects" / "web-app" / "config.yaml": self._get_web_app_config_template(),
            
            self.templates_dir / "projects" / "research" / "README.md": self._get_research_project_template(),
            self.templates_dir / "projects" / "research" / "config.yaml": self._get_research_project_config_template(),
            
            # Idea templates
            self.templates_dir / "ideas" / "research" / "README.md": self._get_research_idea_template(),
            self.templates_dir / "ideas" / "research" / "config.yaml": self._get_research_idea_config_template(),
            
            # Update template
            self.templates_dir / "updates" / "update-template.md": self._get_update_template(),
            
            # Blog template
            self.templates_dir / "blog" / "post-template.md": self._get_blog_template(),
        }
        
        for template_path, content in templates.items():
            template_path.parent.mkdir(parents=True, exist_ok=True)
            with open(template_path, 'w', encoding='utf-8') as f:
                f.write(content)
    
    def get_workspace_status(self) -> Dict[str, Any]:
        """Get comprehensive workspace status"""
        status = {
            'workspace': {
                'name': self.config.name,
                'author': self.config.author,
                'path': str(self.workspace_path),
                'created_at': self.config.created_at.isoformat(),
            },
            'content': {
                'projects': self._count_content_items('projects'),
                'ideas': self._count_content_items('ideas'),
                'updates': self._count_content_items('updates'),
                'blog_posts': self._count_blog_posts(),
            },
            'structure': {
                'has_templates': self.templates_dir.exists(),
                'has_config': self.config_file.exists(),
                'content_dirs': [d.name for d in self.content_dir.iterdir() if d.is_dir()] if self.content_dir.exists() else []
            }
        }
        
        return status
    
    def _count_content_items(self, content_type: str) -> int:
        """Count content items of specific type"""
        content_path = self.content_dir / content_type
        if not content_path.exists():
            return 0
        
        if content_type == 'updates':
            # Count md files in all year/month directories
            count = 0
            for year_dir in content_path.iterdir():
                if year_dir.is_dir():
                    for month_dir in year_dir.iterdir():
                        if month_dir.is_dir():
                            count += len(list(month_dir.glob("*.md")))
            return count
        else:
            # Count directories for projects and ideas
            return len([d for d in content_path.iterdir() if d.is_dir()])
    
    def _count_blog_posts(self) -> int:
        """Count blog posts"""
        blog_posts_dir = self.content_dir / "blog" / "posts"
        if not blog_posts_dir.exists():
            return 0
        return len(list(blog_posts_dir.glob("*.md")))
    
    def show_status(self):
        """Display workspace status in a nice format"""
        status = self.get_workspace_status()
        
        # Workspace info
        workspace_table = Table(title="Workspace Information")
        workspace_table.add_column("Property", style="cyan")
        workspace_table.add_column("Value", style="bold")
        
        workspace_table.add_row("Name", status['workspace']['name'])
        workspace_table.add_row("Author", status['workspace']['author'])
        workspace_table.add_row("Path", status['workspace']['path'])
        workspace_table.add_row("Created", status['workspace']['created_at'][:10])
        
        console.print(workspace_table)
        console.print()
        
        # Content summary
        content_table = Table(title="Content Summary")
        content_table.add_column("Content Type", style="cyan")
        content_table.add_column("Count", style="bold green")
        
        content_table.add_row("Projects", str(status['content']['projects']))
        content_table.add_row("Ideas", str(status['content']['ideas']))
        content_table.add_row("Updates", str(status['content']['updates']))
        content_table.add_row("Blog Posts", str(status['content']['blog_posts']))
        
        console.print(content_table)
    
    # Template methods for different content types
    def _get_web_app_template(self) -> str:
        return """---
title: "{{PROJECT_NAME}}"
description: "{{PROJECT_DESCRIPTION}}"
type: "web-application"
status: "active"
technologies: []
github_url: ""
demo_url: ""
start_date: "{{TODAY}}"
featured: false
difficulty: "intermediate"
team_size: 1
---

# {{PROJECT_NAME}}

## Overview

Brief description of your project.

## Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Technology Stack

### Frontend
- Framework: 
- Language: 
- Styling: 

### Backend
- Framework: 
- Database: 
- Authentication: 

## Setup and Installation

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run the application

## API Endpoints

Document your main API endpoints here.

## Screenshots

Add screenshots to the `assets/images/` folder.

## Development Notes

Add development notes to the `notes/` folder.

## Future Improvements

- Improvement 1
- Improvement 2
"""

    def _get_web_app_config_template(self) -> str:
        return """# Project Configuration
project:
  name: "{{PROJECT_NAME}}"
  type: "web-application"
  version: "1.0.0"
  
# Technology stack
technologies:
  frontend: []
  backend: []
  database: []
  tools: []

# Project URLs
urls:
  github: ""
  demo: ""
  documentation: ""

# Project metadata
metadata:
  difficulty: "intermediate"
  team_size: 1
  estimated_duration: "3 months"
  license: "MIT"
  
# Asset paths
assets:
  images: "assets/images"
  videos: "assets/videos"
  documents: "assets/docs"
"""

    def _get_research_project_template(self) -> str:
        return """---
title: "{{PROJECT_NAME}}"
description: "{{PROJECT_DESCRIPTION}}"
type: "research"
status: "active"
field: "computer-science"
keywords: []
start_date: "{{TODAY}}"
funding_required: false
collaboration_open: true
---

# {{PROJECT_NAME}}

## Abstract

Brief abstract of your research project.

## Research Objectives

1. Objective 1
2. Objective 2
3. Objective 3

## Methodology

Describe your research methodology.

## Literature Review

Key papers and references in the `research/` folder.

## Experimental Design

Describe your experimental approach.

## Expected Outcomes

What you expect to achieve.

## Timeline

- Phase 1: 
- Phase 2: 
- Phase 3: 

## Resources Required

- Computational resources
- Datasets
- Collaboration needs
"""

    def _get_research_project_config_template(self) -> str:
        return """# Research Project Configuration
project:
  name: "{{PROJECT_NAME}}"
  type: "research"
  field: "computer-science"
  
# Research metadata
research:
  keywords: []
  methodology: ""
  duration_months: 6
  funding_required: false
  collaboration_open: true
  
# Resources
resources:
  computational: []
  datasets: []
  literature: []
  
# Milestones
milestones:
  - name: "Literature Review"
    target_date: ""
  - name: "Initial Implementation"
    target_date: ""
  - name: "Evaluation"
    target_date: ""
"""

    def _get_research_idea_template(self) -> str:
        return """---
title: "{{IDEA_NAME}}"
description: "{{IDEA_DESCRIPTION}}"
category: "research"
status: "draft"
priority: "medium"
field: "computer-science"
keywords: []
created_date: "{{TODAY}}"
estimated_duration: "6 months"
collaboration_needed: false
funding_required: false
---

# {{IDEA_NAME}}

## Abstract

Brief abstract of your idea.

## Motivation

Why is this idea important? What problem does it solve?

## Background

Relevant background information and context.

## Proposed Approach

Describe your proposed approach or solution.

## Methodology

How would you implement or test this idea?

## Expected Impact

What impact could this idea have?

## Related Work

Similar ideas or research in the field.

## Next Steps

1. Step 1
2. Step 2
3. Step 3

## Resources Needed

- Research materials
- Tools and software
- Collaboration opportunities
"""

    def _get_research_idea_config_template(self) -> str:
        return """# Research Idea Configuration
idea:
  name: "{{IDEA_NAME}}"
  category: "research"
  field: "computer-science"
  
# Idea metadata
metadata:
  priority: "medium"
  status: "draft"
  estimated_duration: "6 months"
  difficulty: "intermediate"
  
# Requirements
requirements:
  collaboration_needed: false
  funding_required: false
  resources: []
  
# Research aspects
research:
  keywords: []
  related_papers: []
  potential_venues: []
"""

    def _get_update_template(self) -> str:
        return """---
title: "{{UPDATE_TITLE}}"
date: "{{TODAY}}"
type: "project"
status: "active"
priority: "medium"
tags: []
related_projects: []
---

# {{UPDATE_TITLE}}

## Summary

Brief summary of this update.

## Details

Detailed description of what happened, what was accomplished, or what was learned.

## Progress

- What was completed
- What's in progress
- What's next

## Challenges

Any challenges encountered and how they were addressed.

## Resources

- Links to relevant resources
- References
- Documentation

## Next Steps

1. Next step 1
2. Next step 2
3. Next step 3
"""

    def _get_blog_template(self) -> str:
        return """---
title: "{{BLOG_TITLE}}"
date: "{{TODAY}}"
author: "{{AUTHOR}}"
category: "technology"
tags: []
summary: "Brief summary of the blog post"
featured: false
reading_time: "5 min"
---

# {{BLOG_TITLE}}

## Introduction

Introduction to your blog post.

## Main Content

Main content of your blog post.

### Subsection

Content for subsection.

## Conclusion

Conclusion and key takeaways.

## References

- Reference 1
- Reference 2
""" 