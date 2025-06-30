// Central API exports
export * from './home/resumeApi';
export * from './getRecentMessages';
// export * from './newsApi';
export * from './planApi';
export * from './getAIResponse';
export * from './getRecentGoal';
export * from './projects/projectApi';
export * from './ideas/ideaApi';
export * from './blog/blogApi';
export * from './sendMessage';

// Re-export types for convenience
export type {
  ResumeData,
  PersonalInfo,
  Language,
  Contact,
  SocialLink,
  EducationItem,
  ResearchItem,
  ExperienceItem,
  RecentUpdate,
  ResumeSection,
  Message,
  NewsItem,
  Plan,
  ProjectWithPlan,
  Project,
  ProjectDetail,
  AnnualPlan,
  GraphData,
  RecentGoalData,
  FormData,
  ApiResponse,
  SendMessageResponse,
  VerifyEmailResponse
} from '../types/api'; 