# MySQL Database Design - Optimized for Personal Website

## Overview

A MySQL-optimized database design for the personal website system, taking advantage of MySQL's performance characteristics, storage engines, and specific features for better resource usage and easier deployment.

---

## Why MySQL?

### ✅ **Better for Personal Websites**
- **Lightweight**: Lower memory footprint than PostgreSQL
- **Simpler Setup**: Easier installation and configuration
- **Wide Hosting Support**: Available on most shared hosting providers
- **Cost Effective**: Better performance on smaller instances
- **Mature Ecosystem**: Extensive tooling and community support

### ✅ **Performance Benefits**
- **MyISAM for Read-Heavy Tables**: Analytics and logs
- **InnoDB for Transactional Data**: User content and interactions
- **Built-in Full-Text Search**: No need for external search engines
- **Query Cache**: Automatic caching of SELECT queries
- **Partitioning**: Easy table partitioning for time-series data

---

## Database Configuration

### MySQL Settings Optimization

```ini
# /etc/mysql/conf.d/silan-website.cnf
[mysqld]
# Basic settings
default-storage-engine = InnoDB
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# Memory optimization for small-medium sites
innodb_buffer_pool_size = 256M
query_cache_type = 1
query_cache_size = 64M
query_cache_limit = 2M

# Connection settings
max_connections = 100
thread_cache_size = 8

# InnoDB settings
innodb_file_per_table = 1
innodb_flush_log_at_trx_commit = 2
innodb_log_file_size = 64M

# Full-text search
ft_min_word_len = 3
ft_max_word_len = 84

# Slow query logging
slow_query_log = 1
long_query_time = 2
slow_query_log_file = /var/log/mysql/slow.log
```

---

## Core Database Schema

### 1. Users and Authentication

```sql
-- Users table
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_active (is_active),
    FULLTEXT idx_search_users (first_name, last_name, bio)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Languages table
CREATE TABLE languages (
    code VARCHAR(5) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    native_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert default languages
INSERT INTO languages (code, name, native_name) VALUES
('en', 'English', 'English'),
('zh', 'Chinese', '中文');
```

### 2. Personal Information & Resume

