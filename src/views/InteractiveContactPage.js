// src/pages/InteractiveContactPage.js
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/InteractiveContactPage/Header';
import ContactForm from '../components/InteractiveContactPage/ContactForm';
import AIChat from '../components/InteractiveContactPage/AIChat';
import ThoughtsAndOpportunities from '../components/InteractiveContactPage/ThoughtsAndOpportunities';
import RecentMessages from '../components/InteractiveContactPage/RecentMessages';

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

  useEffect(() => {
    // 可以从后端获取数据，这里使用模拟数据
    setRecentMessages([
      { type: 'general', text: 'Great work on your latest project!', author: 'John Doe', role: 'UX Designer' },
      { type: 'job', company: 'TechCorp', position: 'Senior AI Developer', text: 'We have an exciting opportunity for an AI expert.', author: 'Jane Smith', role: 'HR Manager' },
      { type: 'general', text: 'Would love to collaborate on a research paper.', author: 'Dr. Emily Brown', role: 'Research Scientist' },
      { type: 'job', company: 'InnovateLab', position: 'ML Engineer', text: 'Join our cutting-edge machine learning team!', author: 'Mike Johnson', role: 'Tech Lead' },
    ]);

    setRecentThoughts([
      "Exploring the intersection of AI and human creativity",
      "Investigating the ethical implications of large language models",
      "Developing more efficient neural network architectures",
    ]);

    setExpectedOpportunities([
      "AI Research Scientist position in a leading tech company",
      "Collaborative projects on natural language processing",
      "Opportunities to contribute to open-source AI projects",
      "Roles involving the development of ethical AI systems",
    ]);

    setAvailabilityTimes({
      daily: "4-6 hours",
      fullTime: "Available from September 1st, 2024"
    });
  }, []);

  const switchMode = () => {
    setMode(prev => prev === 'ai' ? 'form' : 'ai');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100 text-gray-800 p-8">
      <Header />
      <main className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-700">
                {mode === 'ai' ? 'AI Assistant' : 'Contact Form'}
              </h2>
              <button
                onClick={switchMode}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                Switch to {mode === 'ai' ? 'Form' : 'AI Assistant'}
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
          />
        </div>
        <RecentMessages
          recentMessages={recentMessages}
          showAllMessages={showAllMessages}
          setShowAllMessages={setShowAllMessages}
        />
      </main>
    </div>
  );
};

export default InteractiveContactPage;