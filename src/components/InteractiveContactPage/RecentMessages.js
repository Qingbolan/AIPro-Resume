// src/components/RecentMessages.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const RecentMessages = ({ recentMessages, showAllMessages, setShowAllMessages }) => (
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
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-2">
              <img src="/logo.svg" alt={msg.author} className="w-8 h-8 rounded-full mr-2" />
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
);

export default RecentMessages;