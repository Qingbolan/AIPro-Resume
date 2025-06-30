import type { BlogData } from '../../components/BlogStack/types/blog';

// Simulate API delay
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Mock blog data with multi-language support
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
        },
        {
          type: 'quote',
          content: 'The difference between a research prototype and a production AI system is like the difference between a paper airplane and a commercial aircraft.',
          id: 'content-2'
        },
        {
          type: 'text',
          content: 'One of the most critical aspects of production AI systems is monitoring and observability. Unlike traditional software, AI systems can fail silently, producing plausible but incorrect results.',
          id: 'content-3'
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
        },
        {
          type: 'text',
          content: 'Understanding this evolution helps us appreciate not just where we are today, but also provides insights into where the field might be heading.',
          id: 'content-2'
        }
      ]
    },
    '4': {
      id: '4',
      title: 'Building Scalable AI Systems: A Developer\'s Journey',
      titleZh: '构建可扩展AI系统：开发者之旅',
      author: 'AI Researcher',
      publishDate: '2024-01-18',
      readTime: '25 min video',
      category: 'Engineering',
      tags: ['AI Systems', 'Scalability', 'Development', 'Vlog'],
      type: 'vlog',
      videoUrl: 'https://example.com/video/ai-systems-journey.mp4',
      videoDuration: '25:30',
      videoThumbnail: '/api/placeholder/800/450',
      summary: 'Follow my journey as I build and scale AI systems in production. This vlog covers real challenges, solutions, and lessons learned.',
      summaryZh: '跟随我构建和扩展生产环境AI系统的旅程。这个视频博客涵盖了真实的挑战、解决方案和经验教训。',
      content: [
        {
          id: 'intro-1',
          type: 'text',
          content: 'In this video, I share my experience building scalable AI systems from the ground up. We\'ll explore architecture decisions, performance optimizations, and deployment strategies.'
        },
        {
          id: 'video-1',
          type: 'video',
          content: 'https://example.com/video/ai-systems-journey.mp4',
          caption: 'Full development journey and system architecture walkthrough'
        },
        {
          id: 'timeline-1',
          type: 'text',
          content: 'Video Timeline:\n00:00 - Introduction\n03:15 - System Architecture Overview\n08:30 - Database Design Decisions\n15:45 - Scaling Challenges\n20:10 - Deployment Pipeline\n23:00 - Lessons Learned'
        }
      ],
      likes: 89,
      views: 1250
    },
    '5': {
      id: '5',
      title: 'Modern Web Development Series: React Deep Dive',
      titleZh: '现代Web开发系列：React深度解析',
      author: 'Frontend Expert',
      publishDate: '2024-01-15',
      readTime: '45 min read',
      category: 'Frontend',
      tags: ['React', 'JavaScript', 'Web Development', 'Series'],
      type: 'series',
      seriesId: 'modern-web-dev',
      seriesTitle: 'Modern Web Development Mastery',
      seriesTitleZh: '现代Web开发精通',
      seriesDescription: 'A comprehensive series covering modern web development practices, from React fundamentals to advanced patterns.',
      seriesDescriptionZh: '一个全面的系列，涵盖现代Web开发实践，从React基础到高级模式。',
      episodeNumber: 1,
      totalEpisodes: 8,
      seriesImage: '/api/placeholder/1200/400',
      summary: 'Episode 1 of our comprehensive web development series. We start with React fundamentals and build up to advanced concepts.',
      summaryZh: '我们全面的Web开发系列第1集。我们从React基础开始，逐步构建到高级概念。',
      content: [
        {
          id: 'series-intro-1',
          type: 'text',
          content: 'Welcome to the Modern Web Development Mastery series! In this first episode, we\'ll dive deep into React fundamentals and set the foundation for advanced topics in upcoming episodes.'
        },
        {
          id: 'series-overview-1',
          type: 'text',
          content: 'This series will cover:\n\n• React Fundamentals (Episode 1)\n• State Management Patterns (Episode 2)\n• Performance Optimization (Episode 3)\n• Testing Strategies (Episode 4)\n• Advanced Hooks (Episode 5)\n• Server-Side Rendering (Episode 6)\n• Micro-frontends (Episode 7)\n• Production Deployment (Episode 8)'
        },
        {
          id: 'react-basics-1',
          type: 'text',
          content: 'Let\'s start with the core concepts that make React so powerful for building user interfaces...'
        }
      ],
      likes: 156,
      views: 2340
    },
    '6': {
      id: '6',
      title: 'AI in Daily Life: Smart Home Automation',
      titleZh: 'AI日常生活：智能家居自动化',
      author: 'Tech Enthusiast',
      publishDate: '2024-01-10',
      readTime: '18 min video',
      category: 'Lifestyle Tech',
      tags: ['AI', 'Smart Home', 'Automation', 'Vlog'],
      type: 'vlog',
      videoUrl: 'https://example.com/video/smart-home-ai.mp4',
      videoDuration: '18:45',
      videoThumbnail: '/api/placeholder/800/450',
      summary: 'A practical look at how I use AI to automate my smart home. From voice assistants to predictive automation.',
      summaryZh: '实际展示我如何使用AI自动化智能家居。从语音助手到预测性自动化。',
      content: [
        {
          id: 'vlog-intro-1',
          type: 'text',
          content: 'Join me for a tour of my AI-powered smart home setup. I\'ll show you practical automations that actually make life easier.'
        },
        {
          id: 'video-2',
          type: 'video',
          content: 'https://example.com/video/smart-home-ai.mp4',
          caption: 'Complete smart home tour and automation demonstrations'
        }
      ],
      likes: 234,
      views: 3450
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
        },
        {
          type: 'quote',
          content: '代码重构的未来不在于取代人类直觉，而在于用能够在数百万代码库中看到模式的AI驱动洞察来增强它。',
          id: 'content-2'
        },
        {
          type: 'image',
          content: '/api/placeholder/800/400',
          caption: '图1：基于LLM的重构管道架构',
          id: 'content-3'
        },
        {
          type: 'text',
          content: '传统的重构工具严重依赖语法分析和预定义模式。虽然对简单转换有效，但它们经常错过需要更深入理解代码意图和上下文的语义改进。',
          annotation: '这种限制一直是处理遗留代码库的开发人员的主要痛点。',
          id: 'content-4'
        },
        {
          type: 'code',
          content: `// 之前：传统方法
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

// 之后：LLM建议的重构
const processUserData = (users) => 
  users
    .filter(user => user.isActive && user.age > 18)
    .map(({ name, email }) => ({ name, email }));`,
          language: 'javascript',
          caption: 'LLM建议的函数式重构示例',
          id: 'content-5'
        },
        {
          type: 'text',
          content: '我们的实验表明，基于LLM的重构工具可以识别并建议超越表面层次变化的改进。它们理解语义模式，建议性能优化，甚至可以提出架构改进。',
          id: 'content-6'
        },
        {
          type: 'video',
          content: '/api/placeholder/video/demo.mp4',
          caption: '我们的LLM重构工具实时演示',
          id: 'content-7'
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
        },
        {
          type: 'quote',
          content: '研究原型和生产AI系统之间的差异，就像纸飞机和商用飞机之间的差异一样。',
          id: 'content-2'
        },
        {
          type: 'text',
          content: '生产AI系统最关键的方面之一是监控和可观察性。与传统软件不同，AI系统可能会静默失败，产生看似合理但不正确的结果。',
          id: 'content-3'
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
        },
        {
          type: 'text',
          content: '理解这种演进不仅帮助我们欣赏今天的成就，还为该领域的未来发展方向提供了洞察。',
          id: 'content-2'
        }
      ]
    },
    '4': {
      id: '4',
      title: '构建可扩展AI系统：开发者之旅',
      titleZh: '构建可扩展AI系统：开发者之旅',
      author: 'AI研究员',
      publishDate: '2024-01-18',
      readTime: '25分钟视频',
      category: '工程',
      tags: ['AI系统', '可扩展性', '开发', 'Vlog'],
      type: 'vlog',
      videoUrl: 'https://example.com/video/ai-systems-journey.mp4',
      videoDuration: '25:30',
      videoThumbnail: '/api/placeholder/800/450',
      summary: '跟随我构建和扩展生产环境AI系统的旅程。这个视频博客涵盖了真实的挑战、解决方案和经验教训。',
      summaryZh: '跟随我构建和扩展生产环境AI系统的旅程。这个视频博客涵盖了真实的挑战、解决方案和经验教训。',
      content: [
        {
          id: 'intro-1',
          type: 'text',
          content: '在这个视频中，我分享构建可扩展AI系统的经验。我们将探索架构决策、性能优化和部署策略。'
        },
        {
          id: 'video-1',
          type: 'video',
          content: 'https://example.com/video/ai-systems-journey.mp4',
          caption: '完整开发旅程和系统架构演示'
        },
        {
          id: 'timeline-1',
          type: 'text',
          content: '视频时间轴：\n00:00 - 介绍\n03:15 - 系统架构概览\n08:30 - 数据库设计决策\n15:45 - 扩展挑战\n20:10 - 部署流水线\n23:00 - 经验教训'
        }
      ],
      likes: 89,
      views: 1250
    },
    '5': {
      id: '5',
      title: '现代Web开发系列：React深度解析',
      titleZh: '现代Web开发系列：React深度解析',
      author: '前端专家',
      publishDate: '2024-01-15',
      readTime: '45分钟阅读',
      category: '前端',
      tags: ['React', 'JavaScript', 'Web开发', '系列'],
      type: 'series',
      seriesId: 'modern-web-dev',
      seriesTitle: '现代Web开发精通',
      seriesTitleZh: '现代Web开发精通',
      seriesDescription: '一个全面的系列，涵盖现代Web开发实践，从React基础到高级模式。',
      seriesDescriptionZh: '一个全面的系列，涵盖现代Web开发实践，从React基础到高级模式。',
      episodeNumber: 1,
      totalEpisodes: 8,
      seriesImage: '/api/placeholder/1200/400',
      summary: '我们全面的Web开发系列第1集。我们从React基础开始，逐步构建到高级概念。',
      summaryZh: '我们全面的Web开发系列第1集。我们从React基础开始，逐步构建到高级概念。',
      content: [
        {
          id: 'series-intro-1',
          type: 'text',
          content: '欢迎来到现代Web开发精通系列！在第一集中，我们将深入React基础知识，为后续章节的高级主题奠定基础。'
        },
        {
          id: 'series-overview-1',
          type: 'text',
          content: '本系列将涵盖：\n\n• React基础（第1集）\n• 状态管理模式（第2集）\n• 性能优化（第3集）\n• 测试策略（第4集）\n• 高级Hooks（第5集）\n• 服务端渲染（第6集）\n• 微前端（第7集）\n• 生产部署（第8集）'
        },
        {
          id: 'react-basics-1',
          type: 'text',
          content: '让我们从使React在构建用户界面方面如此强大的核心概念开始...'
        }
      ],
      likes: 156,
      views: 2340
    },
    '6': {
      id: '6',
      title: 'AI日常生活：智能家居自动化',
      titleZh: 'AI日常生活：智能家居自动化',
      author: '科技爱好者',
      publishDate: '2024-01-10',
      readTime: '18分钟视频',
      category: '生活科技',
      tags: ['AI', '智能家居', '自动化', 'Vlog'],
      type: 'vlog',
      videoUrl: 'https://example.com/video/smart-home-ai.mp4',
      videoDuration: '18:45',
      videoThumbnail: '/api/placeholder/800/450',
      summary: '实际展示我如何使用AI自动化智能家居。从语音助手到预测性自动化。',
      summaryZh: '实际展示我如何使用AI自动化智能家居。从语音助手到预测性自动化。',
      content: [
        {
          id: 'vlog-intro-1',
          type: 'text',
          content: '加入我参观AI驱动的智能家居设置。我将向您展示真正让生活更轻松的实用自动化。'
        },
        {
          id: 'video-2',
          type: 'video',
          content: 'https://example.com/video/smart-home-ai.mp4',
          caption: '完整智能家居参观和自动化演示'
        }
      ],
      likes: 234,
      views: 3450
    }
  }
};

