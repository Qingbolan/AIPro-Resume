// Main Component (now refactored from 1219 lines to ~150 lines)
export { default as BlogDetail } from './BlogDetail';

// Types
export * from './types/blog';

// Hooks
export { useBlogData } from './hooks/useBlogData';
export { useReadingProgress } from './hooks/useReadingProgress';
export { useAnnotations } from './hooks/useAnnotations';
export { useTOC } from './hooks/useTOC';
export { useComments } from './hooks/useComments';

// Components
export { BlogHeader } from './components/BlogHeader';
export { BlogArticleHeader } from './components/BlogArticleHeader';
export { BlogContentRenderer } from './components/BlogContentRenderer';
// export { BlogTOC } from './components/BlogTOC'; // Component not found, commented out
export { BlogComments } from './components/BlogComments';
export { BlogLoadingState } from './components/BlogLoadingState';

// Content Components
export * from './components/BlogContent';

// Data - moved to API layer 