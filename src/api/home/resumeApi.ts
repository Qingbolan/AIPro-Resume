import type { 
  ResumeData, 
  PersonalInfo, 
  Language, 
  EducationItem,
  ResearchItem,
  ExperienceItem,
  RecentUpdate,
} from '../../types/api';
import { get, put, withFallback, formatLanguage } from '../utils';

// Mock data for fallback (keeping original structure)
const mockResumeData: Record<Language, ResumeData> = {
  en: {
    name: "Silan Hu",
    title: "AI Researcher & Full Stack Developer",
    current: "looking for PhD, internships and research opportunities",
    contacts: [
      { type: "email", value: "Silan.Hu@u.nus.edu" },
      { type: "phone", value: "+65 86986181" },
      { type: "location", value: "Singapore🇸🇬 / Beijing, China🇨🇳" }
    ],
    socialLinks: [
      { type: "linkedin", url: "https://linkedin.com/in/qingbolan" },
      { type: "github", url: "https://github.com/Qingbolan" }
    ],
    sections: {
      education: {
        title: "Education",
        content: [
          {
            school: "National University of Singapore (NUS)",
            degree: "Master of Computing (ARTIFICIAL INTELLIGENCE specialization)",
            date: "Aug 2024 – Future (Dec 2025)",
            logo: "/educations/nus.png",
            website: "https://www.nus.edu.sg/",
            location: "Singapore",
            details: []
          },
          {
            school: "Macau University of Science and Technology (MUST)",
            degree: "Bachelor of Science in Computer Science (Minor in Artificial Intelligence)",
            date: "Sep 2020 – Jun 2024",
            logo: "/educations/must.png",
            website: "https://www.must.edu.mo/",
            location: "Macau, China",
            details: [
              "GPA: 3.76/4 (Ranked in top 5%, 4/160+)",
              "Received full scholarship of 250,000 CNY for Master's program",
              "Dean's List Student",
              "Vice President of Computer Science and Engineering Student Association",
              "Core Courses: Graduation Project (A+), Machine Learning (A+), Computer Programming (A+), Data Structures (A), Digital Logic (A+), Database Systems (A+), etc."
            ]
          }
        ] as EducationItem[]
      },
      publications: {
        title: "Publications",
        content: [
          'Hu, S., & Wang, X. (2024). FOKE: A Personalized and Explainable Education Framework Integrating Foundation Models, Knowledge Graphs, and Prompt Engineering. Communications in Computer and Information Science, vol 2161. Springer.',
          'Qiu, Y., Liu, H., Lin, Y., Hu, S., Wei, W., & Wang, X. (2023, December). Knowledge-graph relation extraction for Chinese business datasets. In AHPCAI 2023 (Vol. 12941, pp. 678-687). SPIE.',
          'Shen, M., Chen, D., Hu, S., & Xu, G. (2023). Class incremental learning of remote sensing images based on class similarity distillation. PeerJ Computer Science, 9, e1583.'
        ] as string[]
      },
      research: {
        title: "Research",
        content: [
          {
            title: "FOKE: A Personalized and Explainable Education Framework",
            location: "Beijing, China",
            date: "Jan 2024 – Mar 2024",
            details: ["Proposed a new framework applying LLMs to personalized education and developed practical application products."]
          },
          {
            title: "Knowledge-Graph Relation Extraction for Chinese Business Datasets",
            location: "Online",
            date: "Jun 2023 – Aug 2023",
            details: ["Filtered and optimized high-quality data and trained existing relation extraction algorithms on the constructed KG."]
          },
          {
            title: "Point Cloud Recognition by 3D Lidar in a Hybrid Approach of ATSS and Big kernel",
            location: "Macau, China",
            date: "Feb 2023 – Jun 2023",
            details: ["Validated on GAC Research Institute's cloud computing platform, our method excelled in real traffic scenarios such as high-speed driving and low-speed parking."]
          }
        ] as ResearchItem[]
      },
      experience: {
        title: "Experience",
        content: [
          {
            company: "HPC-AI Tech",
            role: "AI Engineer Intern",
            date: "Jan 2025 – Now",
            logo: "/experiences/hpc-ai.jpeg",
            website: "https://hpc-ai.tech/",
            location: "Singapore",
            details: [
              "Open-Sora Team(AIGC text2video): Research on Improving Speed and Quality of Text-to-Video Generation"
            ]
          },
          {
            company: "Beijing Stats City Data Technology Co., Ltd.",
            role: "Full Stack Engineer",
            date: "Jan 2024 – Sep 2024",
            logo: "/experiences/scholarhero.png",
            website: "https://scholarhero.cn/",
            location: "Beijing, China",
            details: [
              "Scholar Hero: Led a student startup team to develop an AI-powered educational application. Currently, it has 300 users, received recognition and funding support from the Communication University of China, and attracted attention from top Chinese universities. Published a paper as the first author, with patents and software copyrights pending."
            ]
          },
          {
            company: "Lenovo (Beijing) Co. Ltd",
            role: "Python Develop Engineer Intern",
            date: "Jun 2023 – Sep 2023",
            logo: "/experiences/lenovo.jpeg",
            website: "https://www.lenovo.com/",
            location: "Beijing, China",
            details: [
              "Knowledge and Training System: Led a team of 3 interns to fine-tune large language models and develop Lenovo's internal AI training system (intelligent recommendation and virtual teaching) using Flask and Vue3. Established the internal network for project deployment, configuring network equipment including NAS and computational resources.",
              "Stable Diffusion Launcher: This is the precursor to the AI image generation software pre-installed on Lenovo AI PCs."
            ]
          },
          {
            company: "Ipsos China",
            role: "Market Research Analysis Intern",
            date: "Jul 2022 – Aug 2022",
            logo: "/experiences/ipsos.jpeg",
            website: "https://www.ipsos.com/en-cn",
            location: "Beijing, China",
            details: [
              "Used Octopus crawler tool to collect product data for AIoT smart in-vehicle devices, extracted and analyzed questionnaire data using SPSS, and conducted industry surveys on current AIoT smart in-vehicle devices using Microsoft Excel.",
              "Gained familiarity with market research processes, improved data collection, organization, and analysis skills, and received the Outstanding Project Award for the market research internship project."
            ]
          },
          {
            company: "Chaoyang District 'Youth Elite' Internship Program",
            role: "Summer Intern",
            date: "Jul 2021 – Aug 2021",
            details: [
              "Participated in immersive learning experiences at HSBC Bank, Deloitte China, Siemens (China) Co., Ltd., and Beijing Greenenvision Technology Co., Ltd., gaining in-depth understanding of banking, risk and financial consulting, auditing, management consulting, corporate structure, and AI technologies.",
              "Gained comprehensive understanding of operations and culture in renowned companies, expanded skills in finance, management, auditing, and artificial intelligence, and improved practical abilities in case analysis and business plan development."
            ]
          }
        ] as ExperienceItem[]
      },
      awards: {
        title: "Awards",
        content: [
          'Oct 2023 Verified Certificate - LLM102x: Large Language Models (Awarded by Databricks & edX)',
          'Dec 2022 Dean\'s Merit in Macau University of Science and Technology (TOP 5%)',
          'Sep 2022 2022 Macau Cybersecurity Technology Competition – University Division Distinction Award',
          'May 2022 2022 Greater Bay Area IT Application System Development Competition - Finalist Award (TOP 6 Teams)',
          'Oct 2021 First Prize of the Macao University of Science and Technology\'s Cultural and Academic Excellence Award',
          'Apr 2021 Global Entrepreneurship Exchange - Spring 2021，Third place team (Top 5%/20 Countries, 81 Teams)'
        ] as string[]
      },
      skills: {
        title: "Skills",
        content: ['Python', 'C/C++', 'Go', 'PHP', 'Machine Learning', 'MySQL', 'VUE3', 'Android App Development', 'Desktop Software Development', 'Innovation'] as string[]
      },
      recent: {
        title: "Recent Updates",
        content: [
          {
            id: "1",
            type: "work",
            title: "Joined HPC-AI Tech Open-Sora Team",
            description: "Started working on improving text-to-video generation speed and quality",
            date: "2025-01-15",
            tags: ["AI", "Video Generation", "AIGC"],
            status: "active",
            priority: "high"
          },
          {
            id: "2", 
            type: "publication",
            title: "FOKE Framework Published",
            description: "Our research on personalized education framework using LLMs was published in Springer",
            date: "2024-12-10",
            tags: ["LLM", "Education", "AI"],
            status: "completed",
            priority: "high"
          },
          {
            id: "3",
            type: "education",
            title: "NUS Master's Program Progress",
            description: "Currently pursuing Master of Computing with AI specialization at NUS",
            date: "2024-08-20",
            tags: ["NUS", "AI", "Master's"],
            status: "ongoing",
            priority: "medium"
          },
          {
            id: "4",
            type: "project",
            title: "Scholar Hero Platform",
            description: "Led development of AI-powered educational application with 300+ users",
            date: "2024-09-15",
            tags: ["Startup", "AI", "Education"],
            status: "completed",
            priority: "high"
          },
          {
            id: "5",
            type: "research",
            title: "Point Cloud Recognition Research",
            description: "Completed research on 3D Lidar using ATSS and big kernel approach",
            date: "2023-06-30",
            tags: ["Computer Vision", "Lidar", "ML"],
            status: "completed", 
            priority: "medium"
          }
        ] as RecentUpdate[]
      }
    }
  },
  zh: {
    name: "胡思蓝",
    title: "AI研究员 & 全栈开发工程师",
    current: "正在寻找博士机会、实习和研究合作",
    contacts: [
      { type: "email", value: "Silan.Hu@u.nus.edu" },
      { type: "phone", value: "+65 86986181" },
      { type: "location", value: "新加坡🇸🇬 / 中国北京🇨🇳" }
    ],
    socialLinks: [
      { type: "linkedin", url: "https://linkedin.com/in/qingbolan" },
      { type: "github", url: "https://github.com/Qingbolan" }
    ],
    sections: {
      education: {
        title: "教育",
        content: [
          {
            school: "新加坡国立大学 (NUS)",
            degree: "计算机硕士（人工智能专业）",
            date: "2024年8月 – 未来（2025年12月）",
            logo: "/educations/nus.png",
            website: "https://www.nus.edu.sg/",
            location: "新加坡",
            details: []
          },
          {
            school: "澳门科技大学（MUST）",
            degree: "计算机科学学士（辅修人工智能）",
            date: "2020年9月 – 2024年6月",
            logo: "/educations/must.png",
            website: "https://www.must.edu.mo/",
            location: "中国澳门",
            details: [
              "GPA: 3.76/4（前5%，4/160+）",
              "获得硕士项目全额奖学金250,000 CNY",
              "院长优秀生",
              "计算机科学与工程学生会副主席",
              "核心课程：毕业项目（A+）、机器学习（A+）、计算机编程（A+）、数据结构（A）、数字逻辑（A+）、数据库系统（A+）等"
            ]
          }
        ] as EducationItem[]
      },
      publications: {
        title: "发表论文",
        content: [
          'Hu, S., & Wang, X. (2024). FOKE: A Personalized and Explainable Education Framework Integrating Foundation Models, Knowledge Graphs, and Prompt Engineering. Communications in Computer and Information Science, vol 2161. Springer.',
          'Qiu, Y., Liu, H., Lin, Y., Hu, S., Wei, W., & Wang, X. (2023, December). Knowledge-graph relation extraction for Chinese business datasets. In AHPCAI 2023 (Vol. 12941, pp. 678-687). SPIE.',
          'Shen, M., Chen, D., Hu, S., & Xu, G. (2023). Class incremental learning of remote sensing images based on class similarity distillation. PeerJ Computer Science, 9, e1583.'
        ] as string[]
      },
      research: {
        title: "研究",
        content: [
          {
            title: "FOKE：一个个性化且可解释的教育框架",
            location: "中国北京",
            date: "2024年1月 – 2024年3月",
            details: ["提出了一个将大型语言模型应用于个性化教育的新框架，并开发了实用的应用产品。"]
          },
          {
            title: "中国商业数据集的知识图谱关系抽取",
            location: "在线",
            date: "2023年6月 – 2023年8月",
            details: ["筛选和优化高质量数据，并在构建的知识图谱上训练现有的关系抽取算法。"]
          },
          {
            title: "基于ATSS和大内核的混合方法进行3D激光雷达点云识别",
            location: "中国澳门",
            date: "2023年2月 – 2023年6月",
            details: ["在广汽研究院的云计算平台上验证，我们的方法在高速驾驶和低速停车等真实交通场景中表现出色。"]
          }
        ] as ResearchItem[]
      },
      experience: {
        title: "工作经验",
        content: [
          {
            company: "潞晨科技",
            role: "AI工程师实习生", 
            date: "2025年1月 – 至今",
            logo: "/experiences/hpc-ai.jpeg",
            website: "https://hpc-ai.tech/",
            location: "新加坡",
            details: [
              "Open-Sora团队(AIGC 文本生视频)：研究提升文本到视频生成的速度和质量"
            ]
          },
          {
            company: "北京统计之都数据科技有限公司",
            role: "全栈工程师",
            date: "2024年1月 – 2024年9月",
            logo: "/experiences/scholarhero.png",
            website: "https://scholarhero.cn/",
            location: "中国北京",
            details: [
              "Scholar Hero：领导一个学生创业团队开发AI驱动的教育应用。目前拥有300名用户，获得中国传媒大学的认可和资金支持，并吸引了中国顶尖大学的关注。作为第一作者发表论文，正在申请专利和软件版权。"
            ]
          },
          {
            company: "联想（北京）有限公司",
            role: "Python开发工程师实习生",
            date: "2023年6月 – 2023年9月",
            logo: "/experiences/lenovo.jpeg",
            website: "https://www.lenovo.com/",
            location: "中国北京",
            details: [
              "知识与培训系统：领导一个3名实习生的团队微调大型语言模型，并使用Flask和Vue3开发联想内部的AI培训系统（智能推荐与虚拟教学）。建立项目部署的内部网络，配置包括NAS和计算资源在内的网络设备。",
              "Stable Diffusion Launcher：这是联想AI PC预装的AI图像生成软件的前身。"
            ]
          },
          {
            company: "益普索中国",
            role: "市场研究分析实习生",
            date: "2022年7月 – 2022年8月",
            logo: "/experiences/ipsos.jpeg",
            website: "https://www.ipsos.com/en-cn",
            location: "中国北京",
            details: [
              "使用Octopus爬虫工具收集AIoT智能车载设备的产品数据，使用SPSS提取和分析问卷数据，并使用Microsoft Excel进行当前AIoT智能车载设备的行业调查。",
              "熟悉市场研究流程，提升了数据收集、组织和分析能力，并因市场研究实习项目获得优秀项目奖。"
            ]
          },
          {
            company: "朝阳区'青年精英'实习计划",
            role: "暑期实习生",
            date: "2021年7月 – 2021年8月",
            details: [
              "在汇丰银行、德勤中国、西门子（中国）有限公司和北京Greenenvision科技有限公司参与沉浸式学习体验，深入了解银行、风险与金融咨询、审计、管理咨询、企业结构和AI技术。",
              "全面了解知名公司的运营和文化，扩展了在金融、管理、审计和人工智能方面的技能，并提升了案例分析和商业计划开发的实战能力。"
            ]
          }
        ] as ExperienceItem[]
      },
      awards: {
        title: "奖项",
        content: [
          '2023年10月 验证证书 - LLM102x：大型语言模型（由Databricks & edX颁发）',
          '2022年12月 澳门科技大学院长奖学金（前5%）',
          '2022年9月 2022澳门网络安全技术竞赛 – 大学组优秀奖',
          '2022年5月 2022大湾区IT应用系统开发竞赛 - 入围奖（前6支团队）',
          '2022年1月 澳门科技大学文化及学术优秀奖一等奖',
          '2021年4月 全球创业交流 - 2021春季，团队第三名（前5% / 20个国家，81支团队）'
        ] as string[]
      },
      skills: {
        title: "技能",
        content: ['Python', 'C/C++', 'Go', 'PHP', '机器学习', 'MySQL', 'VUE3', 'Android应用开发', '桌面软件开发', '创新'] as string[]
      },
      recent: {
        title: "最近动态",
        content: [
          {
            id: "1",
            type: "work",
            title: "加入潞晨科技Open-Sora团队",
            description: "开始专注于提升文本到视频生成的速度和质量研究",
            date: "2025-01-15",
            tags: ["AI", "视频生成", "AIGC"],
            status: "active",
            priority: "high"
          },
          {
            id: "2",
            type: "publication", 
            title: "FOKE框架论文发表",
            description: "我们关于使用LLM的个性化教育框架的研究在Springer发表",
            date: "2024-12-10",
            tags: ["LLM", "教育", "AI"],
            status: "completed",
            priority: "high"
          },
          {
            id: "3",
            type: "education",
            title: "NUS硕士项目进展",
            description: "目前在新加坡国立大学攻读人工智能专业计算机硕士学位",
            date: "2024-08-20",
            tags: ["NUS", "AI", "硕士"],
            status: "ongoing",
            priority: "medium"
          },
          {
            id: "4",
            type: "project",
            title: "Scholar Hero平台",
            description: "领导开发AI驱动的教育应用平台，用户数超过300",
            date: "2024-09-15",
            tags: ["创业", "AI", "教育"],
            status: "completed",
            priority: "high"
          },
          {
            id: "5",
            type: "research",
            title: "点云识别研究",
            description: "完成了使用ATSS和大内核方法的3D激光雷达研究",
            date: "2023-06-30",
            tags: ["计算机视觉", "激光雷达", "机器学习"],
            status: "completed",
            priority: "medium"
          }
        ] as RecentUpdate[]
      }
    }
  }
};


