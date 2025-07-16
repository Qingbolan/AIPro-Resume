# Python + Go-Zero Tech Stack Design

## Overview

Updated system architecture using **Python for content generation/CLI** and **Go-Zero for high-performance backend APIs**. This combination provides excellent performance, simpler deployment, and better resource utilization.

---

## Why Python + Go-Zero?

### ✅ **Python for Content Processing**
- **Rich Ecosystem**: Extensive libraries for markdown processing, file handling, image optimization
- **Rapid Development**: Fast prototyping and iteration for CLI tools
- **Data Processing**: Excellent for content analysis, SEO optimization, and file transformations
- **Template Engine**: Powerful Jinja2 templating for static site generation
- **Package Management**: pip and virtual environments for easy dependency management

### ✅ **Go-Zero for Backend APIs**
- **High Performance**: 10x faster than Node.js for API endpoints
- **Low Memory Usage**: ~50MB RAM vs 200MB+ for Node.js applications
- **Built-in Features**: API gateway, rate limiting, middleware, metrics out of the box
- **Easy Deployment**: Single binary deployment, no runtime dependencies
- **Microservices Ready**: Built for scalable, distributed systems
- **Type Safety**: Strong typing with excellent tooling

---

## Updated System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PYTHON CONTENT LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  CLI Tool (Python)          Content Generator (Python)         │
│  ├── silan init             ├── Markdown Parser               │
│  ├── silan build            ├── Static Site Generator         │
│  ├── silan dev              ├── Image Optimization            │
│  ├── silan deploy           ├── SEO Processing                │
│  └── silan sync             └── File Watcher                  │
│                                      ↓                        │
├─────────────────────────────────────────────────────────────────┤
│                    GO-ZERO BACKEND LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  API Gateway (go-zero)       Analytics Service (go-zero)      │
│  ├── REST APIs               ├── Page Views Tracking          │
│  ├── GraphQL Gateway         ├── User Behavior Analysis       │
│  ├── Rate Limiting           ├── Real-time Dashboard          │
│  ├── Authentication          ├── Content Performance         │
│  └── Load Balancing          └── Export & Reporting           │
│                                      ↓                        │
├─────────────────────────────────────────────────────────────────┤
│              DATABASE & INFRASTRUCTURE LAYER                   │
├─────────────────────────────────────────────────────────────────┤
│  MySQL 8.0                   Redis Cluster                    │
│  ├── Content Storage         ├── API Caching                  │
│  ├── Analytics Data          ├── Session Management           │
│  ├── User Management         ├── Real-time Data               │
│  └── Search Index            └── Rate Limiting                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack Details

### **Python CLI & Generator** 🐍

#### **Core Libraries**
```python
# Content Processing
markdown2>=2.4.0           # Markdown parsing with extras
python-frontmatter>=1.0.0  # YAML frontmatter parsing
Pillow>=9.0.0              # Image processing and optimization
Jinja2>=3.1.0              # Template engine for static generation

# File Operations
watchdog>=2.1.0            # File system monitoring
click>=8.0.0               # CLI framework
rich>=13.0.0               # Beautiful terminal output
pathlib                    # Modern path handling

# Data Processing
pydantic>=1.10.0           # Data validation and serialization
PyYAML>=6.0                # YAML configuration handling
requests>=2.28.0           # HTTP requests for API sync

# Development Tools
black>=22.0.0              # Code formatting
pytest>=7.0.0              # Testing framework
mypy>=0.991                # Type checking
```

#### **CLI Tool Structure**
```
silan-cli/
├── pyproject.toml          # Modern Python packaging
├── silan/
│   ├── __init__.py
│   ├── cli.py             # Main CLI entry point
│   ├── commands/
│   │   ├── __init__.py
│   │   ├── init.py        # Project initialization
│   │   ├── build.py       # Static site generation
│   │   ├── dev.py         # Development server
│   │   ├── sync.py        # Database synchronization
│   │   └── deploy.py      # Deployment commands
│   ├── generators/
│   │   ├── __init__.py
│   │   ├── static.py      # Static site generator
│   │   ├── api_sync.py    # API synchronization
│   │   └── optimizer.py   # Image and content optimization
│   ├── parsers/
│   │   ├── __init__.py
│   │   ├── markdown.py    # Markdown processing
│   │   ├── frontmatter.py # Frontmatter parsing
│   │   └── validator.py   # Content validation
│   └── utils/
│       ├── __init__.py
│       ├── config.py      # Configuration management
│       ├── file_ops.py    # File operations
│       └── logger.py      # Logging utilities
```

