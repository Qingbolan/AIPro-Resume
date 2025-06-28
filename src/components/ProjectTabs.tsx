import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Download, 
  Users, 
  Play,
  Settings,
  BarChart3,
  Code2,
  Terminal,
  Bug,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import CommunityFeedback from './CommunityFeedback';

interface ProjectTabsProps {
  projectData: any; // 简化处理，实际使用时会有完整类型
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ projectData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('readme');

  const tabs = [
    { 
      id: 'readme', 
      label: language === 'en' ? 'README' : '说明文档', 
      icon: <BookOpen size={16} /> 
    },
    { 
      id: 'releases', 
      label: language === 'en' ? 'Releases' : '版本发布', 
      icon: <Download size={16} /> 
    },
    { 
      id: 'quickstart', 
      label: language === 'en' ? 'Quick Start' : '快速开始', 
      icon: <Play size={16} /> 
    },
    { 
      id: 'api', 
      label: language === 'en' ? 'API Docs' : 'API文档', 
      icon: <Code2 size={16} /> 
    },
    { 
      id: 'community', 
      label: language === 'en' ? 'Community' : '社区', 
      icon: <Users size={16} /> 
    },
    { 
      id: 'issues', 
      label: language === 'en' ? 'Issues' : '问题反馈', 
      icon: <Bug size={16} /> 
    },
    { 
      id: 'dependencies', 
      label: language === 'en' ? 'Dependencies' : '依赖管理', 
      icon: <Settings size={16} /> 
    },
    { 
      id: 'analytics', 
      label: language === 'en' ? 'Analytics' : '数据分析', 
      icon: <BarChart3 size={16} /> 
    }
  ];

