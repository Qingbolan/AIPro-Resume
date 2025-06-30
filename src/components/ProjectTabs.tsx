import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Download, 
  Users, 
  Play,
  Settings,
  Terminal,
  Bug,
  AlertTriangle,
  FileText,
  Clock,
  ExternalLink,
  Tag,
  Scale,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import CommunityFeedback from './CommunityFeedback';
import { Link } from 'react-router-dom';

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
      id: 'relatedblogs', 
      label: language === 'en' ? 'Related Blogs' : '相关博客', 
      icon: <FileText size={16} /> 
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
      id: 'license', 
      label: language === 'en' ? 'License' : '开源协议', 
      icon: <Scale size={16} /> 
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

  const renderRelatedBlogs = () => (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-theme-primary mb-2">
          {language === 'en' ? 'Related Blog Posts' : '相关博客文章'}
        </h3>
        <p className="text-theme-secondary">
          {language === 'en' 
            ? 'Explore blog posts and articles related to this project, including technical insights, development stories, and deep dives into the technologies used.'
            : '探索与此项目相关的博客文章，包括技术见解、开发故事和所使用技术的深入探讨。'
          }
        </p>
      </div>

      {projectData.relatedBlogs && projectData.relatedBlogs.length > 0 ? (
        <div className="grid gap-4">
          {projectData.relatedBlogs.map((blog: any, index: number) => (
            <motion.div
              key={index}
              className="p-6 border border-theme-border rounded-lg hover:shadow-md transition-all duration-300 hover:border-theme-primary/20"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      blog.relevance === 'high' ? 'bg-green-100 text-green-800' :
                      blog.relevance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {language === 'en' ? blog.relevance : 
                        blog.relevance === 'high' ? '高相关' :
                        blog.relevance === 'medium' ? '中等相关' : '低相关'
                      } {language === 'en' ? 'relevance' : ''}
                    </span>
                    <span className="text-xs text-theme-secondary">{blog.category}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-theme-primary mb-2">
                    {language === 'zh' && blog.titleZh ? blog.titleZh : blog.title}
                  </h4>
                  <p className="text-theme-secondary mb-3">
                    {language === 'zh' && blog.summaryZh ? blog.summaryZh : blog.summary}
                  </p>
                  {blog.description && (
                    <p className="text-sm text-theme-tertiary mb-3">
                      {language === 'zh' && blog.descriptionZh ? blog.descriptionZh : blog.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-theme-secondary">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                  </div>
                  <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                </div>
                
                <Link
                  to={blog.url}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                >
                  {language === 'en' ? 'Read Article' : '阅读文章'}
                  <ExternalLink size={14} />
                </Link>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-theme-border">
                  {blog.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-theme-surface text-theme-secondary rounded"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto mb-4 text-theme-secondary opacity-50" />
          <h4 className="text-lg font-medium text-theme-primary mb-2">
            {language === 'en' ? 'No Related Blogs Yet' : '暂无相关博客'}
          </h4>
          <p className="text-theme-secondary">
            {language === 'en' 
              ? 'Check back later for blog posts and articles related to this project.'
              : '稍后查看与此项目相关的博客文章。'
            }
          </p>
        </div>
      )}
    </div>
  );

  const renderLicense = () => (
    <div className="space-y-6">
      {projectData.licenseInfo ? (
        <>
          {/* License Header */}
          <div className="border border-theme-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Scale size={24} className="text-theme-primary" />
              <div>
                <h3 className="text-xl font-semibold text-theme-primary">
                  {projectData.licenseInfo.name}
                </h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-theme-secondary">
                    SPDX ID: {projectData.licenseInfo.spdxId}
                  </span>
                  <a
                    href={projectData.licenseInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {language === 'en' ? 'View on OSI' : '在OSI查看'}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
            
            <p className="text-theme-secondary">
              {language === 'zh' && projectData.licenseInfo.descriptionZh 
                ? projectData.licenseInfo.descriptionZh 
                : projectData.licenseInfo.description
              }
            </p>
          </div>

          {/* License Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Permissions */}
            <div className="border border-theme-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={20} className="text-green-600" />
                <h4 className="font-semibold text-theme-primary">
                  {language === 'en' ? 'Permissions' : '允许'}
                </h4>
              </div>
              <ul className="space-y-2">
                {(language === 'zh' && projectData.licenseInfo.permissionsZh 
                  ? projectData.licenseInfo.permissionsZh 
                  : projectData.licenseInfo.permissions
                ).map((permission: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-green-600" />
                    <span className="text-theme-secondary">{permission}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditions */}
            <div className="border border-theme-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={20} className="text-yellow-600" />
                <h4 className="font-semibold text-theme-primary">
                  {language === 'en' ? 'Conditions' : '条件'}
                </h4>
              </div>
              <ul className="space-y-2">
                {(language === 'zh' && projectData.licenseInfo.conditionsZh 
                  ? projectData.licenseInfo.conditionsZh 
                  : projectData.licenseInfo.conditions
                ).map((condition: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <AlertCircle size={14} className="text-yellow-600" />
                    <span className="text-theme-secondary">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations */}
            <div className="border border-theme-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <XCircle size={20} className="text-red-600" />
                <h4 className="font-semibold text-theme-primary">
                  {language === 'en' ? 'Limitations' : '限制'}
                </h4>
              </div>
              <ul className="space-y-2">
                {(language === 'zh' && projectData.licenseInfo.limitationsZh 
                  ? projectData.licenseInfo.limitationsZh 
                  : projectData.licenseInfo.limitations
                ).map((limitation: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <XCircle size={14} className="text-red-600" />
                    <span className="text-theme-secondary">{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Full License Text */}
          <div className="border border-theme-border rounded-lg">
            <div className="p-4 border-b border-theme-border">
              <h4 className="font-semibold text-theme-primary">
                {language === 'en' ? 'Full License Text' : '完整协议文本'}
              </h4>
            </div>
            <div className="p-4">
              <pre className="whitespace-pre-wrap text-sm text-theme-secondary font-mono bg-theme-surface p-4 rounded overflow-x-auto">
                {language === 'zh' && projectData.licenseInfo.fullTextZh 
                  ? projectData.licenseInfo.fullTextZh 
                  : projectData.licenseInfo.fullText
                }
              </pre>
            </div>
          </div>

          {/* License Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(
                language === 'zh' && projectData.licenseInfo.fullTextZh 
                  ? projectData.licenseInfo.fullTextZh 
                  : projectData.licenseInfo.fullText
              )}
              className="px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary/90 transition-colors"
            >
              {language === 'en' ? 'Copy License Text' : '复制协议文本'}
            </button>
            <a
              href={projectData.licenseInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-theme-border text-theme-primary rounded-lg hover:bg-theme-surface transition-colors"
            >
              {language === 'en' ? 'Learn More' : '了解更多'}
            </a>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Scale size={48} className="mx-auto mb-4 text-theme-secondary opacity-50" />
          <h4 className="text-lg font-medium text-theme-primary mb-2">
            {language === 'en' ? 'No License Information' : '无协议信息'}
          </h4>
          <p className="text-theme-secondary">
            {language === 'en' 
              ? 'License information is not available for this project.'
              : '此项目的协议信息不可用。'
            }
          </p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'readme': return renderReadme();
      case 'relatedblogs': return renderRelatedBlogs();
      case 'quickstart': return renderQuickStart();
      case 'releases': return renderReleases();
      case 'community': return renderCommunity();
      case 'issues': return renderIssues();
      case 'dependencies': return renderDependencies();
      case 'license': return renderLicense();
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