import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';
import { fetchResumeData } from './api/resumeApi';

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('education');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 检查用户之前的偏好
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchResumeData();
        setResumeData(data);
      } catch (err) {
        setError('Failed to load resume data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 保存用户的暗黑模式偏好
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const { bgGradient, textColor } = useMemo(() => ({
    bgGradient: isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
      : 'bg-gradient-to-br from-white via-purple-50 to-indigo-100',
    textColor: isDarkMode ? 'text-white' : 'text-gray-900'
  }), [isDarkMode]);

  if (isLoading) {
    return (
      <div className={`min-h-screen ${bgGradient} ${textColor} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-3xl font-bold">Loading...</div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${bgGradient} ${textColor} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-3xl font-bold text-red-500">{error}</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgGradient} ${textColor} transition-all duration-500`}>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={isDarkMode ? 'dark' : 'light'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Header 
              name={resumeData.name}
              title={resumeData.title}
              contacts={resumeData.contacts}
              socialLinks={resumeData.socialLinks}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
            <Navigation 
              sections={resumeData.sections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              isDarkMode={isDarkMode}
            />
            <ContentSection 
              sections={resumeData.sections}
              activeSection={activeSection}
              isDarkMode={isDarkMode}
            />
            <Footer 
              name={resumeData.name}
              isDarkMode={isDarkMode}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeWebsite;