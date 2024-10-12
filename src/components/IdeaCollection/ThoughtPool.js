import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTheme } from '../ThemeContent';

const ThoughtPool = ({ thoughts, onAddThought }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {thoughts.map(thought => (
        <motion.div
          key={thought.id}
          className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="font-bold">{thought.title}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{thought.content}</p>
        </motion.div>
      ))}
      <motion.button
        className={`flex items-center justify-center p-4 rounded-lg ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-purple-500 hover:bg-purple-400'} text-white`}
        whileHover={{ scale: 1.05 }}
        onClick={onAddThought}
      >
        <Plus size={24} className="mr-2" />
        Add New Thought
      </motion.button>
    </div>
  );
};

export default ThoughtPool;