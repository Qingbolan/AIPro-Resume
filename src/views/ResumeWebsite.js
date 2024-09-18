import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from '../components/TopNavigation';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ContentSection from '../components/ContentSection';
import Footer from '../components/Footer';
import { fetchResumeData } from '../api/resumeApi';

const StarField = ({ count = 100 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      animationDuration: Math.random() * 10 + 5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.animationDuration,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  );
};

const TechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.circle
            key={index}
            cx={Math.random() * 100 + '%'}
            cy={Math.random() * 100 + '%'}
            r="2"
            fill="currentColor"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('education');
  const [isDarkMode, setIsDarkMode] = useState(() => {
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
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const { bgGradient, textColor } = useMemo(() => ({
    bgGradient: isDarkMode
      ? 'from-gray-900 via-purple-900 to-violet-900'
      : 'from-white via-purple-50 to-indigo-100',
    textColor: isDarkMode ? 'text-white' : 'text-gray-900'
  }), [isDarkMode]);

  const transitionDuration = 0.2;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
    <motion.div 
      className="min-h-screen relative overflow-hidden"
      animate={{ backgroundColor: isDarkMode ? '#1a202c' : '#ffffff' }}
      transition={{ duration: transitionDuration }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkMode ? 'dark' : 'light'}
          className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration }}
        >
          {isDarkMode ? <StarField /> : <TechBackground />}
        </motion.div>
      </AnimatePresence>
      
      <motion.div 
        className={`relative z-10 ${textColor}`}
        animate={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}
        transition={{ duration: transitionDuration }}
      >
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <TopNavigation />
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeWebsite;