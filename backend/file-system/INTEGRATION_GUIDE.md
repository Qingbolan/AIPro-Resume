# Silan 整合后端系统使用指南

这个整合系统将Python的silan CLI工具与Go后端结合，提供了一个完整的内容管理和API后端解决方案。

## 🚀 快速开始

### 1. 安装

```bash
# 安装Python包（包含Go后端）
pip install silan-database-tools

# 或者在开发环境中
pip install -e .
```

### 2. 初始化项目

```bash
# 创建带后端支持的新项目
silan init my-portfolio --with-backend --language zh

# 进入项目目录
cd my-portfolio
```

### 3. 安装Go后端二进制文件

```bash
# 安装/构建Go后端
silan backend install
```

### 4. 同步内容到数据库

```bash
# 同步内容到SQLite数据库
silan db-sync --db-type sqlite --db-path portfolio.db

# 或者同步到MySQL
silan db-sync --db-type mysql --host localhost --user root --database my_portfolio

# 或者同步到PostgreSQL
silan db-sync --db-type postgresql --host localhost --user postgres --database my_portfolio
```

### 5. 启动后端服务器

```bash
# 启动后端服务器（SQLite）
silan backend start --db-type sqlite --db-path portfolio.db

# 启动后端服务器（MySQL）
silan backend start --db-type mysql --host localhost --user root --database my_portfolio

# 后台运行
silan backend start --db-type sqlite --daemon
```

## 📋 完整命令参考

### 项目管理

```bash
# 初始化项目
silan init <project-name> [--language en|zh|both] [--with-backend]

# 查看项目状态
silan status

# 清理临时文件
silan clean
```

### 数据库同步

```bash
# 基本同步命令
silan db-sync --db-type <type> [options]

# SQLite选项
--db-path <path>              # 数据库文件路径（默认：portfolio.db）

# MySQL/PostgreSQL选项  
--host <host>                 # 数据库主机（默认：localhost）
--port <port>                 # 数据库端口（MySQL: 3306, PostgreSQL: 5432）
--user <user>                 # 数据库用户
--password <password>         # 数据库密码
--database <name>             # 数据库名称

# 通用选项
--dry-run                     # 预览模式，不实际执行
--create-tables              # 创建数据库表（如果不存在）
--start-backend              # 同步后启动后端服务器
```

### 后端管理

```bash
# 安装后端二进制文件
silan backend install

# 启动后端服务器
silan backend start [options]
  --db-type <type>            # 数据库类型
  --server-host <host>        # 服务器监听主机（默认：0.0.0.0）
  --server-port <port>        # 服务器端口（默认：8888）
  --daemon                    # 后台运行
  --config-file <path>        # 自定义配置文件

# 停止后端服务器
silan backend stop

# 重启后端服务器
silan backend restart

# 查看后端状态
silan backend status

# 查看后端日志
silan backend logs [--follow] [--lines <n>]
```

## 🗄️ 数据库配置

### SQLite（推荐用于开发和小型项目）

```bash
silan db-sync --db-type sqlite --db-path portfolio.db
silan backend start --db-type sqlite --db-path portfolio.db
```

### MySQL

```bash
# 同步到MySQL
silan db-sync \
  --db-type mysql \
  --host localhost \
  --port 3306 \
  --user root \
  --password your_password \
  --database silan_portfolio

# 启动后端连接MySQL
silan backend start \
  --db-type mysql \
  --host localhost \
  --user root \
  --password your_password \
  --database silan_portfolio
```

### PostgreSQL

```bash
# 同步到PostgreSQL
silan db-sync \
  --db-type postgresql \
  --host localhost \
  --port 5432 \
  --user postgres \
  --password your_password \
  --database silan_portfolio

# 启动后端连接PostgreSQL
silan backend start \
  --db-type postgresql \
  --host localhost \
  --user postgres \
  --password your_password \
  --database silan_portfolio
```

## 🔧 环境变量配置

您也可以使用环境变量来配置数据库连接：

```bash
# 数据库配置
export DB_DRIVER=mysql          # 或 postgres, sqlite3
export DB_HOST=localhost
export DB_PORT=3306
export DB_USER=root
export DB_PASSWORD=your_password
export DB_NAME=silan_portfolio

# 对于SQLite
export DB_DRIVER=sqlite3
export DB_SOURCE=portfolio.db

# 启动后端（会自动读取环境变量）
silan backend start
```

