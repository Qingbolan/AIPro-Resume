import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight, Search, AlertCircle, Play, Video, List, Grid } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
import { useLanguage } from '../components/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { BlogData } from '../components/BlogStack/types/blog';
import { fetchBlogPosts } from '../api';

interface BlogCardProps {
  post: BlogData;
  index: number;
  featured?: boolean;
  onClick?: (post: BlogData) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  index,
  featured = false,
  onClick
}) => {
  const { language } = useLanguage();
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleClick = useCallback(() => {
    onClick?.(post);
  }, [onClick, post]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  // Smart layout calculation for vlog and series
  const isVlog = post.type === 'vlog';
  const isSeries = post.type === 'series';

  // Determine if this should use wide layout - simplified approach
  const shouldUseWideLayout = useMemo(() => {
    if (featured) return true;

    // Default: most content uses single column for better balance
    // Only use wide layout for specific cases

    // Manual override for specific content IDs that should be wide
    const forceWideIds = ['5']; // Manually specify which should be wide
    if (forceWideIds.includes(post.id)) {
      return true;
    }

    // Very conservative automatic wide layout:
    // Only for series with very long content AND it's in a good position
    if (isSeries) {
      const contentLength = (post.summary || '').length + (post.summaryZh || '').length;
      const hasSeriesImage = Boolean(post.seriesImage);
      const isGoodPosition = index % 7 === 1; // Only positions 2, 9, 16, etc.

      return hasSeriesImage && contentLength > 180 && isGoodPosition;
    }

    // For vlogs, even more conservative - only very long content in specific positions  
    if (isVlog) {
      const contentLength = (post.summary || '').length + (post.summaryZh || '').length;
      const isGoodPosition = index % 8 === 3; // Only positions 4, 12, 20, etc.

      return contentLength > 200 && isGoodPosition;
    }

    return false;
  }, [post, index, featured, isVlog, isSeries]);

  const isWideLayout = shouldUseWideLayout;

  // Get the appropriate icon based on type
  const getTypeIcon = () => {
    switch (post.type) {
      case 'vlog':
        return <Video size={16} className="text-red-500" />;
      case 'series':
        return <List size={16} className="text-purple-500" />;
      default:
        return <ArrowRight size={14} />;
    }
  };

  // Get type label
  const getTypeLabel = () => {
    switch (post.type) {
      case 'vlog':
        return language === 'en' ? 'Video Blog' : '视频博客';
      case 'series':
        return language === 'en' ? 'Series' : '系列';
      default:
        return language === 'en' ? 'Article' : '文章';
    }
  };

  // Generate arXiv-style paper number based on date and type
  const generatePaperNumber = () => {
    const date = new Date(post.publishDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Create a simple hash from title to ensure consistency
    const titleHash = post.title.split('').reduce((hash, char) => {
      return hash * 31 + char.charCodeAt(0);
    }, 0);
    const paperNum = String(Math.abs(titleHash) % 10000).padStart(4, '0');

    const prefix = post.type === 'vlog' ? 'vlog' :
      post.type === 'series' ? 'episode' : 'blog';

    return `${prefix}.${year}${month}${day}.${paperNum}`;
  };

  return (
    <motion.article
      className={`group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 card-interactive ${isWideLayout ? 'md:col-span-2' : ''
        }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -5,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${post.title}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isWideLayout ? 'h-64 md:h-72' : 'h-48'
        }`}>
        {/* Use video thumbnail for vlogs, series image if available, or default cover */}
        {isVlog && post.videoThumbnail ? (
          <div className="relative w-full h-full">
            <img
              src={post.videoThumbnail}
              alt={language === 'zh' && post.titleZh ? post.titleZh : post.title}
              className="w-full h-full object-cover"
            />
            {/* arXiv-style paper number overlay for vlogs */}
            <div className="absolute bottom-2 left-2">
              <div className={`${isWideLayout ? 'text-xs' : 'text-xs'} font-mono text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm`}>
                {generatePaperNumber()}
              </div>
            </div>
            {/* Play button overlay for vlogs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/70 flex items-center justify-center backdrop-blur-sm">
                <Play size={24} className="text-white ml-1" />
              </div>
            </div>
          </div>
        ) : (isSeries && post.seriesImage && !imageLoadError) ? (
          <div className="relative w-full h-full">
            <img
              src={post.seriesImage}
              alt={language === 'zh' && post.seriesTitleZh ? post.seriesTitleZh : post.seriesTitle || post.title}
              className="w-full h-full object-cover"
              onError={() => setImageLoadError(true)}
            />
            {/* arXiv-style paper number overlay for series */}
            <div className="absolute top-2 left-2">
              <div className={`${isWideLayout ? 'text-xs' : 'text-xs'} font-mono text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm`}>
                {generatePaperNumber()}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-project">
            {/* arXiv-style paper number - centered display */}
            <div className={`${isWideLayout ? 'text-4xl' : 'text-2xl'} font-bold opacity-20 text-theme-primary font-mono`}>
              {generatePaperNumber()}
            </div>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-black/50 text-white">
            {getTypeIcon()}
            <span>{getTypeLabel()}</span>
          </div>
        </div>

        {/* Duration/Reading time overlay */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-black/50 text-white">
            {isVlog && post.videoDuration ? post.videoDuration : post.readTime || (language === 'en' ? '5 min read' : '5分钟阅读')}
          </div>
        </div>

        {/* Series episode indicator */}
        {isSeries && post.episodeNumber && post.totalEpisodes && (
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-purple-500/80 text-white">
              {language === 'en' ? `Episode ${post.episodeNumber}/${post.totalEpisodes}` : `第${post.episodeNumber}集/共${post.totalEpisodes}集`}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        {/* Meta info */}
        <div className="flex items-center space-x-4 mb-4 text-sm">
          <div className="flex items-center space-x-1 text-theme-tertiary">
            <Calendar size={14} />
            <span>{new Date(post.publishDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1 text-theme-tertiary">
            <User size={14} />
            <span>{post.author}</span>
          </div>
        </div>

        {/* Series Title (if applicable) */}
        {isSeries && post.seriesTitle && (
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
              <List size={14} />
              <span>{language === 'zh' && post.seriesTitleZh ? post.seriesTitleZh : post.seriesTitle}</span>
            </div>
            {post.seriesDescription && (
              <p className="text-xs text-theme-tertiary mt-1">
                {language === 'zh' && post.seriesDescriptionZh ? post.seriesDescriptionZh : post.seriesDescription}
              </p>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className={`font-bold mb-3 group-hover:text-theme-primary transition-colors duration-300 text-theme-primary ${isWideLayout ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
          {language === 'zh' && post.titleZh ? post.titleZh : post.title}
        </h2>

        {/* Excerpt */}
        <p className={`leading-relaxed mb-4 text-theme-secondary ${isWideLayout ? 'text-base' : 'text-sm'}`}>
          {language === 'zh' && post.summaryZh ? post.summaryZh : post.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              className="px-3 py-1 text-xs rounded-full font-medium tag-default"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Read more / Watch / Continue series */}
        <motion.div
          className="flex items-center space-x-2 text-sm font-medium text-theme-accent"
          whileHover={{ x: 5 }}
        >
          <span>
            {isVlog
              ? (language === 'en' ? 'Watch video' : '观看视频')
              : isSeries
                ? (language === 'en' ? 'Continue series' : '继续系列')
                : (language === 'en' ? 'Read more' : '阅读更多')
            }
          </span>
          {getTypeIcon()}
        </motion.div>
      </div>
    </motion.article>
  );
};

interface TagFilterProps {
  tag: string;
  active: boolean;
  onClick: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tag, active, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-theme-primary ring-offset-theme-background filter-chip ${active ? 'active' : ''
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-pressed={active}
    >
      {tag}
    </motion.button>
  );
};

const BlogStack: React.FC = () => {
  const [posts, setPosts] = useState<BlogData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { colors } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Set CSS variables based on current theme
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [colors]);

  // Handle URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');
    
    if (typeParam) {
      // Map category filter keys to display names
      const typeMap: Record<string, string> = {
        'article': language === 'en' ? 'Articles' : '文章',
        'vlog': language === 'en' ? 'Videos' : '视频',
        'series': language === 'en' ? 'Series' : '系列'
      };
      
      const displayType = typeMap[typeParam] || (language === 'en' ? 'All' : '全部');
      setSelectedType(displayType);
    }
  }, [location.search, language]);

  // Load posts
  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch blog posts from API with language support
        const fetchedPosts = await fetchBlogPosts(language as 'en' | 'zh');

        if (isMounted) {
          setPosts(fetchedPosts);
          setFilteredPosts(fetchedPosts);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(language === 'en' ? 'Failed to load blog posts' : '加载博客文章失败');
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, [language]);

  // Filter posts based on tag, type and search term
  const filteredPostsMemo = useMemo(() => {
    let filtered = posts;

    if (selectedTag !== 'All' && selectedTag !== '全部') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    if (selectedType !== 'All' && selectedType !== '全部') {
      const typeMap: Record<string, string> = {
        'Articles': 'article',
        'Videos': 'vlog',
        'Series': 'series',
        '文章': 'article',
        '视频': 'vlog',
        '系列': 'series'
      };
      const targetType = typeMap[selectedType] || selectedType;
      filtered = filtered.filter(post => (post.type || 'article') === targetType);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        (post.titleZh && post.titleZh.toLowerCase().includes(searchLower)) ||
        post.summary.toLowerCase().includes(searchLower) ||
        (post.summaryZh && post.summaryZh.toLowerCase().includes(searchLower)) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [posts, selectedTag, selectedType, searchTerm, language]);

  useEffect(() => {
    setFilteredPosts(filteredPostsMemo);
  }, [filteredPostsMemo]);

  // Get all unique tags
  const tags = useMemo(() => {
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
    return [language === 'en' ? 'All' : '全部', ...allTags];
  }, [posts, language]);

  // Get content types
  const contentTypes = useMemo(() => {
    const types = language === 'en'
      ? ['All', 'Articles', 'Videos', 'Series']
      : ['全部', '文章', '视频', '系列'];
    return types;
  }, [language]);

  const handlePostClick = useCallback((post: BlogData) => {
    // Navigate to blog detail page
    navigate(`/blog/${post.id}`);
  }, [navigate]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="status"
          aria-live="polite"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full loading-gradient" />
          <p className="text-theme-secondary">
            {language === 'en' ? 'Loading blog posts...' : '加载博客文章中...'}
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          <AlertCircle size={48} className="mx-auto mb-4 text-theme-error" />
          <h2 className="text-xl font-semibold mb-2 text-theme-primary">
            {language === 'en' ? 'Error Loading Posts' : '加载文章出错'}
          </h2>
          <p className="text-theme-secondary">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen py-20 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-theme-primary">
            {language === 'en' ? 'Blog' : '博客'}
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-theme-secondary">
            {language === 'en'
              ? "Thoughts, insights, and tutorials on AI, software development, and emerging technologies."
              : "关于AI、软件开发和新兴技术的思考、见解和教程。"
            }
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-tertiary"
            />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search articles...' : '搜索文章...'}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 input-theme ring-theme-primary ring-offset-theme-background"
              aria-label={language === 'en' ? 'Search articles' : '搜索文章'}
            />
          </div>

          {/* Content Type Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Grid size={16} className="text-theme-secondary" />
              <span className="text-sm font-medium text-theme-secondary">
                {language === 'en' ? 'Content type:' : '内容类型：'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by content type">
              {contentTypes.map((type) => (
                <TagFilter
                  key={type}
                  tag={type}
                  active={selectedType === type}
                  onClick={() => setSelectedType(type)}
                />
              ))}
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center space-x-2 mb-2">
              <Tag size={16} className="text-theme-secondary" />
              <span className="text-sm font-medium text-theme-secondary">
                {language === 'en' ? 'Filter by topic:' : '按主题筛选：'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter tags">
              {tags.map((tag) => (
                <TagFilter
                  key={tag}
                  tag={tag}
                  active={selectedTag === tag}
                  onClick={() => setSelectedTag(tag)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedTag}-${selectedType}-${searchTerm}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                featured={false}
                onClick={handlePostClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredPosts.length === 0 && !loading && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            role="status"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center empty-state-bg">
              <Search size={32} className="text-theme-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-theme-primary">
              {language === 'en' ? 'No articles found' : '未找到文章'}
            </h3>
            <p className="text-theme-secondary">
              {language === 'en'
                ? 'Try adjusting your search terms or filters.'
                : '尝试调整您的搜索词或筛选器。'
              }
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogStack; 