// API Functions

/**
 * Get complete resume data
 */
export const fetchResumeData = async (language: Language = 'en'): Promise<ResumeData> => {
  const apiCall = async () => {
    const response = await get<ResumeData>('/api/v1/resume', { lang: formatLanguage(language) });
    
    // Ensure essential fields have default values
    const sanitizedResponse: ResumeData = {
      name: response.name || mockResumeData[language].name,
      title: response.title || mockResumeData[language].title,
      current: response.current || mockResumeData[language].current,
      contacts: response.contacts || mockResumeData[language].contacts,
      socialLinks: response.socialLinks || mockResumeData[language].socialLinks,
      sections: {
        education: response.sections?.education || mockResumeData[language].sections.education,
        publications: response.sections?.publications || mockResumeData[language].sections.publications,
        research: response.sections?.research || mockResumeData[language].sections.research,
        experience: response.sections?.experience || mockResumeData[language].sections.experience,
        awards: response.sections?.awards || mockResumeData[language].sections.awards,
        skills: response.sections?.skills || mockResumeData[language].sections.skills,
        recent: response.sections?.recent || mockResumeData[language].sections.recent,
      }
    };
    
    return sanitizedResponse;
  };
  
  const fallbackData = mockResumeData[language];
  return withFallback(apiCall, fallbackData);
};

