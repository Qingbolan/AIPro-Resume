import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContent';
import { useLanguage } from '../LanguageContent';
import { sectionComponents } from './sections';
import News from './news'; // 导入新的News组件

const ContentSection = ({ sections, activeSection }) => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const highlightColor = isDarkMode ? 'text-purple-300' : 'text-purple-600';

  const renderSection = (sectionName) => {
    const SectionComponent = sectionComponents[sectionName];
    return SectionComponent ? (
      <SectionComponent
        data={sections[sectionName].content}
        isDarkMode={isDarkMode}
        language={language}
      />
    ) : null;
  };

  return (
    <main className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.section
              key={activeSection}
              className={`${cardBgColor} rounded-lg p-6 shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={`text-2xl font-bold mb-4 ${highlightColor}`}>
                {sections[activeSection].title}
              </h2>
              {renderSection(activeSection)}
            </motion.section>
          </AnimatePresence>
        </div>
        <div className="w-full md:w-1/3 md:pl-4 mt-6 md:mt-0">
          <News isDarkMode={isDarkMode} language={language} />
        </div>
      </div>
    </main>
  );
};

export default ContentSection;