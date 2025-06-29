import { useState, useEffect } from 'react';
import { BlogData } from '../types/blog';
import { fetchBlogById, updateBlogViews } from '../../../api';
import { useLanguage } from '../../LanguageContext';

export const useBlogData = (id: string | undefined) => {
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const loadBlog = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch blog data with language support
        const blogData = await fetchBlogById(id, language as 'en' | 'zh');
        
        if (blogData) {
          setBlog(blogData);
          // Update view count
          await updateBlogViews(id, language as 'en' | 'zh');
        } else {
          setError(language === 'en' ? 'Blog post not found' : '博客文章未找到');
        }
      } catch (err) {
        console.error('Error loading blog:', err);
        setError(language === 'en' ? 'Failed to load blog post' : '加载博客文章失败');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id, language]);

  return { blog, loading, error };
}; 