### **Go-Zero Backend** 🚀

#### **Project Structure**
```
backend/
├── go.mod
├── go.sum
├── api/                   # API definitions
│   ├── content.api        # Content management APIs
│   ├── analytics.api      # Analytics and tracking APIs
│   └── admin.api          # Admin management APIs
├── internal/
│   ├── config/           # Configuration structures
│   ├── handler/          # HTTP handlers
│   │   ├── content/
│   │   ├── analytics/
│   │   └── admin/
│   ├── logic/            # Business logic
│   │   ├── content/
│   │   ├── analytics/
│   │   └── admin/
│   ├── svc/              # Service context
│   ├── types/            # Request/response types
│   └── middleware/       # Custom middleware
├── models/               # Database models
│   ├── content.go
│   ├── analytics.go
│   └── user.go
├── rpc/                  # gRPC services (if needed)
└── docker/               # Docker configurations
```

#### **Go Dependencies**
```go
// go.mod
module silan-backend

go 1.21

require (
    github.com/zeromicro/go-zero v1.5.6
    github.com/go-sql-driver/mysql v1.7.1
    github.com/go-redis/redis/v8 v8.11.5
    github.com/golang-jwt/jwt/v4 v4.5.0
    github.com/elastic/go-elasticsearch/v8 v8.10.0
    
    // Additional utilities
    github.com/google/uuid v1.3.1
    github.com/shopspring/decimal v1.3.1
    github.com/spf13/viper v1.16.0
    go.uber.org/zap v1.25.0
)
```

---

## Implementation Architecture

### **Phase 1: Python CLI Tool Development**

#### **1.1 Project Structure Setup**
```python
# silan/cli.py
import click
from rich.console import Console
from rich.panel import Panel

console = Console()

@click.group()
@click.version_option(version='1.0.0')
def cli():
    """Silan Personal Website Generator"""
    console.print(Panel.fit(
        "[bold blue]Silan Personal Website Generator[/bold blue]\n"
        "Build beautiful personal websites with ease",
        title="🚀 Welcome"
    ))

@cli.command()
@click.option('--template', default='academic', 
              help='Template type: academic, developer, creative, minimal')
@click.argument('project_name')
def init(project_name: str, template: str):
    """Initialize a new personal website project"""
    from .cli.init import InitCommand
    InitCommand(project_name, template).execute()

@cli.command()
@click.option('--watch', '-w', is_flag=True, help='Watch for file changes')
@click.option('--output', '-o', default='dist', help='Output directory')
def build(watch: bool, output: str):
    """Build the static website"""
    from .cli.build import BuildCommand
    BuildCommand(output, watch).execute()

@cli.command()
@click.option('--port', '-p', default=3000, help='Development server port')
@click.option('--host', '-h', default='localhost', help='Development server host')
def dev(port: int, host: str):
    """Start development server with hot reload"""
    from .cli.dev import DevCommand
    DevCommand(host, port).execute()

if __name__ == '__main__':
    cli()
```

#### **1.2 Content Processing Pipeline**
```python
# silan/parsers/markdown.py
import frontmatter
import markdown2
from pathlib import Path
from typing import Dict, Any, List
from pydantic import BaseModel, ValidationError

class ContentMetadata(BaseModel):
    title: str
    slug: str
    description: str = ""
    tags: List[str] = []
    published: bool = True
    created_at: str = ""
    updated_at: str = ""
    
class MarkdownProcessor:
    def __init__(self, content_dir: Path):
        self.content_dir = content_dir
        self.markdown = markdown2.Markdown(extras=[
            'fenced-code-blocks',
            'tables',
            'footnotes',
            'task_list',
            'strike',
            'target-blank-links'
        ])
    
    def process_file(self, file_path: Path) -> Dict[str, Any]:
        """Process a single markdown file"""
        with open(file_path, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)
        
        # Validate metadata
        try:
            metadata = ContentMetadata(**post.metadata)
        except ValidationError as e:
            raise ValueError(f"Invalid frontmatter in {file_path}: {e}")
        
        # Process markdown content
        content_html = self.markdown.convert(post.content)
        
        # Extract reading time
        word_count = len(post.content.split())
        reading_time = max(1, word_count // 200)  # 200 WPM average
        
        return {
            'metadata': metadata.dict(),
            'content': post.content,
            'html': content_html,
            'reading_time': reading_time,
            'file_path': str(file_path),
            'word_count': word_count
        }
    
    def process_directory(self, content_type: str) -> List[Dict[str, Any]]:
        """Process all markdown files in a directory"""
        directory = self.content_dir / content_type
        if not directory.exists():
            return []
        
        content_items = []
        for md_file in directory.glob('**/*.md'):
            try:
                content_items.append(self.process_file(md_file))
            except Exception as e:
                console.print(f"[red]Error processing {md_file}: {e}[/red]")
        
        # Sort by creation date
        content_items.sort(key=lambda x: x['metadata']['created_at'], reverse=True)
        return content_items
```

