import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MessageSquare,
  BookOpen,
  List,
  Eye,
  Calendar,
  Clock,
  User,
  Heart,
  Share2,
  Bookmark,
  Quote,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

interface BlogContent {
  type: 'text' | 'image' | 'video' | 'code' | 'quote';
  content: string;
  caption?: string;
  language?: string; // for code blocks
  annotation?: string;
  id: string;
}

interface BlogData {
  id: string;
  title: string;
  titleZh?: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  content: BlogContent[];
  likes: number;
  views: number;
  summary: string;
  summaryZh?: string;
}

// Mock blog data
const mockBlogData: Record<string, BlogData> = {
  '1': {
    id: '1',
    title: 'Leveraging Large Language Models for Code Refactoring: A Deep Dive',
    titleZh: '利用大型语言模型进行代码重构：深度探讨',
    author: 'Dr. Sarah Chen',
    publishDate: '2024-01-25',
    readTime: '15 min read',
    category: 'Research',
    tags: ['LLM', 'Code Refactoring', 'AI', 'Software Engineering'],
    summary: 'Exploring the revolutionary potential of large language models in automated code refactoring, this article delves into our latest research findings and practical implementations.',
    summaryZh: '探索大型语言模型在自动化代码重构中的革命性潜力，本文深入研究我们的最新研究发现和实际实现。',
    likes: 234,
    views: 1547,
    content: [
      {
        type: 'text',
        content: 'Large Language Models (LLMs) have revolutionized many aspects of software development, but their application in code refactoring represents a particularly exciting frontier. Our recent research has uncovered several breakthrough approaches that could fundamentally change how developers approach code quality improvement.',
        id: 'content-1'
      },
      {
        type: 'quote',
        content: 'The future of code refactoring lies not in replacing human intuition, but in augmenting it with AI-powered insights that can see patterns across millions of codebases.',
        id: 'content-2'
      },
      {
        type: 'image',
        content: '/api/placeholder/800/400',
        caption: 'Figure 1: LLM-based refactoring pipeline architecture',
        id: 'content-3'
      },
      {
        type: 'text',
        content: 'Traditional refactoring tools rely heavily on syntactic analysis and predefined patterns. While effective for simple transformations, they often miss semantic improvements that require deeper understanding of code intent and context.',
        annotation: 'This limitation has been a major pain point for developers working with legacy codebases.',
        id: 'content-4'
      },
      {
        type: 'code',
        content: `// Before: Traditional approach
function processUserData(users) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].isActive && users[i].age > 18) {
      result.push({
        name: users[i].name,
        email: users[i].email
      });
    }
  }
  return result;
}

// After: LLM-suggested refactoring
const processUserData = (users) => 
  users
    .filter(user => user.isActive && user.age > 18)
    .map(({ name, email }) => ({ name, email }));`,
        language: 'javascript',
        caption: 'Example of LLM-suggested functional refactoring',
        id: 'content-5'
      },
      {
        type: 'text',
        content: 'Our experiments show that LLM-based refactoring tools can identify and suggest improvements that go beyond surface-level changes. They understand semantic patterns, suggest performance optimizations, and can even propose architectural improvements.',
        id: 'content-6'
      },
      {
        type: 'video',
        content: '/api/placeholder/video/demo.mp4',
        caption: 'Live demonstration of our LLM refactoring tool',
        id: 'content-7'
      }
    ]
  }
};

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { colors, isDarkMode } = useTheme();
  const { language } = useLanguage();

  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToc, setShowToc] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [annotations, setAnnotations] = useState<Record<string, boolean>>({});
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const blogData = mockBlogData[id || '1'];
      if (blogData) {
        setBlog(blogData);
      }
      setLoading(false);
    };
    loadBlog();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAnnotation = (contentId: string) => {
    setAnnotations(prev => ({
      ...prev,
      [contentId]: !prev[contentId]
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'Current User',
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const renderContent = (item: BlogContent, index: number) => {
    switch (item.type) {
      case 'text':
        return (
          <div className="mb-8">
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              {item.content}
            </p>
            {item.annotation && (
              <div className="mt-4">
                <button
                  onClick={() => toggleAnnotation(item.id)}
                  className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"
                  style={{ color: colors.accent }}
                >
                  <Quote size={14} />
                  {language === 'en' ? 'View Annotation' : '查看批注'}
                </button>
                <AnimatePresence>
                  {annotations[item.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-4 rounded-lg border-l-4"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : '#EFF6FF',
                        borderLeftColor: colors.accent
                      }}
                    >
                      <p className="text-sm italic" style={{ color: colors.textSecondary }}>
                        {item.annotation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        );

      case 'quote':
        return (
          <div className="mb-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl opacity-20" style={{ color: colors.accent }}>
                "
              </div>
              <blockquote className="text-xl italic text-center py-12 px-8 rounded-xl border-l-4 relative"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(156, 163, 175, 0.1)' : '#F9FAFB',
                  borderLeftColor: colors.accent,
                  color: colors.textPrimary,
                  lineHeight: '1.6'
                }}>
                <Quote size={24} className="mx-auto mb-4 opacity-50" style={{ color: colors.accent }} />
                {item.content}
                <div className="mt-6 w-16 h-0.5 mx-auto" style={{ backgroundColor: colors.accent }}></div>
              </blockquote>
              <div className="absolute -bottom-4 -right-4 text-6xl opacity-20 rotate-180" style={{ color: colors.accent }}>
                "
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
              <img
                src={item.content.startsWith('/api/placeholder') 
                  ? `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent(item.caption || 'Sample Image')}`
                  : item.content
                }
                alt={item.caption || 'Blog image'}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent('Image Not Found')}`;
                }}
                loading="lazy"
                style={{ 
                  aspectRatio: '16/9',
                  maxHeight: '400px',
                  objectFit: 'cover'
                }}
              />
            </div>
            {item.caption && (
              <p className="text-sm text-center mt-4 italic" style={{ color: colors.textTertiary }}>
                {item.caption}
              </p>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="mb-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
              <video
                controls
                className="w-full h-auto"
                style={{ 
                  backgroundColor: colors.surface,
                  aspectRatio: '16/9',
                  maxHeight: '400px'
                }}
                poster={item.content.startsWith('/api/placeholder') 
                  ? `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent('Video Preview')}`
                  : undefined
                }
              >
                <source src={item.content} type="video/mp4" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: colors.surface }}>
                  <p style={{ color: colors.textSecondary }}>
                    {language === 'en' ? 'Your browser does not support the video tag.' : '您的浏览器不支持视频播放。'}
                  </p>
                </div>
              </video>
            </div>
            {item.caption && (
              <p className="text-sm text-center mt-4 italic" style={{ color: colors.textTertiary }}>
                {item.caption}
              </p>
            )}
          </div>
        );

      case 'code':
        return (
          <div className="mb-8">
            <div className="rounded-xl overflow-hidden shadow-lg border" style={{ borderColor: colors.cardBorder }}>
              <div className="px-4 py-3 text-sm font-medium border-b flex items-center justify-between"
                style={{
                  backgroundColor: colors.surface,
                  borderBottomColor: colors.cardBorder,
                  color: colors.textSecondary
                }}>
                <span className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
                  </div>
                  {item.language || 'code'}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(item.content)}
                  className="text-xs px-2 py-1 rounded hover:bg-opacity-80 transition-colors"
                  style={{ backgroundColor: colors.cardBackground, color: colors.textTertiary }}
                  aria-label={language === 'en' ? 'Copy code' : '复制代码'}
                >
                  {language === 'en' ? 'Copy' : '复制'}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm leading-relaxed"
                style={{
                  backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
                  color: isDarkMode ? '#e5e7eb' : '#374151',
                  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace'
                }}>
                <code>{item.content}</code>
              </pre>
            </div>
            {item.caption && (
              <p className="text-sm text-center mt-4 italic" style={{ color: colors.textTertiary }}>
                {item.caption}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderToc = () => {
    if (!blog) return null;

    const sections = blog.content
      .filter(item => item.type === 'text' || item.type === 'quote')
      .slice(0, 5)
      .map((item, index) => ({
        id: item.id,
        title: item.content.substring(0, 50) + (item.content.length > 50 ? '...' : '')
      }));

    return (
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="fixed left-4 top-1/4 z-50 w-64 rounded-xl shadow-xl p-4"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
          <List size={18} />
          {language === 'en' ? 'Table of Contents' : '目录'}
        </h3>
        <div className="space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                const element = document.getElementById(section.id);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full text-left p-2 rounded-lg hover:bg-opacity-80 transition-colors text-sm"
              style={{
                backgroundColor: activeSection === section.id ? colors.surface : 'transparent',
                color: colors.textSecondary
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded" style={{ backgroundColor: colors.accent }}></div>
                <span className="truncate">{section.title}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <BookOpen size={48} className="mx-auto mb-4 animate-pulse" style={{ color: colors.accent }} />
          <p style={{ color: colors.textSecondary }}>{language === 'en' ? 'Loading article...' : '加载文章中...'}</p>
        </motion.div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: colors.error }} />
          <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            {language === 'en' ? 'Article Not Found' : '文章未找到'}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            {language === 'en' ? 'Go Back' : '返回'}
          </button>
        </motion.div>
      </div>
    );
  }

  const allContent = blog.content;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b">
        <div className="mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                style={{ color: colors.textSecondary }}
              >
                <ArrowLeft size={20} />
                {language === 'en' ? 'Back' : '返回'}
              </button>
              <button
                onClick={() => setShowToc(!showToc)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: colors.surface, color: colors.textSecondary }}
              >
                <List size={16} />
                {language === 'en' ? 'Contents' : '目录'}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-4 text-sm" style={{ color: colors.textTertiary }}>
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {blog.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={14} />
                  {blog.likes}
                </span>
              </div>
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-lg transition-colors ${liked ? 'text-red-500' : ''}`}
                style={{ backgroundColor: colors.surface }}
                aria-label={liked ? (language === 'en' ? 'Unlike article' : '取消点赞') : (language === 'en' ? 'Like article' : '点赞文章')}
                title={liked ? (language === 'en' ? 'Unlike' : '取消点赞') : (language === 'en' ? 'Like' : '点赞')}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-lg transition-colors ${bookmarked ? 'text-blue-500' : ''}`}
                style={{ backgroundColor: colors.surface }}
                aria-label={bookmarked ? (language === 'en' ? 'Remove bookmark' : '取消收藏') : (language === 'en' ? 'Bookmark article' : '收藏文章')}
                title={bookmarked ? (language === 'en' ? 'Remove bookmark' : '取消收藏') : (language === 'en' ? 'Bookmark' : '收藏')}
              >
                <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
              <button 
                className="p-2 rounded-lg transition-colors" 
                style={{ backgroundColor: colors.surface }}
                aria-label={language === 'en' ? 'Share article' : '分享文章'}
                title={language === 'en' ? 'Share' : '分享'}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: language === 'en' ? blog.title : blog.titleZh || blog.title,
                      text: language === 'en' ? blog.summary : blog.summaryZh || blog.summary,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                <Share2 size={16} style={{ color: colors.textSecondary }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <AnimatePresence>
        {showToc && renderToc()}
      </AnimatePresence>

      {/* Main Content */}
      <div className="mx-auto px-4 py-8">
        {/* Article Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            {language === 'en' ? blog.title : blog.titleZh || blog.title}
          </h1>
          <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
            {language === 'en' ? blog.summary : blog.summaryZh || blog.summary}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm" style={{ color: colors.textTertiary }}>
            <span className="flex items-center gap-2">
              <User size={14} />
              {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {new Date(blog.publishDate).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {blog.readTime}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {blog.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: colors.surface, color: colors.textPrimary }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Book-style Content Area */}
        <div className="relative">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-8"
            ref={contentRef}
          >
            {allContent.map((item, index) => (
              <div 
                key={item.id} 
                id={item.id}
              >
                {renderContent(item, index)}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Comments Section */}
        <div className="mt-16 p-8 rounded-xl" style={{ backgroundColor: colors.cardBackground }}>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.textPrimary }}>
            <MessageSquare size={20} />
            {language === 'en' ? 'Comments' : '评论'} ({comments.length})
          </h3>

          {/* Add Comment */}
          <div className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={language === 'en' ? 'Share your thoughts...' : '分享你的想法...'}
              className="w-full p-4 rounded-lg border resize-none"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.cardBorder,
                color: colors.textPrimary
              }}
              rows={3}
            />
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.accent, color: 'white' }}
            >
              {language === 'en' ? 'Post Comment' : '发表评论'}
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-lg" style={{ backgroundColor: colors.surface }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ backgroundColor: colors.accent }}>
                    {comment.author[0]}
                  </div>
                  <span className="font-medium" style={{ color: colors.textPrimary }}>{comment.author}</span>
                  <span className="text-sm" style={{ color: colors.textTertiary }}>
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ color: colors.textSecondary }}>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 