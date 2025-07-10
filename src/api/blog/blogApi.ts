import type { BlogData } from '../../components/BlogStack/types/blog';
import { get, post, withFallback, formatLanguage } from '../utils';
import { type PaginationRequest, type SearchRequest, type ListResponse } from '../config';

// Backend API request/response types
interface BlogListRequest extends PaginationRequest {
  status?: string;
  content_type?: string;
  featured?: boolean;
  tag?: string;
  category?: string;
  author?: string;
  search?: string;
}

interface BlogListResponse extends ListResponse<BlogData> {
  posts: BlogData[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}


interface BlogSearchRequest extends SearchRequest {
  query?: string;
  category?: string;
  tags?: string;
  author?: string;
}

interface UpdateBlogLikesResponse {
  likes: number;
}

// Mock blog data for fallback
const mockBlogData: Record<'en' | 'zh', Record<string, BlogData>> = {
  en: {
    '1': {
      id: '1',
      title: 'Leveraging Large Language Models for Code Refactoring: A Deep Dive',
      author: 'Hu Silan',
      publishDate: '2024-01-25',
      readTime: '15 min read',
      category: 'Research',
      tags: ['LLM', 'Code Refactoring', 'AI', 'Software Engineering'],
      summary: 'Exploring the revolutionary potential of large language models in automated code refactoring, this article delves into our latest research findings and practical implementations.',
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
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Building Scalable AI Systems: Lessons from Production',
      author: 'Hu Silan',
      publishDate: '2024-01-20',
      readTime: '12 min read',
      category: 'Engineering',
      tags: ['AI Systems', 'Scalability', 'Production', 'MLOps'],
      summary: 'Practical insights and lessons learned from deploying AI systems at scale, covering architecture decisions, monitoring strategies, and performance optimization.',
      likes: 189,
      views: 1203,
      content: [
        {
          type: 'text',
          content: 'Deploying AI systems in production environments presents unique challenges that go far beyond training accurate models. This article shares practical insights from our experience building and maintaining large-scale AI systems.',
          id: 'content-1'
        }
      ]
    },
    '3': {
      id: '3',
      title: 'The Evolution of Neural Network Architectures',
      author: 'Hu Silan',
      publishDate: '2024-01-15',
      readTime: '18 min read',
      category: 'Deep Learning',
      tags: ['Neural Networks', 'Architecture', 'Deep Learning', 'History'],
      summary: 'A comprehensive overview of how neural network architectures have evolved from simple perceptrons to modern transformer models.',
      likes: 312,
      views: 2156,
      content: [
        {
          type: 'text',
          content: 'The journey of neural network architectures from simple perceptrons to sophisticated transformer models represents one of the most remarkable progressions in computer science history.',
          id: 'content-1'
        }
      ]
    },
    '4': {
      id: '4',
      title: 'Quick Update: Bug Fixes and Improvements',
      author: 'Hu Silan',
      publishDate: '2024-01-10',
      readTime: '3 min read',
      category: 'Updates',
      tags: [], // Test case for null tags
      summary: 'A quick update on recent bug fixes and improvements to the platform.',
      likes: 45,
      views: 312,
      content: [
        {
          type: 'text',
          content: 'This week we\'ve made several important improvements to the platform.',
          id: 'content-1'
        }
      ]
    }
  },
  zh: {
    '1': {
      id: '1',
      title: '利用大型语言模型进行代码重构：深度探讨',
      titleZh: '利用大型语言模型进行代码重构：深度探讨',
      author: '胡思蓝',
      publishDate: '2024-01-25',
      readTime: '15分钟阅读',
      category: '研究',
      tags: ['大语言模型', '代码重构', '人工智能', '软件工程'],
      summary: '探索大型语言模型在自动化代码重构中的革命性潜力，本文深入研究我们的最新研究发现和实际实现。',
      summaryZh: '探索大型语言模型在自动化代码重构中的革命性潜力，本文深入研究我们的最新研究发现和实际实现。',
      likes: 234,
      views: 1547,
      content: [
        {
          type: 'text',
          content: '大型语言模型（LLM）已经彻底改变了软件开发的许多方面，但它们在代码重构中的应用代表了一个特别令人兴奋的前沿领域。我们最近的研究发现了几种突破性方法，这些方法可能从根本上改变开发人员处理代码质量改进的方式。',
          id: 'content-1'
        }
      ]
    },
    '2': {
      id: '2',
      title: '构建可扩展的AI系统：生产环境的经验教训',
      titleZh: '构建可扩展的AI系统：生产环境的经验教训',
      author: '胡思蓝',
      publishDate: '2024-01-20',
      readTime: '12分钟阅读',
      category: '工程',
      tags: ['AI系统', '可扩展性', '生产环境', 'MLOps'],
      summary: '从大规模部署AI系统中获得的实用见解和经验教训，涵盖架构决策、监控策略和性能优化。',
      summaryZh: '从大规模部署AI系统中获得的实用见解和经验教训，涵盖架构决策、监控策略和性能优化。',
      likes: 189,
      views: 1203,
      content: [
        {
          type: 'text',
          content: '在生产环境中部署AI系统带来了远超训练准确模型的独特挑战。本文分享了我们构建和维护大规模AI系统的实践经验。',
          id: 'content-1'
        }
      ]
    },
    '3': {
      id: '3',
      title: '神经网络架构的演进',
      titleZh: '神经网络架构的演进',
      author: '胡思蓝',
      publishDate: '2024-01-15',
      readTime: '18分钟阅读',
      category: '深度学习',
      tags: ['神经网络', '架构', '深度学习', '历史'],
      summary: '神经网络架构如何从简单感知器演变为现代变换器模型的全面概述。',
      summaryZh: '神经网络架构如何从简单感知器演变为现代变换器模型的全面概述。',
      likes: 312,
      views: 2156,
      content: [
        {
          type: 'text',
          content: '神经网络架构从简单感知器到复杂变换器模型的演进历程，代表了计算机科学史上最显著的进步之一。',
          id: 'content-1'
        }
      ]
    },
    '4': {
      id: '4',
      title: '快速更新：错误修复和改进',
      titleZh: '快速更新：错误修复和改进',
      author: '胡思蓝',
      publishDate: '2024-01-10',
      readTime: '3分钟阅读',
      category: '更新',
      tags: [], // Test case for null tags
      summary: '关于平台最近错误修复和改进的快速更新。',
      summaryZh: '关于平台最近错误修复和改进的快速更新。',
      likes: 45,
      views: 312,
      content: [
        {
          type: 'text',
          content: '本周我们对平台进行了几项重要改进。',
          id: 'content-1'
        }
      ]
    }
  }
};

// Series-specific API functions
export interface SeriesEpisode {
  id: string;
  title: string;
  titleZh?: string;
  duration?: string;
  completed?: boolean;
  current?: boolean;
  order: number;
}

export interface SeriesData {
  id: string;
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  episodes: SeriesEpisode[];
  totalDuration: string;
  completedCount: number;
}

// Mock series data
const mockSeriesData: Record<'en' | 'zh', Record<string, SeriesData>> = {
  en: {
    'modern-web-dev': {
      id: 'modern-web-dev',
      title: 'Modern Web Development Mastery',
      titleZh: '现代Web开发精通',
      description: 'A comprehensive series covering modern web development practices, from React fundamentals to advanced patterns.',
      descriptionZh: '一个全面的系列，涵盖现代Web开发实践，从React基础到高级模式。',
      totalDuration: '6h 20m',
      completedCount: 1,
      episodes: [
        { id: '5', title: 'React Fundamentals', titleZh: 'React基础', duration: '45 min', current: true, completed: false, order: 1 },
        { id: '5-2', title: 'State Management Patterns', titleZh: '状态管理模式', duration: '38 min', completed: false, order: 2 },
        { id: '5-3', title: 'Performance Optimization', titleZh: '性能优化', duration: '42 min', completed: false, order: 3 },
      ]
    }
  },
  zh: {
    'modern-web-dev': {
      id: 'modern-web-dev',
      title: '现代Web开发精通',
      titleZh: '现代Web开发精通',
      description: '一个全面的系列，涵盖现代Web开发实践，从React基础到高级模式。',
      descriptionZh: '一个全面的系列，涵盖现代Web开发实践，从React基础到高级模式。',
      totalDuration: '6小时20分钟',
      completedCount: 1,
      episodes: [
        { id: '5', title: 'React基础', titleZh: 'React基础', duration: '45分钟', current: true, completed: false, order: 1 },
        { id: '5-2', title: '状态管理模式', titleZh: '状态管理模式', duration: '38分钟', completed: false, order: 2 },
        { id: '5-3', title: '性能优化', titleZh: '性能优化', duration: '42分钟', completed: false, order: 3 },
      ]
    }
  }
};

// API functions

/**
 * Get blog posts list with pagination and filtering
 */
export const fetchBlogPosts = async (
  params: Partial<BlogListRequest> = {},
  language: 'en' | 'zh' = 'en'
): Promise<BlogData[]> => {
  const apiCall = async () => {
    const response = await get<BlogListResponse>('/api/v1/blog/posts', {
      ...params,
      lang: formatLanguage(language)
    });
    
    // Ensure consistent data structure
    const posts = (response.posts || []).map(post => ({
      ...post,
      tags: post.tags || []
    }));
    
    return posts;
  };
  
  const fallbackData = Object.values(mockBlogData[language]).map(post => ({
    ...post,
    tags: post.tags || []
  }));
  
  return withFallback(apiCall, fallbackData);
};

/**
 * Get single blog post by slug
 */
export const fetchBlogById = async (slug: string, language: 'en' | 'zh' = 'en'): Promise<BlogData | null> => {
  const apiCall = async () => {
    const response = await get<BlogData>(`/api/v1/blog/posts/${slug}`, {
      lang: formatLanguage(language)
    });
    
    if (!response) return null;
    
    // Ensure consistent data structure
    return {
      ...response,
      tags: response.tags || []
    };
  };
  
  const fallbackPost = mockBlogData[language][slug];
  const fallbackData = fallbackPost ? {
    ...fallbackPost,
    tags: fallbackPost.tags || []
  } : null;
  
  return withFallback(apiCall, fallbackData);
};

/**
 * Search blog posts with filters
 */
export const searchBlogPosts = async (
  params: BlogSearchRequest,
  language: 'en' | 'zh' = 'en'
): Promise<BlogData[]> => {
  const apiCall = async () => {
    const response = await get<BlogListResponse>('/api/v1/blog/search', {
      ...params,
      lang: formatLanguage(language)
    });
    
    // Ensure consistent data structure
    const posts = (response.posts || []).map(post => ({
      ...post,
      tags: post.tags || []
    }));
    
    return posts;
  };
  
  // Fallback with client-side filtering
  const fallbackData = Object.values(mockBlogData[language]).map(post => ({
    ...post,
    tags: post.tags || []
  }));
  let filteredData = fallbackData;
  
  if (params.query) {
    const searchLower = params.query.toLowerCase();
    filteredData = filteredData.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.summary.toLowerCase().includes(searchLower) ||
      (post.summaryZh && post.summaryZh.toLowerCase().includes(searchLower)) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      post.content.some(content => 
        content.content.toLowerCase().includes(searchLower)
      )
    );
  }
  
