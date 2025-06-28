import { useState, useEffect } from 'react';
import { BlogData } from '../types/blog';
import { mockBlogData } from '../data/mockBlogData';

export const useBlogData = (id: string | undefined) => {
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const blogData = mockBlogData[id || '1'];
      if (blogData) {
        setBlog(blogData);
      }
      setLoading(false);
    };
    loadBlog();
  }, [id]);

  return { blog, loading };
}; 