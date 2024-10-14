import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fetchNews } from '../../../api/newsApi';
import React from 'react';
import { Book, Briefcase, Lightbulb, Target, Calendar, ArrowRight } from 'lucide-react';

const News = ({ isDarkMode, language }) => {
  const [newsData, setNewsData] = useState([]);
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';
  const highlightColor = isDarkMode ? 'text-purple-300' : 'text-purple-600';

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews(language);
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    loadNews();
  }, [language]);

  const getTranslation = (key) => {
    const translations = {
      en: {
        personalDevelopment: "Personal Development",
        latestUpdates: "Latest Updates",
        knowledgeGrowth: "Knowledge Growth",
        projectProgress: "Project Progress",
        ideasAndPlans: "Ideas & Plans",
        researchProgress: "Research Progress",
        academicAchievement: "Academic Achievement",
        researchIdeas: "Research Ideas",
        viewMore: "View More"
      },
      zh: {
        personalDevelopment: "个人发展",
        latestUpdates: "最新动态",
        knowledgeGrowth: "知识积累",
        projectProgress: "项目进展",
        ideasAndPlans: "想法与计划",
        researchProgress: "研究进展",
        academicAchievement: "学术成就",
        researchIdeas: "研究想法",
        viewMore: "查看更多"
      }
    };
    return translations[language][key] || key;
  };

  const categories = [
    { key: 'personalDevelopment', icon: Target },
    { key: 'knowledgeGrowth', icon: Book },
    { key: 'projectProgress', icon: Briefcase },
    { key: 'ideasAndPlans', icon: Lightbulb },
    { key: 'researchProgress', icon: Book },
    { key: 'academicAchievement', icon: Target },
    { key: 'researchIdeas', icon: Lightbulb },
  ];

  const filteredCategories = categories.filter(category => 
    newsData.some(item => item.category === category.key)
  );

  if (filteredCategories.length === 0) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="news"
        className={`${bgColor} rounded-lg p-6 shadow-xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className={`text-2xl font-bold mb-6 ${highlightColor}`}>
          {getTranslation('latestUpdates')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {filteredCategories.map(({ key, icon: Icon }) => {
            const categoryNews = newsData.filter(item => item.category === key);
            if (categoryNews.length === 0) return null;

            return (
              <motion.div
                key={key}
                className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center mb-3">
                  <Icon className={`mr-2 ${highlightColor}`} size={24} />
                  <h3 className={`font-semibold ${textColor}`}>{getTranslation(key)}</h3>
                </div>
                <ul className="space-y-2">
                  {categoryNews.map((item, index) => (
                    <li key={index} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.date && (
                        <Calendar className="inline mr-2" size={12} />
                      )}
                      {item.date ? `${item.date}: ${item.title}` : item.title}
                    </li>
                  ))}
                </ul>
                <button className={`mt-3 text-sm ${highlightColor} hover:underline flex items-center`}>
                  {getTranslation('viewMore')}
                  <ArrowRight size={16} className="ml-1" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default News;