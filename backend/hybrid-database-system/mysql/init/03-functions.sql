-- MySQL Functions and Procedures
-- Performance optimization functions

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

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

-- Generate slug from title
DELIMITER //
CREATE FUNCTION generate_slug(title_text VARCHAR(300)) 
RETURNS VARCHAR(200)
DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(200);
    
    -- Convert to lowercase
    SET result = LOWER(title_text);
    
    -- Replace special characters and spaces with hyphens
    SET result = REPLACE(result, ' ', '-');
    SET result = REPLACE(result, '_', '-');
    SET result = REPLACE(result, '.', '-');
    SET result = REPLACE(result, ',', '');
    SET result = REPLACE(result, '!', '');
    SET result = REPLACE(result, '?', '');
    SET result = REPLACE(result, ':', '');
    SET result = REPLACE(result, ';', '');
    SET result = REPLACE(result, '"', '');
    SET result = REPLACE(result, '''', '');
    SET result = REPLACE(result, '(', '');
    SET result = REPLACE(result, ')', '');
    
    -- Remove multiple consecutive hyphens
    WHILE LOCATE('--', result) > 0 DO
        SET result = REPLACE(result, '--', '-');
    END WHILE;
    
    -- Remove leading and trailing hyphens
    SET result = TRIM(BOTH '-' FROM result);
    
    -- Limit length
    IF LENGTH(result) > 200 THEN
        SET result = LEFT(result, 200);
        SET result = TRIM(BOTH '-' FROM result);
    END IF;
    
    -- Return default if empty
    IF result = '' OR result IS NULL THEN
        SET result = 'untitled';
    END IF;
    
    RETURN result;
END //
DELIMITER ;

-- ============================================================================
-- ANALYTICS PROCEDURES
-- ============================================================================

-- Daily analytics aggregation
DELIMITER //
CREATE PROCEDURE aggregate_daily_metrics(IN target_date DATE)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

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
        
    -- Update content view counts in main tables
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
    
    UPDATE blog_posts bp
    JOIN (
        SELECT 
            page_id,
            SUM(unique_views) as total_unique_views
        FROM content_metrics_daily
        WHERE content_type = 'blog'
        AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY page_id
    ) metrics ON bp.id = metrics.page_id
    SET bp.view_count = metrics.total_unique_views;
    
    UPDATE ideas i
    JOIN (
        SELECT 
            page_id,
            SUM(unique_views) as total_unique_views
        FROM content_metrics_daily
        WHERE content_type = 'idea'
        AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY page_id
    ) metrics ON i.id = metrics.page_id
    SET i.view_count = metrics.total_unique_views;

    COMMIT;
END //
DELIMITER ;

-- Update materialized views
DELIMITER //
CREATE PROCEDURE refresh_analytics_views()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Refresh content analytics
    DELETE FROM mv_content_analytics;
    
    INSERT INTO mv_content_analytics (
        content_type, content_id, total_unique_views, 
        total_views, avg_time_on_page, avg_bounce_rate
    )
    SELECT 
        cm.content_type,
        cm.content_id,
        SUM(cm.unique_views),
        SUM(cm.total_views),
        AVG(cm.avg_time_on_page),
        AVG(cm.bounce_rate)
    FROM content_metrics_daily cm
    WHERE cm.metric_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY cm.content_type, cm.content_id;
    
    -- Refresh traffic analytics for last 30 days
    INSERT INTO mv_traffic_analytics (
        metric_date, unique_visitors, total_pageviews, 
        avg_session_duration, bounce_rate
    )
    SELECT 
        DATE(pv.created_at) as metric_date,
        COUNT(DISTINCT pv.session_id) as unique_visitors,
        COUNT(*) as total_pageviews,
        AVG(s.total_duration_seconds) as avg_session_duration,
        AVG(CASE WHEN s.is_bounce THEN 100.0 ELSE 0.0 END) as bounce_rate
    FROM page_views pv
    LEFT JOIN user_sessions s ON pv.session_id = s.session_id
    WHERE DATE(pv.created_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY DATE(pv.created_at)
    ON DUPLICATE KEY UPDATE
        unique_visitors = VALUES(unique_visitors),
        total_pageviews = VALUES(total_pageviews),
        avg_session_duration = VALUES(avg_session_duration),
        bounce_rate = VALUES(bounce_rate),
        updated_at = CURRENT_TIMESTAMP;

    COMMIT;
END //
DELIMITER ;

-- Update popular content cache
DELIMITER //
CREATE PROCEDURE update_popular_content()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Clear expired cache entries
    DELETE FROM popular_content_cache 
    WHERE expires_at < CURRENT_TIMESTAMP;
    
    -- Update project popularity
    INSERT INTO popular_content_cache (
        content_type, content_id, title, slug, view_count, score, cache_key
    )
    SELECT 
        'project',
        p.id,
        p.title,
        p.slug,
        p.view_count,
        calculate_popularity_score(
            p.view_count, 
            p.star_count, 
            0, -- comments
            DATEDIFF(NOW(), p.created_at)
        ),
        CONCAT('popular_projects_', DATE(NOW()))
    FROM projects p
    WHERE p.is_public = 1
    ORDER BY calculate_popularity_score(
        p.view_count, p.star_count, 0, DATEDIFF(NOW(), p.created_at)
    ) DESC
    LIMIT 10
    ON DUPLICATE KEY UPDATE
        view_count = VALUES(view_count),
        score = VALUES(score),
        cached_at = CURRENT_TIMESTAMP,
        expires_at = CURRENT_TIMESTAMP + INTERVAL 1 HOUR;
    
    -- Update blog post popularity
    INSERT INTO popular_content_cache (
        content_type, content_id, title, slug, view_count, score, cache_key
    )
    SELECT 
        'blog',
        bp.id,
        bp.title,
        bp.slug,
        bp.view_count,
        calculate_popularity_score(
            bp.view_count, 
            bp.like_count, 
            bp.comment_count, 
            DATEDIFF(NOW(), bp.created_at)
        ),
        CONCAT('popular_blog_', DATE(NOW()))
    FROM blog_posts bp
    WHERE bp.status = 'published'
    ORDER BY calculate_popularity_score(
        bp.view_count, bp.like_count, bp.comment_count, DATEDIFF(NOW(), bp.created_at)
    ) DESC
    LIMIT 10
    ON DUPLICATE KEY UPDATE
        view_count = VALUES(view_count),
        score = VALUES(score),
        cached_at = CURRENT_TIMESTAMP,
        expires_at = CURRENT_TIMESTAMP + INTERVAL 1 HOUR;

    COMMIT;
END //
DELIMITER ;

-- ============================================================================
-- REAL-TIME ANALYTICS FUNCTIONS
-- ============================================================================

-- Get live statistics
DELIMITER //
CREATE FUNCTION get_live_stats()
RETURNS JSON
READS SQL DATA
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_OBJECT(
        'active_visitors', (
            SELECT COUNT(*)
            FROM user_sessions
            WHERE last_activity > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
        ),
        'today_pageviews', (
            SELECT COUNT(*)
            FROM page_views
            WHERE DATE(created_at) = CURDATE()
        ),
        'today_unique_visitors', (
            SELECT COUNT(DISTINCT session_id)
            FROM page_views
            WHERE DATE(created_at) = CURDATE()
        ),
        'popular_pages', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'url', page_url,
                    'title', page_title,
                    'views', view_count
                )
            )
            FROM (
                SELECT 
                    page_url,
                    page_title,
                    COUNT(*) as view_count
                FROM page_views
                WHERE created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)
                GROUP BY page_url, page_title
                ORDER BY view_count DESC
                LIMIT 5
            ) popular
        )
    ) INTO result;
    
    RETURN result;
END //
DELIMITER ;

-- ============================================================================
-- SCHEDULED EVENTS
-- ============================================================================

-- Daily analytics aggregation (runs at 1 AM)
CREATE EVENT IF NOT EXISTS daily_analytics_aggregation
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURDATE()) + INTERVAL 1 DAY + INTERVAL 1 HOUR
DO
  CALL aggregate_daily_metrics(CURDATE() - INTERVAL 1 DAY);

-- Refresh materialized views (runs every 4 hours)
CREATE EVENT IF NOT EXISTS refresh_analytics_views_event
ON SCHEDULE EVERY 4 HOUR
STARTS CURRENT_TIMESTAMP + INTERVAL 1 HOUR
DO
  CALL refresh_analytics_views();

-- Update popular content cache (runs every hour)
CREATE EVENT IF NOT EXISTS update_popular_content_event
ON SCHEDULE EVERY 1 HOUR
STARTS CURRENT_TIMESTAMP + INTERVAL 30 MINUTE
DO
  CALL update_popular_content();

-- Clean old analytics data (runs weekly, keeps 2 years)
CREATE EVENT IF NOT EXISTS cleanup_old_analytics
ON SCHEDULE EVERY 1 WEEK
STARTS TIMESTAMP(CURDATE()) + INTERVAL 1 WEEK + INTERVAL 2 HOUR
DO
BEGIN
    DELETE FROM page_views 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL 2 YEAR);
    
    DELETE FROM click_events 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL 2 YEAR);
    
    DELETE FROM content_metrics_daily 
    WHERE metric_date < DATE_SUB(CURDATE(), INTERVAL 2 YEAR);
END;