// API functions
export const fetchBlogPosts = async (language: 'en' | 'zh' = 'en'): Promise<BlogData[]> => {
  try {
    // Simulate API delay
    await delay(800);
    
    const blogData = mockBlogData[language];
    return Object.values(blogData);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error(language === 'en' ? 'Failed to load blog posts' : '加载博客文章失败');
  }
};

export const fetchBlogById = async (id: string, language: 'en' | 'zh' = 'en'): Promise<BlogData | null> => {
  try {
    // Simulate API delay
    await delay(500);
    
    const blogData = mockBlogData[language];
    return blogData[id] || null;
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw new Error(language === 'en' ? 'Failed to load blog post' : '加载博客文章失败');
  }
};

export const searchBlogPosts = async (
  query: string,
  filters: {
    category?: string;
    tags?: string[];
    author?: string;
  } = {},
  language: 'en' | 'zh' = 'en'
): Promise<BlogData[]> => {
  try {
    // Simulate API delay
    await delay(400);
    
    let posts = Object.values(mockBlogData[language]);
    
    // Apply search query
    if (query) {
      const searchLower = query.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.summary.toLowerCase().includes(searchLower) ||
        (post.summaryZh && post.summaryZh.toLowerCase().includes(searchLower)) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        post.content.some(content => 
          content.content.toLowerCase().includes(searchLower)
        )
      );
    }
    
    // Apply category filter
    if (filters.category && filters.category !== 'All' && filters.category !== '全部') {
      posts = posts.filter(post => post.category === filters.category);
    }
    
    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      posts = posts.filter(post => 
        filters.tags!.some(tag => post.tags.includes(tag))
      );
    }
    
    // Apply author filter
    if (filters.author) {
      posts = posts.filter(post => post.author === filters.author);
    }
    
    return posts;
  } catch (error) {
    console.error('Error searching blog posts:', error);
    throw new Error(language === 'en' ? 'Failed to search blog posts' : '搜索博客文章失败');
  }
};

