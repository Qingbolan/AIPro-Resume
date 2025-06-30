import type { Plan, ProjectWithPlan, Language } from '../types/api';

// Plan API - handles plan/phase data management

// Mock plan data - in real app this would come from backend
const mockPlansData: { en: Plan[] } = {
  en: [
    {
      id: 'undergraduate',
      name: 'Undergraduate Research Phase',
      nameZh: '本科研究阶段',
      description: 'Building foundational knowledge in AI and computer science',
      descriptionZh: '构建AI和计算机科学的基础知识',
      slogan: 'Foundation & Exploration',
      sloganZh: '基础探索，扎实成长',
      goals: [
        'Master core CS fundamentals',
        'Explore AI research domains',
        'Build strong programming skills',
        'Participate in research projects'
      ],
      goalsZh: [
        '掌握计算机科学核心基础',
        '探索AI研究领域',
        '构建扎实编程技能',
        '参与研究项目'
      ],
      image: '/logo.svg',
      icon: 'GraduationCap',
      startYear: 2020,
      endYear: 2024,
      status: 'completed'
    },
    {
      id: 'masters-research',
      name: 'Master\'s Research & Industry Experience',
      nameZh: '硕士研究与行业经验',
      description: 'Advanced research in AI while gaining practical industry experience',
      descriptionZh: '在获得实际行业经验的同时进行AI高级研究',
      slogan: 'Research Meets Practice',
      sloganZh: '理论实践，并行发展',
      goals: [
        'Conduct cutting-edge AI research',
        'Gain industry development experience', 
        'Publish high-quality papers',
        'Build practical AI applications',
        'Develop leadership skills'
      ],
      goalsZh: [
        '进行前沿AI研究',
        '获得行业开发经验',
        '发表高质量论文',
        '构建实用AI应用',
        '培养领导能力'
      ],
      image: '/logo.svg',
      icon: 'Brain',
      startYear: 2024,
      endYear: 2026,
      status: 'active'
    },
    {
      id: 'phd-research',
      name: 'PhD Research & Innovation',
      nameZh: '博士研究与创新',
      description: 'Deep research in AI and building innovative solutions',
      descriptionZh: '深入AI研究并构建创新解决方案',
      slogan: 'Innovation & Impact',
      sloganZh: '创新突破，影响世界',
      goals: [
        'Pioneer novel AI methodologies',
        'Make significant research contributions',
        'Lead interdisciplinary collaborations',
        'Create transformative technologies',
        'Mentor next generation researchers'
      ],
      goalsZh: [
        '开创新颖AI方法论',
        '做出重大研究贡献',
        '领导跨学科合作',
        '创造变革性技术',
        '培养下一代研究者'
      ],
      image: '/logo.svg',
      icon: 'Zap',
      startYear: 2026,
      endYear: 2030,
      status: 'planned'
    }
  ]
};

// Enhanced project data with plan association
const mockProjectsData: { en: ProjectWithPlan[] } = {
  en: [
    {
      id: '1',
      title: 'Neural Architecture Search',
      description: 'Automated neural network design using evolutionary algorithms and reinforcement learning techniques',
      image: '/api/placeholder/400/250',
      tags: ['Python', 'PyTorch', 'AutoML', 'Deep Learning'],
      github: 'https://github.com/example/nas',
      demo: 'https://nas-demo.example.com',
      planId: 'undergraduate',
      year: 2023
    },
    {
      id: '2',
      title: 'Real-time Chat Application',
      description: 'Full-stack chat application with AI-powered features and real-time collaboration',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Node.js', 'WebSocket', 'AI', 'TypeScript'],
      github: 'https://github.com/example/chat-app',
      demo: 'https://chat.example.com',
      planId: 'undergraduate',
      year: 2023
    },
    {
      id: '3',
      title: 'Distributed Machine Learning Platform',
      description: 'Scalable ML platform for training large models across multiple GPUs and nodes',
      image: '/api/placeholder/400/250',
      tags: ['Python', 'Kubernetes', 'Docker', 'TensorFlow', 'Distributed Systems'],
      github: 'https://github.com/example/ml-platform',
      planId: 'masters-research',
      year: 2024
    },
    {
      id: '4',
      title: 'Computer Vision API',
      description: 'High-performance computer vision API with object detection and image classification',
      image: '/api/placeholder/400/250',
      tags: ['FastAPI', 'OpenCV', 'YOLO', 'Docker', 'AWS'],
      github: 'https://github.com/example/cv-api',
      demo: 'https://cv-api.example.com',
      planId: 'masters-research',
      year: 2024
    },
    {
      id: '5',
      title: 'Blockchain Analytics Dashboard',
      description: 'Real-time blockchain data visualization and analytics platform',
      image: '/api/placeholder/400/250',
      tags: ['React', 'D3.js', 'Web3', 'GraphQL', 'Ethereum'],
      github: 'https://github.com/example/blockchain-dashboard',
      demo: 'https://blockchain.example.com',
      planId: 'masters-research',
      year: 2025
    },
    {
      id: '6',
      title: 'AI Code Assistant',
      description: 'VS Code extension that provides intelligent code suggestions and debugging help',
      image: '/api/placeholder/400/250',
      tags: ['TypeScript', 'VS Code API', 'OpenAI', 'Language Server', 'Extension'],
      github: 'https://github.com/example/ai-assistant',
      planId: 'masters-research',
      year: 2025
    }
  ]
};

/**
 * Fetch all plans
 */
export const fetchPlans = async (_language: Language = 'en'): Promise<Plan[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockPlansData.en; // Return same data regardless of language as multilingual is handled in component
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw new Error('Failed to fetch plans');
  }
};

/**
 * Get current active plan
 */
export const fetchCurrentPlan = async (language: Language = 'en'): Promise<Plan | null> => {
  try {
    const plans = await fetchPlans(language);
    return plans.find(plan => plan.status === 'active') || plans[0];
  } catch (error) {
    console.error('Error fetching current plan:', error);
    throw new Error('Failed to fetch current plan');
  }
};

/**
 * Get plan by ID
 */
export const fetchPlanById = async (planId: string, language: Language = 'en'): Promise<Plan | null> => {
  try {
    const plans = await fetchPlans(language);
    return plans.find(plan => plan.id === planId) || null;
  } catch (error) {
    console.error('Error fetching plan by ID:', error);
    throw new Error('Failed to fetch plan');
  }
};

/**
 * Fetch projects with plan association
 */
export const fetchProjectsWithPlans = async (_language: Language = 'en'): Promise<ProjectWithPlan[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockProjectsData.en; // Return same data regardless of language
  } catch (error) {
    console.error('Error fetching projects with plans:', error);
    throw new Error('Failed to fetch projects');
  }
};

/**
 * Get projects by plan ID
 */
export const fetchProjectsByPlan = async (planId: string, language: Language = 'en'): Promise<ProjectWithPlan[]> => {
  try {
    const projects = await fetchProjectsWithPlans(language);
    return projects.filter(project => project.planId === planId);
  } catch (error) {
    console.error('Error fetching projects by plan:', error);
    throw new Error('Failed to fetch projects for plan');
  }
}; 