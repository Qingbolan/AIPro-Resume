import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Lightbulb, BookOpen, Mail, Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContent';


const NavItem = ({ icon, label, link, isActive, onClick, colorClass }) => (
  <motion.div
    onClick={onClick}
    className={`relative flex items-center justify-center px-4 py-2 transition-all duration-300 ${colorClass} ${
      isActive ? 'font-semibold' : 'font-medium hover:opacity-80'
    }`}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link to={link} className="flex items-center">
      <span className="mr-2">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
    {isActive && (
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${colorClass}`}
        layoutId="activeIndicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </motion.div>
);

const MobileMenu = ({ isOpen, navItems, activeSection, handleNavClick, colorClasses, isDarkMode, language, toggleLanguage }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        className={`md:hidden ${
          isDarkMode ? 'bg-gray-900 bg-opacity-95' : 'bg-white bg-opacity-95'
        } absolute top-full left-0 right-0`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item, index) => (
            <NavItem 
              key={index} 
              {...item} 
              isActive={activeSection === item.link}
              onClick={() => handleNavClick(item.link)}
              colorClass={colorClasses[index % colorClasses.length]}
            />
          ))}
          <NavItem
            icon={<Globe size={18} />}
            label={language === 'en' ? 'English' : '中文'}
            onClick={toggleLanguage}
            colorClass="text-gray-500"
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TopNavigation = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // const [language, setLanguage] = useState('en');
  const { language, setLanguage } = useLanguage();

  const colorClasses = [
    'text-blue-500',
    'text-indigo-500',
    'text-purple-500',
    'text-fuchsia-500',
    'text-pink-500',
  ];

  const navItems = useMemo(() => [
    { icon: <Home size={18} />, label: language === 'en' ? "Home" : "主页", link: "/" },
    { icon: <Briefcase size={18} />, label: language === 'en' ? "Projects" : "项目", link: "/projects" },
    { icon: <Lightbulb size={18} />, label: language === 'en' ? "Ideas" : "想法", link: "/ideas" },
    { icon: <BookOpen size={18} />, label: language === 'en' ? "Blog" : "博客", link: "/blog" },
    { icon: <Mail size={18} />, label: language === 'en' ? "Contact" : "联系", link: "/contact" },
  ], [language]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPath = window.location.pathname;
      const currentItem = navItems.find(item => item.link === currentPath);
      if (currentItem) {
        setActiveSection(currentItem.link);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (link) => {
    setActiveSection(link);
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'zh' : 'en');
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                ZIYUN · 2025
              </span>
            </motion.div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navItems.map((item, index) => (
                <NavItem 
                  key={index} 
                  {...item} 
                  isActive={activeSection === item.link}
                  onClick={() => handleNavClick(item.link)}
                  colorClass={colorClasses[index % colorClasses.length]}
                />
              ))}
              <NavItem
                icon={<Globe size={18} />}
                label={language === 'en' ? 'EN' : '中文'}
                onClick={toggleLanguage}
                colorClass="text-gray-500"
              />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`ml-2 p-2 rounded-md ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Open main menu</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? 'close' : 'open'}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu 
          isOpen={isOpen}
          navItems={navItems}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          colorClasses={colorClasses}
          isDarkMode={isDarkMode}
          language={language}
          toggleLanguage={toggleLanguage}
        />
      </motion.nav>
      {/* Spacer to prevent content from being hidden under the fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default TopNavigation;