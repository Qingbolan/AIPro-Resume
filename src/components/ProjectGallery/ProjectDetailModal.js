import { motion} from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from '../ThemeContent';

const ProjectDetailModal = ({ project, onClose }) => {
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
            <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
            <img src={`/api/placeholder/600/300`} alt={project.name} className="w-full h-48 object-cover mb-4 rounded" />
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{project.description}</p>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Related Content:</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>
                    <ExternalLink size={16} className="mr-2" />
                    Related Blog Post
                  </a>
                </li>
                <li>
                  <a href="#" className={`flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>
                    <ExternalLink size={16} className="mr-2" />
                    Video Demonstration
                  </a>
                </li>
                <li>
                  <a href="#" className={`flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>
                    <Github size={16} className="mr-2" />
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors`}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

export default ProjectDetailModal;