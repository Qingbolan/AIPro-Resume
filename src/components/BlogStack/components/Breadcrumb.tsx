import React from 'react';
import { ChevronRight, Home, BookOpen, Play, List } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { BlogData } from '../types/blog';

interface BreadcrumbProps {
  post: BlogData;
  onBack: () => void;
  onFilterByCategory?: (category: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ post, onBack, onFilterByCategory }) => {
  const { language } = useLanguage();

  const getContentTypeInfo = () => {
    switch (post.type) {
      case 'vlog':
        return {
          icon: <Play size={14} className="text-red-500" />,
          label: language === 'en' ? 'Vlog' : '视频博客',
          category: language === 'en' ? 'Video Blogs' : '视频博客',
          filterKey: 'vlog'
        };
      case 'series':
        return {
          icon: <List size={14} className="text-purple-500" />,
          label: language === 'en' ? 'Series' : '系列',
          category: language === 'en' ? 'Blog Series' : '博客系列',
          filterKey: 'series'
        };
      case 'article':
      default:
        return {
          icon: <BookOpen size={14} className="text-blue-500" />,
          label: language === 'en' ? 'Article' : '文章',
          category: language === 'en' ? 'Articles' : '文章',
          filterKey: 'article'
        };
    }
  };

  const handleCategoryClick = () => {
    if (onFilterByCategory) {
      onFilterByCategory(contentInfo.filterKey);
    } else {
      onBack(); // Fallback to normal back behavior
    }
  };

  const contentInfo = getContentTypeInfo();

  return (
    <nav className="flex items-center gap-2 text-sm text-theme-secondary">
      {/* Back to Blog */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 hover:text-theme-primary transition-colors"
      >
        <Home size={14} />
        <span className="hidden sm:inline">{language === 'en' ? 'Back to Blog' : '返回博客'}</span>
      </button>

      <ChevronRight size={12} className="text-theme-tertiary" />

      {/* Category - Filter by type */}
      <button
        onClick={handleCategoryClick}
        className="flex items-center gap-1 hover:text-theme-primary transition-colors"
      >
        {contentInfo.icon}
        <span className="hidden md:inline">{contentInfo.category}</span>
        <span className="md:hidden">{contentInfo.label}</span>
      </button>

      <ChevronRight size={12} className="text-theme-tertiary" />

      {/* Current Post */}
      <span className="text-theme-primary font-medium truncate max-w-[200px] sm:max-w-[300px]">
        {language === 'zh' && post.titleZh ? post.titleZh : post.title}
      </span>
    </nav>
  );
}; 