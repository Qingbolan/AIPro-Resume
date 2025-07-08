# Silan Personal Website - Simple File-Based System Design

## Overview

A lightweight, file-based personal website system that requires no database setup. Users can easily create and maintain their personal website using markdown files and a simple CLI tool.

## Core Philosophy

- **Zero Database**: All content stored in markdown files
- **Easy Setup**: One command to install and setup
- **Simple Build**: One command to build the entire website
- **Git-Friendly**: All content is version-controlled with Git
- **Self-Contained**: No external dependencies or services required

---

## System Architecture

### CLI Tool: `silan-personal-website`

```bash
# Install the system with default template
silan-personal-website download

# Build the website from content files
silan-personal-website build

# Development server
silan-personal-website dev

# Deploy to GitHub Pages (optional)
silan-personal-website deploy
```

---

## File Structure

```
my-personal-website/
├── silan-config.json              # Main configuration
├── content/                       # All content in markdown
│   ├── resume/
│   │   ├── personal.md           # Personal information
│   │   ├── education.md          # Education history
│   │   ├── experience.md         # Work experience
│   │   ├── skills.md             # Skills and technologies
│   │   ├── research.md           # Research projects
│   │   ├── publications.md       # Publications list
│   │   └── awards.md             # Awards and achievements
│   ├── projects/
│   │   ├── ai-resume-builder.md  # Individual project files
│   │   ├── knowledge-graph.md
│   │   └── portfolio-website.md
│   ├── blog/
│   │   ├── articles/             # Regular blog articles
│   │   │   ├── getting-started-ai.md
│   │   │   └── neo4j-guide.md
│   │   ├── videos/               # Video blog posts
│   │   │   ├── ai-tutorial-series.md
│   │   │   └── coding-session.md
│   │   └── series/               # Blog series
│   │       ├── ai-fundamentals/  # Custom series folder
│   │       │   ├── series.md     # Series metadata
│   │       │   ├── 01-introduction.md
│   │       │   ├── 02-machine-learning.md
│   │       │   └── 03-deep-learning.md
│   │       └── web-dev-basics/
│   │           ├── series.md
│   │           ├── 01-html-css.md
│   │           └── 02-javascript.md
│   ├── ideas/
│   │   ├── ai-education-platform.md
│   │   ├── automated-code-review.md
│   │   └── smart-learning-assistant.md
│   └── plans/
│       ├── 2024.md               # Annual plan
│       ├── 2025.md
│       └── 2026.md
├── assets/                       # Static assets
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── blog/
│   │   └── education/
│   ├── videos/
│   └── documents/
├── themes/                       # Theme customization
│   ├── default/
│   └── custom/
└── build/                        # Generated website (ignored in git)
    ├── index.html
    ├── resume/
    ├── projects/
    ├── blog/
    └── assets/
```

---

## Configuration Files

### Main Config: `silan-config.json`

```json
{
  "site": {
    "title": "Silan Hu - AI Researcher & Developer",
    "description": "Personal website showcasing AI research and development work",
    "url": "https://silanhu.com",
    "author": "Silan Hu",
    "email": "Silan.Hu@u.nus.edu",
    "languages": ["en", "zh"],
    "defaultLanguage": "en"
  },
  "theme": {
    "name": "default",
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#8b5cf6",
      "accent": "#10b981"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    }
  },
  "features": {
    "resume": true,
    "projects": true,
    "blog": true,
    "ideas": true,
    "plans": true,
    "analytics": false,
    "comments": false
  },
  "build": {
    "outputDir": "build",
    "baseUrl": "/",
    "generateSitemap": true,
    "generateRSS": true,
    "optimizeImages": true
  },
  "deployment": {
    "type": "github-pages",
    "repository": "username/username.github.io",
    "branch": "main"
  }
}
```

---

## Content File Formats

### Resume Files

