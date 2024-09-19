import React from 'react';
import { Linkedin, Github, Sun, Moon } from 'lucide-react';

const SocialAndThemeIcons = ({ socialLinks, isDarkMode, setIsDarkMode, highlightColor }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className={`${isDarkMode ? 'text-white' : 'text-gray-900'} hover:${highlightColor} transition-colors`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit my ${link.type} profile`}
        >
          {link.type === 'linkedin' ? <Linkedin size={24} /> : <Github size={24} />}
        </a>
      ))}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)} 
        className={`${isDarkMode ? 'text-white' : 'text-gray-900'} hover:${highlightColor} transition-colors`}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default SocialAndThemeIcons;