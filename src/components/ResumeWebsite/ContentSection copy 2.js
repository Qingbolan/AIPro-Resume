import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EducationSection from './sections/EducationSection';
import PublicationsSection from './sections/PublicationsSection';
import ResearchSection from './sections/ResearchSection';
import ExperienceSection from './sections/ExperienceSection';
import AwardsSection from './sections/AwardsSection';
import SkillsSection from './sections/SkillsSection';
import { useTheme } from '../ThemeContent';

const ContentSection = ({ sections, activeSection}) => {
  const { isDarkMode} = useTheme();

  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const highlightColor = isDarkMode ? 'text-purple-300' : 'text-purple-600';

  const renderSection = () => {
    switch (activeSection) {
      case 'education':
        return <EducationSection data={sections.education.content} isDarkMode={isDarkMode} />;
      case 'publications':
        return <PublicationsSection data={sections.publications.content} isDarkMode={isDarkMode} />;
      case 'research':
        return <ResearchSection data={sections.research.content} isDarkMode={isDarkMode} />;
      case 'experience':
        return <ExperienceSection data={sections.experience.content} isDarkMode={isDarkMode} />;
      case 'awards':
        return <AwardsSection data={sections.awards.content} isDarkMode={isDarkMode} />;
      case 'skills':
        return <SkillsSection data={sections.skills.content} isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <main className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.section 
          key={activeSection}
          className={`${cardBgColor} rounded-lg p-6 shadow-xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={`text-2xl font-bold mb-4 ${highlightColor}`}>{sections[activeSection].title}</h2>
          {renderSection()}
        </motion.section>
      </AnimatePresence>
    </main>
  );
};


export default ContentSection;
