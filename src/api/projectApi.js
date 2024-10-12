// src/api/projectApi.js
import i18n from '../i18n';

// 模拟API延迟
const simulatedDelay = () => new Promise(resolve => setTimeout(resolve, 100));

// 模拟项目数据，支持多语言
const projects = {
  en: [
    { id: 1, name: "AI Chatbot", description: "An intelligent chatbot using natural language processing techniques to provide human-like interactions.", tags: ["AI", "NLP", "Python"], year: 2023, annualPlan: "ZIYUN2024" },
    { id: 2, name: "E-commerce Platform", description: "A full-stack online shopping platform with user authentication, product catalog, and secure payment integration.", tags: ["Web", "React", "Node.js"], year: 2022, annualPlan: "WENXIN2022" },
    { id: 3, name: "Data Visualization Tool", description: "Interactive data visualizations using D3.js to represent complex datasets in an intuitive and engaging manner.", tags: ["D3.js", "Data Science"], year: 2024, annualPlan: "ZIYUN2024" },
    { id: 4, name: "Mobile Fitness App", description: "A cross-platform mobile application for tracking workouts, nutrition, and personal fitness goals.", tags: ["Mobile", "React Native", "Firebase"], year: 2021, annualPlan: "WANXIANG2021" },
    { id: 5, name: "Blockchain Voting System", description: "A decentralized voting system using blockchain technology to ensure transparency and security in elections.", tags: ["Blockchain", "Solidity", "Web3"], year: 2023, annualPlan: "YANGFAN2023" },
  ],
  zh: [
    { id: 1, name: "AI 聊天机器人", description: "使用自然语言处理技术提供类人交互的智能聊天机器人。", tags: ["AI", "NLP", "Python"], year: 2023, annualPlan: "ZIYUN2024" },
    { id: 2, name: "电子商务平台", description: "一个具有用户认证、产品目录和安全支付集成的全栈在线购物平台。", tags: ["Web", "React", "Node.js"], year: 2022, annualPlan: "WENXIN2022" },
    { id: 3, name: "数据可视化工具", description: "使用D3.js进行交互式数据可视化，以直观和引人入胜的方式展示复杂数据集。", tags: ["D3.js", "数据科学"], year: 2024, annualPlan: "ZIYUN2024" },
    { id: 4, name: "移动健身应用", description: "用于跟踪锻炼、营养和个人健身目标的跨平台移动应用。", tags: ["移动", "React Native", "Firebase"], year: 2021, annualPlan: "WANXIANG2021" },
    { id: 5, name: "区块链投票系统", description: "使用区块链技术确保选举透明性和安全性的去中心化投票系统。", tags: ["区块链", "Solidity", "Web3"], year: 2023, annualPlan: "YANGFAN2023" },
  ]
};

const categories = {
  en: ["All", "Research", "Web Apps", "Mobile Apps", "AI Projects", "Tools"],
  zh: ["所有", "研究", "网页应用", "移动应用", "AI 项目", "工具"]
};

const annualPlans = {
  en: [
    {
      year: 2024,
      name: "ZIYUN2024",
      description: "Focusing on AI and advanced web technologies",
      projectCount: 3,
      objectives: [
        "Master advanced AI techniques",
        "Develop a cutting-edge web application",
        "Contribute to open-source projects"
      ],
      projects: [
        { id: 1, name: "AI Chatbot", description: "An intelligent chatbot using NLP" },
        { id: 3, name: "Data Visualization Tool", description: "Interactive data visualizations using D3.js" },
      ]
    },
    {
      year: 2023,
      name: "YANGFAN2023",
      description: "Exploring blockchain and decentralized applications",
      projectCount: 2,
      objectives: [
        "Develop a blockchain-based application",
        "Research on smart contract security",
        "Participate in a blockchain hackathon"
      ],
      projects: [
        { id: 5, name: "Blockchain Voting System", description: "A decentralized voting system using blockchain technology" },
      ]
    },
    {
      year: 2022,
      name: "WENXIN2022",
      description: "Developing web and mobile solutions",
      projectCount: 1,
      objectives: [
        "Enhance web development skills",
        "Build scalable mobile applications"
      ],
      projects: [
        { id: 2, name: "E-commerce Platform", description: "A full-stack online shopping platform" },
      ]
    },
    {
      year: 2021,
      name: "WANXIANG2021",
      description: "Focus on mobile app development",
      projectCount: 1,
      objectives: [
        "Develop cross-platform mobile applications",
        "Integrate with backend services"
      ],
      projects: [
        { id: 4, name: "Mobile Fitness App", description: "A cross-platform mobile application for fitness tracking" },
      ]
    }
  ],
  zh: [
    {
      year: 2024,
      name: "紫韵2024",
      description: "专注于AI及先进的网页技术",
      projectCount: 3,
      objectives: [
        "掌握先进的AI技术",
        "开发尖端的网页应用",
        "为开源项目做出贡献"
      ],
      projects: [
        { id: 1, name: "AI 聊天机器人", description: "使用NLP的智能聊天机器人" },
        { id: 3, name: "数据可视化工具", description: "使用D3.js的交互式数据可视化工具" },
      ]
    },
    {
      year: 2023,
      name: "扬帆2023",
      description: "探索区块链和去中心化应用",
      projectCount: 2,
      objectives: [
        "开发基于区块链的应用程序",
        "研究智能合约安全性",
        "参与区块链黑客马拉松"
      ],
      projects: [
        { id: 5, name: "区块链投票系统", description: "使用区块链技术的去中心化投票系统" },
      ]
    },
    {
      year: 2022,
      name: "问心2022",
      description: "开发网页和移动解决方案",
      projectCount: 1,
      objectives: [
        "提升网页开发技能",
        "构建可扩展的移动应用程序"
      ],
      projects: [
        { id: 2, name: "电子商务平台", description: "一个全栈在线购物平台" },
      ]
    },
    {
      year: 2021,
      name: "游薪2021",
      description: "专注于移动应用开发",
      projectCount: 1,
      objectives: [
        "开发跨平台移动应用",
        "与后端服务集成"
      ],
      projects: [
        { id: 4, name: "移动健身应用", description: "用于健身跟踪的跨平台移动应用程序" },
      ]
    }
  ]
};

const graphData = {
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
    // 添加更多类别的图表数据...
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
    // 添加更多类别的图表数据...
  }
};

export const fetchProjects = async (language = 'en') => {
  await simulatedDelay();
  return projects[language];
};

export const fetchCategories = async (language = 'en') => {
  await simulatedDelay();
  return categories[language];
};

export const fetchAnnualPlans = async (language = 'en') => {
  await simulatedDelay();
  return annualPlans[language];
};

export const fetchProjectById = async (id, language = 'en') => {
  await simulatedDelay();
  return projects[language].find(project => project.id === id);
};

export const fetchAnnualPlanByName = async (name, language = 'en') => {
  await simulatedDelay();
  return annualPlans[language].find(plan => plan.name === name);
};

export const fetchGraphData = async (category = 'all', language = 'en') => {
  await simulatedDelay();
  return graphData[language][category] || graphData[language].all;
};