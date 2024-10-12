// src/components/Header.js
import React from 'react';
import { motion } from 'framer-motion';
// import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContent'; // 假设您已经创建了这个 context

const Header = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const themeColors = isDarkMode
    ? { text: 'text-purple-300', bg: 'bg-gray-900', secondaryText: 'text-gray-300' }
    : { text: 'text-purple-700', bg: 'bg-white', secondaryText: 'text-gray-600' };

  return (
    <motion.header
      className={`max-w-4xl mx-auto text-center mb-12`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className={`text-5xl font-bold mb-4 ${themeColors.text}`} variants={itemVariants}>
        Contact
      </motion.h1>
      
      <motion.div className="flex items-center justify-center" variants={itemVariants}>
        <motion.img
          src="/logo.svg"
          alt="Silan Hu"
          className="w-16 h-16 rounded-full mr-4"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        <div className="text-left">
          <motion.h2 className={`text-2xl font-semibold ${themeColors.text}`} variants={itemVariants}>
            Silan Hu (ZIYUN · 2025)
          </motion.h2>
          <motion.p className={themeColors.secondaryText} variants={itemVariants}>
            Silan.Hu@u.nus.edu | +65 86986181
          </motion.p>
        </div>
        
      </motion.div>
      
      {/* <motion.button
        className={`mt-4 p-2 `}
        onClick={() => setIsDarkMode(!isDarkMode)}
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun size={24} color="#FDB813" /> : <Moon size={24} color="#1e3a8a" />}
      </motion.button> */}
      <motion.p className={`text-xl ${themeColors.secondaryText} mb-8`} variants={itemVariants}>
        AI Researcher &amp; Full Stack Developer
      </motion.p>
    </motion.header>
  );
};

export default Header;