import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../ThemeContent';

const IdeaDetail = ({ idea, relatedProjects, relatedBlogPosts, onClose }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{idea.title}</h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              <X size={24} />
            </button>
          </div>
          
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{idea.description}</p>
          
          <h3 className="text-xl font-semibold mb-2">Related Projects</h3>
          <ul className="mb-4">
            {relatedProjects.map(project => (
              <li key={project.id} className="mb-1">
                <a href={`/projects/${project.id}`} className={`${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>{project.name}</a>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-2">Related Blog Posts</h3>
          <ul className="mb-4">
            {relatedBlogPosts.map(post => (
              <li key={post.id} className="mb-1">
                <a href={`/blog/${post.id}`} className={`${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>{post.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IdeaDetail;