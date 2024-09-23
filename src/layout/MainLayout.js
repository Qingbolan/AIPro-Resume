import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from './TopNavigation';
import { useTheme } from '../components/ThemeContent';

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

const MainLayout = ({ children }) => {
  const { isDarkMode} = useTheme();

  const { bgGradient, textColor } = useMemo(() => ({
    bgGradient: isDarkMode
      ? 'from-gray-900 via-purple-900 to-violet-900'
      : 'from-white via-purple-50 to-indigo-100',
    textColor: isDarkMode ? 'text-white' : 'text-gray-900'
  }), [isDarkMode]);

  const transitionDuration = 0.2;

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
          <TopNavigation isDarkMode={isDarkMode}/>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MainLayout;