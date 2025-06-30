import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronUp, 
  BookOpen, 
  Clock, 
  User, 
  Calendar,
  ChevronRight,
  ChevronDown,
  Eye,
  Heart,
  Share2,
  Download,
  Play,
  Tag,
  Hash,
  Volume2,
  VolumeX,
  List,
  X
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { BlogData } from './types/blog';
import { BlogContentRenderer } from './components/BlogContentRenderer';
import { Breadcrumb } from './components/Breadcrumb';

interface ArticleDetailLayoutProps {
  post: BlogData;
  onBack: () => void;
  userAnnotations: Record<string, any>;
  annotations: Record<string, boolean>;
  showAnnotationForm: string | null;
  newAnnotationText: string;
  selectedText: any;
  highlightedAnnotation: string | null;
  onTextSelection: () => void;
  onToggleAnnotation: (contentId: string) => void;
  onSetShowAnnotationForm: (show: string | null) => void;
  onSetNewAnnotationText: (text: string) => void;
  onAddUserAnnotation: (contentId: string) => void;
  onRemoveUserAnnotation: (id: string) => void;
  onHighlightAnnotation: (id: string) => void;
  onCancelAnnotation: () => void;
}

const ArticleDetailLayout: React.FC<ArticleDetailLayoutProps> = ({
  post,
  onBack,
  userAnnotations,
  annotations,
  showAnnotationForm,
  newAnnotationText,
  selectedText,
  highlightedAnnotation,
  onTextSelection,
  onToggleAnnotation,
  onSetShowAnnotationForm,
  onSetNewAnnotationText,
  onAddUserAnnotation,
  onRemoveUserAnnotation,
  onHighlightAnnotation,
  onCancelAnnotation
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [metaSidebarCollapsed, setMetaSidebarCollapsed] = useState(true); // Default collapsed on mobile
  const [tocCollapsed, setTocCollapsed] = useState(true); // Default collapsed on mobile
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  // Generate table of contents from content by parsing actual headings
  const tableOfContents = React.useMemo(() => {
    const sections: Array<{id: string, title: string, level: number}> = [];
    
    post.content.forEach((item, index) => {
      if (item.type === 'text') {
        const lines = item.content.split('\n');
        lines.forEach((line, lineIndex) => {
          const trimmedLine = line.trim();
          // Check for markdown headings (# ## ### etc.)
          if (trimmedLine.startsWith('#')) {
            const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)/);
            if (headingMatch) {
              const level = headingMatch[1].length; // Number of # characters
              const title = headingMatch[2].trim();
              const id = item.id ? `${item.id}-heading-${lineIndex}` : `heading-${index}-${lineIndex}`;
              
              sections.push({
                id,
                title,
                level: Math.min(level, 3) // Limit to 3 levels for better UX
              });
            }
          }
          // Also check for HTML headings
          else if (trimmedLine.match(/<h[1-6].*?>/i)) {
            const htmlHeadingMatch = trimmedLine.match(/<h([1-6]).*?>(.*?)<\/h[1-6]>/i);
            if (htmlHeadingMatch) {
              const level = parseInt(htmlHeadingMatch[1]);
              const title = htmlHeadingMatch[2].replace(/<[^>]*>/g, '').trim(); // Remove HTML tags
              const id = item.id ? `${item.id}-heading-${lineIndex}` : `heading-${index}-${lineIndex}`;
              
              sections.push({
                id,
                title,
                level: Math.min(level, 3)
              });
            }
          }
          // Check for lines that look like headings (standalone lines in caps or with colons)
          else if (
            trimmedLine.length > 3 && 
            trimmedLine.length < 80 && 
            !trimmedLine.includes('.') && 
            (
              trimmedLine === trimmedLine.toUpperCase() || 
              trimmedLine.endsWith(':') ||
              /^[A-Z][A-Za-z\s]+$/.test(trimmedLine)
            )
          ) {
            // Only add if it's not part of a sentence or paragraph
            const nextLine = lines[lineIndex + 1];
            const prevLine = lines[lineIndex - 1];
            
            if (
              (!nextLine || nextLine.trim() === '' || nextLine.trim().length > 20) &&
              (!prevLine || prevLine.trim() === '' || prevLine.trim().length > 20)
            ) {
              const id = item.id ? `${item.id}-section-${lineIndex}` : `section-${index}-${lineIndex}`;
              sections.push({
                id,
                title: trimmedLine.endsWith(':') ? trimmedLine.slice(0, -1) : trimmedLine,
                level: 2
              });
            }
          }
        });
      }
      // Add quotes as subsections
      else if (item.type === 'quote' && item.content.length < 100) {
        sections.push({
          id: item.id || `quote-${index}`,
          title: `"${item.content.substring(0, 40)}..."`,
          level: 3
        });
      }
    });
    
    // If no headings found, create default sections based on content blocks
    if (sections.length === 0) {
      const contentBlocks = post.content.filter(item => 
        item.type === 'text' && item.content.trim().length > 100
      );
      
      if (contentBlocks.length > 1) {
        contentBlocks.forEach((item, index) => {
          const firstSentence = item.content.split('.')[0].trim();
          const title = firstSentence.length > 50 
            ? firstSentence.substring(0, 50) + '...'
            : firstSentence;
          
          sections.push({
            id: item.id || `auto-section-${index}`,
            title: title || `${language === 'en' ? 'Section' : '章节'} ${index + 1}`,
            level: 1
          });
        });
      } else {
        // Fallback to default sections
        return [
          { id: 'content-start', title: language === 'en' ? 'Introduction' : '介绍', level: 1 },
          { id: 'content-main', title: language === 'en' ? 'Main Content' : '主要内容', level: 1 },
          { id: 'content-end', title: language === 'en' ? 'Conclusion' : '总结', level: 1 },
        ];
      }
    }
    
    return sections.slice(0, 12); // Allow more sections since we're parsing real headings
  }, [post.content, language]);

  // Handle scroll for back to top button and active section
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      
      // Update active section based on scroll position using content blocks
      const contentElements = post.content.map(item => 
        item.id ? document.getElementById(item.id) : null
      ).filter(Boolean);
      
      if (contentElements.length === 0) return;
      
      // Find the currently visible content element
      const scrollPosition = window.scrollY + 150; // Offset for header
      let currentContentIndex = -1;
      
      for (let i = 0; i < contentElements.length; i++) {
        const element = contentElements[i];
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentContentIndex = i;
            break;
          } else if (scrollPosition < elementTop) {
            // If we're before this element, the previous one should be active
            currentContentIndex = Math.max(0, i - 1);
            break;
          }
        }
      }
      
      // If we're past all elements, select the last one
      if (currentContentIndex === -1) {
        currentContentIndex = contentElements.length - 1;
      }
      
      // Find the corresponding TOC section for this content block
      const activeContentId = post.content[currentContentIndex]?.id;
      if (activeContentId) {
        // Look for TOC items that belong to this content block
        const relatedTocItem = tableOfContents.find(section => 
          section.id.includes(activeContentId) || section.id === activeContentId
        );
        
        if (relatedTocItem) {
          setActiveSection(relatedTocItem.id);
        } else {
          // Fallback: use index-based mapping
          const tocIndex = Math.min(currentContentIndex, tableOfContents.length - 1);
          if (tableOfContents[tocIndex]) {
            setActiveSection(tableOfContents[tocIndex].id);
          }
        }
      }
    };

    // Initial call to set active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents, post.content]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    // First try to find the exact element
    let element = document.getElementById(sectionId);
    
    // If not found, try to find the related content block
    if (!element) {
      // Extract the content ID from the section ID
      const contentId = sectionId.split('-heading-')[0] || sectionId.split('-section-')[0];
      element = document.getElementById(contentId);
    }
    
    // If still not found, try to find by index
    if (!element) {
      const sectionIndex = tableOfContents.findIndex(section => section.id === sectionId);
      if (sectionIndex >= 0 && sectionIndex < post.content.length) {
        const contentItem = post.content[sectionIndex];
        if (contentItem.id) {
          element = document.getElementById(contentItem.id);
        }
      }
    }
    
    if (element) {
      // Account for fixed header height (top nav + blog header)
      const headerHeight = 120; // 增加到120px以考虑双层头部
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(sectionId);
    } else {
      // Fallback: scroll to approximate position based on section index
      const sectionIndex = tableOfContents.findIndex(section => section.id === sectionId);
      if (sectionIndex >= 0) {
        const contentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = (sectionIndex / tableOfContents.length) * contentHeight;
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        
        setActiveSection(sectionId);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // In real app, this would call an API
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // In real app, this would call an API
  };

  const getContentTypeIcon = () => {
    switch (post.type) {
      case 'vlog':
        return <Play size={14} className="text-red-500" />;
      case 'article':
      default:
        return <BookOpen size={14} className="text-blue-500" />;
    }
  };

  const getContentTypeLabel = () => {
    switch (post.type) {
      case 'vlog':
        return language === 'en' ? 'Vlog' : '视频博客';
      case 'article':
      default:
        return language === 'en' ? 'Article' : '文章';
    }
  };

  return (
    <div className="min-h-screen bg-theme-background">

      {/* Fixed Header - Y轴 0，考虑顶部导航栏 */}
      <motion.div 
        className="fixed top-12 xs:top-14 sm:top-16 left-0 right-0 z-40 bg-theme-background/95 backdrop-blur-sm border-b border-theme-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Breadcrumb 
              post={post} 
              onBack={onBack}
              onFilterByCategory={(category) => {
                // Navigate back to blog with category filter
                navigate(`/blog?type=${category}`);
              }}
            />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-theme-secondary">
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={14} className={liked ? 'text-red-500 fill-current' : ''} />
                  <span>{post.likes + (liked ? 1 : 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Meta Sidebar - Y轴轨道 1 - Hidden on mobile */}
      <motion.div 
        className={`fixed left-0 top-16 bottom-0 z-40 bg-theme-surface border-r border-theme-border transition-all duration-300 hidden lg:block ${
          metaSidebarCollapsed ? 'w-12' : 'w-80'
        }`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="h-full overflow-y-auto p-4">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setMetaSidebarCollapsed(!metaSidebarCollapsed)}
            className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors mb-4 w-full"
          >
            {metaSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
            {!metaSidebarCollapsed && <span>{language === 'en' ? 'Article Info' : '文章信息'}</span>}
          </button>

          {!metaSidebarCollapsed && (
            <>
              {/* Article Meta Info */}
              <div className="bg-theme-background rounded-lg p-4 border border-theme-border mb-6">
                <div className="flex items-center gap-2 mb-3">
                  {getContentTypeIcon()}
                  <h3 className="font-semibold text-theme-primary text-sm">
                    {language === 'zh' && post.titleZh ? post.titleZh : post.title}
                  </h3>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-theme-secondary">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-theme-secondary">
                    <Calendar size={12} />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-theme-secondary">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                  {post.type === 'vlog' && post.videoDuration && (
                    <div className="flex items-center gap-2 text-theme-secondary">
                      <Play size={12} />
                      <span>{post.videoDuration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="bg-theme-background rounded-lg p-4 border border-theme-border mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={14} className="text-green-500" />
                    <h4 className="font-medium text-theme-primary text-sm">
                      {language === 'en' ? 'Tags' : '标签'}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-theme-tertiary text-theme-secondary rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics */}
              <div className="bg-theme-background rounded-lg p-4 border border-theme-border mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Hash size={14} className="text-purple-500" />
                  <h4 className="font-medium text-theme-primary text-sm">
                    {language === 'en' ? 'Statistics' : '统计'}
                  </h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">{language === 'en' ? 'Views' : '浏览量'}</span>
                    <span className="text-theme-primary font-medium">{post.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">{language === 'en' ? 'Likes' : '点赞'}</span>
                    <span className="text-theme-primary font-medium">{(post.likes + (liked ? 1 : 0)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-secondary">{language === 'en' ? 'Words' : '字数'}</span>
                    <span className="text-theme-primary font-medium">
                      ~{post.content.reduce((count, item) => 
                        count + (item.content?.split(' ').length || 0), 0
                      ).toLocaleString()}
                    </span>
                  </div>

                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-theme-background rounded-lg p-4 border border-theme-border">
                <h4 className="font-medium text-theme-primary text-sm mb-3">
                  {language === 'en' ? 'Quick Actions' : '快速操作'}
                </h4>
                <div className="space-y-1">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 w-full text-left text-xs transition-colors p-2 rounded hover:bg-theme-tertiary ${
                      liked ? 'text-red-500' : 'text-theme-secondary hover:text-theme-primary'
                    }`}
                  >
                    <Heart size={12} className={liked ? 'fill-current' : ''} />
                    <span>{liked ? (language === 'en' ? 'Liked' : '已点赞') : (language === 'en' ? 'Like' : '点赞')}</span>
                  </button>
                  <button 
                    onClick={handleBookmark}
                    className={`flex items-center gap-2 w-full text-left text-xs transition-colors p-2 rounded hover:bg-theme-tertiary ${
                      bookmarked ? 'text-yellow-500' : 'text-theme-secondary hover:text-theme-primary'
                    }`}
                  >
                    <BookOpen size={12} />
                    <span>{bookmarked ? (language === 'en' ? 'Bookmarked' : '已收藏') : (language === 'en' ? 'Bookmark' : '收藏')}</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 w-full text-left text-xs text-theme-secondary hover:text-theme-primary transition-colors p-2 rounded hover:bg-theme-tertiary"
                  >
                    <Share2 size={12} />
                    <span>{language === 'en' ? 'Share' : '分享'}</span>
                  </button>
                  <button className="flex items-center gap-2 w-full text-left text-xs text-theme-secondary hover:text-theme-primary transition-colors p-2 rounded hover:bg-theme-tertiary">
                    <Download size={12} />
                    <span>{language === 'en' ? 'Download' : '下载'}</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Main Content - Y轴轨道 2 - Responsive layout */}
      <div className={`transition-all duration-300 lg:${metaSidebarCollapsed ? 'ml-12' : 'ml-80'} lg:${tocCollapsed ? 'mr-0' : 'mr-80'}`}>
        <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  post.type === 'vlog' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {getContentTypeLabel()}
                </span>
                <span className="text-theme-tertiary">•</span>
                <span className="text-sm text-theme-secondary">{post.readTime}</span>
                {post.type === 'vlog' && post.videoDuration && (
                  <>
                    <span className="text-theme-tertiary">•</span>
                    <span className="text-sm text-theme-secondary">{post.videoDuration}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-theme-primary mb-4">
                {language === 'zh' && post.titleZh ? post.titleZh : post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-sm text-theme-secondary mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <p className="text-lg text-theme-secondary leading-relaxed">
                {language === 'zh' && post.summaryZh ? post.summaryZh : post.summary}
              </p>

              {/* Video Player for Vlog */}
              {post.type === 'vlog' && post.videoUrl && (
                <div className="mt-6">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video 
                      src={post.videoUrl} 
                      controls 
                      muted={videoMuted}
                      className="w-full aspect-video"
                      poster={post.videoThumbnail || `/api/placeholder/800/450`}
                    />
                    <button
                      onClick={() => setVideoMuted(!videoMuted)}
                      className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                    >
                      {videoMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </header>

            {/* Content Section */}
            {post.type === 'vlog' ? (
              <>
                {/* Divider for Vlog */}
                <div className="my-8 border-t border-theme-border"></div>
                
                {/* Vlog Additional Content */}
                <div className="prose-content space-y-6">
                  <BlogContentRenderer
                    content={post.content}
                    isWideScreen={true}
                    userAnnotations={userAnnotations}
                    annotations={annotations}
                    showAnnotationForm={showAnnotationForm}
                    newAnnotationText={newAnnotationText}
                    selectedText={selectedText}
                    highlightedAnnotation={highlightedAnnotation}
                    onTextSelection={onTextSelection}
                    onToggleAnnotation={onToggleAnnotation}
                    onSetShowAnnotationForm={onSetShowAnnotationForm}
                    onSetNewAnnotationText={onSetNewAnnotationText}
                    onAddUserAnnotation={onAddUserAnnotation}
                    onRemoveUserAnnotation={onRemoveUserAnnotation}
                    onHighlightAnnotation={onHighlightAnnotation}
                    onCancelAnnotation={onCancelAnnotation}
                  />
                </div>
              </>
            ) : (
              /* Article Content */
              <div className="prose-content space-y-6">
                <BlogContentRenderer
                  content={post.content}
                  isWideScreen={true}
                  userAnnotations={userAnnotations}
                  annotations={annotations}
                  showAnnotationForm={showAnnotationForm}
                  newAnnotationText={newAnnotationText}
                  selectedText={selectedText}
                  highlightedAnnotation={highlightedAnnotation}
                  onTextSelection={onTextSelection}
                  onToggleAnnotation={onToggleAnnotation}
                  onSetShowAnnotationForm={onSetShowAnnotationForm}
                  onSetNewAnnotationText={onSetNewAnnotationText}
                  onAddUserAnnotation={onAddUserAnnotation}
                  onRemoveUserAnnotation={onRemoveUserAnnotation}
                  onHighlightAnnotation={onHighlightAnnotation}
                  onCancelAnnotation={onCancelAnnotation}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* TOC Sidebar - Y轴轨道 3 - Hidden on mobile */}
      <motion.div 
        className={`fixed right-0 top-16 bottom-0 z-40 bg-theme-surface border-l border-theme-border transition-all duration-300 hidden lg:block ${
          tocCollapsed ? 'w-12' : 'w-80'
        }`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="h-full overflow-y-auto p-4">
          {/* TOC Toggle */}
          <button
            onClick={() => setTocCollapsed(!tocCollapsed)}
            className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors mb-4 w-full"
          >
            {tocCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
            {!tocCollapsed && <span>{language === 'en' ? 'Outline' : '大纲'}</span>}
          </button>

          {!tocCollapsed && (
            <>
              {/* Table of Contents */}
              <div className="bg-theme-background rounded-lg p-4 border border-theme-border mb-6">
                <h4 className="font-medium text-theme-primary mb-3 text-sm">
                  {language === 'en' ? 'Table of Contents' : '目录'}
                </h4>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left text-xs py-2 px-3 rounded transition-all duration-200 ${
                        activeSection === item.id
                          ? 'text-theme-primary bg-theme-primary/10 border-l-2 border-theme-primary font-medium'
                          : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-primary/5'
                      }`}
                      style={{ paddingLeft: `${item.level * 8 + 12}px` }}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>


            </>
          )}
        </div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-theme-surface/95 backdrop-blur-sm border-t border-theme-border lg:hidden">
        <div className="flex items-center justify-around py-2 px-4">
          <button
            onClick={() => setMetaSidebarCollapsed(!metaSidebarCollapsed)}
            className="flex flex-col items-center gap-1 text-xs text-theme-secondary hover:text-theme-primary transition-colors p-2"
          >
            <User size={18} />
            <span>{language === 'en' ? 'Info' : '信息'}</span>
          </button>

          <button
            onClick={() => setTocCollapsed(!tocCollapsed)}
            className="flex flex-col items-center gap-1 text-xs text-theme-secondary hover:text-theme-primary transition-colors p-2"
          >
            <List size={18} />
            <span>{language === 'en' ? 'TOC' : '目录'}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex flex-col items-center gap-1 text-xs text-theme-secondary hover:text-theme-primary transition-colors p-2"
          >
            <ChevronUp size={18} />
            <span>{language === 'en' ? 'Top' : '顶部'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 text-xs text-theme-secondary hover:text-theme-primary transition-colors p-2"
          >
            <Share2 size={18} />
            <span>{language === 'en' ? 'Share' : '分享'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay Sidebars */}
      {/* Meta Sidebar Overlay - Mobile */}
      <motion.div
        className={`fixed inset-0 z-40 lg:hidden ${metaSidebarCollapsed ? 'pointer-events-none' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: metaSidebarCollapsed ? 0 : 1 }}
      >
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
          onClick={() => setMetaSidebarCollapsed(true)}
        />
        <motion.div
          className="absolute left-0 top-16 bottom-0 w-80 max-w-[85vw] bg-theme-surface border-r border-theme-border"
          initial={{ x: -320 }}
          animate={{ x: metaSidebarCollapsed ? -320 : 0 }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className="h-full overflow-y-auto p-4">
            <button
              onClick={() => setMetaSidebarCollapsed(true)}
              className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors mb-4 w-full"
            >
              <X size={16} />
              <span>{language === 'en' ? 'Close' : '关闭'}</span>
            </button>

            {/* Same content as desktop meta sidebar - simplified */}
            <div className="bg-theme-background rounded-lg p-4 border border-theme-border mb-4">
              <div className="flex items-center gap-2 mb-3">
                {getContentTypeIcon()}
                <h3 className="font-semibold text-theme-primary text-sm">
                  {language === 'zh' && post.titleZh ? post.titleZh : post.title}
                </h3>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-theme-secondary">
                  <User size={12} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-theme-secondary">
                  <Calendar size={12} />
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-theme-secondary">
                  <Clock size={12} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="bg-theme-background rounded-lg p-4 border border-theme-border mb-4">
                <h4 className="font-medium text-theme-primary text-sm mb-2">
                  {language === 'en' ? 'Tags' : '标签'}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-theme-tertiary text-theme-secondary rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-theme-background rounded-lg p-4 border border-theme-border">
              <h4 className="font-medium text-theme-primary text-sm mb-3">
                {language === 'en' ? 'Actions' : '操作'}
              </h4>
              <div className="space-y-1">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 w-full text-left text-xs transition-colors p-2 rounded hover:bg-theme-tertiary ${
                    liked ? 'text-red-500' : 'text-theme-secondary hover:text-theme-primary'
                  }`}
                >
                  <Heart size={12} className={liked ? 'fill-current' : ''} />
                  <span>{liked ? (language === 'en' ? 'Liked' : '已点赞') : (language === 'en' ? 'Like' : '点赞')}</span>
                </button>
                <button 
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 w-full text-left text-xs transition-colors p-2 rounded hover:bg-theme-tertiary ${
                    bookmarked ? 'text-yellow-500' : 'text-theme-secondary hover:text-theme-primary'
                  }`}
                >
                  <BookOpen size={12} />
                  <span>{bookmarked ? (language === 'en' ? 'Bookmarked' : '已收藏') : (language === 'en' ? 'Bookmark' : '收藏')}</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 w-full text-left text-xs text-theme-secondary hover:text-theme-primary transition-colors p-2 rounded hover:bg-theme-tertiary"
                >
                  <Share2 size={12} />
                  <span>{language === 'en' ? 'Share' : '分享'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* TOC Sidebar Overlay - Mobile */}
      <motion.div
        className={`fixed inset-0 z-40 lg:hidden ${tocCollapsed ? 'pointer-events-none' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: tocCollapsed ? 0 : 1 }}
      >
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
          onClick={() => setTocCollapsed(true)}
        />
        <motion.div
          className="absolute right-0 top-16 bottom-0 w-80 max-w-[85vw] bg-theme-surface border-l border-theme-border"
          initial={{ x: 320 }}
          animate={{ x: tocCollapsed ? 320 : 0 }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className="h-full overflow-y-auto p-4">
            <button
              onClick={() => setTocCollapsed(true)}
              className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors mb-4 w-full"
            >
              <X size={16} />
              <span>{language === 'en' ? 'Close' : '关闭'}</span>
            </button>

            {/* Table of Contents */}
            <div className="bg-theme-background rounded-lg p-4 border border-theme-border">
              <h4 className="font-medium text-theme-primary mb-3 text-sm">
                {language === 'en' ? 'Table of Contents' : '目录'}
              </h4>
              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setTocCollapsed(true);
                    }}
                    className={`block w-full text-left text-xs py-2 px-3 rounded transition-all duration-200 ${
                      activeSection === item.id
                        ? 'text-theme-primary bg-theme-primary/10 border-l-2 border-theme-primary font-medium'
                        : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-primary/5'
                    }`}
                    style={{ paddingLeft: `${item.level * 8 + 12}px` }}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Back to Top Button - Desktop only */}
      {showBackToTop && (
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 bg-theme-primary text-white rounded-full shadow-lg items-center justify-center hover:bg-theme-primary/90 transition-colors z-50 hidden lg:flex"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default ArticleDetailLayout; 