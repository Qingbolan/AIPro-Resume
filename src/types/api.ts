// API types definition file

export interface Contact {
  type: string;
  value: string;
}

export interface SocialLink {
  type: string;
  url: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  date: string;
  details: string[];
}

export interface ResearchItem {
  title: string;
  location: string;
  date: string;
  details: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  details: string[];
}

export interface RecentUpdate {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status: string;
  priority: string;
}

export interface ResumeSection {
  title: string;
  content: any;
}

export interface ResumeData {
  name: string;
  title: string;
  current: string;
  contacts: Contact[];
  socialLinks: SocialLink[];
  sections: {
    education: ResumeSection;
    publications: ResumeSection;
    research: ResumeSection;
    experience: ResumeSection;
    awards: ResumeSection;
    skills: ResumeSection;
    recent: ResumeSection;
  };
}

export interface PersonalInfo {
  name: string;
  title: string;
  current: string;
  contacts: Array<{
    icon: any;
    value: string;
    type: string;
  }>;
  socialLinks: Array<{
    icon: any;
    url: string;
    type: string;
  }>;
}

export interface Message {
  type: string;
  text: string;
  author: string;
  role: string;
  company?: string;
  position?: string;
}

export interface NewsItem {
  category: string;
  date: string;
  title: string;
  content: string;
}

export interface PlanGoals {
  [key: string]: string[];
}

export interface Plan {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  slogan: string;
  sloganZh: string;
  goals: string[];
  goalsZh: string[];
  image: string;
  icon: string;
  startYear: number;
  endYear: number;
  status: 'completed' | 'active' | 'planned';
}

export interface ProjectWithPlan {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  planId: string;
  year: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  year: number;
  annualPlan: string;
}

// Detailed project information for project detail pages
export interface ProjectDetail {
  id: string;
  title: string;
  titleZh?: string;
  description: string;
  fullDescription: string;
  fullDescriptionZh?: string;
  image?: string;
  tags: string[];
  
  // Related blogs and articles
  relatedBlogs?: ProjectBlogReference[];
  
  // Version management
  versions: {
    latest: string;
    releases: ProjectRelease[];
  };
  
  // Project status
  status: {
    buildStatus: 'passing' | 'failing' | 'unknown';
    coverage: number;
    vulnerabilities: number;
    lastUpdated: string;
    license: string;
    language: string;
    size: string;
  };
  
  // License information
  licenseInfo?: {
    name: string;
    spdxId: string;
    fullText: string;
    fullTextZh?: string;
    url: string;
    permissions: string[];
    permissionsZh?: string[];
    conditions: string[];
    conditionsZh?: string[];
    limitations: string[];
    limitationsZh?: string[];
    description: string;
    descriptionZh?: string;
  };
  
  // Quick start guide
  quickStart: {
    installation: string[];
    installationZh?: string[];
    basicUsage: string;
    basicUsageZh?: string;
    requirements: string[];
    requirementsZh?: string[];
  };
  
  // API documentation
  api?: {
    baseUrl: string;
    endpoints: ApiEndpoint[];
  };
  
  // Community data
  community: {
    contributors: number;
    forks: number;
    watchers: number;
    issues: {
      open: number;
      closed: number;
      recent: ProjectIssue[];
    };
    discussions: ProjectDiscussion[];
  };
  
  // Dependencies
  dependencies: {
    production: ProjectDependency[];
    development: ProjectDependency[];
  };
  
  // Performance metrics
  performance: {
    benchmarks: ProjectBenchmark[];
    analytics: {
      downloads: AnalyticsData[];
      usage: UsageData[];
    };
  };
  
  // Basic information
  features: string[];
  featuresZh?: string[];
  timeline: {
    start: string;
    end: string;
    duration: string;
  };
  teamSize: number;
  myRole: string;
  myRoleZh?: string;
  metrics: {
    linesOfCode: number;
    commits: number;
    stars: number;
    downloads: number;
  };
  github?: string;
  demo?: string;
  planId?: string;
  year: number;
}

export interface ProjectRelease {
  version: string;
  date: string;
  description: string;
  downloadCount: number;
  assets: ProjectAsset[];
}

export interface ProjectAsset {
  name: string;
  size: string;
  downloadUrl: string;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  parameters?: ApiParameter[];
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ProjectIssue {
  id: number;
  title: string;
  author: string;
  created: string;
  labels: string[];
  status: 'open' | 'closed';
}

export interface ProjectDiscussion {
  id: number;
  title: string;
  author: string;
  replies: number;
  created: string;
  category: string;
}

export interface ProjectDependency {
  name: string;
  version: string;
  license: string;
  vulnerabilities?: number;
}

export interface ProjectBenchmark {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface AnalyticsData {
  date: string;
  count: number;
}

export interface UsageData {
  feature: string;
  percentage: number;
}

export interface ProjectBlogReference {
  id: string;
  title: string;
  titleZh?: string;
  summary: string;
  summaryZh?: string;
  publishDate: string;
  category: string;
  tags: string[];
  readTime: string;
  url: string;
  relevance: 'high' | 'medium' | 'low';
  description?: string;
  descriptionZh?: string;
}

export interface AnnualPlan {
  year: number;
  name: string;
  description: string;
  projectCount: number;
  objectives: string[];
  projects: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

export interface GraphNode {
  id: string;
  group: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface RecentGoalData {
  recentThoughts: string[];
  expectedOpportunities: string[];
  availabilityTimes: {
    daily: string;
    fullTime: string;
  };
}

export interface FormData {
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export type Language = 'en' | 'zh'; 