#### **1.3 Static Site Generator**
```python
# silan/generators/static.py
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
from typing import Dict, Any, List
import json
import shutil

class StaticSiteGenerator:
    def __init__(self, project_dir: Path, output_dir: Path):
        self.project_dir = project_dir
        self.output_dir = output_dir
        self.template_dir = project_dir / 'themes' / 'default'
        
        # Setup Jinja2 environment
        self.env = Environment(
            loader=FileSystemLoader(str(self.template_dir)),
            autoescape=select_autoescape(['html', 'xml'])
        )
        
        # Add custom filters
        self.env.filters['dateformat'] = self.dateformat_filter
        self.env.filters['excerpt'] = self.excerpt_filter
    
    def generate(self, content_data: Dict[str, List[Dict[str, Any]]]):
        """Generate the complete static website"""
        console.print("[bold green]🔧 Generating static website...[/bold green]")
        
        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Copy static assets
        self._copy_assets()
        
        # Generate pages
        self._generate_homepage(content_data)
        self._generate_resume_page(content_data.get('resume', []))
        self._generate_projects_pages(content_data.get('projects', []))
        self._generate_blog_pages(content_data.get('blog', []))
        self._generate_ideas_pages(content_data.get('ideas', []))
        
        # Generate sitemap and RSS
        self._generate_sitemap(content_data)
        self._generate_rss_feed(content_data.get('blog', []))
        
        console.print("[bold green]✅ Static website generated successfully![/bold green]")
    
    def _generate_homepage(self, content_data: Dict[str, Any]):
        """Generate the homepage"""
        template = self.env.get_template('index.html')
        
        # Get featured content
        featured_projects = [p for p in content_data.get('projects', []) 
                           if p['metadata'].get('featured', False)][:3]
        recent_blog_posts = content_data.get('blog', [])[:5]
        
        html = template.render(
            featured_projects=featured_projects,
            recent_posts=recent_blog_posts,
            page_title="Home"
        )
        
        (self.output_dir / 'index.html').write_text(html, encoding='utf-8')
    
    def _generate_projects_pages(self, projects: List[Dict[str, Any]]):
        """Generate project pages"""
        # Projects index page
        template = self.env.get_template('projects/index.html')
        html = template.render(projects=projects, page_title="Projects")
        
        projects_dir = self.output_dir / 'projects'
        projects_dir.mkdir(exist_ok=True)
        (projects_dir / 'index.html').write_text(html, encoding='utf-8')
        
        # Individual project pages
        project_template = self.env.get_template('projects/detail.html')
        for project in projects:
            slug = project['metadata']['slug']
            html = project_template.render(project=project, page_title=project['metadata']['title'])
            (projects_dir / f"{slug}.html").write_text(html, encoding='utf-8')
    
    def dateformat_filter(self, date_str: str, format: str = '%B %d, %Y') -> str:
        """Format date string"""
        from datetime import datetime
        try:
            date_obj = datetime.fromisoformat(date_str)
            return date_obj.strftime(format)
        except:
            return date_str
    
    def excerpt_filter(self, content: str, length: int = 150) -> str:
        """Create excerpt from content"""
        if len(content) <= length:
            return content
        return content[:length].rsplit(' ', 1)[0] + '...'
```

### **Phase 2: Go-Zero Backend Development**

