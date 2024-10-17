import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/ResumeWebsite/Header';
import Navigation from '../components/ResumeWebsite/Navigation';
import ContentSection from '../components/ResumeWebsite/ContentSection';
import Footer from '../components/ResumeWebsite/Footer';
import { fetchResumeData } from '../api/resumeApi';
import { useLanguage } from '../components/LanguageContent';
import { useTranslation } from 'react-i18next';


const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('education');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language} = useLanguage();
  const { t } = useTranslation();



  useEffect(() => {
    const getResumeData = async () => {
      // setLoading(true);
      setError(null);
      try {
        const data = await fetchResumeData(language);
        setResumeData(data);
      } catch (err) {
        setError(t('failed_to_fetch_resume_data')); // 确保在 i18n 资源中添加对应的键值对
      }
      setLoading(false);
    };

    getResumeData();
  }, [language, t]);
  // 语言切换按钮


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-3xl font-bold">Loading...</div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-3xl font-bold text-red-500">{error}</div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Header 
        name={resumeData.name}
        title={resumeData.title}
        contacts={resumeData.contacts}
        socialLinks={resumeData.socialLinks}
      />
      <Navigation 
        sections={resumeData.sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <ContentSection 
        sections={resumeData.sections}
        activeSection={activeSection}
      />
      <Footer 
        name={resumeData.name}
        contacts={resumeData.contacts}
      />
  </>
  );
};

export default ResumeWebsite;