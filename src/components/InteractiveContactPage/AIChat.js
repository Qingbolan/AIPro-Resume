// src/components/AIChat.js
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Loader from './Loader';
import { getAIResponse } from '../../api/getAIResponse';

const aiVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const AIChat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

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

  return (
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
        {isLoading && (
          <div className="mb-2 text-left">
            <span className="inline-block p-2 rounded bg-gray-100">
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
          className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700 transition-colors"
        >
          <Send />
        </button>
      </form>
    </motion.div>
  );
};

export default AIChat;