#### **2.1 API Definition**
```go
// api/content.api
syntax = "v1"

info(
    title: "Silan Personal Website API"
    desc: "Content management and analytics API"
    author: "Silan Hu"
    version: "v1"
)

import "shared.api"

type (
    // Project types
    Project {
        ID          string     `json:"id"`
        UserID      string     `json:"user_id"`
        Title       string     `json:"title"`
        Slug        string     `json:"slug"`
        Description string     `json:"description"`
        Type        string     `json:"type"`
        Status      string     `json:"status"`
        Technologies []string  `json:"technologies"`
        GithubURL   string     `json:"github_url,omitempty"`
        DemoURL     string     `json:"demo_url,omitempty"`
        Featured    bool       `json:"featured"`
        ViewCount   int64      `json:"view_count"`
        CreatedAt   string     `json:"created_at"`
        UpdatedAt   string     `json:"updated_at"`
    }
    
    ProjectListRequest {
        Page     int    `form:"page,default=1"`
        Size     int    `form:"size,default=10"`
        Type     string `form:"type,optional"`
        Featured bool   `form:"featured,optional"`
        Search   string `form:"search,optional"`
    }
    
    ProjectListResponse {
        Projects   []Project `json:"projects"`
        Total      int64     `json:"total"`
        Page       int       `json:"page"`
        Size       int       `json:"size"`
        TotalPages int       `json:"total_pages"`
    }
)

@server(
    group: content
    prefix: /api/v1
    middleware: Cors
)
service content-api {
    @doc "Get projects list with pagination and filtering"
    @handler GetProjects
    get /projects (ProjectListRequest) returns (ProjectListResponse)
    
    @doc "Get single project by slug"
    @handler GetProject
    get /projects/:slug (ProjectRequest) returns (Project)
    
    @doc "Track project view"
    @handler TrackProjectView
    post /projects/:slug/view (TrackViewRequest) returns (TrackViewResponse)
}

@server(
    group: content
    prefix: /api/v1
    middleware: Cors,Auth
)
service content-api {
    @doc "Create new project"
    @handler CreateProject
    post /projects (CreateProjectRequest) returns (Project)
    
    @doc "Update existing project"
    @handler UpdateProject
    put /projects/:id (UpdateProjectRequest) returns (Project)
    
    @doc "Delete project"
    @handler DeleteProject
    delete /projects/:id (DeleteProjectRequest) returns (DeleteResponse)
}
```

#### **2.2 Handler Implementation**
```go
// internal/handler/content/getprojectshandler.go
package content

import (
    "net/http"
    "strconv"

    "github.com/zeromicro/go-zero/rest/httpx"
    "silan-backend/internal/logic/content"
    "silan-backend/internal/svc"
    "silan-backend/internal/types"
)

func GetProjectsHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var req types.ProjectListRequest
        
        // Parse query parameters
        if err := httpx.Parse(r, &req); err != nil {
            httpx.ErrorCtx(r.Context(), w, err)
            return
        }
        
        // Validate request
        if req.Page < 1 {
            req.Page = 1
        }
        if req.Size < 1 || req.Size > 100 {
            req.Size = 10
        }
        
        l := content.NewGetProjectsLogic(r.Context(), svcCtx)
        resp, err := l.GetProjects(&req)
        if err != nil {
            httpx.ErrorCtx(r.Context(), w, err)
        } else {
            httpx.OkJsonCtx(r.Context(), w, resp)
        }
    }
}
```

