-- Analytics and Tracking Tables
-- Optimized for MySQL performance

-- ============================================================================
-- ANALYTICS & TRACKING (Optimized for MySQL)
-- ============================================================================

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

-- ============================================================================
-- FULL-TEXT SEARCH (MySQL Optimized)
-- ============================================================================

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

-- ============================================================================
-- MATERIALIZED VIEWS (Using tables for MySQL compatibility)
-- ============================================================================

-- Content analytics summary
CREATE TABLE mv_content_analytics (
    content_type VARCHAR(50) NOT NULL,
    content_id CHAR(36) NOT NULL,
    total_unique_views BIGINT UNSIGNED DEFAULT 0,
    total_views BIGINT UNSIGNED DEFAULT 0,
    avg_time_on_page INT UNSIGNED DEFAULT 0,
    avg_bounce_rate DECIMAL(5,2) DEFAULT 0.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (content_type, content_id),
    INDEX idx_views (total_unique_views DESC),
    INDEX idx_last_updated (last_updated)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Traffic analytics summary
CREATE TABLE mv_traffic_analytics (
    metric_date DATE NOT NULL,
    unique_visitors INT UNSIGNED DEFAULT 0,
    total_pageviews INT UNSIGNED DEFAULT 0,
    avg_session_duration INT UNSIGNED DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0.00,
    top_pages JSON,
    traffic_sources JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (metric_date),
    INDEX idx_updated_at (updated_at)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;