  const renderReadme = () => (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-4 text-theme-primary">
        {projectData.title}
      </h2>
      <div className="flex items-center gap-4 mb-6">
        <span className={`px-2 py-1 rounded text-sm font-medium ${
          projectData.status?.buildStatus === 'passing' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          Build: {projectData.status?.buildStatus || 'Unknown'}
        </span>
        <span className="px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
          Coverage: {projectData.status?.coverage || 0}%
        </span>
        <span className="px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800">
          {projectData.status?.license || 'License'}
        </span>
      </div>
      
      <p className="text-lg mb-6 text-theme-secondary">
        {language === 'en' ? projectData.fullDescription : projectData.fullDescriptionZh}
      </p>
      
      <h3 className="text-lg font-semibold mb-3 text-theme-primary">
        {language === 'en' ? 'Key Features' : '主要特性'}
      </h3>
      <ul className="space-y-2 mb-6">
        {(language === 'en' ? projectData.features : projectData.featuresZh)?.map((feature: string, index: number) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-theme-secondary">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderQuickStart = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary flex items-center gap-2">
          <Terminal size={20} />
          {language === 'en' ? 'Installation' : '安装'}
        </h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            {projectData.quickStart?.installation?.join('\n') || 'npm install project-name'}
          </pre>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary">
          {language === 'en' ? 'Basic Usage' : '基本用法'}
        </h3>
        <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            {projectData.quickStart?.basicUsage || 'import project;\nproject.run();'}
          </pre>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary">
          {language === 'en' ? 'Requirements' : '系统要求'}
        </h3>
        <ul className="space-y-2">
          {projectData.quickStart?.requirements?.map((req: string, index: number) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-theme-secondary">{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderReleases = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-theme-primary">
          {language === 'en' ? 'Latest Release' : '最新版本'}: v{projectData.versions?.latest || '1.0.0'}
        </h3>
      </div>
      
      {projectData.versions?.releases?.map((release: any, index: number) => (
        <div key={index} className="border border-theme-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-theme-primary">v{release.version}</h4>
            <span className="text-sm text-theme-secondary">{release.date}</span>
          </div>
          <p className="text-theme-secondary mb-3">{release.description}</p>
          <div className="flex items-center gap-4 text-sm text-theme-secondary">
            <span>↓ {release.downloadCount} downloads</span>
            {release.assets?.map((asset: any, assetIndex: number) => (
              <button 
                key={assetIndex}
                className="text-blue-600 hover:underline"
              >
                {asset.name} ({asset.size})
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCommunity = () => (
    <CommunityFeedback projectId={projectData.id || 'default-project'} />
  );

  const renderIssues = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          {projectData.community?.issues?.open || 0} Open
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
          {projectData.community?.issues?.closed || 0} Closed
        </span>
      </div>
      
      <div className="space-y-3">
        {projectData.community?.issues?.recent?.map((issue: any, index: number) => (
          <div key={index} className="p-4 border border-theme-border rounded-lg hover:bg-theme-surface transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-theme-primary mb-1">{issue.title}</h4>
                <div className="flex items-center gap-2 text-sm text-theme-secondary">
                  <span>#{issue.id}</span>
                  <span>by {issue.author}</span>
                  <span>{issue.created}</span>
                </div>
              </div>
              <div className="flex gap-1">
                {issue.labels?.map((label: string, labelIndex: number) => (
                  <span key={labelIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDependencies = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary">
          {language === 'en' ? 'Production Dependencies' : '生产依赖'}
        </h3>
        <div className="space-y-2">
          {projectData.dependencies?.production?.map((dep: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 border border-theme-border rounded">
              <span className="font-medium">{dep.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-theme-secondary">{dep.version}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">{dep.license}</span>
                {dep.vulnerabilities > 0 && (
                  <AlertTriangle size={16} className="text-yellow-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary">
          {language === 'en' ? 'Development Dependencies' : '开发依赖'}
        </h3>
        <div className="space-y-2">
          {projectData.dependencies?.development?.map((dep: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 border border-theme-border rounded">
              <span className="font-medium">{dep.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-theme-secondary">{dep.version}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">{dep.license}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary">
          {language === 'en' ? 'Base URL' : '基础URL'}
        </h3>
        <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
          {projectData.api?.baseUrl || 'https://api.example.com'}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary">
          {language === 'en' ? 'Endpoints' : 'API端点'}
        </h3>
        <div className="space-y-4">
          {projectData.api?.endpoints?.map((endpoint: any, index: number) => (
            <div key={index} className="border border-theme-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                  endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                  endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {endpoint.method}
                </span>
                <code className="font-mono">{endpoint.path}</code>
              </div>
              <p className="text-theme-secondary mb-3">{endpoint.description}</p>
              {endpoint.parameters && (
                <div>
                  <h5 className="font-medium mb-2">Parameters:</h5>
                  <div className="space-y-1">
                    {endpoint.parameters.map((param: any, paramIndex: number) => (
                      <div key={paramIndex} className="text-sm">
                        <code className="bg-gray-100 px-1 rounded">{param.name}</code>
                        <span className="text-theme-secondary"> ({param.type})</span>
                        {param.required && <span className="text-red-500"> *</span>}
                        <span className="text-theme-secondary"> - {param.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary">
          {language === 'en' ? 'Performance Benchmarks' : '性能基准'}
        </h3>
        <div className="space-y-3">
          {projectData.performance?.benchmarks?.map((benchmark: any, index: number) => (
            <div key={index} className="p-3 border border-theme-border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{benchmark.name}</span>
                <div className="flex items-center gap-2">
                  <span>{benchmark.value} {benchmark.unit}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    benchmark.trend === 'up' ? 'bg-green-500' :
                    benchmark.trend === 'down' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-theme-primary">
          {language === 'en' ? 'Feature Usage' : '功能使用率'}
        </h3>
        <div className="space-y-2">
          {projectData.performance?.analytics?.usage?.map((usage: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-0 flex-1">{usage.feature}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${usage.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-theme-secondary">{usage.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'readme': return renderReadme();
      case 'quickstart': return renderQuickStart();
      case 'releases': return renderReleases();
      case 'community': return renderCommunity();
      case 'issues': return renderIssues();
      case 'dependencies': return renderDependencies();
      case 'api': return renderAPI();
      case 'analytics': return renderAnalytics();
      default: return renderReadme();
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-theme-border mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-theme-primary text-theme-primary'
                  : 'border-transparent text-theme-secondary hover:text-theme-primary hover:border-theme-secondary'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[400px]"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default ProjectTabs; 