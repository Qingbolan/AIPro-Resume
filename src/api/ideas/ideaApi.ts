import type { IdeaData } from '../../types';

// Simulate API delay
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Mock ideas data with multi-language support
const mockIdeasData: Record<'en' | 'zh', IdeaData[]> = {
  en: [
    {
      id: '1',
      title: 'AI-Powered Code Refactoring Tool',
      description: 'A tool that uses machine learning to automatically suggest code improvements',
      category: 'Development Tools',
      tags: ['AI', 'Code Quality', 'Automation'],
      status: 'experimenting',
      createdAt: '2024-01-15',
      abstract: 'This project aims to develop an intelligent code refactoring tool that leverages machine learning algorithms to analyze code patterns and suggest improvements automatically.',
      motivation: 'Code quality is crucial for software maintainability, but manual refactoring is time-consuming and error-prone.',
      techStack: ['Python', 'TensorFlow', 'AST Parsing', 'VS Code Extension'],
      difficulty: 'advanced',
      researchField: 'Software Engineering',
      keywords: ['Code Analysis', 'Machine Learning', 'Refactoring', 'Static Analysis'],
      estimatedDuration: '6-8 months',
      openForCollaboration: true,
      fundingStatus: 'seeking'
    },
    {
      id: '2',
      title: 'Quantum Machine Learning Framework',
      description: 'Framework combining quantum computing with traditional ML algorithms',
      category: 'Research',
      tags: ['Quantum Computing', 'Machine Learning'],
      status: 'validating',
      createdAt: '2024-01-10',
      abstract: 'A comprehensive framework that integrates quantum computing principles with classical machine learning to achieve quantum advantage in specific problem domains.',
      motivation: 'Quantum computing promises exponential speedups for certain computational problems, particularly in machine learning.',
      techStack: ['Qiskit', 'Python', 'NumPy', 'Cirq'],
      difficulty: 'expert',
      researchField: 'Quantum Computing',
      keywords: ['Quantum Algorithms', 'QAOA', 'VQE', 'Quantum Neural Networks'],
      estimatedDuration: '12-18 months',
      openForCollaboration: true,
      fundingStatus: 'funded'
    },
    {
      id: '3',
      title: 'Decentralized Knowledge Base',
      description: 'A blockchain-based platform for sharing and verifying technical knowledge',
      category: 'Blockchain',
      tags: ['Blockchain', 'Knowledge Sharing', 'Decentralization'],
      status: 'hypothesis',
      createdAt: '2024-01-05',
      abstract: 'A decentralized platform that uses blockchain technology to create a tamper-proof knowledge repository with incentive mechanisms for contributors.',
      motivation: 'Traditional knowledge bases are centralized and vulnerable to censorship, misinformation, and single points of failure.',
      techStack: ['Ethereum', 'Solidity', 'IPFS', 'React', 'Web3.js'],
      difficulty: 'intermediate',
      researchField: 'Distributed Systems',
      keywords: ['Blockchain', 'Decentralization', 'Knowledge Management', 'Consensus'],
      estimatedDuration: '8-12 months',
      openForCollaboration: true,
      fundingStatus: 'unfunded'
    },
    {
      id: '4',
      title: 'Real-time Collaborative IDE',
      description: 'An IDE that allows multiple developers to code together in real-time with AI assistance',
      category: 'Development Tools',
      tags: ['Collaboration', 'IDE', 'Real-time', 'AI'],
      status: 'published',
      createdAt: '2023-12-20',
      abstract: 'A cloud-based integrated development environment that enables real-time collaboration between multiple developers with AI-powered code suggestions.',
      motivation: 'Remote development teams need better tools for collaborative coding that go beyond simple screen sharing.',
      techStack: ['TypeScript', 'WebSocket', 'Monaco Editor', 'Node.js', 'Docker'],
      difficulty: 'advanced',
      researchField: 'Human-Computer Interaction',
      keywords: ['Real-time Collaboration', 'Code Editor', 'AI Assistance', 'WebRTC'],
      estimatedDuration: '10-14 months',
      openForCollaboration: false,
      fundingStatus: 'funded',
      demoUrl: 'https://demo.collaborative-ide.com',
      codeRepository: 'https://github.com/example/collaborative-ide'
    },
    {
      id: '5',
      title: 'Neural Network Visualization Engine',
      description: 'A 3D visualization tool for understanding and debugging neural network architectures',
      category: 'Visualization',
      tags: ['Neural Networks', '3D Visualization', 'Debugging'],
      status: 'experimenting',
      createdAt: '2023-12-15',
      abstract: 'An interactive 3D visualization tool that helps researchers and developers understand neural network architectures and debug training processes.',
      motivation: 'Neural networks are often treated as black boxes, making it difficult to understand their internal workings and debug issues.',
      techStack: ['Three.js', 'Python', 'TensorFlow', 'React', 'WebGL'],
      difficulty: 'intermediate',
      researchField: 'Machine Learning',
      keywords: ['Neural Networks', 'Visualization', 'Deep Learning', 'Interpretability'],
      estimatedDuration: '4-6 months',
      openForCollaboration: true,
      fundingStatus: 'seeking'
    }
  ],
  zh: [
    {
      id: '1',
      title: 'AI驱动的代码重构工具',
      description: '一个使用机器学习自动建议代码改进的工具',
      category: '开发工具',
      tags: ['AI', '代码质量', '自动化'],
      status: 'experimenting',
      createdAt: '2024-01-15',
      abstract: '本项目旨在开发一个智能代码重构工具，利用机器学习算法分析代码模式并自动建议改进。',
      abstractZh: '本项目旨在开发一个智能代码重构工具，利用机器学习算法分析代码模式并自动建议改进。',
      motivation: '代码质量对软件可维护性至关重要，但手动重构既耗时又容易出错。',
      motivationZh: '代码质量对软件可维护性至关重要，但手动重构既耗时又容易出错。',
      techStack: ['Python', 'TensorFlow', 'AST解析', 'VS Code扩展'],
      difficulty: 'advanced',
      researchField: '软件工程',
      keywords: ['代码分析', '机器学习', '重构', '静态分析'],
      estimatedDuration: '6-8个月',
      openForCollaboration: true,
      fundingStatus: 'seeking'
    },
    {
      id: '2',
      title: '量子机器学习框架',
      description: '结合量子计算与传统机器学习算法的框架',
      category: '研究',
      tags: ['量子计算', '机器学习'],
      status: 'validating',
      createdAt: '2024-01-10',
      abstract: '一个综合框架，将量子计算原理与经典机器学习相结合，在特定问题领域实现量子优势。',
      abstractZh: '一个综合框架，将量子计算原理与经典机器学习相结合，在特定问题领域实现量子优势。',
      motivation: '量子计算在某些计算问题上承诺指数级加速，特别是在机器学习领域。',
      motivationZh: '量子计算在某些计算问题上承诺指数级加速，特别是在机器学习领域。',
      techStack: ['Qiskit', 'Python', 'NumPy', 'Cirq'],
      difficulty: 'expert',
      researchField: '量子计算',
      keywords: ['量子算法', 'QAOA', 'VQE', '量子神经网络'],
      estimatedDuration: '12-18个月',
      openForCollaboration: true,
      fundingStatus: 'funded'
    },
    {
      id: '3',
      title: '去中心化知识库',
      description: '基于区块链的技术知识共享和验证平台',
      category: '区块链',
      tags: ['区块链', '知识共享', '去中心化'],
      status: 'hypothesis',
      createdAt: '2024-01-05',
      abstract: '一个使用区块链技术的去中心化平台，创建防篡改的知识库，并为贡献者提供激励机制。',
      abstractZh: '一个使用区块链技术的去中心化平台，创建防篡改的知识库，并为贡献者提供激励机制。',
      motivation: '传统知识库是中心化的，容易受到审查、错误信息和单点故障的影响。',
      motivationZh: '传统知识库是中心化的，容易受到审查、错误信息和单点故障的影响。',
      techStack: ['以太坊', 'Solidity', 'IPFS', 'React', 'Web3.js'],
      difficulty: 'intermediate',
      researchField: '分布式系统',
      keywords: ['区块链', '去中心化', '知识管理', '共识'],
      estimatedDuration: '8-12个月',
      openForCollaboration: true,
      fundingStatus: 'unfunded'
    },
    {
      id: '4',
      title: '实时协作IDE',
      description: '允许多个开发者实时协作编程并提供AI辅助的IDE',
      category: '开发工具',
      tags: ['协作', 'IDE', '实时', 'AI'],
      status: 'published',
      createdAt: '2023-12-20',
      abstract: '一个基于云的集成开发环境，支持多个开发者之间的实时协作，并提供AI驱动的代码建议。',
      abstractZh: '一个基于云的集成开发环境，支持多个开发者之间的实时协作，并提供AI驱动的代码建议。',
      motivation: '远程开发团队需要更好的协作编程工具，而不仅仅是简单的屏幕共享。',
      motivationZh: '远程开发团队需要更好的协作编程工具，而不仅仅是简单的屏幕共享。',
      techStack: ['TypeScript', 'WebSocket', 'Monaco编辑器', 'Node.js', 'Docker'],
      difficulty: 'advanced',
      researchField: '人机交互',
      keywords: ['实时协作', '代码编辑器', 'AI辅助', 'WebRTC'],
      estimatedDuration: '10-14个月',
      openForCollaboration: false,
      fundingStatus: 'funded',
      demoUrl: 'https://demo.collaborative-ide.com',
      codeRepository: 'https://github.com/example/collaborative-ide'
    },
    {
      id: '5',
      title: '神经网络可视化引擎',
      description: '用于理解和调试神经网络架构的3D可视化工具',
      category: '可视化',
      tags: ['神经网络', '3D可视化', '调试'],
      status: 'experimenting',
      createdAt: '2023-12-15',
      abstract: '一个交互式3D可视化工具，帮助研究人员和开发者理解神经网络架构并调试训练过程。',
      abstractZh: '一个交互式3D可视化工具，帮助研究人员和开发者理解神经网络架构并调试训练过程。',
      motivation: '神经网络通常被视为黑盒子，难以理解其内部工作原理和调试问题。',
      motivationZh: '神经网络通常被视为黑盒子，难以理解其内部工作原理和调试问题。',
      techStack: ['Three.js', 'Python', 'TensorFlow', 'React', 'WebGL'],
      difficulty: 'intermediate',
      researchField: '机器学习',
      keywords: ['神经网络', '可视化', '深度学习', '可解释性'],
      estimatedDuration: '4-6个月',
      openForCollaboration: true,
      fundingStatus: 'seeking'
    }
  ]
};