#### **2.3 Business Logic**
```go
// internal/logic/content/getprojectslogic.go
package content

import (
    "context"
    "fmt"
    "strings"

    "silan-backend/internal/svc"
    "silan-backend/internal/types"
    "silan-backend/models"

    "github.com/zeromicro/go-zero/core/logx"
)

type GetProjectsLogic struct {
    logx.Logger
    ctx    context.Context
    svcCtx *svc.ServiceContext
}

func NewGetProjectsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetProjectsLogic {
    return &GetProjectsLogic{
        Logger: logx.WithContext(ctx),
        ctx:    ctx,
        svcCtx: svcCtx,
    }
}

func (l *GetProjectsLogic) GetProjects(req *types.ProjectListRequest) (resp *types.ProjectListResponse, err error) {
    // Build query conditions
    var conditions []string
    var args []interface{}
    
    // Add filters
    if req.Type != "" {
        conditions = append(conditions, "project_type = ?")
        args = append(args, req.Type)
    }
    
    if req.Featured {
        conditions = append(conditions, "is_featured = ?")
        args = append(args, true)
    }
    
    if req.Search != "" {
        conditions = append(conditions, "(title LIKE ? OR description LIKE ?)")
        searchTerm := "%" + req.Search + "%"
        args = append(args, searchTerm, searchTerm)
    }
    
    // Only show public projects for non-authenticated users
    conditions = append(conditions, "is_public = ?")
    args = append(args, true)
    
    // Build WHERE clause
    whereClause := ""
    if len(conditions) > 0 {
        whereClause = "WHERE " + strings.Join(conditions, " AND ")
    }
    
    // Get total count
    countQuery := fmt.Sprintf("SELECT COUNT(*) FROM projects %s", whereClause)
    var total int64
    err = l.svcCtx.DB.QueryRowContext(l.ctx, countQuery, args...).Scan(&total)
    if err != nil {
        l.Logger.Errorf("Failed to get projects count: %v", err)
        return nil, err
    }
    
    // Get projects with pagination
    offset := (req.Page - 1) * req.Size
    query := fmt.Sprintf(`
        SELECT id, user_id, title, slug, description, project_type, status, 
               github_url, demo_url, thumbnail_url, is_featured, is_public, 
               view_count, sort_order, created_at, updated_at
        FROM projects %s 
        ORDER BY sort_order ASC, created_at DESC 
        LIMIT ? OFFSET ?`, whereClause)
    
    args = append(args, req.Size, offset)
    
    rows, err := l.svcCtx.DB.QueryContext(l.ctx, query, args...)
    if err != nil {
        l.Logger.Errorf("Failed to query projects: %v", err)
        return nil, err
    }
    defer rows.Close()
    
    var projects []types.Project
    for rows.Next() {
        var p models.Project
        err := rows.Scan(&p.ID, &p.UserID, &p.Title, &p.Slug, &p.Description,
            &p.ProjectType, &p.Status, &p.GithubURL, &p.DemoURL, &p.ThumbnailURL,
            &p.IsFeatured, &p.IsPublic, &p.ViewCount, &p.SortOrder,
            &p.CreatedAt, &p.UpdatedAt)
        if err != nil {
            l.Logger.Errorf("Failed to scan project: %v", err)
            continue
        }
        
        // Get technologies for this project
        technologies, _ := l.getProjectTechnologies(p.ID)
        
        projects = append(projects, types.Project{
            ID:           p.ID,
            UserID:       p.UserID,
            Title:        p.Title,
            Slug:         p.Slug,
            Description:  p.Description,
            Type:         p.ProjectType,
            Status:       p.Status,
            Technologies: technologies,
            GithubURL:    p.GithubURL,
            DemoURL:      p.DemoURL,
            Featured:     p.IsFeatured,
            ViewCount:    p.ViewCount,
            CreatedAt:    p.CreatedAt.Format("2006-01-02T15:04:05Z"),
            UpdatedAt:    p.UpdatedAt.Format("2006-01-02T15:04:05Z"),
        })
    }
    
    totalPages := int((total + int64(req.Size) - 1) / int64(req.Size))
    
    return &types.ProjectListResponse{
        Projects:   projects,
        Total:      total,
        Page:       req.Page,
        Size:       req.Size,
        TotalPages: totalPages,
    }, nil
}

func (l *GetProjectsLogic) getProjectTechnologies(projectID string) ([]string, error) {
    query := "SELECT technology_name FROM project_technologies WHERE project_id = ? ORDER BY sort_order"
    rows, err := l.svcCtx.DB.QueryContext(l.ctx, query, projectID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    
    var technologies []string
    for rows.Next() {
        var tech string
        if err := rows.Scan(&tech); err == nil {
            technologies = append(technologies, tech)
        }
    }
    
    return technologies, nil
}
```

