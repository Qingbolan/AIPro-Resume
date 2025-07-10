import type { Project, AnnualPlan, GraphData, Language, ProjectDetail, ProjectBlogReference } from '../../types/api';
import { get, withFallback, formatLanguage } from '../utils';
import { type PaginationRequest, type SearchRequest, type ListResponse } from '../config';

// Backend API request/response types
interface ProjectListRequest extends PaginationRequest {
  type?: string;
  featured?: boolean;
  status?: string;
  search?: string;
  year?: number;
  annual_plan?: string;
  tags?: string;
}

interface ProjectListResponse extends ListResponse<Project> {
  projects: Project[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}

interface ProjectSearchRequest extends SearchRequest {
  query?: string;
  tags?: string;
  year?: number;
  plan_id?: string;
}

// Mock data for fallback
const mockProjects: Record<Language, Project[]> = {
  en: [
    { 
      id: 1, 
      name: "AI Chatbot", 
      description: "An intelligent chatbot using natural language processing techniques to provide human-like interactions.", 
      tags: ["AI", "NLP", "Python"], 
      year: 2023, 
      annualPlan: "ZIYUN2024" 
    },
    { 
      id: 2, 
      name: "E-commerce Platform", 
      description: "A full-stack online shopping platform with user authentication, product catalog, and secure payment integration.", 
      tags: ["Web", "React", "Node.js"], 
      year: 2022, 
      annualPlan: "WENXIN2022" 
    },
    { 
      id: 3, 
      name: "Data Visualization Tool", 
      description: "Interactive data visualizations using D3.js to represent complex datasets in an intuitive and engaging manner.", 
      tags: ["D3.js", "Data Science"], 
      year: 2024, 
      annualPlan: "ZIYUN2024" 
    },
    { 
      id: 4, 
      name: "Mobile Fitness App", 
      description: "A cross-platform mobile application for tracking workouts, nutrition, and personal fitness goals.", 
      tags: ["Mobile", "React Native", "Firebase"], 
      year: 2021, 
      annualPlan: "WANXIANG2021" 
    },
    { 
      id: 5, 
      name: "Blockchain Voting System", 
      description: "A decentralized voting system using blockchain technology to ensure transparency and security in elections.", 
      tags: ["Blockchain", "Solidity", "Web3"], 
      year: 2023, 
      annualPlan: "YANGFAN2023" 
    },
  ],
  zh: [
    { 
      id: 1, 
      name: "AI 聊天机器人", 
      description: "使用自然语言处理技术提供类人交互的智能聊天机器人。", 
      tags: ["AI", "NLP", "Python"], 
      year: 2023, 
      annualPlan: "ZIYUN2024" 
    },
    { 
      id: 2, 
      name: "电子商务平台", 
      description: "一个具有用户认证、产品目录和安全支付集成的全栈在线购物平台。", 
      tags: ["Web", "React", "Node.js"], 
      year: 2022, 
      annualPlan: "WENXIN2022" 
    },
    { 
      id: 3, 
      name: "数据可视化工具", 
      description: "使用D3.js进行交互式数据可视化，以直观和引人入胜的方式展示复杂数据集。", 
      tags: ["D3.js", "数据科学"], 
      year: 2024, 
      annualPlan: "ZIYUN2024" 
    },
    { 
      id: 4, 
      name: "移动健身应用", 
      description: "用于跟踪锻炼、营养和个人健身目标的跨平台移动应用。", 
      tags: ["移动", "React Native", "Firebase"], 
      year: 2021, 
      annualPlan: "WANXIANG2021" 
    },
    { 
      id: 5, 
      name: "区块链投票系统", 
      description: "使用区块链技术确保选举透明性和安全性的去中心化投票系统。", 
      tags: ["区块链", "Solidity", "Web3"], 
      year: 2023, 
      annualPlan: "YANGFAN2023" 
    },
  ]
};

const mockCategories: Record<Language, string[]> = {
  en: ["All", "Research", "Web Apps", "Mobile Apps", "AI Projects", "Tools"],
  zh: ["所有", "研究", "网页应用", "移动应用", "AI 项目", "工具"]
};

const mockGraphData: Record<Language, Record<string, GraphData>> = {
  en: {
    all: {
      nodes: [
        { id: "AI", group: 1 },
        { id: "Web Development", group: 2 },
        { id: "Mobile App", group: 3 },
        { id: "Data Science", group: 4 },
        { id: "Blockchain", group: 5 },
      ],
      links: [
        { source: "AI", target: "Data Science", value: 1 },
        { source: "Web Development", target: "Mobile App", value: 2 },
        { source: "Data Science", target: "Web Development", value: 1 },
        { source: "Blockchain", target: "Web Development", value: 1 },
      ]
    },
    "AI Projects": {
      nodes: [
        { id: "NLP", group: 1 },
        { id: "Machine Learning", group: 2 },
        { id: "Neural Networks", group: 3 },
      ],
      links: [
        { source: "NLP", target: "Machine Learning", value: 1 },
        { source: "Machine Learning", target: "Neural Networks", value: 1 },
      ]
    },
    "Web Apps": {
      nodes: [
        { id: "Frontend", group: 1 },
        { id: "Backend", group: 2 },
        { id: "Database", group: 3 },
      ],
      links: [
        { source: "Frontend", target: "Backend", value: 1 },
        { source: "Backend", target: "Database", value: 1 },
      ]
    },
  },
  zh: {
    all: {
      nodes: [
        { id: "AI", group: 1 },
        { id: "网页开发", group: 2 },
        { id: "移动应用", group: 3 },
        { id: "数据科学", group: 4 },
        { id: "区块链", group: 5 },
      ],
      links: [
        { source: "AI", target: "数据科学", value: 1 },
        { source: "网页开发", target: "移动应用", value: 2 },
        { source: "数据科学", target: "网页开发", value: 1 },
        { source: "区块链", target: "网页开发", value: 1 },
      ]
    },
    "AI Projects": {
      nodes: [
        { id: "自然语言处理", group: 1 },
        { id: "机器学习", group: 2 },
        { id: "神经网络", group: 3 },
      ],
      links: [
        { source: "自然语言处理", target: "机器学习", value: 1 },
        { source: "机器学习", target: "神经网络", value: 1 },
      ]
    },
    "Web Apps": {
      nodes: [
        { id: "前端", group: 1 },
        { id: "后端", group: 2 },
        { id: "数据库", group: 3 },
      ],
      links: [
        { source: "前端", target: "后端", value: 1 },
        { source: "后端", target: "数据库", value: 1 },
      ]
    },
  }
};

// API Functions

/**
 * Get projects list with pagination and filtering
 */
export const fetchProjects = async (
  params: Partial<ProjectListRequest> = {},
  language: Language = 'en'
): Promise<Project[]> => {
  const apiCall = async () => {
    const response = await get<ProjectListResponse>('/api/v1/projects', {
      ...params,
      lang: formatLanguage(language)
    });
    return response.projects || [];
  };
  
  const fallbackData = mockProjects[language];
  return withFallback(apiCall, fallbackData);
};

/**
 * Get single project by slug
 */
export const fetchProject = async (
  slug: string, 
  language: Language = 'en'
): Promise<Project | null> => {
  const apiCall = async () => {
    const response = await get<Project>(`/api/v1/projects/${slug}`, {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = mockProjects[language].find(p => p.name.toLowerCase().replace(/\s+/g, '-') === slug) || null;
  return withFallback(apiCall, fallbackData);
};

/**
 * Get single project by ID (numeric)
 */
export const fetchProjectById = async (
  id: number | string, 
  language: Language = 'en'
): Promise<Project | null> => {
  const apiCall = async () => {
    const response = await get<Project>(`/api/v1/projects/id/${id}`, {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = mockProjects[language].find(p => p.id === Number(id)) || null;
  return withFallback(apiCall, fallbackData);
};

/**
 * Get detailed project information
 */
export const fetchProjectDetail = async (
  id: string, 
  language: Language = 'en'
): Promise<ProjectDetail | null> => {
  const apiCall = async () => {
    const response = await get<ProjectDetail>(`/api/v1/projects/${id}/detail`, {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  // For fallback, we'll return null as we don't have detailed project data in mock
  return withFallback(apiCall, null);
};

/**
 * Get project categories
 */
export const fetchCategories = async (language: Language = 'en'): Promise<string[]> => {
  const apiCall = async () => {
    const response = await get<string[]>('/api/v1/projects/categories', {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = mockCategories[language];
  return withFallback(apiCall, fallbackData);
};

/**
 * Get project technologies/tags
 */
export const getProjectTags = async (language: Language = 'en'): Promise<string[]> => {
  const apiCall = async () => {
    const response = await get<string[]>('/api/v1/projects/tags', {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = Array.from(new Set(mockProjects[language].flatMap(p => p.tags)));
  return withFallback(apiCall, fallbackData);
};

/**
 * Get project graph data for visualization
 */
export const fetchGraphData = async (
  category: string = 'all', 
  language: Language = 'en'
): Promise<GraphData> => {
  const apiCall = async () => {
    const response = await get<GraphData>('/api/v1/projects/graph', {
      category,
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData = mockGraphData[language][category] || mockGraphData[language].all;
  return withFallback(apiCall, fallbackData);
};

/**
 * Get project related blogs
 */
export const getProjectRelatedBlogs = async (
  projectId: string, 
  language: Language = 'en'
): Promise<ProjectBlogReference[]> => {
  const apiCall = async () => {
    const response = await get<ProjectBlogReference[]>(`/api/v1/projects/${projectId}/blogs`, {
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData: ProjectBlogReference[] = [];
  return withFallback(apiCall, fallbackData);
};

/**
 * Search project details with filters
 */
export const searchProjectDetails = async (
  params: ProjectSearchRequest,
  language: Language = 'en'
): Promise<ProjectDetail[]> => {
  const apiCall = async () => {
    const response = await get<ProjectDetail[]>('/api/v1/projects/search', {
      ...params,
      lang: formatLanguage(language)
    });
    return response;
  };
  
  const fallbackData: ProjectDetail[] = [];
  return withFallback(apiCall, fallbackData);
};

// Extended functions for project details
export const fetchProjectDetailById = async (
  id: string, 
  language: Language = 'en'
): Promise<ProjectDetail | null> => {
  return fetchProjectDetail(id, language);
};

// Backward compatibility exports
export const fetchAnnualPlans = async (language: Language = 'en'): Promise<AnnualPlan[]> => {
  // This function is now handled by plans API
  const { fetchAnnualPlans: fetchPlans } = await import('../plans/planApi');
  return fetchPlans(language);
};

export const fetchAnnualPlanByName = async (
  name: string, 
  language: Language = 'en'
): Promise<AnnualPlan | null> => {
  // This function is now handled by plans API
  const { fetchAnnualPlanByName: fetchPlanByName } = await import('../plans/planApi');
  return fetchPlanByName(name, language);
};

export const fetchProjectsWithPlans = async (language: Language = 'en'): Promise<Project[]> => {
  return fetchProjects({}, language);
};

export const fetchProjectsByPlan = async (
  planName: string, 
  language: Language = 'en'
): Promise<Project[]> => {
  const projects = await fetchProjects({}, language);
  return projects.filter(project => project.annualPlan === planName);
};