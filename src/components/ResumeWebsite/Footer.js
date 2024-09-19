import React from 'react';

const Footer = ({ name, isDarkMode }) => {
  return (
    <footer className={`text-center mt-12 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;