#### `content/resume/personal.md`
```markdown
---
name: "Silan Hu"
title: "AI Researcher & Full Stack Developer"
current: "Looking for PhD position in CS(AI) • Pursue Easy AI for Everyone"
location: "Singapore🇸🇬 / Beijing, China🇨🇳"
email: "Silan.Hu@u.nus.edu"
phone: "+65 86986181"
website: "https://silanhu.com"
avatar: "/assets/images/profile/avatar.jpg"
social:
  - type: "linkedin"
    url: "https://linkedin.com/in/qingbolan"
  - type: "github"
    url: "https://github.com/Qingbolan"
languages:
  zh:
    name: "胡思蓝"
    title: "AI研究员与全栈开发者"
    current: "寻求计算机科学(AI)博士职位 • 追求易得易用的AI造福每一个人"
    location: "新加坡🇸🇬 / 中国北京🇨🇳"
---

# About Me

Brief introduction about yourself...

## Goals

- Looking for PhD position in CS(AI)
- Pursue Easy AI for Everyone
```

#### `content/resume/education.md`
```markdown
---
title: "Education"
---

## Master of Computing (ARTIFICIAL INTELLIGENCE specialization)
**National University of Singapore (NUS)**  
*Aug 2024 – Future (Dec 2025)*  
📍 Singapore  
🌐 [Website](https://www.nus.edu.sg/)

## Bachelor of Science in Computer Science
**Macau University of Science and Technology (MUST)**  
*Sep 2020 – Jun 2024*  
📍 Macau, China  
🌐 [Website](https://www.must.edu.mo/)

- GPA: 3.76/4 (Ranked in top 5%, 4/160+)
- Received full scholarship of 250,000 CNY for Master's program
- Dean's List Student
- Vice President of Computer Science and Engineering Student Association
```

#### `content/resume/experience.md`
```markdown
---
title: "Experience"
---

## AI Engineer Intern
**HPC-AI Tech**  
*Jan 2025 – Now*  
📍 Remote  
🌐 [Website](https://hpc-ai.tech/)

- Working on large-scale AI infrastructure
- Developing optimization algorithms for distributed computing

## Research Assistant
**University Lab**  
*Jun 2023 – Dec 2024*  
📍 Singapore

- Conducted research on knowledge graphs
- Published 3 papers in top-tier conferences
```

### Project Files

#### `content/projects/ai-resume-builder.md`
```markdown
---
title: "AI-Powered Resume Builder"
slug: "ai-resume-builder"
description: "An intelligent resume builder that uses AI to optimize content and formatting"
type: "Web Application"
status: "active"
featured: true
startDate: "2024-01-01"
endDate: null
github: "https://github.com/username/ai-resume-builder"
demo: "https://demo.ai-resume-builder.com"
thumbnail: "/assets/images/projects/ai-resume-builder.png"
technologies:
  - "React"
  - "TypeScript"
  - "OpenAI API"
  - "Node.js"
  - "PostgreSQL"
languages:
  zh:
    title: "AI简历生成器"
    description: "使用AI优化内容和格式的智能简历生成器"
---

# AI-Powered Resume Builder

## Overview

This project is an intelligent resume builder that leverages AI to help users create optimized resumes.

## Features

- AI-powered content suggestions
- Multiple template options
- Real-time preview
- Export to PDF/DOCX

## Technical Implementation

### Architecture
- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL
- AI: OpenAI GPT-4 API

### Key Challenges
1. **Content Optimization**: Developing algorithms to analyze and improve resume content
2. **Template System**: Creating flexible, responsive templates
3. **Performance**: Optimizing AI API calls for real-time suggestions

## Screenshots

![Dashboard](/assets/images/projects/ai-resume-builder/dashboard.png)
![Editor](/assets/images/projects/ai-resume-builder/editor.png)

## Future Enhancements

- Integration with LinkedIn
- ATS optimization scoring
- Multi-language support
```

### Blog Files