export const getBlogCategories = async (language: 'en' | 'zh' = 'en'): Promise<string[]> => {
  try {
    const posts = Object.values(mockBlogData[language]);
    const categories = Array.from(new Set(posts.map(post => post.category)));
    return [language === 'en' ? 'All' : '全部', ...categories];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [language === 'en' ? 'All' : '全部'];
  }
};

export const getBlogTags = async (language: 'en' | 'zh' = 'en'): Promise<string[]> => {
  try {
    const posts = Object.values(mockBlogData[language]);
    const allTags = posts.flatMap(post => post.tags);
    return Array.from(new Set(allTags));
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
};

export const updateBlogViews = async (id: string, language: 'en' | 'zh' = 'en'): Promise<void> => {
  try {
    // Simulate API delay
    await delay(200);
    
    const blogData = mockBlogData[language];
    if (blogData[id]) {
      blogData[id].views += 1;
    }
  } catch (error) {
    console.error('Error updating blog views:', error);
    // Don't throw error for view updates as it's not critical
  }
};

export const updateBlogLikes = async (id: string, increment: boolean = true, language: 'en' | 'zh' = 'en'): Promise<number> => {
  try {
    // Simulate API delay
    await delay(300);
    
    const blogData = mockBlogData[language];
    if (blogData[id]) {
      blogData[id].likes += increment ? 1 : -1;
      return blogData[id].likes;
    }
    
    throw new Error(language === 'en' ? 'Blog post not found' : '博客文章未找到');
  } catch (error) {
    console.error('Error updating blog likes:', error);
    throw new Error(language === 'en' ? 'Failed to update likes' : '更新点赞失败');
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
        { id: '5-4', title: 'Testing Strategies', titleZh: '测试策略', duration: '35 min', completed: false, order: 4 },
        { id: '5-5', title: 'Advanced Hooks', titleZh: '高级Hooks', duration: '40 min', completed: false, order: 5 },
        { id: '5-6', title: 'Server-Side Rendering', titleZh: '服务端渲染', duration: '48 min', completed: false, order: 6 },
        { id: '5-7', title: 'Micro-frontends', titleZh: '微前端', duration: '52 min', completed: false, order: 7 },
        { id: '5-8', title: 'Production Deployment', titleZh: '生产部署', duration: '44 min', completed: false, order: 8 },
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
        { id: '5-4', title: '测试策略', titleZh: '测试策略', duration: '35分钟', completed: false, order: 4 },
        { id: '5-5', title: '高级Hooks', titleZh: '高级Hooks', duration: '40分钟', completed: false, order: 5 },
        { id: '5-6', title: '服务端渲染', titleZh: '服务端渲染', duration: '48分钟', completed: false, order: 6 },
        { id: '5-7', title: '微前端', titleZh: '微前端', duration: '52分钟', completed: false, order: 7 },
        { id: '5-8', title: '生产部署', titleZh: '生产部署', duration: '44分钟', completed: false, order: 8 },
      ]
    }
  }
};