/**
 * Get personal information
 */
export const fetchPersonalInfo = async (language: Language = 'en'): Promise<PersonalInfo> => {
  const apiCall = async () => {
    const response = await get<PersonalInfo>('/api/v1/resume/personal', { lang: formatLanguage(language) });
    return response;
  };
  
  const fallbackData: PersonalInfo = {
    name: mockResumeData[language].name,
    title: mockResumeData[language].title,
    current: mockResumeData[language].current,
    contacts: mockResumeData[language].contacts.map(contact => ({
      icon: null,
      value: contact.value,
      type: contact.type
    })),
    socialLinks: mockResumeData[language].socialLinks.map(link => ({
      icon: null,
      url: link.url,
      type: link.type
    }))
  };
  
  return withFallback(apiCall, fallbackData);
};

/**
 * Get education list
 */
export const fetchEducation = async (language: Language = 'en'): Promise<EducationItem[]> => {
  const apiCall = async () => {
    const response = await get<EducationItem[]>('/api/v1/resume/education', { lang: formatLanguage(language) });
    return response;
  };
  
  const fallbackData = mockResumeData[language].sections.education.content as EducationItem[];
  return withFallback(apiCall, fallbackData);
};

/**
 * Get work experience list
 */
export const fetchWorkExperience = async (language: Language = 'en'): Promise<ExperienceItem[]> => {
  const apiCall = async () => {
    const response = await get<ExperienceItem[]>('/api/v1/resume/experience', { lang: formatLanguage(language) });
    return response;
  };
  
  const fallbackData = mockResumeData[language].sections.experience.content as ExperienceItem[];
  return withFallback(apiCall, fallbackData);
};

