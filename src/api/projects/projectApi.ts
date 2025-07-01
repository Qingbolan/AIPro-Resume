import type { Project, AnnualPlan, GraphData, Language, ProjectDetail, ProjectBlogReference } from '../../types/api';

// Simulate API delay
const simulatedDelay = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 100));

// Mock project data with multi-language support
const projects: Record<Language, Project[]> = {
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

const categories: Record<Language, string[]> = {
  en: ["All", "Research", "Web Apps", "Mobile Apps", "AI Projects", "Tools"],
  zh: ["所有", "研究", "网页应用", "移动应用", "AI 项目", "工具"]
};

const annualPlans: Record<Language, AnnualPlan[]> = {
  en: [
    {
      year: 2024,
      name: "ZIYUN2024",
      nameZh: "紫韵2024",
      description: "Focusing on AI and advanced web technologies",
      descriptionZh: "专注于AI及先进的网页技术",
      icon: "Brain",
      image: "/logo.svg",
      projectCount: 3,
      objectives: [
        "Master advanced AI techniques",
        "Develop a cutting-edge web application",
        "Contribute to open-source projects"
      ],
      objectivesZh: [
        "掌握先进的AI技术",
        "开发尖端的网页应用",
        "为开源项目做出贡献"
      ],
      projects: [
        { id: 1, name: "AI Chatbot", description: "An intelligent chatbot using NLP" },
        { id: 3, name: "Data Visualization Tool", description: "Interactive data visualizations using D3.js" },
      ]
    },
    {
      year: 2023,
      name: "YANGFAN2023",
      nameZh: "扬帆2023",
      description: "Exploring blockchain and decentralized applications",
      descriptionZh: "探索区块链和去中心化应用",
      icon: "Anchor",
      image: null,
      projectCount: 2,
      objectives: [
        "Develop a blockchain-based application",
        "Research on smart contract security",
        "Participate in a blockchain hackathon"
      ],
      objectivesZh: [
        "开发基于区块链的应用程序",
        "研究智能合约安全性",
        "参与区块链黑客马拉松"
      ],
      projects: [
        { id: 5, name: "Blockchain Voting System", description: "A decentralized voting system using blockchain technology" },
      ]
    },
    {
      year: 2022,
      name: "WENXIN2022",
      nameZh: "问心2022",
      description: "Developing web and mobile solutions",
      descriptionZh: "开发网页和移动解决方案",
      icon: "Heart",
      image: null,
      projectCount: 1,
      objectives: [
        "Enhance web development skills",
        "Build scalable mobile applications"
      ],
      objectivesZh: [
        "提升网页开发技能",
        "构建可扩展的移动应用程序"
      ],
      projects: [
        { id: 2, name: "E-commerce Platform", description: "A full-stack online shopping platform" },
      ]
    },
    {
      year: 2021,
      name: "WANXIANG2021",
      nameZh: "万象2021",
      description: "Focus on mobile app development",
      descriptionZh: "专注于移动应用开发",
      icon: "Smartphone",
      image: null,
      projectCount: 1,
      objectives: [
        "Develop cross-platform mobile applications",
        "Integrate with backend services"
      ],
      objectivesZh: [
        "开发跨平台移动应用",
        "与后端服务集成"
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
      nameZh: "紫韵2024",
      description: "专注于AI及先进的网页技术",
      descriptionZh: "专注于AI及先进的网页技术",
      icon: "Brain",
      image: "/logo.svg",
      projectCount: 3,
      objectives: [
        "掌握先进的AI技术",
        "开发尖端的网页应用",
        "为开源项目做出贡献"
      ],
      objectivesZh: [
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
      nameZh: "扬帆2023",
      description: "探索区块链和去中心化应用",
      descriptionZh: "探索区块链和去中心化应用",
      icon: "Anchor",
      image: null,
      projectCount: 2,
      objectives: [
        "开发基于区块链的应用程序",
        "研究智能合约安全性",
        "参与区块链黑客马拉松"
      ],
      objectivesZh: [
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
      nameZh: "问心2022",
      description: "开发网页和移动解决方案",
      descriptionZh: "开发网页和移动解决方案",
      icon: "Heart",
      image: null,
      projectCount: 1,
      objectives: [
        "提升网页开发技能",
        "构建可扩展的移动应用程序"
      ],
      objectivesZh: [
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
      nameZh: "游薪2021",
      description: "专注于移动应用开发",
      descriptionZh: "专注于移动应用开发",
      icon: "Smartphone",
      image: null,
      projectCount: 1,
      objectives: [
        "开发跨平台移动应用",
        "与后端服务集成"
      ],
      objectivesZh: [
        "开发跨平台移动应用",
        "与后端服务集成"
      ],
      projects: [
        { id: 4, name: "移动健身应用", description: "用于健身跟踪的跨平台移动应用程序" },
      ]
    }
  ]
};

const graphData: Record<Language, Record<string, GraphData>> = {
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

export const fetchProjects = async (language: Language = 'en'): Promise<Project[]> => {
  await simulatedDelay();
  return projects[language];
};

export const fetchCategories = async (language: Language = 'en'): Promise<string[]> => {
  await simulatedDelay();
  return categories[language];
};

export const fetchAnnualPlans = async (language: Language = 'en'): Promise<AnnualPlan[]> => {
  await simulatedDelay();
  return annualPlans[language];
};

export const fetchProjectById = async (id: number, language: Language = 'en'): Promise<Project | undefined> => {
  await simulatedDelay();
  return projects[language].find(project => project.id === id);
};

export const fetchAnnualPlanByName = async (name: string, language: Language = 'en'): Promise<AnnualPlan | undefined> => {
  await simulatedDelay();
  return annualPlans[language].find(plan => plan.name === name);
};

export const fetchGraphData = async (category: string = 'all', language: Language = 'en'): Promise<GraphData> => {
  await simulatedDelay();
  return graphData[language][category] || graphData[language].all;
};

// Detailed project data for project detail pages
const projectDetails: Record<Language, Record<string, ProjectDetail>> = {
  en: {
    '1': {
      id: '1',
      title: 'Neural Architecture Search',
      description: 'Automated neural network design using evolutionary algorithms and reinforcement learning techniques',
      fullDescription: 'This project implements a sophisticated Neural Architecture Search (NAS) system that automatically discovers optimal neural network architectures for specific tasks. Using a combination of evolutionary algorithms and reinforcement learning, the system can explore the vast space of possible architectures and find designs that outperform manually crafted networks.',
      image: '/api/placeholder/800/400',
      tags: ['Python', 'PyTorch', 'AutoML', 'Deep Learning'],
      
      relatedBlogs: [
        {
          id: '1',
          title: 'Leveraging Large Language Models for Code Refactoring: A Deep Dive',
          summary: 'Exploring the revolutionary potential of large language models in automated code refactoring, this article delves into our latest research findings and practical implementations.',
          publishDate: '2024-01-25',
          category: 'Research',
          tags: ['LLM', 'Code Refactoring', 'AI', 'Software Engineering'],
          readTime: '15 min read',
          url: '/blog/1',
          relevance: 'high',
          description: 'This blog post discusses the technical details behind the Neural Architecture Search project, including the machine learning algorithms and optimization techniques used.'
        },
        {
          id: '2',
          title: 'Building Scalable AI Systems: Lessons from Production',
          summary: 'Practical insights and lessons learned from deploying AI systems at scale, covering architecture decisions, monitoring strategies, and performance optimization.',
          publishDate: '2024-01-20',
          category: 'Engineering',
          tags: ['AI Systems', 'Scalability', 'Production', 'MLOps'],
          readTime: '12 min read',
          url: '/blog/2',
          relevance: 'medium',
          description: 'Shares the production deployment experience and challenges faced during the development of the NAS system.'
        },
        {
          id: '3',
          title: 'The Evolution of Neural Network Architectures',
          summary: 'A comprehensive overview of how neural network architectures have evolved from simple perceptrons to modern transformer models.',
          publishDate: '2024-01-15',
          category: 'Deep Learning',
          tags: ['Neural Networks', 'Architecture', 'Deep Learning', 'History'],
          readTime: '18 min read',
          url: '/blog/3',
          relevance: 'high',
          description: 'Provides theoretical background and historical context that influenced the design decisions in our Neural Architecture Search system.'
        }
      ],
      
      versions: {
        latest: '2.1.4',
        releases: [
          {
            version: '2.1.4',
            date: '2023-08-15',
            description: 'Bug fixes and performance improvements',
            downloadCount: 1250,
            assets: [
              { name: 'nas-v2.1.4.tar.gz', size: '15.2 MB', downloadUrl: '#' },
              { name: 'nas-v2.1.4-win.exe', size: '32.1 MB', downloadUrl: '#' }
            ]
          },
          {
            version: '2.1.0',
            date: '2023-07-20',
            description: 'Major feature update with new algorithms',
            downloadCount: 2100,
            assets: [
              { name: 'nas-v2.1.0.tar.gz', size: '14.8 MB', downloadUrl: '#' }
            ]
          }
        ]
      },
      
      status: {
        buildStatus: 'passing',
        coverage: 87,
        vulnerabilities: 0,
        lastUpdated: '2023-08-10',
        license: 'MIT',
        language: 'Python',
        size: '45.2 MB'
      },
      
      licenseInfo: {
        name: 'MIT License',
        spdxId: 'MIT',
        fullText: `MIT License

Copyright (c) 2023 Neural Architecture Search Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
        url: 'https://opensource.org/licenses/MIT',
        permissions: [
          'Commercial use',
          'Modification',
          'Distribution',
          'Private use'
        ],
        conditions: [
          'License and copyright notice'
        ],
        limitations: [
          'Liability',
          'Warranty'
        ],
        description: 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.'
      },
      
      quickStart: {
        installation: [
          'pip install neural-arch-search',
          'git clone https://github.com/example/nas.git',
          'cd nas && pip install -r requirements.txt',
          'python setup.py install'
        ],
        basicUsage: `from nas import ArchitectureSearch

# Initialize the search
searcher = ArchitectureSearch()

# Run search
best_arch = searcher.search(dataset='cifar10')`,
        requirements: ['Python 3.8+', 'PyTorch 1.9+', 'CUDA 11.0+ (optional)', '8GB RAM minimum']
      },
      
      api: {
        baseUrl: 'https://api.nas-system.com/v1',
        endpoints: [
          {
            method: 'POST',
            path: '/search',
            description: 'Start a new architecture search',
            parameters: [
              { name: 'dataset', type: 'string', required: true, description: 'Target dataset name' },
              { name: 'max_epochs', type: 'integer', required: false, description: 'Maximum training epochs' }
            ]
          },
          {
            method: 'GET',
            path: '/search/{id}/status',
            description: 'Get search status and progress'
          }
        ]
      },
      
      community: {
        contributors: 23,
        forks: 156,
        watchers: 89,
        issues: {
          open: 12,
          closed: 145,
          recent: [
            {
              id: 234,
              title: 'Memory leak in evolutionary search',
              author: 'dev_user123',
              created: '2023-08-14',
              labels: ['bug', 'priority-high'],
              status: 'open'
            },
            {
              id: 233,
              title: 'Add support for Vision Transformers',
              author: 'ai_researcher',
              created: '2023-08-12',
              labels: ['enhancement', 'feature-request'],
              status: 'open'
            }
          ]
        },
        discussions: [
          {
            id: 1,
            title: 'Best practices for hyperparameter tuning',
            author: 'ml_expert',
            replies: 15,
            created: '2023-08-10',
            category: 'Q&A'
          },
          {
            id: 2,
            title: 'Roadmap for v3.0',
            author: 'maintainer',
            replies: 32,
            created: '2023-08-05',
            category: 'General'
          }
        ]
      },
      
      dependencies: {
        production: [
          { name: 'torch', version: '^1.9.0', license: 'BSD-3-Clause' },
          { name: 'numpy', version: '^1.21.0', license: 'BSD-3-Clause' },
          { name: 'scikit-learn', version: '^1.0.0', license: 'BSD-3-Clause', vulnerabilities: 0 }
        ],
        development: [
          { name: 'pytest', version: '^6.2.0', license: 'MIT' },
          { name: 'black', version: '^21.0.0', license: 'MIT' },
          { name: 'flake8', version: '^3.9.0', license: 'MIT' }
        ]
      },
      
      performance: {
        benchmarks: [
          { name: 'Search Speed', value: 2.3, unit: 'hours/search', trend: 'down' },
          { name: 'Memory Usage', value: 4.2, unit: 'GB', trend: 'down' },
          { name: 'Accuracy Improvement', value: 3.8, unit: '%', trend: 'up' }
        ],
        analytics: {
          downloads: [
            { date: '2023-08-01', count: 45 },
            { date: '2023-08-02', count: 52 },
            { date: '2023-08-03', count: 38 }
          ],
          usage: [
            { feature: 'Evolutionary Search', percentage: 78 },
            { feature: 'Reinforcement Learning', percentage: 45 },
            { feature: 'Multi-objective Optimization', percentage: 32 }
          ]
        }
      },
      
      features: [
        'Evolutionary algorithm-based architecture search',
        'Reinforcement learning optimization',
        'Multi-objective optimization (accuracy vs efficiency)',
        'Real-time architecture visualization'
      ],
      timeline: {
        start: '2023-01',
        end: '2023-08',
        duration: '8 months'
      },
      teamSize: 3,
      myRole: 'Lead Developer & Research Engineer',
      metrics: {
        linesOfCode: 15420,
        commits: 234,
        stars: 567,
        downloads: 1250
      },
      github: 'https://github.com/example/nas',
      demo: 'https://nas-demo.example.com',
      planId: 'ZIYUN2024',
      year: 2024
    }
  },
  zh: {
    '1': {
      id: '1',
      title: '神经架构搜索',
      titleZh: '神经架构搜索',
      description: '使用进化算法和强化学习技术的自动化神经网络设计',
      fullDescription: '该项目实现了一个复杂的神经架构搜索(NAS)系统，能够自动发现特定任务的最优神经网络架构。通过结合进化算法和强化学习，系统可以探索庞大的可能架构空间，找到优于手工设计网络的架构。',
      fullDescriptionZh: '该项目实现了一个复杂的神经架构搜索(NAS)系统，能够自动发现特定任务的最优神经网络架构。通过结合进化算法和强化学习，系统可以探索庞大的可能架构空间，找到优于手工设计网络的架构。',
      image: '/api/placeholder/800/400',
      tags: ['Python', 'PyTorch', 'AutoML', 'Deep Learning'],
      
      relatedBlogs: [
        {
          id: '1',
          title: '利用大型语言模型进行代码重构：深度探讨',
          titleZh: '利用大型语言模型进行代码重构：深度探讨',
          summary: '探索大型语言模型在自动化代码重构中的革命性潜力，本文深入研究我们的最新研究发现和实际实现。',
          summaryZh: '探索大型语言模型在自动化代码重构中的革命性潜力，本文深入研究我们的最新研究发现和实际实现。',
          publishDate: '2024-01-25',
          category: '研究',
          tags: ['大语言模型', '代码重构', '人工智能', '软件工程'],
          readTime: '15分钟阅读',
          url: '/blog/1',
          relevance: 'high',
          description: '本博客文章讨论了神经架构搜索项目背后的技术细节，包括使用的机器学习算法和优化技术。',
          descriptionZh: '本博客文章讨论了神经架构搜索项目背后的技术细节，包括使用的机器学习算法和优化技术。'
        },
        {
          id: '2',
          title: '构建可扩展的AI系统：生产环境的经验教训',
          titleZh: '构建可扩展的AI系统：生产环境的经验教训',
          summary: '从大规模部署AI系统中获得的实用见解和经验教训，涵盖架构决策、监控策略和性能优化。',
          summaryZh: '从大规模部署AI系统中获得的实用见解和经验教训，涵盖架构决策、监控策略和性能优化。',
          publishDate: '2024-01-20',
          category: '工程',
          tags: ['AI系统', '可扩展性', '生产环境', 'MLOps'],
          readTime: '12分钟阅读',
          url: '/blog/2',
          relevance: 'medium',
          description: '分享NAS系统开发过程中的生产部署经验和面临的挑战。',
          descriptionZh: '分享NAS系统开发过程中的生产部署经验和面临的挑战。'
        },
        {
          id: '3',
          title: '神经网络架构的演进',
          titleZh: '神经网络架构的演进',
          summary: '神经网络架构如何从简单感知器演变为现代变换器模型的全面概述。',
          summaryZh: '神经网络架构如何从简单感知器演变为现代变换器模型的全面概述。',
          publishDate: '2024-01-15',
          category: '深度学习',
          tags: ['神经网络', '架构', '深度学习', '历史'],
          readTime: '18分钟阅读',
          url: '/blog/3',
          relevance: 'high',
          description: '提供了影响我们神经架构搜索系统设计决策的理论背景和历史背景。',
          descriptionZh: '提供了影响我们神经架构搜索系统设计决策的理论背景和历史背景。'
        }
      ],
      
      versions: {
        latest: '2.1.4',
        releases: [
          {
            version: '2.1.4',
            date: '2023-08-15',
            description: '错误修复和性能改进',
            downloadCount: 1250,
            assets: [
              { name: 'nas-v2.1.4.tar.gz', size: '15.2 MB', downloadUrl: '#' },
              { name: 'nas-v2.1.4-win.exe', size: '32.1 MB', downloadUrl: '#' }
            ]
          },
          {
            version: '2.1.0',
            date: '2023-07-20',
            description: '新算法的重大功能更新',
            downloadCount: 2100,
            assets: [
              { name: 'nas-v2.1.0.tar.gz', size: '14.8 MB', downloadUrl: '#' }
            ]
          }
        ]
      },
      
      status: {
        buildStatus: 'passing',
        coverage: 87,
        vulnerabilities: 0,
        lastUpdated: '2023-08-10',
        license: 'MIT',
        language: 'Python',
        size: '45.2 MB'
      },
      
      licenseInfo: {
        name: 'MIT License',
        spdxId: 'MIT',
        fullText: `MIT License

Copyright (c) 2023 Neural Architecture Search Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
        fullTextZh: `MIT许可证

版权所有 (c) 2023 神经架构搜索项目

特此免费授予任何获得本软件副本和相关文档文件（"软件"）的人不受限制地处理
软件的权利，包括但不限于使用、复制、修改、合并、发布、分发、再许可和/或销售
软件副本的权利，并允许向其提供软件的人员这样做，但须符合以下条件：

上述版权声明和本许可声明应包含在软件的所有副本或重要部分中。

软件按"原样"提供，不提供任何形式的明示或暗示保证，包括但不限于对适销性、
特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何
索赔、损害或其他责任负责，无论是在合同、侵权或其他方面的诉讼中，由软件或
软件的使用或其他交易引起、由此产生或与之相关。`,
        url: 'https://opensource.org/licenses/MIT',
        permissions: [
          'Commercial use',
          'Modification',
          'Distribution',
          'Private use'
        ],
        permissionsZh: [
          '商业使用',
          '修改',
          '分发',
          '私人使用'
        ],
        conditions: [
          'License and copyright notice'
        ],
        conditionsZh: [
          '许可证和版权声明'
        ],
        limitations: [
          'Liability',
          'Warranty'
        ],
        limitationsZh: [
          '责任',
          '保证'
        ],
        description: 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.',
        descriptionZh: '一个简短而简单的宽松许可证，条件只要求保留版权和许可证声明。许可的作品、修改和更大的作品可以在不同条款下分发，无需源代码。'
      },
      
      quickStart: {
        installation: [
          'pip install neural-arch-search',
          'git clone https://github.com/example/nas.git',
          'cd nas && pip install -r requirements.txt',
          'python setup.py install'
        ],
        installationZh: [
          'pip install neural-arch-search',
          'git clone https://github.com/example/nas.git',
          'cd nas && pip install -r requirements.txt',
          'python setup.py install'
        ],
        basicUsage: `from nas import ArchitectureSearch

# Initialize the search
searcher = ArchitectureSearch()

# Run search
best_arch = searcher.search(dataset='cifar10')`,
        basicUsageZh: `from nas import ArchitectureSearch

# 初始化搜索器
searcher = ArchitectureSearch()

# 运行搜索
best_arch = searcher.search(dataset='cifar10')`,
        requirements: ['Python 3.8+', 'PyTorch 1.9+', 'CUDA 11.0+ (optional)', '8GB RAM minimum'],
        requirementsZh: ['Python 3.8+', 'PyTorch 1.9+', 'CUDA 11.0+ (可选)', '最少8GB内存']
      },
      
      api: {
        baseUrl: 'https://api.nas-system.com/v1',
        endpoints: [
          {
            method: 'POST',
            path: '/search',
            description: '开始新的架构搜索',
            parameters: [
              { name: 'dataset', type: 'string', required: true, description: '目标数据集名称' },
              { name: 'max_epochs', type: 'integer', required: false, description: '最大训练轮数' }
            ]
          },
          {
            method: 'GET',
            path: '/search/{id}/status',
            description: '获取搜索状态和进度'
          }
        ]
      },
      
      community: {
        contributors: 23,
        forks: 156,
        watchers: 89,
        issues: {
          open: 12,
          closed: 145,
          recent: [
            {
              id: 234,
              title: '进化搜索中的内存泄漏',
              author: 'dev_user123',
              created: '2023-08-14',
              labels: ['bug', 'priority-high'],
              status: 'open'
            },
            {
              id: 233,
              title: '添加视觉变换器支持',
              author: 'ai_researcher',
              created: '2023-08-12',
              labels: ['enhancement', 'feature-request'],
              status: 'open'
            }
          ]
        },
        discussions: [
          {
            id: 1,
            title: '超参数调优的最佳实践',
            author: 'ml_expert',
            replies: 15,
            created: '2023-08-10',
            category: 'Q&A'
          },
          {
            id: 2,
            title: 'v3.0版本路线图',
            author: 'maintainer',
            replies: 32,
            created: '2023-08-05',
            category: 'General'
          }
        ]
      },
      
      dependencies: {
        production: [
          { name: 'torch', version: '^1.9.0', license: 'BSD-3-Clause' },
          { name: 'numpy', version: '^1.21.0', license: 'BSD-3-Clause' },
          { name: 'scikit-learn', version: '^1.0.0', license: 'BSD-3-Clause', vulnerabilities: 0 }
        ],
        development: [
          { name: 'pytest', version: '^6.2.0', license: 'MIT' },
          { name: 'black', version: '^21.0.0', license: 'MIT' },
          { name: 'flake8', version: '^3.9.0', license: 'MIT' }
        ]
      },
      
      performance: {
        benchmarks: [
          { name: '搜索速度', value: 2.3, unit: '小时/搜索', trend: 'down' },
          { name: '内存使用', value: 4.2, unit: 'GB', trend: 'down' },
          { name: '精度提升', value: 3.8, unit: '%', trend: 'up' }
        ],
        analytics: {
          downloads: [
            { date: '2023-08-01', count: 45 },
            { date: '2023-08-02', count: 52 },
            { date: '2023-08-03', count: 38 }
          ],
          usage: [
            { feature: '进化搜索', percentage: 78 },
            { feature: '强化学习', percentage: 45 },
            { feature: '多目标优化', percentage: 32 }
          ]
        }
      },
      
      features: [
        '基于进化算法的架构搜索',
        '强化学习优化',
        '多目标优化（准确性与效率）',
        '实时架构可视化'
      ],
      featuresZh: [
        '基于进化算法的架构搜索',
        '强化学习优化',
        '多目标优化（准确性与效率）',
        '实时架构可视化'
      ],
      timeline: {
        start: '2023-01',
        end: '2023-08',
        duration: '8个月'
      },
      teamSize: 3,
      myRole: '首席开发者和研究工程师',
      myRoleZh: '首席开发者和研究工程师',
      metrics: {
        linesOfCode: 15420,
        commits: 234,
        stars: 567,
        downloads: 1250
      },
      github: 'https://github.com/example/nas',
      demo: 'https://nas-demo.example.com',
      planId: 'ZIYUN2024',
      year: 2024
    }
  }
};

// API functions for project details
export const fetchProjectDetailById = async (id: string, language: Language = 'en'): Promise<ProjectDetail | null> => {
  await simulatedDelay();
  return projectDetails[language][id] || null;
};

export const searchProjectDetails = async (
  query: string,
  filters: {
    tags?: string[];
    year?: number;
    planId?: string;
  } = {},
  language: Language = 'en'
): Promise<ProjectDetail[]> => {
  await simulatedDelay();
  
  let projects = Object.values(projectDetails[language]);
  
  // Apply search query
  if (query) {
    const searchLower = query.toLowerCase();
    projects = projects.filter(project => 
      project.title.toLowerCase().includes(searchLower) ||
      (project.titleZh && project.titleZh.toLowerCase().includes(searchLower)) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.fullDescription.toLowerCase().includes(searchLower) ||
      (project.fullDescriptionZh && project.fullDescriptionZh.toLowerCase().includes(searchLower)) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  // Apply filters
  if (filters.tags && filters.tags.length > 0) {
    projects = projects.filter(project => 
      filters.tags!.some(tag => project.tags.includes(tag))
    );
  }
  
  if (filters.year) {
    projects = projects.filter(project => project.year === filters.year);
  }
  
  if (filters.planId) {
    projects = projects.filter(project => project.planId === filters.planId);
  }
  
  return projects;
};

export const getProjectTags = async (language: Language = 'en'): Promise<string[]> => {
  await simulatedDelay();
  const projects = Object.values(projectDetails[language]);
  const allTags = projects.flatMap(project => project.tags);
  return Array.from(new Set(allTags));
};

export const getProjectRelatedBlogs = async (projectId: string, language: Language = 'en'): Promise<ProjectBlogReference[]> => {
  await simulatedDelay();
  const project = projectDetails[language][projectId];
  return project?.relatedBlogs || [];
}; 