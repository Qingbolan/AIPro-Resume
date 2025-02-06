// import axios from 'axios';
// import i18n from '../i18n';

// const API_BASE_URL = 'https://silan.tech/api';

// // 辅助函数用于处理错误
// const handleApiError = (error, functionName) => {
//   console.error(`Error in ${functionName}:`, error);
//   if (error.response) {
//     console.error('Error response data:', error.response.data);
//     console.error('Error response status:', error.response.status);
//     console.error('Error response headers:', error.response.headers);
//   } else if (error.request) {
//     console.error('No response received:', error.request);
//   } else {
//     console.error('Error setting up request:', error.message);
//   }
//   throw error;
// };

// export const fetchResumeData = async (language = 'en') => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/fetchResumeData`, { params: { language } });
//     console.log('API Response:', response.data); // Debug log
//     // Transform the data structure
//     // const transformedData = transformResumeData(response.data);
//     // console.log('Transformed Data:', transformedData); // Debug log
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'fetchResumeData');
//   }
// };

// function transformResumeData(input) {
//   const output = {
//     name: input.name,
//     title: input.title,
//     current: input.current,
//     contacts: input.contacts,
//     socialLinks: input.socialLinks,
//     sections: {}
//   };

//   // Helper function to convert array to object for education and experience
//   const arrayToObject = (arr) => {
//     return arr.map(item => {
//       const obj = {};
//       Object.keys(item).forEach(key => {
//         if (key === 'details') {
//           obj[key] = item[key];
//         } else {
//           obj[key] = [item[key]];
//         }
//       });
//       return obj;
//     });
//   };

//   // Process each section
//   for (const [key, value] of Object.entries(input.sections)) {
//     if (['education', 'experience', 'research'].includes(key)) {
//       output.sections[key] = {
//         title: value.title,
//         content: arrayToObject(value.content)
//       };
//     } else {
//       output.sections[key] = value;
//     }
//   }

//   return output;
// }

// export const updateResumeSection = async (sectionKey, newData, language = 'en') => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/updateResumeSection`, {
//       language,
//       sectionKey,
//       latestedData: newData
//     });

//     if (response.data.Success) {
//       return { 
//         success: true, 
//         message: i18n.t('update_section_success', { section: sectionKey }) 
//       };
//     } else {
//       throw new Error(response.data.Message || i18n.t('update_failed'));
//     }
//   } catch (error) {
//     handleApiError(error, 'updateResumeSection');
//   }
// };
// src/api/resumeApi.js
import i18n from '../i18n';

