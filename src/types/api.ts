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