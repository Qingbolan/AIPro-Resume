import type { AnnualPlan, Project, Language, Plan, ProjectWithPlan } from '../../types/api';
import { get, withFallback, formatLanguage } from '../utils';

// Mock annual plans data based on the provided structure
const mockAnnualPlansData: { en: AnnualPlan[] } = {
  en: [
    {
      year: 2024,
      name: "ZIYUN",
      nameZh: "紫韵",
      description: "AI for ALL",
      descriptionZh: "让AI造福于每一个人",
      icon: "Brain",
      image: "/logo.svg",
      projectCount: 2,
      objectives: [
        "Super Creator",
        "Deep Researcher",
        "Easy AI",
      ],
      objectivesZh: [
        "广泛创作",
        "更深入研究",
        "让AI更简单"
      ],
      projects: [
        { id: 1, name: "AI Chatbot", description: "An intelligent chatbot using natural language processing techniques to provide human-like interactions." },
        { id: 3, name: "Data Visualization Tool", description: "Interactive data visualizations using D3.js to represent complex datasets in an intuitive and engaging manner." }
      ]
    },
    {
      year: 2023,
      name: "YANGFAN",
      nameZh: "扬帆",
      description: "Exploration of blockchain technology and decentralized applications for future innovation",
      descriptionZh: "探索区块链技术和去中心化应用的未来创新",
      icon: "Anchor",
      image: null,
      projectCount: 1,
      objectives: [
        "Develop blockchain-based applications",
        "Research smart contract security",
        "Participate in blockchain hackathons",
        "Build decentralized finance solutions"
      ],
      objectivesZh: [
        "开发基于区块链的应用",
        "研究智能合约安全",
        "参与区块链黑客马拉松",
        "构建去中心化金融解决方案"
      ],
      projects: [
        { id: 5, name: "Blockchain Voting System", description: "A decentralized voting system using blockchain technology to ensure transparency and security in elections." }
      ]
    },
    {
      year: 2022,
      name: "WENXIN",
      nameZh: "问心",
      description: "Development of comprehensive web and mobile solutions for real-world applications",
      descriptionZh: "开发面向现实应用的综合网络和移动解决方案",
      icon: "Heart",
      image: null,
      projectCount: 1,
      objectives: [
        "Enhance full-stack web development skills",
        "Build scalable e-commerce platforms",
        "Master modern frontend frameworks",
        "Implement secure payment systems"
      ],
      objectivesZh: [
        "提升全栈网络开发技能",
        "构建可扩展的电商平台",
        "掌握现代前端框架",
        "实现安全支付系统"
      ],
      projects: [
        { id: 2, name: "E-commerce Platform", description: "A full-stack online shopping platform with user authentication, product catalog, and secure payment integration." }
      ]
    },
    {
      year: 2021,
      name: "WANXIANG",
      nameZh: "万象",
      description: "Focus on mobile application development and cross-platform solutions",
      descriptionZh: "专注于移动应用开发和跨平台解决方案",
      icon: "Smartphone",
      image: null,
      projectCount: 1,
      objectives: [
        "Develop cross-platform mobile applications",
        "Integrate with cloud services and APIs",
        "Implement real-time data synchronization",
        "Focus on user experience design"
      ],
      objectivesZh: [
        "开发跨平台移动应用",
        "集成云服务和API",
        "实现实时数据同步",
        "专注用户体验设计"
      ],
      projects: [
        { id: 4, name: "Mobile Fitness App", description: "A cross-platform mobile application for tracking workouts, nutrition, and personal fitness goals." }
      ]
    },
    {
      year: 2020,
      name: "YOUXIN",
      nameZh: "游薪",
      description: "Foundation building in computer science and programming fundamentals",
      descriptionZh: "计算机科学和编程基础的基础建设",
      icon: "GraduationCap",
      image: null,
      projectCount: 0,
      objectives: [
        "Learn programming fundamentals",
        "Master data structures and algorithms",
        "Build first web applications",
        "Understand software engineering principles"
      ],
      objectivesZh: [
        "学习编程基础",
        "掌握数据结构和算法",
        "构建第一个网络应用",
        "理解软件工程原理"
      ],
      projects: []
    },
    {
      year: 2019,
      name: "YUDIAN",
      nameZh: "雨点",
      description: "Initial exploration into technology and programming world",
      descriptionZh: "初探技术和编程世界",
      icon: "Droplets",
      image: null,
      projectCount: 0,
      objectives: [
        "Discover passion for technology",
        "Learn basic programming concepts",
        "Explore different programming languages",
        "Join programming communities"
      ],
      objectivesZh: [
        "发现对技术的热情",
        "学习基本编程概念",
        "探索不同编程语言",
        "加入编程社区"
      ],
      projects: []
    }
  ]
};

