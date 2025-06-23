import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight, Search, AlertCircle } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
import { useLanguage } from '../components/LanguageContext';
import { BlogPost } from '../types';

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Software Development',
    excerpt: 'Exploring how AI is transforming software development practices.',
    content: 'Full blog content here...',
    date: '2024-01-20',
    author: 'Silan Hu',
    tags: ['AI', 'Software Development'],
    image: '/api/placeholder/600/300'
  },
  {
    id: '2',
    title: 'Building Scalable ML Pipelines',
    excerpt: 'A guide to designing enterprise-scale ML pipelines.',
    content: 'Full blog content here...',
    date: '2024-01-15',
    author: 'Silan Hu',
    tags: ['Machine Learning', 'Data Engineering'],
    image: '/api/placeholder/600/300'
  },
  {
    id: '3',
    title: 'TypeScript Best Practices for Large Applications',
    excerpt: 'Essential patterns and practices for maintaining type safety and code quality in enterprise TypeScript projects.',
    content: 'Full blog content here...',
    date: '2024-01-10',
    author: 'Silan Hu',
    tags: ['TypeScript', 'Best Practices', 'Enterprise'],
    image: '/api/placeholder/600/300'
  },
  {
    id: '4',
    title: 'Deep Dive into Neural Architecture Search',
    excerpt: 'Understanding automated neural network design and its implications for the future of deep learning.',
    content: 'Full blog content here...',
    date: '2024-01-05',
    author: 'Silan Hu',
    tags: ['Deep Learning', 'Neural Networks', 'AutoML'],
    image: '/api/placeholder/600/300'
  },
  {
    id: '5',
    title: 'The Rise of Edge Computing in AI',
    excerpt: 'How edge computing is enabling real-time AI applications and changing the deployment landscape.',
    content: 'Full blog content here...',
    date: '2023-12-28',
    author: 'Silan Hu',
    tags: ['Edge Computing', 'AI', 'Real-time Systems'],
    image: '/api/placeholder/600/300'
  }
];

interface BlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
  onClick?: (post: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  index, 
  featured = false,
  onClick 
}) => {
  const { language } = useLanguage();

  const handleClick = useCallback(() => {
    onClick?.(post);
  }, [onClick, post]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <motion.article
      className={`group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 card-interactive ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
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
      <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-project">
          <div className={`${featured ? 'text-8xl' : 'text-6xl'} font-bold opacity-20 text-theme-primary`}>
            {post.title.charAt(0)}
          </div>
        </div>
        
        {/* Reading time overlay */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-black/50 text-white">
            {language === 'en' ? '5 min read' : '5分钟阅读'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        {/* Meta info */}
        <div className="flex items-center space-x-4 mb-4 text-sm">
          <div className="flex items-center space-x-1 text-theme-tertiary">
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1 text-theme-tertiary">
            <User size={14} />
            <span>{post.author}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className={`font-bold mb-3 group-hover:text-theme-primary transition-colors duration-300 text-theme-primary ${
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className={`leading-relaxed mb-4 text-theme-secondary ${featured ? 'text-base' : 'text-sm'}`}>
          {post.excerpt}
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

        {/* Read more */}
        <motion.div
          className="flex items-center space-x-2 text-sm font-medium text-theme-accent"
          whileHover={{ x: 5 }}
        >
          <span>{language === 'en' ? 'Read more' : '阅读更多'}</span>
          <ArrowRight size={14} />
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
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-theme-primary ring-offset-theme-background filter-chip ${
        active ? 'active' : ''
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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { colors } = useTheme();
  const { language } = useLanguage();

  // Set CSS variables based on current theme
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [colors]);

  // Load posts
  useEffect(() => {
    let isMounted = true;
    
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (isMounted) {
          setPosts(mockBlogPosts);
          setFilteredPosts(mockBlogPosts);
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

  // Filter posts based on tag and search term
  const filteredPostsMemo = useMemo(() => {
    let filtered = posts;

    if (selectedTag !== 'All' && selectedTag !== '全部') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [posts, selectedTag, searchTerm]);

  useEffect(() => {
    setFilteredPosts(filteredPostsMemo);
  }, [filteredPostsMemo]);

  // Get all unique tags
  const tags = useMemo(() => {
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
    return [language === 'en' ? 'All' : '全部', ...allTags];
  }, [posts, language]);

  const handlePostClick = useCallback((post: BlogPost) => {
    // Handle blog post navigation
    console.log('Navigate to post:', post.id);
  }, []);

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
            key={`${selectedTag}-${searchTerm}`}
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
                featured={index === 0}
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