```sql
-- Personal information
CREATE TABLE personal_info (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    current_status TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    location VARCHAR(200),
    website VARCHAR(500),
    avatar_url VARCHAR(500),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_primary (user_id, is_primary),
    INDEX idx_user_id (user_id),
    FULLTEXT idx_search_personal (full_name, title, current_status)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Personal info translations
CREATE TABLE personal_info_translations (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    personal_info_id CHAR(36) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    full_name VARCHAR(200),
    title VARCHAR(200),
    current_status TEXT,
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (personal_info_id) REFERENCES personal_info(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE KEY uk_personal_lang (personal_info_id, language_code),
    INDEX idx_language (language_code)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Social links
CREATE TABLE social_links (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    personal_info_id CHAR(36) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL,
    display_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (personal_info_id) REFERENCES personal_info(id) ON DELETE CASCADE,
    INDEX idx_personal_info (personal_info_id),
    INDEX idx_platform (platform),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Education
CREATE TABLE education (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    field_of_study VARCHAR(200),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    gpa VARCHAR(10),
    location VARCHAR(200),
    institution_website VARCHAR(500),
    institution_logo_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_sort (sort_order),
    FULLTEXT idx_search_education (institution, degree, field_of_study)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Education translations
CREATE TABLE education_translations (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    education_id CHAR(36) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    institution VARCHAR(200),
    degree VARCHAR(200),
    field_of_study VARCHAR(200),
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (education_id) REFERENCES education(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE KEY uk_education_lang (education_id, language_code)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Work experience
CREATE TABLE work_experience (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    company VARCHAR(200) NOT NULL,
    position VARCHAR(200) NOT NULL,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    location VARCHAR(200),
    company_website VARCHAR(500),
    company_logo_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_sort (sort_order),
    FULLTEXT idx_search_experience (company, position)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Work experience translations
CREATE TABLE work_experience_translations (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    work_experience_id CHAR(36) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    company VARCHAR(200),
    position VARCHAR(200),
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (work_experience_id) REFERENCES work_experience(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE KEY uk_experience_lang (work_experience_id, language_code)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Projects Portfolio

```sql
-- Projects
CREATE TABLE projects (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    project_type VARCHAR(50) NOT NULL,
    status ENUM('active', 'completed', 'paused', 'cancelled') DEFAULT 'active',
    start_date DATE,
    end_date DATE,
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    documentation_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    view_count INT UNSIGNED DEFAULT 0,
    star_count INT UNSIGNED DEFAULT 0,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_public (is_public),
    INDEX idx_type (project_type),
    INDEX idx_views (view_count),
    INDEX idx_sort (sort_order),
    FULLTEXT idx_search_projects (title, description)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Project translations
CREATE TABLE project_translations (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    project_id CHAR(36) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    project_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE KEY uk_project_lang (project_id, language_code),
    FULLTEXT idx_search_translations (title, description)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Project technologies
CREATE TABLE project_technologies (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    project_id CHAR(36) NOT NULL,
    technology_name VARCHAR(100) NOT NULL,
    technology_type VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE KEY uk_project_tech (project_id, technology_name),
    INDEX idx_technology (technology_name),
    INDEX idx_type (technology_type)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Blog System

```sql
-- Blog categories
CREATE TABLE blog_categories (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Blog tags
CREATE TABLE blog_tags (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    usage_count INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_usage (usage_count)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Blog posts
CREATE TABLE blog_posts (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    content_type ENUM('article', 'vlog', 'podcast', 'tutorial') DEFAULT 'article',
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    featured_image_url VARCHAR(500),
    reading_time_minutes INT UNSIGNED,
    view_count INT UNSIGNED DEFAULT 0,
    like_count INT UNSIGNED DEFAULT 0,
    comment_count INT UNSIGNED DEFAULT 0,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_published (published_at),
    INDEX idx_views (view_count),
    FULLTEXT idx_search_blog (title, excerpt, content)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Blog post translations
CREATE TABLE blog_post_translations (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    blog_post_id CHAR(36) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE KEY uk_blog_lang (blog_post_id, language_code),
    FULLTEXT idx_search_blog_translations (title, excerpt, content)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Ideas Management

```sql
-- Ideas
CREATE TABLE ideas (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    abstract TEXT,
    motivation TEXT,
    methodology TEXT,
    expected_outcome TEXT,
    status ENUM('draft', 'hypothesis', 'experimenting', 'validating', 'published', 'concluded') DEFAULT 'draft',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    estimated_duration_months INT UNSIGNED,
    required_resources TEXT,
    collaboration_needed BOOLEAN DEFAULT FALSE,
    funding_required BOOLEAN DEFAULT FALSE,
    estimated_budget DECIMAL(12,2),
    is_public BOOLEAN DEFAULT FALSE,
    view_count INT UNSIGNED DEFAULT 0,
    like_count INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_public (is_public),
    INDEX idx_collaboration (collaboration_needed),
    INDEX idx_funding (funding_required),
    FULLTEXT idx_search_ideas (title, abstract, motivation)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Idea translations
CREATE TABLE idea_translations (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    idea_id CHAR(36) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    title VARCHAR(300) NOT NULL,
    abstract TEXT,
    motivation TEXT,
    methodology TEXT,
    expected_outcome TEXT,
    required_resources TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code),
    UNIQUE KEY uk_idea_lang (idea_id, language_code),
    FULLTEXT idx_search_idea_translations (title, abstract, motivation)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## Analytics and Tracking (Optimized for MySQL)

### 1. Page Views and Analytics

```sql
-- User sessions (InnoDB for consistency)
CREATE TABLE user_sessions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    session_id VARCHAR(128) UNIQUE NOT NULL,
    user_id CHAR(36),
    ip_address VARCHAR(45) NOT NULL, -- Support IPv6
    user_agent TEXT NOT NULL,
    browser_fingerprint VARCHAR(256),
    device_info JSON,
    
    -- Session metrics
    page_views_count INT UNSIGNED DEFAULT 0,
    total_duration_seconds INT UNSIGNED DEFAULT 0,
    is_bounce BOOLEAN DEFAULT TRUE,
    
    -- Entry and exit
    entry_page VARCHAR(1000),
    exit_page VARCHAR(1000),
    entry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Location info
    country_code VARCHAR(2),
    region VARCHAR(100),
    city VARCHAR(100),
    timezone VARCHAR(50),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_ip (ip_address),
    INDEX idx_entry_time (entry_time),
    INDEX idx_last_activity (last_activity)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Page views (MyISAM for better INSERT performance on analytics)
CREATE TABLE page_views (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(128) NOT NULL,
    user_id CHAR(36),
    
    -- Page information
    page_type VARCHAR(50) NOT NULL,
    page_id CHAR(36),
    page_url VARCHAR(1000) NOT NULL,
    page_title VARCHAR(500),
    
    -- Referrer info
    referrer_url VARCHAR(1000),
    referrer_domain VARCHAR(200),
    traffic_source VARCHAR(50),
    
    -- Engagement metrics
    time_on_page INT UNSIGNED,
    scroll_depth_percentage TINYINT UNSIGNED,
    clicks_count SMALLINT UNSIGNED DEFAULT 0,
    
    -- Technical info
    load_time_ms SMALLINT UNSIGNED,
    viewport_width SMALLINT UNSIGNED,
    viewport_height SMALLINT UNSIGNED,
    is_mobile BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_page_type (page_type),
    INDEX idx_page_id (page_id),
    INDEX idx_created_at (created_at),
    INDEX idx_traffic_source (traffic_source)
) ENGINE=MyISAM CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Click events (MyISAM for analytics)
CREATE TABLE click_events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    page_view_id BIGINT UNSIGNED NOT NULL,
    session_id VARCHAR(128) NOT NULL,
    
    -- Click details
    element_type VARCHAR(50) NOT NULL,
    element_id VARCHAR(100),
    element_class VARCHAR(200),
    element_text VARCHAR(500),
    click_x SMALLINT UNSIGNED,
    click_y SMALLINT UNSIGNED,
    
    -- Context
    click_context VARCHAR(100),
    target_url VARCHAR(1000),
    is_external_link BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_page_view_id (page_view_id),
    INDEX idx_session_id (session_id),
    INDEX idx_element_type (element_type),
    INDEX idx_created_at (created_at)
) ENGINE=MyISAM CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Content Performance Metrics

```sql
-- Daily content metrics (MyISAM for fast aggregation)
CREATE TABLE content_metrics_daily (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content_type VARCHAR(50) NOT NULL,
    content_id CHAR(36) NOT NULL,
    metric_date DATE NOT NULL,
    
    -- View metrics
    unique_views INT UNSIGNED DEFAULT 0,
    total_views INT UNSIGNED DEFAULT 0,
    avg_time_on_page INT UNSIGNED DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0.00,
    
    -- Engagement metrics
    total_clicks INT UNSIGNED DEFAULT 0,
    social_shares INT UNSIGNED DEFAULT 0,
    comments_count INT UNSIGNED DEFAULT 0,
    likes_count INT UNSIGNED DEFAULT 0,
    
    -- Traffic sources
    organic_views INT UNSIGNED DEFAULT 0,
    social_views INT UNSIGNED DEFAULT 0,
    direct_views INT UNSIGNED DEFAULT 0,
    referral_views INT UNSIGNED DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_content_date (content_type, content_id, metric_date),
    INDEX idx_content_type (content_type),
    INDEX idx_content_id (content_id),
    INDEX idx_metric_date (metric_date)
) ENGINE=MyISAM CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Real-time popular content (InnoDB for consistency)
CREATE TABLE popular_content_cache (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    content_type VARCHAR(50) NOT NULL,
    content_id CHAR(36) NOT NULL,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(300) NOT NULL,
    view_count INT UNSIGNED NOT NULL,
    score DECIMAL(10,2) NOT NULL, -- Calculated popularity score
    cache_key VARCHAR(200) NOT NULL,
    cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 1 HOUR),
    
    UNIQUE KEY uk_cache_key (cache_key),
    INDEX idx_content_type (content_type),
    INDEX idx_score (score DESC),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Full-Text Search (MySQL Optimized)

```sql
-- Search index for full-text search
CREATE TABLE search_index (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    content_type VARCHAR(50) NOT NULL,
    content_id CHAR(36) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    
    -- Searchable content
    title TEXT NOT NULL,
    content MEDIUMTEXT NOT NULL,
    excerpt TEXT,
    tags VARCHAR(1000),
    
    -- Search weights
    title_weight DECIMAL(3,2) DEFAULT 1.0,
    content_weight DECIMAL(3,2) DEFAULT 0.8,
    excerpt_weight DECIMAL(3,2) DEFAULT 0.9,
    
    last_indexed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_content_lang (content_type, content_id, language_code),
    INDEX idx_content_type (content_type),
    INDEX idx_language (language_code),
    FULLTEXT idx_search_title (title),
    FULLTEXT idx_search_content (content),
    FULLTEXT idx_search_all (title, content, excerpt, tags)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## MySQL-Specific Optimizations

### 1. Storage Engine Selection

```sql
-- Content tables: InnoDB for ACID compliance
-- Analytics tables: MyISAM for faster INSERT/SELECT
-- Search tables: InnoDB for full-text search

-- Check current engines
SELECT 
    TABLE_NAME, 
    ENGINE 
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'silan_website';
```

### 2. Query Cache Optimization

```sql
-- Enable query cache for frequently accessed data
SET GLOBAL query_cache_type = ON;
SET GLOBAL query_cache_size = 67108864; -- 64MB

-- Queries that benefit from caching
SELECT SQL_CACHE 
    p.id, p.title, p.slug, p.description, p.view_count
FROM projects p 
WHERE p.is_public = 1 AND p.status = 'active'
ORDER BY p.view_count DESC 
LIMIT 10;
```

### 3. Partitioning for Time-Series Data

```sql
-- Partition page_views by year
ALTER TABLE page_views 
PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p2026 VALUES LESS THAN (2027),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Add new partition each year
ALTER TABLE page_views 
ADD PARTITION (PARTITION p2027 VALUES LESS THAN (2028));
```

### 4. Useful MySQL Functions

```sql
-- Content popularity score calculation
DELIMITER //
CREATE FUNCTION calculate_popularity_score(
    view_count INT,
    like_count INT,
    comment_count INT,
    days_old INT
) RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE score DECIMAL(10,2);
    DECLARE age_factor DECIMAL(3,2);
    
    -- Age factor: newer content gets higher score
    SET age_factor = CASE 
        WHEN days_old <= 7 THEN 1.0
        WHEN days_old <= 30 THEN 0.8
        WHEN days_old <= 90 THEN 0.6
        ELSE 0.4
    END;
    
    -- Calculate weighted score
    SET score = (
        (view_count * 1.0) + 
        (like_count * 2.0) + 
        (comment_count * 3.0)
    ) * age_factor;
    
    RETURN score;
END //
DELIMITER ;

-- Update popularity scores
UPDATE popular_content_cache pcc
JOIN projects p ON pcc.content_id = p.id
SET pcc.score = calculate_popularity_score(
    p.view_count, 
    p.star_count, 
    0, -- comments
    DATEDIFF(NOW(), p.created_at)
)
WHERE pcc.content_type = 'project';
```

### 5. Analytics Aggregation Procedures

```sql
-- Daily analytics aggregation
DELIMITER //
CREATE PROCEDURE aggregate_daily_metrics(IN target_date DATE)
BEGIN
    -- Aggregate page views by content
    INSERT INTO content_metrics_daily (
        content_type, content_id, metric_date,
        unique_views, total_views, avg_time_on_page
    )
    SELECT 
        pv.page_type,
        pv.page_id,
        DATE(pv.created_at),
        COUNT(DISTINCT pv.session_id),
        COUNT(*),
        AVG(pv.time_on_page)
    FROM page_views pv
    WHERE DATE(pv.created_at) = target_date
    AND pv.page_id IS NOT NULL
    GROUP BY pv.page_type, pv.page_id, DATE(pv.created_at)
    ON DUPLICATE KEY UPDATE
        unique_views = VALUES(unique_views),
        total_views = VALUES(total_views),
        avg_time_on_page = VALUES(avg_time_on_page),
        updated_at = CURRENT_TIMESTAMP;
        
    -- Update content view counts
    UPDATE projects p
    JOIN (
        SELECT 
            page_id,
            SUM(unique_views) as total_unique_views
        FROM content_metrics_daily
        WHERE content_type = 'project'
        AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY page_id
    ) metrics ON p.id = metrics.page_id
    SET p.view_count = metrics.total_unique_views;
    
END //
DELIMITER ;

-- Schedule daily aggregation (using MySQL Event Scheduler)
CREATE EVENT IF NOT EXISTS daily_analytics_aggregation
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURDATE()) + INTERVAL 1 DAY + INTERVAL 1 HOUR
DO
  CALL aggregate_daily_metrics(CURDATE() - INTERVAL 1 DAY);
```

---

## Performance Monitoring

### 1. Slow Query Analysis

```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Analyze slow queries
SELECT 
    query_time,
    lock_time,
    rows_sent,
    rows_examined,
    sql_text
FROM mysql.slow_log
WHERE start_time >= DATE_SUB(NOW(), INTERVAL 1 DAY)
ORDER BY query_time DESC
LIMIT 10;
```

### 2. Index Usage Analysis

```sql
-- Check index usage
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME,
    COUNT_FETCH,
    COUNT_INSERT,
    COUNT_UPDATE,
    COUNT_DELETE
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'silan_website'
ORDER BY COUNT_FETCH DESC;

-- Find unused indexes
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'silan_website'
AND INDEX_NAME IS NOT NULL
AND COUNT_FETCH = 0
AND INDEX_NAME != 'PRIMARY';
```

### 3. Query Cache Hit Rate

```sql
-- Check query cache effectiveness
SHOW STATUS LIKE 'Qcache%';

-- Calculate hit rate
SELECT 
    ROUND(
        (Qcache_hits / (Qcache_hits + Qcache_inserts)) * 100, 2
    ) AS cache_hit_rate_percent
FROM (
    SELECT 
        VARIABLE_VALUE AS Qcache_hits
    FROM performance_schema.global_status 
    WHERE VARIABLE_NAME = 'Qcache_hits'
) hits
CROSS JOIN (
    SELECT 
        VARIABLE_VALUE AS Qcache_inserts
    FROM performance_schema.global_status 
    WHERE VARIABLE_NAME = 'Qcache_inserts'
) inserts;
```

---

## Deployment Configuration

### 1. Docker Compose for MySQL

```yaml
# docker-compose.yml
version: '3.8'
services:
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
      - ./mysql/conf.d:/etc/mysql/conf.d
      - ./mysql/init:/docker-entrypoint-initdb.d
    command: >
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
      --innodb-buffer-pool-size=256M
      --query-cache-type=1
      --query-cache-size=64M
    restart: unless-stopped
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
  
  backend:
    build: ./backend
    environment:
      DATABASE_URL: mysql://silan:${MYSQL_PASSWORD}@mysql:3306/silan_website
      REDIS_URL: redis://redis:6379
    ports:
      - "3000:3000"
    depends_on:
      - mysql
      - redis
    restart: unless-stopped

volumes:
  mysql_data:
  redis_data:
```

### 2. Backup Strategy

```bash
#!/bin/bash
# backup.sh - MySQL backup script

DB_NAME="silan_website"
DB_USER="silan"
DB_PASS="${MYSQL_PASSWORD}"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Full backup
mysqldump -u${DB_USER} -p${DB_PASS} ${DB_NAME} > ${BACKUP_DIR}/full_backup_${DATE}.sql

# Structure only backup
mysqldump -u${DB_USER} -p${DB_PASS} --no-data ${DB_NAME} > ${BACKUP_DIR}/structure_${DATE}.sql

# Compress backups
gzip ${BACKUP_DIR}/full_backup_${DATE}.sql
gzip ${BACKUP_DIR}/structure_${DATE}.sql

# Clean old backups (keep 30 days)
find ${BACKUP_DIR} -name "*.sql.gz" -mtime +30 -delete
```

---

## Migration from PostgreSQL

### 1. Schema Conversion Script

```sql
-- Convert PostgreSQL UUID to MySQL CHAR(36)
-- Convert JSONB to JSON
-- Convert TEXT arrays to JSON arrays
-- Convert ENUM types to MySQL ENUM
-- Convert timestamp with time zone to TIMESTAMP

-- Example conversion for projects table
CREATE TABLE projects_mysql AS
SELECT 
    CAST(id AS CHAR(36)) as id,
    CAST(user_id AS CHAR(36)) as user_id,
    title,
    slug,
    description,
    project_type,
    CASE status 
        WHEN 'active' THEN 'active'
        WHEN 'completed' THEN 'completed'
        WHEN 'paused' THEN 'paused'
        WHEN 'cancelled' THEN 'cancelled'
        ELSE 'active'
    END as status,
    start_date,
    end_date,
    github_url,
    demo_url,
    documentation_url,
    thumbnail_url,
    is_featured,
    is_public,
    view_count,
    star_count,
    sort_order,
    created_at,
    updated_at
FROM projects_postgresql;
```

---

## Benefits of MySQL Design

### ✅ **Performance**
- **Query Cache**: Automatic caching of SELECT queries
- **MyISAM for Analytics**: Faster INSERT performance for logs
- **InnoDB for Content**: ACID compliance for important data
- **Partitioning**: Efficient handling of time-series data

### ✅ **Simplicity**
- **Easier Setup**: Simpler installation and configuration
- **Wide Support**: Available on most hosting providers
- **Better Tooling**: phpMyAdmin, MySQL Workbench
- **Lower Resource Usage**: Better for small-medium sites

### ✅ **Cost Effectiveness**
- **Smaller Footprint**: Lower memory requirements
- **Shared Hosting**: Available on cheap shared hosting
- **Replication**: Easy master-slave setup
- **Maintenance**: Simpler backup and maintenance procedures

This MySQL design provides excellent performance for a personal website while being much easier to deploy and maintain than PostgreSQL!

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "Convert database design from PostgreSQL to MySQL", "status": "completed", "priority": "high"}, {"id": "2", "content": "Update schema with MySQL-specific optimizations", "status": "completed", "priority": "high"}, {"id": "3", "content": "Revise analytics queries for MySQL compatibility", "status": "completed", "priority": "high"}, {"id": "4", "content": "Update deployment configuration for MySQL", "status": "completed", "priority": "high"}]