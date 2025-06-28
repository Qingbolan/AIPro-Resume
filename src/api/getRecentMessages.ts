import type { Message, Language } from '../types/api';

export const getRecentMessagesAPI = (language: Language = 'en'): Promise<Message[]> => {
  // Return different message lists based on language
  const messages: Record<Language, Message[]> = {
    en: [
      { 
        type: 'general', 
        text: 'Great work on your latest project!', 
        author: 'John Doe', 
        role: 'UX Designer' 
      },
      { 
        type: 'job', 
        company: 'TechCorp', 
        position: 'Senior AI Developer', 
        text: 'We have an exciting opportunity for an AI expert.', 
        author: 'Jane Smith', 
        role: 'HR Manager' 
      },
      { 
        type: 'general', 
        text: 'Would love to collaborate on a research paper.', 
        author: 'Dr. Emily Brown', 
        role: 'Research Scientist' 
      },
      { 
        type: 'job', 
        company: 'InnovateLab', 
        position: 'ML Engineer', 
        text: 'Join our cutting-edge machine learning team!', 
        author: 'Mike Johnson', 
        role: 'Tech Lead' 
      },
    ],
    zh: [
      { 
        type: 'general', 
        text: '在您最新的项目上做得很好！', 
        author: 'John Doe', 
        role: 'UX设计师' 
      },
      { 
        type: 'job', 
        company: 'TechCorp', 
        position: '高级AI开发人员', 
        text: '我们有一个令人兴奋的AI专家机会。', 
        author: 'Jane Smith', 
        role: '人力资源经理' 
      },
      { 
        type: 'general', 
        text: '很想在研究论文上合作。', 
        author: 'Dr. Emily Brown', 
        role: '研究科学家' 
      },
      { 
        type: 'job', 
        company: 'InnovateLab', 
        position: '机器学习工程师', 
        text: '加入我们前沿的机器学习团队！', 
        author: 'Mike Johnson', 
        role: '技术主管' 
      },
    ]
  };

  // Simulate API call and return sample data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(messages[language]);
    }, 1000);
  });
}; 