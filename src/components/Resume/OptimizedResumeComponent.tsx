import React, { useState, useEffect } from 'react';
import { 
  fetchPersonalInfo, 
  fetchEducation, 
  fetchWorkExperience,
  fetchRecentUpdates 
} from '../../api/home/resumeApi';
import type { PersonalInfo, EducationItem, ExperienceItem, RecentUpdate, Language } from '../../types/api';

interface OptimizedResumeProps {
  language: Language;
}

/**
 * 示例组件：展示如何使用细粒度API优化性能
 * 而不是总是获取完整的resumeData
 */
export const OptimizedResumeComponent: React.FC<OptimizedResumeProps> = ({ language }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [recentUpdates, setRecentUpdates] = useState<RecentUpdate[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({
    personalInfo: false,
    education: false,
    experience: false,
    recentUpdates: false
  });

  // 按需加载数据，而不是一次性获取所有数据
  const loadPersonalInfo = async () => {
    setLoading(prev => ({ ...prev, personalInfo: true }));
    try {
      const data = await fetchPersonalInfo(language);
      setPersonalInfo(data);
    } catch (error) {
      console.error('Failed to load personal info:', error);
    } finally {
      setLoading(prev => ({ ...prev, personalInfo: false }));
    }
  };

  const loadEducation = async () => {
    setLoading(prev => ({ ...prev, education: true }));
    try {
      const data = await fetchEducation(language);
      setEducation(data);
    } catch (error) {
      console.error('Failed to load education:', error);
    } finally {
      setLoading(prev => ({ ...prev, education: false }));
    }
  };

  const loadExperience = async () => {
    setLoading(prev => ({ ...prev, experience: true }));
    try {
      const data = await fetchWorkExperience(language);
      setExperience(data);
    } catch (error) {
      console.error('Failed to load experience:', error);
    } finally {
      setLoading(prev => ({ ...prev, experience: false }));
    }
  };

  const loadRecentUpdates = async () => {
    setLoading(prev => ({ ...prev, recentUpdates: true }));
    try {
      const data = await fetchRecentUpdates(language);
      setRecentUpdates(data);
    } catch (error) {
      console.error('Failed to load recent updates:', error);
    } finally {
      setLoading(prev => ({ ...prev, recentUpdates: false }));
    }
  };

  // 初始化时只加载个人信息，其他数据按需加载
  useEffect(() => {
    loadPersonalInfo();
  }, [language]);

  return (
    <div className="optimized-resume space-y-6">
      {/* 个人信息 - 立即加载 */}
      <section className="personal-info">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        {loading.personalInfo ? (
          <div>Loading...</div>
        ) : personalInfo ? (
          <div>
            <h3 className="text-xl">{personalInfo.name}</h3>
            <p className="text-lg text-gray-600">{personalInfo.title}</p>
            <p className="text-sm text-gray-500">{personalInfo.current}</p>
          </div>
        ) : null}
      </section>

      {/* 教育背景 - 点击按需加载 */}
      <section className="education">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Education</h2>
          {education.length === 0 && (
            <button 
              onClick={loadEducation}
              disabled={loading.education}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading.education ? 'Loading...' : 'Load Education'}
            </button>
          )}
        </div>
        {education.map((edu, index) => (
          <div key={index} className="education-item mb-4 p-4 border rounded">
            <h3 className="font-semibold">{edu.school}</h3>
            <p className="text-gray-600">{edu.degree}</p>
            <p className="text-sm text-gray-500">{edu.date}</p>
          </div>
        ))}
      </section>

      {/* 工作经验 - 点击按需加载 */}
      <section className="experience">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Experience</h2>
          {experience.length === 0 && (
            <button 
              onClick={loadExperience}
              disabled={loading.experience}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading.experience ? 'Loading...' : 'Load Experience'}
            </button>
          )}
        </div>
        {experience.map((exp, index) => (
          <div key={index} className="experience-item mb-4 p-4 border rounded">
            <h3 className="font-semibold">{exp.company}</h3>
            <p className="text-gray-600">{exp.role}</p>
            <p className="text-sm text-gray-500">{exp.date}</p>
            <p className="text-sm text-gray-500">{exp.location}</p>
          </div>
        ))}
      </section>

      {/* 最近动态 - 点击按需加载 */}
      <section className="recent-updates">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recent Updates</h2>
          {recentUpdates.length === 0 && (
            <button 
              onClick={loadRecentUpdates}
              disabled={loading.recentUpdates}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {loading.recentUpdates ? 'Loading...' : 'Load Recent Updates'}
            </button>
          )}
        </div>
        {recentUpdates.map((update, index) => (
          <div key={update.id} className="update-item mb-4 p-4 border rounded">
            <h3 className="font-semibold">{update.title}</h3>
            <p className="text-gray-600">{update.description}</p>
            <p className="text-sm text-gray-500">{update.date}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {update.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}; 