// Central API exports
export * from './home/resumeApi';
export * from './projects/projectApi';
export * from './ideas/ideaApi';
export * from './blog/blogApi';

// Export specific functions from plans/planApi to avoid conflicts
export { 
  fetchAnnualPlans, 
  fetchCurrentAnnualPlan, 
  fetchAnnualPlanByName,
  fetchProjectsWithAnnualPlans,
  fetchProjectsByAnnualPlan,
  // Backward compatibility exports
  fetchPlans,
  fetchCurrentPlan,
  fetchProjectsWithPlans
} from './plans/planApi';

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
  Plan,
  ProjectWithPlan,
  Project,
  ProjectDetail,
  AnnualPlan,
  GraphData
} from '../types/api'; 