import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import all custom hooks
import { useBlogData } from './hooks/useBlogData';
import { useReadingProgress } from './hooks/useReadingProgress';
import { useAnnotations } from './hooks/useAnnotations';
import { useTOC } from './hooks/useTOC';

// Import all components
import { BlogLoadingState } from './components/BlogLoadingState';
import { BlogHeader } from './components/BlogHeader';
import { BlogArticleHeader } from './components/BlogArticleHeader';
import { BlogContentRenderer } from './components/BlogContentRenderer';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // UI state
  const [showToc, setShowToc] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);
  const [isXLScreen, setIsXLScreen] = useState(window.innerWidth >= 1280);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [annotations, setAnnotations] = useState<Record<string, boolean>>({});

  const contentRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const { blog, loading } = useBlogData(id);
  const readingProgress = useReadingProgress();
  const {
    userAnnotations,
    showAnnotationForm,
    newAnnotationText,
    selectedText,
    highlightedAnnotation,
    setNewAnnotationText,
    setShowAnnotationForm,
    handleTextSelection,
    addUserAnnotation,
    removeUserAnnotation,
    highlightAnnotation,
    cancelAnnotation
  } = useAnnotations();
  const { sections } = useTOC(blog);

  // Enhanced window resize handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsWideScreen(width >= 1024);
      setIsXLScreen(width >= 1280);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle annotation toggle
  const toggleAnnotation = (contentId: string) => {
    setAnnotations(prev => ({
      ...prev,
      [contentId]: !prev[contentId]
    }));
  };

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: blog.summary,
        url: window.location.href
      });
    } else if (blog) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Loading and error states
  if (loading || !blog) {
    return <BlogLoadingState loading={loading} error={!loading && !blog} />;
  }

  const userAnnotationsCount = Object.keys(userAnnotations).length;

  // Dynamic layout calculations
  const getContentWidth = () => {
    if (!isWideScreen) return 'w-full max-w-4xl';
    if (showToc && isXLScreen) return 'w-full max-w-4xl xl:max-w-5xl';
    if (!showToc && isXLScreen) return 'w-full max-w-6xl';
    return 'w-full max-w-4xl';
  };

  // const getColumnLayout = () => {
  //   if (!isWideScreen) return 'columns-1';
  //   if (showToc) return 'columns-1 xl:columns-2';
  //   return 'columns-1 lg:columns-2';
  // };

  return (
    <div className="min-h-screen">
      {/* Header with progress bar */}
      <BlogHeader
        blog={blog}
        readingProgress={readingProgress}
        sections={sections}
        userAnnotationsCount={userAnnotationsCount}
        liked={liked}
        bookmarked={bookmarked}
        showToc={showToc}
        isWideScreen={isWideScreen}
        onToggleLike={() => setLiked(!liked)}
        onToggleBookmark={() => setBookmarked(!bookmarked)}
        onToggleToc={() => setShowToc(!showToc)}
        onShare={handleShare}
      />

      {/* Main Layout Container */}
      <div className="relative top-0 left-0 right-0 bottom-0">
        {/* Content Wrapper with Flexible Width */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300">

          {/* Three-Column Layout for XL screens, Two-Column for LG, Single for smaller */}
          <div className={`flex gap-8 lg:gap-12 xl:gap-16 ${isWideScreen && showToc ? 'xl:flex-row' : 'flex-col'
            }`}>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 py-8 lg:py-16">
              {/* Article Header */}
              <div className={`mx-auto mb-12 ${getContentWidth()}`}>
                <BlogArticleHeader blog={blog} />
              </div>

              {/* Article Content with Dynamic Layout */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                ref={contentRef}
                className='w-full max-w-6xl mx-auto'
                // className={`mx-auto ${getContentWidth()} ${getColumnLayout()}`}
                style={{
                  columnFill: 'balance',
                  columnGap: isWideScreen ? '3rem' : '2rem',
                  orphans: 3,
                  widows: 3
                }}
              >
                <BlogContentRenderer
                  content={blog.content}
                  isWideScreen={isWideScreen}
                  userAnnotations={userAnnotations}
                  annotations={annotations}
                  showAnnotationForm={showAnnotationForm}
                  newAnnotationText={newAnnotationText}
                  selectedText={selectedText}
                  highlightedAnnotation={highlightedAnnotation}
                  onTextSelection={handleTextSelection}
                  onToggleAnnotation={toggleAnnotation}
                  onSetShowAnnotationForm={setShowAnnotationForm}
                  onSetNewAnnotationText={setNewAnnotationText}
                  onAddUserAnnotation={addUserAnnotation}
                  onRemoveUserAnnotation={removeUserAnnotation}
                  onHighlightAnnotation={highlightAnnotation}
                  onCancelAnnotation={cancelAnnotation}
                />
              </motion.article>

              {/* Comments Section */}
            </main>

            {/* Right Sidebar - Additional Content or Metadata (Future Use) */}
            {isXLScreen && !showToc && (
              <aside className="w-48 flex-shrink-0 hidden 2xl:block">
                {/* Reserved for future features like related articles, author info, etc. */}
                <div className="sticky top-20 p-6 bg-theme-surface-elevated rounded-xl border border-theme-card-border">
                  <h3 className="text-sm font-semibold text-theme-text-primary mb-4 font-sans">
                    Article Info
                  </h3>
                  <div className="space-y-3 text-sm text-theme-text-secondary">
                    <div>
                      <span className="font-medium">Reading time:</span>
                      <br />
                      {Math.ceil(blog.content.length / 1000)} min read
                    </div>
                    <div>
                      <span className="font-medium">Word count:</span>
                      <br />
                      ~{blog.content.reduce((count, item) =>
                        count + (item.content.split(' ').length || 0), 0
                      )} words
                    </div>
                    <div>
                      <span className="font-medium">Annotations:</span>
                      <br />
                      {userAnnotationsCount} personal notes
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 