/**
 * Get research projects list
 */
export const fetchResearchProjects = async (language: Language = 'en'): Promise<ResearchItem[]> => {
  const apiCall = async () => {
    const response = await get<ResearchItem[]>('/api/v1/resume/research', { lang: formatLanguage(language) });
    return response;
  };
  
  const fallbackData = mockResumeData[language].sections.research.content as ResearchItem[];
  return withFallback(apiCall, fallbackData);
};

/**
 * Get publications list
 */
export const fetchPublications = async (language: Language = 'en'): Promise<string[]> => {
  const apiCall = async () => {
    const response = await get<string[]>('/api/v1/resume/publications', { lang: formatLanguage(language) });
    return response;
  };
  
  const fallbackData = mockResumeData[language].sections.publications.content as string[];
  return withFallback(apiCall, fallbackData);
};

/**
 * Get awards list
 */
export const fetchAwards = async (language: Language = 'en'): Promise<string[]> => {
  const apiCall = async () => {
    const response = await get<string[]>('/api/v1/resume/awards', { lang: formatLanguage(language) });
    return response;
  };
  
  const fallbackData = mockResumeData[language].sections.awards.content as string[];
  return withFallback(apiCall, fallbackData);
};

/**
 * Get recent updates
 */
export const fetchRecentUpdates = async (language: Language = 'en'): Promise<RecentUpdate[]> => {
  const apiCall = async () => {
    const response = await get<RecentUpdate[]>('/api/v1/resume/recent', { lang: formatLanguage(language) });
    return response;
  };
  
  const fallbackData = mockResumeData[language].sections.recent.content as RecentUpdate[];
  return withFallback(apiCall, fallbackData);
};

/**
 * Update personal information
 */
export const updatePersonalInfo = async (
  updates: Partial<PersonalInfo>, 
  language: Language = 'en'
): Promise<PersonalInfo> => {
  const apiCall = async () => {
    const response = await put<PersonalInfo>('/api/v1/resume/personal', { 
      ...updates, 
      lang: formatLanguage(language) 
    });
    return response;
  };
  
  // For fallback, we'll just return the current data (no actual update)
  const fallbackData = await fetchPersonalInfo(language);
  return withFallback(apiCall, fallbackData);
};