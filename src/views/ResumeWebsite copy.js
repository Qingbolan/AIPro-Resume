// src/components/ResumeWebsite.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, MapPin, Phone, Linkedin, Github, Moon, Sun, 
  Award, BookOpen, Briefcase, GraduationCap, Lightbulb 
} from 'lucide-react';
import { useTheme } from '../components/ThemeContent'; // 确保 ThemeContext 位于 contexts 目录下
import { useLanguage } from '../components/LanguageContent';
import { fetchResumeData } from '../api/resumeApi';
import { useTranslation } from 'react-i18next';

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('education');
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取简历数据根据当前语言
  useEffect(() => {
    const getResumeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchResumeData(language);
        setResumeData(data);
      } catch (err) {
        setError(t('failed_to_fetch_resume_data')); // 确保在 i18n 资源中添加对应的键值对
      }
      setLoading(false);
    };

    getResumeData();
  }, [language, t]);

  // 如果数据正在加载，显示加载状态
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <p className="text-lg">{t('loading')}</p>
      </div>
    );
  }

  // 如果有错误，显示错误信息
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4 text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  // 获取当前语言的 sections 数据
  const sections = resumeData.sections;

  // Section Icons
  const sectionIcons = {
    education: <GraduationCap size={24} />,
    experience: <Briefcase size={24} />,
    research: <Lightbulb size={24} />,
    publications: <BookOpen size={24} />,
    awards: <Award size={24} />,
    skills: <BookOpen size={24} /> // 可以根据需要更换为合适的图标
  };

  const renderSectionContent = (section) => {
    switch (section) {
      case 'education':
        return (
          <ul className="space-y-4">
            {sections.education.content.map((edu, index) => (
              <li key={index} className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-xl">{edu.school}</h3>
                <p>{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.date}</p>
                {edu.details && (
                  <ul className="list-disc list-inside mt-2 text-sm">
                    {edu.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        );
      case 'experience':
        return (
          <ul className="space-y-4">
            {sections.experience.content.map((exp, index) => (
              <li key={index} className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-xl">{exp.company}</h3>
                <p>{exp.role}</p>
                <p className="text-sm text-gray-500">{exp.date}</p>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {exp.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        );

      case 'research':
        return (
          <ul className="space-y-4">
            {sections.research.content.map((research, index) => (
              <li key={index} className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-xl">{research.title}</h3>
                <p>{research.role}</p>
                <p className="text-sm text-gray-500">{research.date}</p>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {research.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        );  
      case 'publications':
      case 'awards':
        return (
          <ul className="space-y-2">
            {sections[section].content.map((item, index) => (
              <li key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                {item}
              </li>
            ))}
          </ul>
        );
      case 'skills':
        return (
          <div className="flex flex-wrap gap-2">
            {sections.skills.content.map((skill, index) => (
              <span 
                key={index} 
                className={`inline-block ${isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm`}
              >
                {skill}
              </span>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* 头部信息 */}
        <header className="mb-12">
          <div className={`relative overflow-hidden p-6`}>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none"
                aria-label={isDarkMode ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-8">
              <motion.img 
                src="/logo.svg" 
                alt="Silan Hu" 
                className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full object-cover border-4 border-white shadow-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="text-center md:text-left">
                <motion.h1 
                  className="text-3xl md:text-5xl font-bold mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {resumeData.name}
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {resumeData.title}
                </motion.p>
                <motion.div 
                  className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <a 
                    href={`mailto:${resumeData.contacts.find(contact => contact.type === 'email').value}`} 
                    className="flex items-center hover:text-purple-200 transition-colors text-sm md:text-base"
                    aria-label="Email"
                  >
                    <Mail className="mr-1" size={18} /> {resumeData.contacts.find(contact => contact.type === 'email').value}
                  </a>
                  <a 
                    href={`tel:${resumeData.contacts.find(contact => contact.type === 'phone').value}`} 
                    className="flex items-center hover:text-purple-200 transition-colors text-sm md:text-base"
                    aria-label="Phone"
                  >
                    <Phone className="mr-1" size={18} /> {resumeData.contacts.find(contact => contact.type === 'phone').value}
                  </a>
                  <span className="flex items-center text-sm md:text-base">
                    <MapPin className="mr-1" size={18} /> {resumeData.contacts.find(contact => contact.type === 'location').value}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex space-x-4 mt-4 justify-center md:justify-start"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <a 
                    href={resumeData.socialLinks.find(link => link.type === 'linkedin').url} 
                    className="text-2xl hover:text-purple-200 transition-colors" 
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={28} />
                  </a>
                  <a 
                    href={resumeData.socialLinks.find(link => link.type === 'github').url} 
                    className="text-2xl hover:text-purple-200 transition-colors" 
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={28} />
                  </a>
                </motion.div>
              </div>
            </div>
            {/* 最近动态显示区域 */}
            {/* <motion.div 
              className="absolute bottom-4 right-4 text-center md:text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-lg md:text-xl font-bold">
                {resumeData.current}
              </p>
            </motion.div> */}
          </div>
        </header>

        {/* Section 导航 */}
        <nav className="mb-8">
          <ul className="flex overflow-x-auto justify-center md:justify-start gap-2 md:gap-4">
            {Object.keys(sections).map((key) => (
              <motion.li 
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={`flex items-center px-4 py-2 rounded-full transition-colors whitespace-nowrap text-sm md:text-base ${
                    activeSection === key
                      ? `${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white`
                      : `${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`
                  }`}
                  onClick={() => setActiveSection(key)}
                >
                  {sectionIcons[key]}
                  <span className="ml-2">{t(key)}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* 主要内容区域 */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.section 
                key={activeSection}
                className={`p-4 rounded-lg shadow-xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={`text-2xl md:text-3xl font-bold mb-4 flex items-center ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {sectionIcons[activeSection]}
                  <span className="ml-2">{t(activeSection)}</span>
                </h2>
                {renderSectionContent(activeSection)}
              </motion.section>
            </AnimatePresence>
          </div>
          
          {/* 侧边栏 */}
          <div className="md:col-span-1">
            <motion.aside 
              className={`p-4 rounded-lg shadow-xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {t('featured_skills')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {sections.skills.content.map((skill, index) => (
                  <span 
                    key={index} 
                    className={`${isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <h3 className={`text-xl md:text-2xl font-bold mt-6 mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {t('latest_publication')}
              </h3>
              <p className="text-sm">
                {sections.publications.content[0]}
              </p>
            </motion.aside>
          </div>
        </main>

        {/* 页脚 */}
        <footer className={`text-center mt-12 text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>&copy; 2024 {resumeData.name}. {t('all_rights_reserved')}</p>
        </footer>
      </div>
    </div>
  );
};

export default ResumeWebsite;