#### `content/blog/articles/getting-started-ai.md`
```markdown
---
title: "Getting Started with AI in Education"
slug: "getting-started-ai-education"
excerpt: "A comprehensive guide to implementing AI solutions in educational contexts"
type: "article"
featured: true
publishDate: "2024-12-01"
readTime: 8
tags:
  - "AI"
  - "Education"
  - "Technology"
categories:
  - "Tutorial"
  - "AI & Machine Learning"
thumbnail: "/assets/images/blog/ai-education.jpg"
languages:
  zh:
    title: "AI在教育中的入门指南"
    excerpt: "在教育环境中实施AI解决方案的综合指南"
---

# Getting Started with AI in Education

## Introduction

Artificial Intelligence is revolutionizing education...

## Key Applications

### 1. Personalized Learning
AI can adapt to individual learning styles...

### 2. Automated Assessment
Intelligent systems can provide instant feedback...

## Implementation Guide

### Step 1: Identify Use Cases
Start by identifying specific areas where AI can add value...

### Step 2: Choose the Right Tools
Popular AI education tools include...

## Code Example

```python
# Simple AI tutoring system
import openai

def generate_explanation(topic, difficulty_level):
    prompt = f"Explain {topic} at {difficulty_level} level"
    response = openai.Completion.create(
        engine="gpt-4",
        prompt=prompt,
        max_tokens=200
    )
    return response.choices[0].text
```

## Conclusion

AI in education offers tremendous opportunities...
```

#### `content/blog/series/ai-fundamentals/series.md`
```markdown
---
title: "AI Fundamentals Series"
description: "A comprehensive series covering the basics of artificial intelligence"
slug: "ai-fundamentals"
thumbnail: "/assets/images/blog/series/ai-fundamentals.jpg"
status: "active"
episodeCount: 5
startDate: "2024-10-01"
languages:
  zh:
    title: "AI基础系列"
    description: "涵盖人工智能基础知识的综合系列"
---

# AI Fundamentals Series

This series covers the essential concepts and techniques in artificial intelligence, from basic machine learning to advanced deep learning topics.

## Series Overview

This 5-part series will take you through:

1. **Introduction to AI** - Understanding what AI is and its applications
2. **Machine Learning Basics** - Supervised, unsupervised, and reinforcement learning
3. **Deep Learning** - Neural networks and their applications
4. **Natural Language Processing** - Working with text and language
5. **Computer Vision** - Image recognition and processing

## Prerequisites

- Basic programming knowledge (Python preferred)
- High school level mathematics
- Curiosity about AI and technology

## Learning Outcomes

By the end of this series, you will:
- Understand core AI concepts and terminology
- Be able to implement basic ML algorithms
- Know when and how to apply different AI techniques
- Have hands-on experience with popular AI frameworks
```

### Ideas Files

#### `content/ideas/ai-education-platform.md`
```markdown
---
title: "Personalized AI Education Platform"
slug: "ai-education-platform"
status: "hypothesis"
priority: "high"
category: "Education"
estimatedDuration: 12
collaborationNeeded: true
fundingRequired: true
estimatedBudget: 50000
public: true
tags:
  - "AI"
  - "Education"
  - "Personalization"
  - "Platform"
languages:
  zh:
    title: "个性化AI教育平台"
---

# Personalized AI Education Platform

## Abstract

A comprehensive AI-powered education platform that adapts to individual learning styles, pace, and preferences to provide personalized learning experiences.

## Motivation

Current education systems are one-size-fits-all, leading to:
- Students falling behind or getting bored
- Inefficient learning processes
- Limited feedback and assessment
- Lack of personalization

## Methodology

### Phase 1: Research & Analysis
- Study existing education platforms
- Analyze learning patterns and behaviors
- Identify key personalization factors

### Phase 2: AI Model Development
- Develop student profiling algorithms
- Create content recommendation systems
- Build adaptive assessment tools

### Phase 3: Platform Development
- Design user-friendly interface
- Implement AI-powered features
- Create content management system

### Phase 4: Testing & Validation
- Pilot testing with select groups
- Gather feedback and iterate
- Measure learning outcome improvements

## Expected Outcomes

- 30% improvement in learning efficiency
- 80% student satisfaction rate
- Scalable platform for multiple subjects
- Reduced teacher workload by 40%

## Required Resources

### Technical
- AI/ML development team (3-4 engineers)
- Full-stack developers (2-3 developers)
- UI/UX designer (1 designer)
- Data scientist (1 specialist)

### Infrastructure
- Cloud computing resources
- Database systems
- AI model training infrastructure

### Funding
- Initial development: $30,000
- Infrastructure: $10,000
- Testing & validation: $10,000

## Collaboration Opportunities

- Educational institutions for pilot testing
- AI research labs for algorithm development
- Content creators for educational materials
- EdTech companies for platform integration

## Progress Updates

### 2024-12-01
- Completed initial market research
- Identified key stakeholders
- Started preliminary algorithm design

### 2024-11-15
- Literature review completed
- Competitive analysis finished
- Initial project proposal drafted
```

