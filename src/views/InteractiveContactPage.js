// src/pages/InteractiveContactPage.js
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/InteractiveContactPage/Header';
import ContactForm from '../components/InteractiveContactPage/ContactForm';
import AIChat from '../components/InteractiveContactPage/AIChat';
import ThoughtsAndOpportunities from '../components/InteractiveContactPage/ThoughtsAndOpportunities';
import RecentMessages from '../components/InteractiveContactPage/RecentMessages';
import { getRecentMessagesAPI } from '../api/getRecentMessages.js';
import { getRecentGoalAPI } from '../api/getRecentGoal';
import { useTheme } from '../components/ThemeContent'; // 假设您已经创建了这个 context
import { useLanguage } from '../components/LanguageContent';
import { useTranslation } from 'react-i18next';

const InteractiveContactPage = () => {
  const [mode, setMode] = useState('ai');
  const [formType, setFormType] = useState('general');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [sendResume, setSendResume] = useState(false);
  const [recentMessages, setRecentMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [recentThoughts, setRecentThoughts] = useState([]);
  const [expectedOpportunities, setExpectedOpportunities] = useState([]);
  const [availabilityTimes, setAvailabilityTimes] = useState({
    daily: '',
    fullTime: ''
  });

  const pageRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const { language} = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRecentMessages = async () => {
      try {
        const messages = await getRecentMessagesAPI(language);
        setRecentMessages(messages);
      } catch (error) {
        console.error('Failed to fetch recent messages:', error);
        // 可以在这里设置一个错误状态或显示一个错误消息
      }
    };
    const fetchRecentGoal = async () => {
      try {
        const goal = await getRecentGoalAPI(language);
        setRecentThoughts(goal.recentThoughts);
        setExpectedOpportunities(goal.expectedOpportunities);
        setAvailabilityTimes(goal.availabilityTimes);
      } catch (error) {
        console.error('Failed to fetch recent goal:', error);
        // 可以在这里设置一个错误状态或显示一个错误消息
      }
    };

    fetchRecentGoal();
    fetchRecentMessages();

    // // 其他数据的设置（这些可能也来自API，但目前保持不变）
    // setRecentThoughts([
    //   "Exploring the intersection of AI and human creativity",
    //   "Investigating the ethical implications of large language models",
    //   "Developing more efficient neural network architectures",
    // ]);

    // setExpectedOpportunities([
    //   "AI Research Scientist position in a leading tech company",
    //   "Collaborative projects on natural language processing",
    //   "Opportunities to contribute to open-source AI projects",
    //   "Roles involving the development of ethical AI systems",
    // ]);

    // setAvailabilityTimes({
    //   daily: "4-6 hours",
    //   fullTime: "Available from September 1st, 2024"
    // });

    // 强制滚动到顶部
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    window.scrollTo(0, 0);
  }, []);

  const switchMode = () => {
    setMode(prev => prev === 'ai' ? 'form' : 'ai');
  };

  const themeColors = isDarkMode
    ? {
        bg: 'bg-gray-900',
        text: 'text-gray-100',
        card: 'bg-gray-800',
        cardText: 'text-white',
        button: 'bg-purple-600 hover:bg-purple-700',
        buttonText: 'text-white',
      }
    : {
        bg: 'bg-indigo-100',
        text: 'text-gray-800',
        card: 'bg-white',
        cardText: 'text-gray-800',
        button: 'bg-purple-600 hover:bg-purple-700',
        buttonText: 'text-white',
      };

  return (
    <div ref={pageRef} className={`min-h-screen p-1`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={`${themeColors.card} p-6 rounded-lg shadow-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-700">
                {mode === 'ai' ? t('AI_Assistant') : t('Contact Form')}
              </h2>
              <button
                onClick={switchMode}
                className={`${themeColors.button} ${themeColors.buttonText} px-4 py-2 rounded transition-colors`}
              >
                {mode === 'ai' ? t('switch_to_formate') : t('switch_to_AI_assistant')}
              </button>
            </div>
            <AnimatePresence mode="wait">
              {mode === 'form' ? (
                <ContactForm
                  formType={formType}
                  setFormType={setFormType}
                  setIsEmailVerified={setIsEmailVerified}
                  isEmailVerified={isEmailVerified}
                  sendResume={sendResume}
                  setSendResume={setSendResume}
                />
              ) : (
                <AIChat />
              )}
            </AnimatePresence>
          </div>
          <ThoughtsAndOpportunities
            formType={formType}
            recentThoughts={recentThoughts}
            expectedOpportunities={expectedOpportunities}
            availabilityTimes={availabilityTimes}
            isDarkMode={isDarkMode}
          />
        </div>
        {recentMessages.length > 0 && (
          <RecentMessages
            recentMessages={recentMessages}
            showAllMessages={showAllMessages}
            setShowAllMessages={setShowAllMessages}
            isDarkMode={isDarkMode}
          />
        )}
      </main>
    </div>
  );
};

export default InteractiveContactPage;