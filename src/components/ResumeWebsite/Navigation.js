import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContent';

const Navigation = ({ sections, activeSection, setActiveSection}) => {
  const { isDarkMode} = useTheme();
  return (
    <nav className="mb-12">
      <ul className="flex justify-center space-x-4 flex-wrap">
        {Object.keys(sections).map((key) => (
          <NavItem 
            key={key}
            sectionKey={key}
            title={sections[key].title}
            isActive={activeSection === key}
            onClick={() => setActiveSection(key)}
            isDarkMode={isDarkMode}
          />
        ))}
      </ul>
    </nav>
  );
};
const NavItem = React.memo(({ sectionKey, title, isActive, onClick, isDarkMode }) => (
    <motion.li 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        className={`px-4 py-2 rounded-full transition-colors ${
          isActive
            ? `${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white`
            : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`
        }`}
        onClick={onClick}
      >
        {title}
      </button>
    </motion.li>
  ));


export default Navigation;