// API Functions

/**
 * Fetch all annual plans
 */
export const fetchAnnualPlans = async (language: Language = 'en'): Promise<AnnualPlan[]> => {
  const apiCall = async () => {
    const response = await get<AnnualPlan[]>('/api/v1/plans/annual', {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = mockAnnualPlansData.en;
  return withFallback(apiCall, fallbackData);
};

/**
 * Get current active annual plan (most recent year)
 */
export const fetchCurrentAnnualPlan = async (language: Language = 'en'): Promise<AnnualPlan | null> => {
  const apiCall = async () => {
    const response = await get<AnnualPlan>('/api/v1/plans/annual/current', {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = mockAnnualPlansData.en.sort((a, b) => b.year - a.year)[0] || null;
  return withFallback(apiCall, fallbackData);
};

/**
 * Get annual plan by name
 */
export const fetchAnnualPlanByName = async (planName: string, language: Language = 'en'): Promise<AnnualPlan | null> => {
  const apiCall = async () => {
    const response = await get<AnnualPlan>(`/api/v1/plans/annual/${planName}`, {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = mockAnnualPlansData.en.find(plan => plan.name === planName) || null;
  return withFallback(apiCall, fallbackData);
};

/**
 * Fetch all projects with language support
 */
export const fetchProjectsWithAnnualPlans = async (language: Language = 'en'): Promise<Project[]> => {
  const apiCall = async () => {
    const response = await get<Project[]>('/api/v1/plans/projects', {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  // Fallback: import fetchProjects from projectApi to get language-specific data
  const fallbackAction = async () => {
    try {
      const { fetchProjects } = await import('../projects/projectApi');
      return await fetchProjects({}, language);
    } catch (error) {
      console.warn('Failed to import projects API:', error);
      return [];
    }
  };
  
  return withFallback(apiCall, await fallbackAction());
};

/**
 * Get projects by annual plan name
 */
export const fetchProjectsByAnnualPlan = async (planName: string, language: Language = 'en'): Promise<Project[]> => {
  const apiCall = async () => {
    const response = await get<Project[]>(`/api/v1/plans/${planName}/projects`, {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  // Fallback: filter projects by plan name
  const fallbackAction = async () => {
    try {
      const projects = await fetchProjectsWithAnnualPlans(language);
      return projects.filter(project => project.annualPlan === planName);
    } catch (error) {
      console.warn('Failed to fetch projects by plan:', error);
      return [];
    }
  };
  
  return withFallback(apiCall, await fallbackAction());
};

// Conversion functions for backward compatibility
const convertAnnualPlanToPlan = (annualPlan: AnnualPlan): Plan => ({
  id: annualPlan.name,
  name: annualPlan.name,
  nameZh: annualPlan.nameZh, // Use correct Chinese name
  description: annualPlan.description,
  descriptionZh: annualPlan.descriptionZh, // Use correct Chinese description
  slogan: annualPlan.description,
  sloganZh: annualPlan.descriptionZh, // Use Chinese description as slogan
  goals: annualPlan.objectives,
  goalsZh: annualPlan.objectivesZh, // Use correct Chinese objectives
  image: '/logo.svg',
  icon: 'Calendar',
  startYear: annualPlan.year,
  endYear: annualPlan.year,
  status: annualPlan.year === new Date().getFullYear() ? 'active' : 
           annualPlan.year < new Date().getFullYear() ? 'completed' : 'planned'
});

const convertProjectToProjectWithPlan = (project: Project): ProjectWithPlan => ({
  id: project.id.toString(),
  title: project.name,
  description: project.description,
  image: '/api/placeholder/400/250',
  tags: project.tags,
  github: undefined,
  demo: undefined,
  planId: project.annualPlan,
  year: project.year
});

// Backward compatibility wrapper functions
export const fetchPlans = async (language: Language = 'en'): Promise<Plan[]> => {
  const annualPlans = await fetchAnnualPlans(language);
  return annualPlans.map(convertAnnualPlanToPlan);
};

export const fetchCurrentPlan = async (language: Language = 'en'): Promise<Plan | null> => {
  const currentAnnualPlan = await fetchCurrentAnnualPlan(language);
  return currentAnnualPlan ? convertAnnualPlanToPlan(currentAnnualPlan) : null;
};

export const fetchProjectsWithPlans = async (language: Language = 'en'): Promise<ProjectWithPlan[]> => {
  const projects = await fetchProjectsWithAnnualPlans(language);
  return projects.map(convertProjectToProjectWithPlan);
};