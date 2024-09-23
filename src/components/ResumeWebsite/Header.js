import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Linkedin, Github, Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContent';

const Header = ({ name, title, contacts, socialLinks }) => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const highlightColor = isDarkMode ? 'text-purple-300' : 'text-purple-600';

  return (
    <header className="text-center mb-12">
      <motion.h1 
        className={`text-6xl font-bold mb-2 ${highlightColor}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {name}
      </motion.h1>
      <motion.p 
        className="text-2xl mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.p>
      <ContactInfo contacts={contacts} highlightColor={highlightColor} />
      <SocialLinksAndDarkMode 
        links={socialLinks} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode}
        highlightColor={highlightColor} 
      />
    </header>
  );
};

const ContactInfo = React.memo(({ contacts, highlightColor }) => (
  <motion.div 
    className="flex justify-center space-x-4 flex-wrap"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    {contacts.map((contact, index) => (
      <ContactItem key={index} contact={contact} highlightColor={highlightColor} />
    ))}
  </motion.div>
));

const ContactItem = React.memo(({ contact, highlightColor }) => {
  const icons = {
    email: Mail,
    phone: Phone,
    location: MapPin
  };
  const Icon = icons[contact.type];

  switch (contact.type) {
    case 'email':
      return (
        <a href={`mailto:${contact.value}`} className={`flex items-center hover:${highlightColor} transition-colors`}>
          <Icon className="mr-2" aria-hidden="true" /> 
          <span>{contact.value}</span>
        </a>
      );
    case 'phone':
      return (
        <a href={`tel:${contact.value}`} className={`flex items-center hover:${highlightColor} transition-colors`}>
          <Icon className="mr-2" aria-hidden="true" /> 
          <span>{contact.value}</span>
        </a>
      );
    case 'location':
      return (
        <span className="flex items-center">
          <Icon className="mr-2" aria-hidden="true" /> 
          <span>{contact.value}</span>
        </span>
      );
    default:
      return null;
  }
});

const SocialLinksAndDarkMode = React.memo(({ links, isDarkMode, setIsDarkMode, highlightColor }) => (
  <motion.div 
    className="mt-4 flex justify-center items-center space-x-4"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    {links.map((link, index) => (
      <SocialLink key={index} link={link} isDarkMode={isDarkMode} highlightColor={highlightColor} />
    ))}
    <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} highlightColor={highlightColor} />
  </motion.div>
));

const SocialLink = React.memo(({ link, isDarkMode, highlightColor }) => {
  const icons = {
    linkedin: Linkedin,
    github: Github
  };
  const Icon = icons[link.type];

  return (
    <a 
      href={link.url} 
      className={`${isDarkMode ? 'text-white' : 'text-gray-900'} hover:${highlightColor} transition-colors`} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={`Visit my ${link.type} profile`}
    >
      <Icon size={24} aria-hidden="true" />
    </a>
  );
});

const DarkModeToggle = React.memo(({ isDarkMode, setIsDarkMode, highlightColor }) => (
  <button 
    onClick={() => setIsDarkMode(!isDarkMode)} 
    className={`${isDarkMode ? 'text-white' : 'text-gray-900'} hover:${highlightColor} transition-colors`}
    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
  >
    {isDarkMode ? <Sun size={24} aria-hidden="true" /> : <Moon size={24} aria-hidden="true" />}
  </button>
));

export default Header;