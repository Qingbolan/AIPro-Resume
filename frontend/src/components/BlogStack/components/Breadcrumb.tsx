import React from 'react';
import { Home, ChevronRight, BookOpen, Play, List } from 'lucide-react';
import { BlogData } from '../types/blog';
import { useLanguage } from '../../LanguageContext';

interface BreadcrumbProps {
  post: BlogData;
  onBack: () => void;
  onFilterByCategory?: (category: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ post, onBack, onFilterByCategory }) => {
  const { language } = useLanguage();
  const isSeries = Boolean(post.seriesId);

  const getContentTypeInfo = () => {
    switch (post.type) {
      case 'vlog':
        return {
          icon: <Play size={14} className="text-red-500" />,
          label: isSeries 
            ? (language === 'en' ? 'Video Series' : '视频系列')
            : (language === 'en' ? 'Vlog' : '视频博客'),
          category: language === 'en' ? 'Videos' : '视频',
          filterKey: 'vlog'
        };
      case 'tutorial':
        return {
          icon: <BookOpen size={14} className="text-green-500" />,
          label: isSeries
            ? (language === 'en' ? 'Tutorial Series' : '教程系列')
            : (language === 'en' ? 'Tutorial' : '教程'),
          category: language === 'en' ? 'Tutorials' : '教程',
          filterKey: 'tutorial'
        };
      case 'podcast':
        return {
          icon: <Play size={14} className="text-orange-500" />,
          label: isSeries
            ? (language === 'en' ? 'Podcast Series' : '播客系列')
            : (language === 'en' ? 'Podcast' : '播客'),
          category: language === 'en' ? 'Podcasts' : '播客',
          filterKey: 'podcast'
        };
      case 'article':
      default:
        return {
          icon: <BookOpen size={14} className="text-blue-500" />,
          label: isSeries
            ? (language === 'en' ? 'Article Series' : '文章系列')
            : (language === 'en' ? 'Article' : '文章'),
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
        {isSeries && <List size={12} className="text-purple-500 ml-1" />}
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