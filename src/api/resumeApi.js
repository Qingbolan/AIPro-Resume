// api/resumeApi.js

// 模拟API延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟简历数据
const resumeData = {
  name: "Silan Hu",
  title: "AI Researcher & Full Stack Developer",
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
          degree: "Master of Computing (ARTIFICIAL INTELLIGENCE specialisation)",
          date: "Aug 2024 – Future(Dec 2025)",
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
          company: "Beijing Stats City Data Technology Co., Ltd.",
          role: "Full Stack Engineer",
          date: "Jan 2024 – Now",
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
};

// 模拟API调用函数
export const fetchResumeData = async () => {
  try {
    return resumeData;
    // 模拟网络延迟
    // await delay(1000);
    
    // 模拟成功率 (95% 成功)
    // if (Math.random() > 0.05) {
    //   return resumeData;
    // } else {
    //   throw new Error('Failed to fetch resume data');
    // }
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw error;
  }
};

// 可选: 添加更多API函数
export const updateResumeSection = async (sectionKey, newData) => {
  try {
    // 模拟网络延迟
    await delay(500);

    // 模拟更新操作
    if (resumeData.sections[sectionKey]) {
      resumeData.sections[sectionKey].content = newData;
      return { success: true, message: `${sectionKey} section updated successfully` };
    } else {
      throw new Error(`Section ${sectionKey} not found`);
    }
  } catch (error) {
    console.error(`Error updating ${sectionKey} section:`, error);
    throw error;
  }
};

// 示例: 如何使用updateResumeSection
// await updateResumeSection('skills', ['JavaScript', 'React', 'Node.js', 'GraphQL']);