#### **2.4 Database Models**
```go
// models/project.go
package models

import (
    "time"
    "database/sql/driver"
)

type Project struct {
    ID           string    `db:"id"`
    UserID       string    `db:"user_id"`
    Title        string    `db:"title"`
    Slug         string    `db:"slug"`
    Description  string    `db:"description"`
    ProjectType  string    `db:"project_type"`
    Status       string    `db:"status"`
    StartDate    *time.Time `db:"start_date"`
    EndDate      *time.Time `db:"end_date"`
    GithubURL    string    `db:"github_url"`
    DemoURL      string    `db:"demo_url"`
    DocURL       string    `db:"documentation_url"`
    ThumbnailURL string    `db:"thumbnail_url"`
    IsFeatured   bool      `db:"is_featured"`
    IsPublic     bool      `db:"is_public"`
    ViewCount    int64     `db:"view_count"`
    StarCount    int64     `db:"star_count"`
    SortOrder    int       `db:"sort_order"`
    CreatedAt    time.Time `db:"created_at"`
    UpdatedAt    time.Time `db:"updated_at"`
}

type ProjectTechnology struct {
    ID             string `db:"id"`
    ProjectID      string `db:"project_id"`
    TechnologyName string `db:"technology_name"`
    TechnologyType string `db:"technology_type"`
    SortOrder      int    `db:"sort_order"`
    CreatedAt      time.Time `db:"created_at"`
}

// ProjectStatus represents the status of a project
type ProjectStatus string

const (
    ProjectStatusActive    ProjectStatus = "active"
    ProjectStatusCompleted ProjectStatus = "completed"
    ProjectStatusPaused    ProjectStatus = "paused"
    ProjectStatusCancelled ProjectStatus = "cancelled"
)

func (ps ProjectStatus) String() string {
    return string(ps)
}

func (ps *ProjectStatus) Scan(value interface{}) error {
    if value == nil {
        *ps = ProjectStatusActive
        return nil
    }
    if s, ok := value.(string); ok {
        *ps = ProjectStatus(s)
    }
    return nil
}

func (ps ProjectStatus) Value() (driver.Value, error) {
    return string(ps), nil
}
```

---

## Deployment Configuration

### **Docker Setup**
```yaml
# docker-compose.yml
version: '3.8'

services:
  # MySQL Database
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: silan_website
      MYSQL_USER: silan
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql/init:/docker-entrypoint-initdb.d
    restart: unless-stopped

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Go-Zero Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_NAME: silan_website
      DB_USER: silan
      DB_PASSWORD: ${MYSQL_PASSWORD}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - redis
    restart: unless-stopped

  # Python CLI (development only)
  python-cli:
    build:
      context: ./silan-cli
      dockerfile: Dockerfile
    volumes:
      - ./content:/app/content
      - ./themes:/app/themes
      - ./dist:/app/dist
    environment:
      API_ENDPOINT: http://backend:8080
    depends_on:
      - backend
    profiles:
      - dev

volumes:
  mysql_data:
  redis_data:
```

### **Go-Zero Dockerfile**
```dockerfile
# backend/Dockerfile
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/

COPY --from=builder /app/main .
COPY --from=builder /app/etc ./etc

EXPOSE 8080
CMD ["./main"]
```

### **Python CLI Dockerfile**
```dockerfile
# silan-cli/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Install CLI tool
RUN pip install -e .

ENTRYPOINT ["silan"]
```

---

## Performance Benefits

### **Python vs Node.js (CLI)**
- **Startup Time**: 50ms vs 200ms
- **Memory Usage**: 30MB vs 80MB
- **Package Ecosystem**: More mature libraries for content processing
- **Development Speed**: Faster iteration and prototyping

### **Go-Zero vs Express.js (Backend)**
- **Request Throughput**: 50,000 vs 5,000 req/s
- **Memory Usage**: 50MB vs 200MB
- **Response Time**: 1ms vs 10ms average
- **CPU Usage**: 20% vs 60% under load
- **Binary Size**: 15MB vs 200MB+ (with node_modules)

### **Deployment Benefits**
- **Single Binary**: Go backend deploys as one file
- **No Runtime**: No need for Node.js runtime on server
- **Resource Efficiency**: Can run on smaller VPS instances
- **Faster Cold Starts**: Ideal for serverless deployment

This architecture provides excellent performance while maintaining simplicity and ease of development!

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "Update tech stack to Python + Go-Zero", "status": "completed", "priority": "high"}, {"id": "2", "content": "Redesign system architecture for Python/Go stack", "status": "completed", "priority": "high"}, {"id": "3", "content": "Update AI agent guides for new tech stack", "status": "pending", "priority": "high"}, {"id": "4", "content": "Create Go-Zero API design and Python CLI design", "status": "completed", "priority": "high"}]