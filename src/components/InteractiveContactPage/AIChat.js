// src/components/AIChat.js
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Loader from './Loader';
import { getAIResponse } from '../../api/getAIResponse';
import { useTheme } from '../ThemeContent'; // 假设您已经创建了这个 context

const aiVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const AIChat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const { isDarkMode } = useTheme();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    const userMessage = { type: 'user', text: inputValue };
    setChatMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 调用获取AI回复的API
      const aiResponse = await getAIResponse(userMessage.text);
      const aiMessage = { type: 'ai', text: aiResponse };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      alert('Failed to get AI response.');
    } finally {
      setIsLoading(false);
    }
  };

  const themeColors = isDarkMode
    ? {
        bg: 'bg-gray-800',
        text: 'text-white',
        border: 'border-gray-700',
        userBg: 'bg-purple-700',
        aiBg: 'bg-gray-700',
        inputBg: 'bg-gray-700',
        inputText: 'text-white',
        inputBorder: 'border-gray-600',
        buttonBg: 'bg-purple-600',
        buttonHoverBg: 'hover:bg-purple-700',
      }
    : {
        bg: 'bg-white',
        text: 'text-gray-900',
        border: 'border-gray-200',
        userBg: 'bg-purple-100',
        aiBg: 'bg-gray-100',
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-gray-300',
        buttonBg: 'bg-purple-600',
        buttonHoverBg: 'hover:bg-purple-700',
      };

  return (
    <motion.div
      key="ai"
      variants={aiVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
      className={`${themeColors.bg} ${themeColors.text}`}
    >
      <div className={`h-64 overflow-y-auto mb-4 border ${themeColors.border} rounded p-4`}>
        {chatMessages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.type === 'user' ? themeColors.userBg : themeColors.aiBg}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="mb-2 text-left">
            <span className={`inline-block p-2 rounded ${themeColors.aiBg}`}>
              <Loader />
            </span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleAISubmit} className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask the AI assistant..."
          className={`flex-grow p-2 border ${themeColors.inputBorder} rounded-l focus:outline-none focus:ring-2 focus:ring-purple-600 ${themeColors.inputBg} ${themeColors.inputText}`}
        />
        <button
          type="submit"
          className={`${themeColors.buttonBg} text-white px-4 py-2 rounded-r ${themeColors.buttonHoverBg} transition-colors`}
        >
          <Send />
        </button>
      </form>
    </motion.div>
  );
};

export default AIChat;