### Plans Files

#### `content/plans/2025.md`
```markdown
---
year: 2025
title: "Academic & Professional Growth Plan"
status: "active"
goals:
  - "Complete Master's degree with distinction"
  - "Secure PhD position in top-tier university"
  - "Publish 2 research papers"
  - "Launch AI education platform"
  - "Build strong professional network"
successMetrics:
  - "GPA > 3.8"
  - "3+ PhD acceptance letters"
  - "Papers in top conferences"
  - "1000+ platform users"
  - "50+ LinkedIn connections"
languages:
  zh:
    title: "学术与职业发展计划"
    goals:
      - "以优异成绩完成硕士学位"
      - "获得顶级大学博士职位"
      - "发表2篇研究论文"
      - "推出AI教育平台"
      - "建立强大的专业网络"
---

# 2025 Annual Plan: Academic & Professional Growth

## Overview

This year is crucial for my transition from Master's student to PhD researcher. The focus is on academic excellence, research output, and professional network building.

## Q1 Goals (Jan - Mar)

### Academic
- [ ] Complete advanced AI coursework
- [ ] Maintain GPA above 3.8
- [ ] Start thesis research

### Research
- [ ] Submit paper to ICML 2025
- [ ] Begin AI education platform research
- [ ] Establish research collaboration

### Professional
- [ ] Apply to 10 PhD programs
- [ ] Attend 2 academic conferences
- [ ] Network with 20 researchers

## Q2 Goals (Apr - Jun)

### Academic
- [ ] Complete thesis proposal
- [ ] Pass qualifying exams
- [ ] Begin thesis implementation

### Research
- [ ] Complete platform prototype
- [ ] Submit second paper
- [ ] Present at conference

### Professional
- [ ] Secure PhD admission
- [ ] Intern at research lab
- [ ] Expand professional network

## Projects Associated with This Plan

### High Priority
- **AI Education Platform** (Jan - Dec)
  - Status: Planning
  - Expected completion: Q4 2025
  
- **Knowledge Graph Research** (Mar - Aug)
  - Status: Not started
  - Expected completion: Q3 2025

### Medium Priority
- **Personal Website Enhancement** (Feb - Apr)
  - Status: In progress
  - Expected completion: Q2 2025

## Ideas to Explore

- **Automated Code Review Assistant** - Could be great for PhD research
- **Smart Learning Path Generator** - Aligns with education platform
- **Multi-modal AI Tutor** - Extension of current research

## Success Metrics

### Academic Excellence
- Maintain GPA > 3.8 ✓
- Complete all coursework on time
- Pass qualifying exams with distinction

### Research Impact
- 2 published papers in top-tier venues
- 100+ citations on previous work
- Establish research reputation

### Professional Growth
- Secure PhD position at top university
- Build network of 100+ professionals
- Gain recognition in AI education field

## Monthly Reviews

### January 2025
- Progress: 15%
- Key achievements: Started thesis research
- Challenges: Time management with coursework
- Next month focus: PhD applications

## Resources Needed

### Financial
- Conference travel: $5,000
- Research equipment: $2,000
- PhD application fees: $1,000

### Time Allocation
- Academic work: 40%
- Research: 35%
- Professional development: 15%
- Personal projects: 10%

### Support Network
- Academic advisor guidance
- Research mentor collaboration
- Peer study groups
- Industry professional connections

## Risk Assessment

### High Risk
- PhD admission competition
- Research timeline delays
- Funding limitations

### Mitigation Strategies
- Apply to multiple programs
- Start research early
- Seek multiple funding sources
- Build strong backup plans

## Year-End Vision

By December 2025:
- Graduated with Master's degree (GPA > 3.8)
- Secured PhD position starting Fall 2026
- Published 2 high-impact research papers
- Launched successful AI education platform
- Built strong professional network in AI/Education
- Established clear research direction for PhD
```