## 📁 项目结构

```
my-portfolio/
├── content/                    # 内容文件
│   ├── resume/resume.md       # 简历信息
│   ├── projects/              # 项目文档
│   ├── blog/                  # 博客文章
│   ├── ideas/                 # 研究想法
│   └── plans/                 # 年度计划
├── .silan/                    # Silan配置目录
│   └── backend/               # 后端相关文件
│       ├── backend-config.yaml
│       ├── backend.log
│       └── backend.pid
├── silan-config.json         # 主配置文件
├── start-backend.sh          # 启动脚本（如果使用--with-backend）
└── portfolio.db              # SQLite数据库（如果使用SQLite）
```

## 🌐 API端点

后端启动后，您可以通过以下端点访问数据：

```
# 基础URL
http://localhost:8888

# 简历相关
GET /api/v1/resume/              # 完整简历数据
GET /api/v1/resume/personal      # 个人信息
GET /api/v1/resume/education     # 教育背景
GET /api/v1/resume/experience    # 工作经验
GET /api/v1/resume/awards        # 获奖情况

# 项目相关
GET /api/v1/projects/            # 项目列表
GET /api/v1/projects/{slug}      # 单个项目详情
GET /api/v1/projects/categories  # 项目分类

# 博客相关
GET /api/v1/blog/posts           # 博客文章列表
GET /api/v1/blog/posts/{slug}    # 单篇文章
GET /api/v1/blog/categories      # 博客分类

# 想法相关
GET /api/v1/ideas/               # 想法列表
GET /api/v1/ideas/{id}           # 单个想法详情

# 计划相关
GET /api/v1/plans/annual         # 年度计划列表
GET /api/v1/plans/annual/{name}  # 特定年度计划
```

## 🔄 工作流程示例

### 开发工作流程

```bash
# 1. 创建新项目
silan init my-blog --with-backend --language zh

# 2. 进入项目目录
cd my-blog

# 3. 编辑内容文件
# 编辑 content/blog/my-first-post.md
# 编辑 content/projects/my-project.md

# 4. 安装后端
silan backend install

# 5. 同步到数据库
silan db-sync --db-type sqlite --create-tables

# 6. 启动后端服务器
silan backend start --db-type sqlite --daemon

# 7. 检查状态
silan status

# 8. 查看API数据
curl http://localhost:8888/api/v1/blog/posts
```

### 生产部署工作流程

```bash
# 1. 同步到生产数据库
silan db-sync \
  --db-type postgresql \
  --host prod-db.example.com \
  --user app_user \
  --database production_portfolio

# 2. 启动生产后端服务器
silan backend start \
  --db-type postgresql \
  --host prod-db.example.com \
  --user app_user \
  --database production_portfolio \
  --server-host 0.0.0.0 \
  --server-port 8888 \
  --daemon

# 3. 检查服务状态
silan backend status
```

## 🛠️ 故障排除

### 后端启动失败

```bash
# 检查Go是否安装
go version

# 重新安装后端
silan backend install

# 查看详细日志
silan backend logs --follow
```

### 数据库连接问题

```bash
# 测试数据库连接（dry run）
silan db-sync --dry-run --db-type mysql --host localhost

# 检查数据库配置
silan status
```

### 端口冲突

```bash
# 使用不同端口启动
silan backend start --server-port 9999

# 检查端口占用
netstat -tulpn | grep :8888
```

## 📝 注意事项

1. **数据库权限**：确保数据库用户有创建表和插入数据的权限
2. **防火墙设置**：确保后端服务器端口没有被防火墙阻止
3. **文件权限**：确保Silan有权限创建`.silan`目录和相关文件
4. **Go环境**：首次使用时需要安装Go编译器来构建后端二进制文件

## 🎯 最佳实践

1. **开发环境**：使用SQLite进行本地开发
2. **生产环境**：使用MySQL或PostgreSQL作为生产数据库
3. **备份**：定期备份数据库，特别是在内容同步之前
4. **版本控制**：将内容文件纳入Git版本控制，但排除数据库文件
5. **监控**：在生产环境中监控后端服务器状态和性能

这个整合系统为您提供了一个强大而灵活的内容管理和API后端解决方案，支持多种数据库类型和部署场景。 