  if (params.category && params.category !== 'All' && params.category !== '全部') {
    filteredData = filteredData.filter(post => post.category === params.category);
  }
  
  if (params.author) {
    filteredData = filteredData.filter(post => post.author === params.author);
  }
  
  return withFallback(apiCall, filteredData);
};

/**
 * Get blog categories
 */
export const getBlogCategories = async (language: 'en' | 'zh' = 'en'): Promise<string[]> => {
  const apiCall = async () => {
    const response = await get<string[]>('/api/v1/blog/categories', {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const posts = Object.values(mockBlogData[language]);
  const categories = Array.from(new Set(posts.map(post => post.category)));
  const fallbackData = [language === 'en' ? 'All' : '全部', ...categories];
  
  return withFallback(apiCall, fallbackData);
};

/**
 * Get blog tags
 */
export const getBlogTags = async (language: 'en' | 'zh' = 'en'): Promise<string[]> => {
  const apiCall = async () => {
    const response = await get<string[]>('/api/v1/blog/tags', {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const posts = Object.values(mockBlogData[language]);
  const allTags = posts.flatMap(post => post.tags || []);
  const fallbackData = Array.from(new Set(allTags));
  
  return withFallback(apiCall, fallbackData);
};

/**
 * Update blog views
 */
export const updateBlogViews = async (id: string, language: 'en' | 'zh' = 'en'): Promise<void> => {
  const apiCall = async () => {
    await post(`/api/v1/blog/posts/${id}/views`, {
      lang: formatLanguage(language)
    });
  };
  
  // For fallback, simulate updating views in mock data
  const fallbackAction = async () => {
    const blogData = mockBlogData[language];
    if (blogData[id]) {
      blogData[id].views += 1;
    }
  };
  
  try {
    await apiCall();
  } catch (error) {
    console.warn('API call failed, updating views locally:', error);
    await fallbackAction();
  }
};

/**
 * Update blog likes
 */
export const updateBlogLikes = async (id: string, increment: boolean = true, language: 'en' | 'zh' = 'en'): Promise<number> => {
  const apiCall = async () => {
    const response = await post<UpdateBlogLikesResponse>(`/api/v1/blog/posts/${id}/likes`, {
      increment,
      lang: formatLanguage(language)
    });
    return response.likes;
  };
  
  // Fallback with mock data
  const fallbackAction = async () => {
    const blogData = mockBlogData[language];
    if (blogData[id]) {
      blogData[id].likes += increment ? 1 : -1;
      return blogData[id].likes;
    }
    throw new Error(language === 'en' ? 'Blog post not found' : '博客文章未找到');
  };
  
  return withFallback(apiCall, await fallbackAction());
};

/**
 * Get blog series data
 */
export const fetchSeriesData = async (seriesId: string, language: 'en' | 'zh' = 'en'): Promise<SeriesData | null> => {
  const apiCall = async () => {
    const response = await get<SeriesData>(`/api/v1/blog/series/${seriesId}`, {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = mockSeriesData[language][seriesId] || null;
  return withFallback(apiCall, fallbackData);
};

/**
 * Update series progress
 */
export const updateSeriesProgress = async (
  seriesId: string, 
  episodeId: string, 
  completed: boolean, 
  language: 'en' | 'zh' = 'en'
): Promise<SeriesData> => {
  const apiCall = async () => {
    const response = await post<SeriesData>(`/api/v1/blog/series/${seriesId}/episodes/${episodeId}/progress`, {
      completed,
      lang: formatLanguage(language)
    });
    return response;
  };
  
  // Fallback with mock data update
  const fallbackAction = async () => {
    const seriesData = mockSeriesData[language][seriesId];
    if (!seriesData) {
      throw new Error(language === 'en' ? 'Series not found' : '系列未找到');
    }
    
    const episode = seriesData.episodes.find(ep => ep.id === episodeId);
    if (episode) {
      episode.completed = completed;
      seriesData.completedCount = seriesData.episodes.filter(ep => ep.completed).length;
    }
    
    return seriesData;
  };
  
  return withFallback(apiCall, await fallbackAction());
};

/**
 * Set current episode
 */
export const setCurrentEpisode = async (
  seriesId: string, 
  episodeId: string, 
  language: 'en' | 'zh' = 'en'
): Promise<SeriesData> => {
  const apiCall = async () => {
    const response = await post<SeriesData>(`/api/v1/blog/series/${seriesId}/episodes/${episodeId}/current`, {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  // Fallback with mock data update
  const fallbackAction = async () => {
    const seriesData = mockSeriesData[language][seriesId];
    if (!seriesData) {
      throw new Error(language === 'en' ? 'Series not found' : '系列未找到');
    }
    
    seriesData.episodes.forEach(ep => {
      ep.current = ep.id === episodeId;
    });
    
    return seriesData;
  };
  
  return withFallback(apiCall, await fallbackAction());
};