// API functions
export const fetchIdeas = async (language: 'en' | 'zh' = 'en'): Promise<IdeaData[]> => {
  try {
    // Simulate API delay
    await delay(1000);
    
    return mockIdeasData[language];
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw new Error(language === 'en' ? 'Failed to load ideas' : '加载想法失败');
  }
};

export const fetchIdeaById = async (id: string, language: 'en' | 'zh' = 'en'): Promise<IdeaData | null> => {
  try {
    // Simulate API delay
    await delay(500);
    
    const ideas = mockIdeasData[language];
    const idea = ideas.find(idea => idea.id === id);
    
    return idea || null;
  } catch (error) {
    console.error('Error fetching idea by ID:', error);
    throw new Error(language === 'en' ? 'Failed to load idea' : '加载想法失败');
  }
};

export const createIdea = async (ideaData: Omit<IdeaData, 'id'>, language: 'en' | 'zh' = 'en'): Promise<IdeaData> => {
  try {
    // Simulate API delay
    await delay(800);
    
    const newIdea: IdeaData = {
      ...ideaData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    mockIdeasData[language].push(newIdea);
    
    return newIdea;
  } catch (error) {
    console.error('Error creating idea:', error);
    throw new Error(language === 'en' ? 'Failed to create idea' : '创建想法失败');
  }
};

export const updateIdea = async (id: string, updates: Partial<IdeaData>, language: 'en' | 'zh' = 'en'): Promise<IdeaData> => {
  try {
    // Simulate API delay
    await delay(600);
    
    const ideas = mockIdeasData[language];
    const ideaIndex = ideas.findIndex(idea => idea.id === id);
    
    if (ideaIndex === -1) {
      throw new Error(language === 'en' ? 'Idea not found' : '想法未找到');
    }
    
    const updatedIdea = {
      ...ideas[ideaIndex],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    ideas[ideaIndex] = updatedIdea;
    
    return updatedIdea;
  } catch (error) {
    console.error('Error updating idea:', error);
    throw new Error(language === 'en' ? 'Failed to update idea' : '更新想法失败');
  }
};

export const deleteIdea = async (id: string, language: 'en' | 'zh' = 'en'): Promise<boolean> => {
  try {
    // Simulate API delay
    await delay(400);
    
    const ideas = mockIdeasData[language];
    const ideaIndex = ideas.findIndex(idea => idea.id === id);
    
    if (ideaIndex === -1) {
      throw new Error(language === 'en' ? 'Idea not found' : '想法未找到');
    }
    
    ideas.splice(ideaIndex, 1);
    
    return true;
  } catch (error) {
    console.error('Error deleting idea:', error);
    throw new Error(language === 'en' ? 'Failed to delete idea' : '删除想法失败');
  }
};

// Filter and search functions
export const searchIdeas = async (
  query: string, 
  filters: {
    category?: string;
    status?: string;
    tags?: string[];
  } = {},
  language: 'en' | 'zh' = 'en'
): Promise<IdeaData[]> => {
  try {
    // Simulate API delay
    await delay(300);
    
    let ideas = mockIdeasData[language];
    
    // Apply search query
    if (query) {
      const searchLower = query.toLowerCase();
      ideas = ideas.filter(idea => 
        idea.title.toLowerCase().includes(searchLower) ||
        idea.description.toLowerCase().includes(searchLower) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (idea.abstract && idea.abstract.toLowerCase().includes(searchLower)) ||
        (idea.abstractZh && idea.abstractZh.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply category filter
    if (filters.category && filters.category !== 'All' && filters.category !== '全部') {
      ideas = ideas.filter(idea => idea.category === filters.category);
    }
    
    // Apply status filter
    if (filters.status && filters.status !== 'All' && filters.status !== '全部') {
      // Map Chinese status labels back to English status values
      let statusToMatch = filters.status;
      if (language === 'zh') {
        const statusMap: Record<string, string> = {
          '草案': 'draft',
          '假设': 'hypothesis',
          '实验中': 'experimenting',
          '验证中': 'validating',
          '已发表': 'published',
          '已结论': 'concluded'
        };
        statusToMatch = statusMap[filters.status] || filters.status;
      }
      ideas = ideas.filter(idea => idea.status === statusToMatch);
    }
    
    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      ideas = ideas.filter(idea => 
        filters.tags!.some(tag => idea.tags.includes(tag))
      );
    }
    
    return ideas;
  } catch (error) {
    console.error('Error searching ideas:', error);
    throw new Error(language === 'en' ? 'Failed to search ideas' : '搜索想法失败');
  }
};

// Get unique categories and tags for filtering
export const getIdeaCategories = async (language: 'en' | 'zh' = 'en'): Promise<string[]> => {
  try {
    const ideas = mockIdeasData[language];
    const categories = Array.from(new Set(ideas.map(idea => idea.category)));
    return [language === 'en' ? 'All' : '全部', ...categories];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [language === 'en' ? 'All' : '全部'];
  }
};

export const getIdeaTags = async (language: 'en' | 'zh' = 'en'): Promise<string[]> => {
  try {
    const ideas = mockIdeasData[language];
    const allTags = ideas.flatMap(idea => idea.tags);
    return Array.from(new Set(allTags));
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}; 