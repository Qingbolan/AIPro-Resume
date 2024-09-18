import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Lightbulb, BookOpen, Mail, Menu, X, } from 'lucide-react';
// import{Sun, Moon, Globe } from 'lucide-react';
const NavItem = ({ icon, label, link, isActive, onClick, colorClass }) => (
  <motion.a
    href={`#${link}`}
    onClick={onClick}
    className={`relative flex items-center justify-center px-4 py-2 transition-all duration-300 ${colorClass} ${
      isActive ? 'font-semibold' : 'font-medium hover:opacity-80'
    }`}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="mr-2">{icon}</span>
    <span className="text-sm">{label}</span>
    {isActive && (
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${colorClass}`}
        layoutId="activeIndicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </motion.a>
);

// const LanguageSelector = ({ currentLang, onChangeLang, isDarkMode }) => (
//   <motion.select
//     value={currentLang}
//     onChange={(e) => onChangeLang(e.target.value)}
//     className={`ml-2 p-1 rounded text-sm ${
//       isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
//     } border-none focus:ring-2 focus:ring-offset-2 ${
//       isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-indigo-500'
//     }`}
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//   >
//     <option value="en">EN</option>
//     <option value="zh">中文</option>
//   </motion.select>
// );

// const ThemeToggle = ({ isDarkMode, toggleTheme }) => (
//   <motion.button
//     onClick={toggleTheme}
//     className={`ml-4 p-2 rounded-full ${
//       isDarkMode ? 'bg-purple-600 text-yellow-300' : 'bg-indigo-100 text-indigo-600'
//     } transition-colors duration-200`}
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.9 }}
//   >
//     <AnimatePresence mode="wait" initial={false}>
//       <motion.div
//         key={isDarkMode ? 'dark' : 'light'}
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 20, opacity: 0 }}
//         transition={{ duration: 0.2 }}
//       >
//         {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
//       </motion.div>
//     </AnimatePresence>
//   </motion.button>
// );

const MobileMenu = ({ isOpen, navItems, activeSection, handleNavClick, colorClasses, isDarkMode }) => (
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
              onClick={(e) => handleNavClick(e, item.link)}
              colorClass={colorClasses[index % colorClasses.length]}
            />
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TopNavigation = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
//   const [currentLang, setCurrentLang] = useState('en');

  const colorClasses = [
    'text-blue-500',
    'text-indigo-500',
    'text-purple-500',
    'text-fuchsia-500',
    'text-pink-500',
  ];

  const navItems = [
    { icon: <Home size={18} />, label: "Home", link: "home" },
    { icon: <Briefcase size={18} />, label: "Projects", link: "projects" },
    { icon: <Lightbulb size={18} />, label: "Ideas", link: "ideas" },
    { icon: <BookOpen size={18} />, label: "Blog", link: "blog" },
    { icon: <Mail size={18} />, label: "Contact", link: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.link));
      const currentSection = sections.findIndex(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });

      if (currentSection !== -1) {
        setActiveSection(navItems[currentSection].link);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleNavClick = (e, link) => {
    e.preventDefault();
    const element = document.getElementById(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(link);
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 
        backdrop-blur-md`}
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
              <img className="h-8 w-auto" src="logo.svg" alt="Logo" />
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
                  onClick={(e) => handleNavClick(e, item.link)}
                  colorClass={colorClasses[index % colorClasses.length]}
                />
              ))}
              {/* <div className="flex items-center ml-4">
                <Globe size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <LanguageSelector currentLang={currentLang} onChangeLang={setCurrentLang} isDarkMode={isDarkMode} />
              </div>
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> */}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {/* <div className="flex items-center mr-2">
                <Globe size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <LanguageSelector currentLang={currentLang} onChangeLang={setCurrentLang} isDarkMode={isDarkMode} />
              </div> */}
              {/* <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> */}
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
        />
      </motion.nav>
      {/* Spacer to prevent content from being hidden under the fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default TopNavigation;