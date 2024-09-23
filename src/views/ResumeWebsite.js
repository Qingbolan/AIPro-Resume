import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/ResumeWebsite/Header';
import Navigation from '../components/ResumeWebsite/Navigation';
import ContentSection from '../components/ResumeWebsite/ContentSection';
import Footer from '../components/ResumeWebsite/Footer';
import { fetchResumeData } from '../api/resumeApi';

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('education');
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchResumeData();
        setResumeData(data);
      } catch (err) {
        setError('Failed to load resume data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
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