export const fetchSeriesData = async (seriesId: string, language: 'en' | 'zh' = 'en'): Promise<SeriesData | null> => {
  try {
    await delay(500);
    return mockSeriesData[language][seriesId] || null;
  } catch (error) {
    console.error('Error fetching series data:', error);
    throw new Error(language === 'en' ? 'Failed to load series data' : '加载系列数据失败');
  }
};

export const updateSeriesProgress = async (
  seriesId: string, 
  episodeId: string, 
  completed: boolean, 
  language: 'en' | 'zh' = 'en'
): Promise<SeriesData> => {
  try {
    await delay(300);
    
    const seriesData = mockSeriesData[language][seriesId];
    if (!seriesData) {
      throw new Error(language === 'en' ? 'Series not found' : '系列未找到');
    }
    
    const episode = seriesData.episodes.find(ep => ep.id === episodeId);
    if (episode) {
      episode.completed = completed;
      // Update completed count
      seriesData.completedCount = seriesData.episodes.filter(ep => ep.completed).length;
    }
    
    return seriesData;
  } catch (error) {
    console.error('Error updating series progress:', error);
    throw new Error(language === 'en' ? 'Failed to update progress' : '更新进度失败');
  }
};

export const setCurrentEpisode = async (
  seriesId: string, 
  episodeId: string, 
  language: 'en' | 'zh' = 'en'
): Promise<SeriesData> => {
  try {
    await delay(200);
    
    const seriesData = mockSeriesData[language][seriesId];
    if (!seriesData) {
      throw new Error(language === 'en' ? 'Series not found' : '系列未找到');
    }
    
    // Update current episode
    seriesData.episodes.forEach(ep => {
      ep.current = ep.id === episodeId;
    });
    
    return seriesData;
  } catch (error) {
    console.error('Error setting current episode:', error);
    throw new Error(language === 'en' ? 'Failed to set current episode' : '设置当前集数失败');
  }
}; 