// 模拟API延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟简历数据，支持多语言
const resumeData = {
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
            details: []
          },
          {
            school: "Macau University of Science and Technology (MUST)",
            degree: "Bachelor of Science in Computer Science (Minor in Artificial Intelligence)",
            date: "Sep 2020 – Jun 2024",
            details: [
              "GPA: 3.76/4 (Ranked in top 5%, 4/160+)",
              "Received full scholarship of 250,000 CNY for Master's program",
              "Dean's List Student",
              "Vice President of Computer Science and Engineering Student Association",
              "Core Courses: Graduation Project (A+), Machine Learning (A+), Computer Programming (A+), Data Structures (A), Digital Logic (A+), Database Systems (A+), etc."
            ]
          }
        ]
      },
      publications: {
        title: "Publications",
        content: [
          'Hu, S., & Wang, X. (2024). FOKE: A Personalized and Explainable Education Framework Integrating Foundation Models, Knowledge Graphs, and Prompt Engineering. Communications in Computer and Information Science, vol 2161. Springer.',
          'Qiu, Y., Liu, H., Lin, Y., Hu, S., Wei, W., & Wang, X. (2023, December). Knowledge-graph relation extraction for Chinese business datasets. In AHPCAI 2023 (Vol. 12941, pp. 678-687). SPIE.',
          'Shen, M., Chen, D., Hu, S., & Xu, G. (2023). Class incremental learning of remote sensing images based on class similarity distillation. PeerJ Computer Science, 9, e1583.'
        ]
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
        ]
      },
      experience: {
        title: "Experience",
        content: [
          {
            company: "HPC-AI Tech",
            role: "AI Engineer",
            date: "Jan 2025 – Now",
            details: [
              "Open-Sora Team(AIGC text2video): Research on Improving Speed and Quality of Text-to-Video Generation"
            ]
          },
          {
            company: "Beijing Stats City Data Technology Co., Ltd.",
            role: "Full Stack Engineer",
            date: "Jan 2024 – Sep 2024",
            details: [
              "Scholar Hero: Led a student startup team to develop an AI-powered educational application. Currently, it has 300 users, received recognition and funding support from the Communication University of China, and attracted attention from top Chinese universities. Published a paper as the first author, with patents and software copyrights pending."
            ]
          },
          {
            company: "Lenovo (Beijing) Co. Ltd",
            role: "Research Intern",
            date: "Jun 2023 – Sep 2023",
            details: [
              "Knowledge and Training System: Led a team of 3 interns to fine-tune large language models and develop Lenovo's internal AI training system (intelligent recommendation and virtual teaching) using Flask and Vue3. Established the internal network for project deployment, configuring network equipment including NAS and computational resources.",
              "Stable Diffusion Launcher: This is the precursor to the AI image generation software pre-installed on Lenovo AI PCs."
            ]
          },
          {
            company: "Ipsos China",
            role: "Market Research Analysis Intern",
            date: "Jul 2022 – Aug 2022",
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
        ]
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
        ]
      },
      skills: {
        title: "Skills",
        content: ['Python', 'C/C++', 'Go', 'PHP', 'Machine Learning', 'MySQL', 'VUE3', 'Android App Development', 'Desktop Software Development', 'Innovation']
      }
    }
  },
  zh: {
    name: "胡思蓝",
    title: "AI研究员 & 全栈开发工程师",
    // current: "looking for PhD opportunities, internships, and research collaborations",
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
            details: []
          },
          {
            school: "澳门科技大学（MUST）",
            degree: "计算机科学学士（辅修人工智能）",
            date: "2020年9月 – 2024年6月",
            details: [
              "GPA: 3.76/4（前5%，4/160+）",
              "获得硕士项目全额奖学金250,000 CNY",
              "院长优秀生",
              "计算机科学与工程学生会副主席",
              "核心课程：毕业项目（A+）、机器学习（A+）、计算机编程（A+）、数据结构（A）、数字逻辑（A+）、数据库系统（A+）等"
            ]
          }
        ]
      },
      publications: {
        title: "发表论文",
        content: [
          'Hu, S., & Wang, X. (2024). FOKE: A Personalized and Explainable Education Framework Integrating Foundation Models, Knowledge Graphs, and Prompt Engineering. Communications in Computer and Information Science, vol 2161. Springer.',
          'Qiu, Y., Liu, H., Lin, Y., Hu, S., Wei, W., & Wang, X. (2023, December). Knowledge-graph relation extraction for Chinese business datasets. In AHPCAI 2023 (Vol. 12941, pp. 678-687). SPIE.',
          'Shen, M., Chen, D., Hu, S., & Xu, G. (2023). Class incremental learning of remote sensing images based on class similarity distillation. PeerJ Computer Science, 9, e1583.'
        ]
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
        ]
      },
      experience: {
        title: "工作经验",
        content: [
          {
            company: "潞晨科技",
            role: "AI工程师", 
            date: "2025年1月 – 至今",
            details: [
              "Open-Sora团队(AIGC 文本生视频)：研究提升文本到视频生成的速度和质量"
            ]
          },
          {
            company: "北京统计之都数据科技有限公司",
            role: "全栈工程师",
            date: "2024年1月 – 2024年9月",
            details: [
              "Scholar Hero：领导一个学生创业团队开发AI驱动的教育应用。目前拥有300名用户，获得中国传媒大学的认可和资金支持，并吸引了中国顶尖大学的关注。作为第一作者发表论文，正在申请专利和软件版权。"
            ]
          },
          {
            company: "联想（北京）有限公司",
            role: "研究实习生",
            date: "2023年6月 – 2023年9月",
            details: [
              "知识与培训系统：领导一个3名实习生的团队微调大型语言模型，并使用Flask和Vue3开发联想内部的AI培训系统（智能推荐与虚拟教学）。建立项目部署的内部网络，配置包括NAS和计算资源在内的网络设备。",
              "Stable Diffusion Launcher：这是联想AI PC预装的AI图像生成软件的前身。"
            ]
          },
          {
            company: "益普索中国",
            role: "市场研究分析实习生",
            date: "2022年7月 – 2022年8月",
            details: [
              "使用Octopus爬虫工具收集AIoT智能车载设备的产品数据，使用SPSS提取和分析问卷数据，并使用Microsoft Excel进行当前AIoT智能车载设备的行业调查。",
              "熟悉市场研究流程，提升了数据收集、组织和分析能力，并因市场研究实习项目获得优秀项目奖。"
            ]
          },
          {
            company: "朝阳区‘青年精英’实习计划",
            role: "暑期实习生",
            date: "2021年7月 – 2021年8月",
            details: [
              "在汇丰银行、德勤中国、西门子（中国）有限公司和北京Greenenvision科技有限公司参与沉浸式学习体验，深入了解银行、风险与金融咨询、审计、管理咨询、企业结构和AI技术。",
              "全面了解知名公司的运营和文化，扩展了在金融、管理、审计和人工智能方面的技能，并提升了案例分析和商业计划开发的实战能力。"
            ]
          }
        ]
      },
      awards: {
        title: "奖项",
        content: [
          '2023年10月 验证证书 - LLM102x：大型语言模型（由Databricks & edX颁发）',
          '2022年12月 澳门科技大学院长奖学金（前5%）',
          '2022年9月 2022澳门网络安全技术竞赛 – 大学组优秀奖',
          '2022年5月 2022大湾区IT应用系统开发竞赛 - 入围奖（前6支团队）',
          '2021年10月 澳门科技大学文化及学术优秀奖一等奖',
          '2021年4月 全球创业交流 - 2021春季，团队第三名（前5% / 20个国家，81支团队）'
        ]
      },
      skills: {
        title: "技能",
        content: ['Python', 'C/C++', 'Go', 'PHP', '机器学习', 'MySQL', 'VUE3', 'Android应用开发', '桌面软件开发', '创新']
      }
    }
  }
};

// 模拟API调用函数
export const fetchResumeData = async (language = 'en') => {
  try {
    return resumeData[language];
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw error;
  }
};

// 可选: 添加更多API函数
export const updateResumeSection = async (sectionKey, newData, language = 'en') => {
  try {
    // 模拟网络延迟
    await delay(500);

    // 模拟更新操作
    if (resumeData[language].sections[sectionKey]) {
      resumeData[language].sections[sectionKey].content = newData;
      return { success: true, message: i18n.t('update_section_success', { section: sectionKey }) };
    } else {
      throw new Error(i18n.t('section_not_found', { section: sectionKey }));
    }
  } catch (error) {
    console.error(`Error updating ${sectionKey} section:`, error);
    throw error;
  }
};