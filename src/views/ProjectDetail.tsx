import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Star, 
  GitFork, 
  Download,
  Shield,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import { getPlanDisplay } from '../utils/iconMap';
import { fetchPlanById } from '../api/planApi';
import ProjectTabs from '../components/ProjectTabs';

// 简化的mock数据结构，专注于实用功能
const mockProjectDetails: { [key: string]: any } = {
  '1': {
    id: '1',
    title: 'Neural Architecture Search',
    description: 'Automated neural network design using evolutionary algorithms and reinforcement learning techniques',
    fullDescription: 'This project implements a sophisticated Neural Architecture Search (NAS) system that automatically discovers optimal neural network architectures for specific tasks. Using a combination of evolutionary algorithms and reinforcement learning, the system can explore the vast space of possible architectures and find designs that outperform manually crafted networks.',
    fullDescriptionZh: '该项目实现了一个复杂的神经架构搜索(NAS)系统，能够自动发现特定任务的最优神经网络架构。通过结合进化算法和强化学习，系统可以探索庞大的可能架构空间，找到优于手工设计网络的架构。',
    image: '/api/placeholder/800/400',
    tags: ['Python', 'PyTorch', 'AutoML', 'Deep Learning'],
    
    // 版本管理
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
    
    // 项目状态
    status: {
      buildStatus: 'passing',
      coverage: 87,
      vulnerabilities: 0,
      lastUpdated: '2023-08-10',
      license: 'MIT',
      language: 'Python',
      size: '45.2 MB'
    },
    
    // 快速开始
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
    
    // API文档
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
    
    // 社区数据
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
    
    // 依赖信息
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
    
    // 性能指标
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
    
    // 基础信息
    features: [
      'Evolutionary algorithm-based architecture search',
      'Reinforcement learning optimization',
      'Multi-objective optimization (accuracy vs efficiency)',
      'Real-time architecture visualization'
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
      duration: '8 months'
    },
    teamSize: 3,
    myRole: 'Lead Developer & Research Engineer',
    myRoleZh: '首席开发者和研究工程师',
    metrics: {
      linesOfCode: 15420,
      commits: 234,
      stars: 567,
      downloads: 1250
    },
    github: 'https://github.com/example/nas',
    demo: 'https://nas-demo.example.com',
    planId: 'undergraduate',
    year: 2023
  }
  // 可以添加更多项目...
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [plan, setPlan] = useState<any>(null);
  
  const project = id ? mockProjectDetails[id] : null;
  
  // Fetch plan data
  useEffect(() => {
    const loadPlan = async () => {
      if (project?.planId) {
        try {
          const planData = await fetchPlanById(project.planId, language);
          setPlan(planData);
        } catch (error) {
          console.error('Failed to load plan:', error);
        }
      }
    };
    
    loadPlan();
  }, [project?.planId, language]);
  
  if (!id || !mockProjectDetails[id]) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-theme-primary mb-4">
            {language === 'en' ? 'Project Not Found' : '项目未找到'}
          </h1>
          <Link 
            to="/projects"
            className="text-blue-600 hover:underline"
          >
            {language === 'en' ? 'Back to Projects' : '返回项目列表'}
          </Link>
        </div>
      </div>
    );
  }

  const planDisplay = plan ? getPlanDisplay(plan) : null;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-theme-secondary">
            <Link 
              to="/projects" 
              className="flex items-center gap-1 hover:text-theme-primary transition-colors"
            >
              <ArrowLeft size={16} />
              {language === 'en' ? 'Projects' : '项目'}
            </Link>
            <span>/</span>
            <span className="text-theme-primary">{project.title}</span>
          </div>

          {/* Project Header */}
          <div className="bg-theme-surface rounded-xl p-6 shadow-sm border border-theme-border">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                {/* Plan Badge */}
                {plan && planDisplay && (
                  <div className="flex items-center gap-2 mb-3">
                    {planDisplay}
                    <span className="text-sm font-medium text-theme-secondary">
                      {language === 'en' ? plan.name : plan.nameZh}
                    </span>
                  </div>
                )}

                {/* Title and Description */}
                <h1 className="text-3xl font-bold text-theme-primary mb-3">
                  {project.title}
                </h1>
                <p className="text-lg text-theme-secondary mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-theme-secondary">
                  <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>{project.metrics?.stars || 0} stars</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={16} />
                    <span>{project.community?.forks || 0} forks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download size={16} />
                    <span>{project.metrics?.downloads || 0} downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield size={16} />
                    <span>{project.status?.license || 'MIT'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{language === 'en' ? 'Updated' : '更新于'} {project.status?.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 lg:min-w-[200px]">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    {language === 'en' ? 'Live Demo' : '在线演示'}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-theme-border text-theme-primary px-4 py-2 rounded-lg hover:bg-theme-surface transition-colors"
                  >
                    <Github size={16} />
                    {language === 'en' ? 'Source Code' : '源代码'}
                  </a>
                )}
                <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Download size={16} />
                  {language === 'en' ? 'Download' : '下载'} v{project.versions?.latest || '1.0.0'}
                </button>
              </div>
            </div>

            {/* Project Image */}
            {project.image && (
              <div className="mt-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64  project-image-placeholder rounded-lg"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Tabs Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectTabs projectData={project} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail; 