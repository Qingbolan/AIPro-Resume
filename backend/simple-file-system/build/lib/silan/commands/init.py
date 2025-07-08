"""Initialize command for creating content templates and project structure"""

import json
from pathlib import Path
from typing import Dict, Any

from rich.console import Console
from rich.panel import Panel

console = Console()


class InitCommand:
    def __init__(self, project_name: str, language: str = 'en'):
        self.project_name = project_name
        self.language = language
        self.project_dir = Path.cwd() / project_name
        
    def execute(self) -> bool:
        """Execute the initialization command"""
        try:
            # Create project directory
            self.project_dir.mkdir(exist_ok=True)
            console.print(f"[green]✅ Created project directory: {self.project_dir}[/green]")
            
            # Create content directories
            self._create_content_structure()
            
            # Create configuration file
            self._create_config_file()
            
            # Create sample content files
            self._create_sample_content()
            
            # Show completion message
            self._show_completion_message()
            
            return True
            
        except Exception as e:
            console.print(f"[red]❌ Initialization failed: {e}[/red]")
            return False
    
    def _create_content_structure(self):
        """Create the content directory structure"""
        content_dirs = [
            'content/resume',
            'content/projects', 
            'content/blog',
            'content/ideas',
            'content/plans'
        ]
        
        for dir_path in content_dirs:
            full_path = self.project_dir / dir_path
            full_path.mkdir(parents=True, exist_ok=True)
        
        console.print("[green]✅ Created content directory structure[/green]")
    
    def _create_config_file(self):
        """Create a basic configuration file"""
        config = {
            "site": {
                "title": f"{self.project_name.title()} Portfolio",
                "author": "Your Name",
                "description": f"Personal portfolio and database for {self.project_name}",
                "defaultLanguage": self.language
            },
            "database": {
                "default_type": "sqlite",
                "sqlite_path": "portfolio.db"
            },
            "content": {
                "directories": ["resume", "projects", "blog", "ideas", "plans"]
            }
        }
        
        config_file = self.project_dir / "silan-config.json"
        with open(config_file, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        
        console.print("[green]✅ Created configuration file[/green]")
    
    def _create_sample_content(self):
        """Create sample markdown files for each content type"""
        
        # Sample resume content
        resume_content = """---
title: "Resume"
name: "Your Name"
email: "your.email@example.com"
phone: "+1 (555) 123-4567"
location: "Your City, Country"
current: "Looking for opportunities in [your field]"
contacts:
  - type: "email"
    value: "your.email@example.com"
  - type: "phone" 
    value: "+1 (555) 123-4567"
socialLinks:
  - name: "GitHub"
    url: "https://github.com/yourusername"
  - name: "LinkedIn"
    url: "https://linkedin.com/in/yourusername"
---

# Your Name

## Education

### University Name (2020-2024)
- **Degree**: Bachelor of Science in Computer Science
- **GPA**: 3.8/4.0
- **Relevant Coursework**: Data Structures, Algorithms, Database Systems

## Experience

### Software Developer Intern (Summer 2023)
**Company Name** - City, State

- Developed web applications using React and Node.js
- Collaborated with team of 5 developers on agile projects
- Improved application performance by 25%

## Skills

### Programming Languages
- Python, JavaScript, Java, C++

### Technologies
- React, Node.js, MongoDB, PostgreSQL, Git

## Projects

See the projects section for detailed project information.
"""

        # Sample project content
        project_content = """---
title: "Sample Project"
description: "A brief description of your project"
type: "Web Application"
year: 2024
status: "active"
technologies: ["Python", "React", "PostgreSQL"]
github: "https://github.com/yourusername/project"
demo: "https://yourproject.demo.com"
featured: true
difficulty: "intermediate"
team_size: 1
duration: "3 months"
---

# Sample Project

## Overview

This is a sample project template. Replace this content with your actual project description.

## Features

- Feature 1: Description of feature 1
- Feature 2: Description of feature 2  
- Feature 3: Description of feature 3

## Technical Details

### Architecture
Describe your project's architecture here.

### Key Technologies
- **Frontend**: React with TypeScript
- **Backend**: Python with FastAPI
- **Database**: PostgreSQL
- **Deployment**: Docker + AWS

## Challenges and Solutions

Describe any interesting challenges you faced and how you solved them.

## Future Improvements

- Improvement 1
- Improvement 2
- Improvement 3
"""

        # Sample blog post content
        blog_content = """---
title: "Sample Blog Post"
author: "Your Name"
date: "2024-01-15"
category: "Technology"
tags: ["programming", "tutorial", "web-development"]
summary: "A brief summary of your blog post content"
readTime: "5 min read"
featured: false
---

# Sample Blog Post

## Introduction

This is a sample blog post template. Replace this content with your actual blog post.

## Main Content

Write your blog post content here. You can include:

### Code Examples

```python
def hello_world():
    print("Hello, World!")
```

### Images

![Sample Image](path/to/your/image.jpg)

### Lists

1. Item 1
2. Item 2
3. Item 3

## Conclusion

Summarize your blog post here.
"""

        # Sample idea content
        idea_content = """---
title: "Sample Research Idea"
description: "A brief description of your research idea"
category: "Artificial Intelligence"
tags: ["machine-learning", "nlp", "research"]
status: "draft"
date: "2024-01-15"
difficulty: "advanced"
researchField: "Computer Science"
keywords: ["AI", "NLP", "Deep Learning"]
estimatedDuration: "6 months"
collaborationOpen: true
fundingStatus: "seeking"
---

# Sample Research Idea

## Abstract

Provide a brief abstract of your research idea here.

## Motivation

Explain why this research is important and what problem it aims to solve.

## Methodology

Describe your proposed approach and methodology.

## Expected Outcomes

What results do you expect from this research?

## Resources Needed

- Computational resources
- Dataset requirements
- Collaboration needs
"""

        # Sample plan content
        plan_content = """---
title: "2024 Annual Plan"
year: 2024
description: "My goals and objectives for 2024"
icon: "🎯"
status: "active"
startDate: "2024-01-01"
endDate: "2024-12-31"
progress: 25
objectives:
  - "Complete 3 major projects"
  - "Publish 2 research papers"
  - "Learn new technology stack"
projects:
  - "Project A"
  - "Project B"
  - "Project C"
---

# 2024 Annual Plan

## Overview

This is my annual plan for 2024, outlining my main goals and objectives.

## Quarterly Breakdown

### Q1 (Jan-Mar)
- Start Project A
- Research paper 1 submission
- Learn React Native

### Q2 (Apr-Jun)  
- Complete Project A
- Start Project B
- Conference presentation

### Q3 (Jul-Sep)
- Complete Project B
- Start Project C
- Research paper 2 submission

### Q4 (Oct-Dec)
- Complete Project C
- Portfolio update
- Plan for next year

## Success Metrics

- Number of projects completed
- Papers published
- Skills acquired
- Career advancement
"""

        # Write sample files
        sample_files = {
            'content/resume/resume.md': resume_content,
            'content/projects/sample-project.md': project_content,
            'content/blog/sample-blog-post.md': blog_content,
            'content/ideas/sample-idea.md': idea_content,
            'content/plans/2024-annual-plan.md': plan_content
        }
        
        for file_path, content in sample_files.items():
            full_path = self.project_dir / file_path
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content.strip())
        
        console.print("[green]✅ Created sample content files[/green]")
    
    def _show_completion_message(self):
        """Show completion message with next steps"""
        message = f"""[bold green]🎉 Project '{self.project_name}' initialized successfully![/bold green]

[bold yellow]Next steps:[/bold yellow]
1. [cyan]cd {self.project_name}[/cyan]
2. Edit the sample files in the content/ directory
3. [cyan]silan status[/cyan] - Check your content summary
4. [cyan]silan db-sync --dry-run[/cyan] - Preview database sync
5. [cyan]silan db-sync --db-type sqlite[/cyan] - Sync to database

[bold blue]Content structure created:[/bold blue]
├── content/
│   ├── resume/resume.md
│   ├── projects/sample-project.md
│   ├── blog/sample-blog-post.md
│   ├── ideas/sample-idea.md
│   └── plans/2024-annual-plan.md
└── silan-config.json

[bold green]Happy coding! 🚀[/bold green]"""

        console.print(Panel.fit(message, title="🌟 Initialization Complete"))