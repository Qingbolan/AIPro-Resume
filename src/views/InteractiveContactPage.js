import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronDown, Check, Clock } from 'lucide-react';

const InteractiveContactPage = () => {
  const [mode, setMode] = useState('ai');
  const [formType, setFormType] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
    companyEmail: '',
    position: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [recentMessages, setRecentMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [recentThoughts, setRecentThoughts] = useState([]);
  const [expectedOpportunities, setExpectedOpportunities] = useState([]);
  const [availabilityTimes, setAvailabilityTimes] = useState({
    daily: '',
    fullTime: ''
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [sendResume, setSendResume] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Initialize state with mock data
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRecentMessages(prev => [{
      type: formType,
      text: formType === 'general' ? 'New message received!' : `New job opportunity received!`,
      author: formData.name,
      role: formType === 'general' ? 'Visitor' : 'Recruiter'
    }, ...prev]);
    setFormData({
      name: '',
      email: '',
      message: '',
      company: '',
      companyEmail: '',
      position: '',
    });
    setIsSubmitting(false);
    setMode('ai');
  }, [formType, formData]);

  const handleAISubmit = useCallback((e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    const userMessage = { type: 'user', text: inputValue };
    setChatMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulated AI response
    setTimeout(() => {
      const aiMessage = { type: 'ai', text: `Thanks for your message: "${userMessage.text}". How can I assist you further?` };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  }, [inputValue]);

  const switchMode = useCallback(() => {
    setMode(prev => prev === 'ai' ? 'form' : 'ai');
  }, []);

  const verifyEmail = useCallback(() => {
    // Simulated email verification
    setTimeout(() => {
      setIsEmailVerified(true);
    }, 1000);
  }, []);

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const aiVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bgGradient: 
      from-white via-purple-50 to-indigo-100 text-gray-800 p-8">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-purple-700">Contact Silan Hu</h1>
        <p className="text-xl text-gray-600 mb-8">
          AI Researcher & Full Stack Developer
        </p>
        <div className="flex items-center justify-center">
          <img src="/logo.svg" alt="Silan Hu" className="w-16 h-16 rounded-full mr-4" />
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-purple-700">Silan Hu (ZIYUN · 2025)</h2>
            <p className="text-gray-600">Silan.Hu@u.nus.edu | +65 86986181</p>
          </div>
        </div>
      </header>

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
                <motion.div
                  key="form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center mb-8">
                    <button
                      className={`px-4 py-2 rounded-l-full ${formType === 'general' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => setFormType('general')}
                    >
                      General Message
                    </button>
                    <button
                      className={`px-4 py-2 rounded-r-full ${formType === 'job' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => setFormType('job')}
                    >
                      Job Opportunity
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    {formType === 'job' && (
                      <>
                        <input
                          type="text"
                          name="company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                        <div className="flex space-x-2">
                          <input
                            type="email"
                            name="companyEmail"
                            placeholder="Your Company Email"
                            value={formData.companyEmail}
                            onChange={handleInputChange}
                            className="flex-grow p-2 border border-gray-300 rounded"
                            required
                          />
                          <button
                            type="button"
                            onClick={verifyEmail}
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                            disabled={isEmailVerified}
                          >
                            {isEmailVerified ? 'Verified' : 'Verify Email'}
                          </button>
                        </div>
                        {isEmailVerified && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center text-green-500"
                          >
                            <Check className="mr-2" />
                            Email verified successfully!
                          </motion.div>
                        )}
                        <input
                          type="text"
                          name="position"
                          placeholder="Position for Me"
                          value={formData.position}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={sendResume}
                            onChange={(e) => setSendResume(e.target.checked)}
                            disabled={!isEmailVerified}
                          />
                          <span>Send my resume to this email</span>
                        </label>
                      </>
                    )}
                    {formType === 'general' && (
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    )}
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded h-32"
                      required
                    ></textarea>
                    <motion.button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubmitting || (formType === 'job' && !isEmailVerified)}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {isSubmitting && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Send className="text-white transform -rotate-45" />
                        </motion.div>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="ai"
                  variants={aiVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-64 overflow-y-auto mb-4 border border-gray-200 rounded p-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded ${msg.type === 'user' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                          {msg.text}
                        </span>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleAISubmit} className="flex">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask the AI assistant..."
                      className="flex-grow p-2 border border-gray-300 rounded-l"
                    />
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700 transition-colors"
                    >
                      <Send />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">
              {formType === 'general' ? 'Recent Thoughts' : 'Expected Opportunities'}
            </h2>
            {formType === 'general' ? (
              <ul className="space-y-2">
                {recentThoughts.map((thought, index) => (
                  <li key={index} className="bg-purple-50 p-3 rounded">{thought}</li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {expectedOpportunities.map((opportunity, index) => (
                    <li key={index} className="text-gray-700">{opportunity}</li>
                  ))}
                </ul>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Clock className="mr-2" /> Available Time
                  </h3>
                  <p className="text-gray-700">Daily: {availabilityTimes.daily}</p>
                  <p className="text-gray-700">Full Time: {availabilityTimes.fullTime}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Recent Messages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {recentMessages.slice(0, showAllMessages ? undefined : 3).map((msg, index) => (
                <motion.div
                  key={index}
                  className="bg-purple-50 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-2">
                    <img src=
                    // {`/api/placeholder/40/40?text=${msg.author.charAt(0)}`} alt={msg.author} 
                    "/logo.svg" alt={msg.author}
                    className="w-8 h-8 rounded-full mr-2" />
                    <div>
                      <p className="font-semibold">{msg.author}</p>
                      <p className="text-sm text-gray-600">{msg.role}</p>
                    </div>
                  </div>
                  {msg.type === 'job' && (
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-semibold">{msg.company}</span>
                      <span className="mx-2 text-gray-500">|</span>
                      <span className="text-sm text-gray-600">{msg.position}</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {recentMessages.length > 3 && (
            <button
              className="mt-4 flex items-center justify-center w-full py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              onClick={() => setShowAllMessages(!showAllMessages)}
            >
              {showAllMessages ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-2 transform ${showAllMessages ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default InteractiveContactPage;