---

## Build Process

### Content Processing Pipeline

1. **Markdown Parsing**: Parse all `.md` files with frontmatter
2. **Multi-language Handling**: Extract language variants from frontmatter
3. **Asset Processing**: Optimize images, videos, and documents
4. **Cross-referencing**: Link related content automatically
5. **Static Site Generation**: Generate optimized HTML/CSS/JS

### Auto-generated Features

- **Resume Page**: Compiled from all resume/*.md files
- **Project Gallery**: Grid view of all projects with filtering
- **Blog System**: Articles, videos, and series with navigation
- **Ideas Dashboard**: Research ideas with status tracking
- **Plans Timeline**: Annual plans with progress visualization
- **Search**: Full-text search across all content
- **RSS Feed**: Auto-generated for blog content
- **Sitemap**: SEO-optimized site structure

---

## CLI Tool Implementation

### Core Commands

```bash
# Download and setup
silan-personal-website download [template-name]
# Creates: silan-config.json, content/, assets/, themes/

# Development server
silan-personal-website dev
# Serves on localhost:3000 with hot reload

# Build for production
silan-personal-website build
# Generates optimized static site in build/

# Deploy to GitHub Pages
silan-personal-website deploy
# Builds and pushes to gh-pages branch

# Create new content
silan-personal-website new project "My New Project"
silan-personal-website new blog "My Blog Post"
silan-personal-website new idea "Research Idea"

# Validate content
silan-personal-website validate
# Checks all markdown files for errors

# Theme management
silan-personal-website theme install dark-mode
silan-personal-website theme list
```

### Template System

```bash
# Available templates
silan-personal-website download minimal      # Basic personal site
silan-personal-website download academic     # Academic/researcher focus
silan-personal-website download developer    # Developer portfolio
silan-personal-website download creative     # Creative professionals
```

---

## Advantages of This System

### ✅ **Simplicity**
- No database setup required
- All content in familiar markdown format
- Git-friendly version control
- Easy backup and migration

### ✅ **Performance**
- Static site generation = lightning fast
- Optimized assets and images
- Minimal JavaScript footprint
- CDN-friendly structure

### ✅ **Maintainability**
- Content separated from code
- Clear file organization
- Version controlled content
- Easy to update and modify

### ✅ **Flexibility**
- Customizable themes
- Extensible through plugins
- Multi-language support
- Platform independent

### ✅ **Developer Experience**
- Simple CLI workflow
- Hot reload in development
- Built-in validation
- Easy deployment

---

## Migration Strategy

### From Current System

1. **Export Data**: Extract current mock data from API files
2. **Convert Format**: Transform to markdown with frontmatter
3. **Organize Files**: Place in appropriate content folders
4. **Configure**: Set up silan-config.json
5. **Build**: Generate static site
6. **Deploy**: Push to GitHub Pages or hosting service

### Example Migration Script

```bash
# Auto-migrate from current system
silan-personal-website migrate --from ./src/api --to ./content
# Converts all API mock data to markdown files
```

This simplified system eliminates database complexity while providing all the functionality you need in an easy-to-maintain, git-friendly format.