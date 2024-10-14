import { motion} from 'framer-motion';
import { useTheme } from '../../ThemeContent';

const AnnualPlanDetail = ({ plan, onClose }) => {
    const { isDarkMode } = useTheme();
  
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg max-w-3xl w-full max-h-90vh overflow-y-auto`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{plan.name} ({plan.year})</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{plan.description}</p>
            
            <h3 className="text-xl font-semibold mb-3">Key Objectives</h3>
            <ul className="list-disc list-inside mb-6">
              {plan.objectives.map((objective, index) => (
                <li key={index} className="mb-2">{objective}</li>
              ))}
            </ul>
  
            <h3 className="text-xl font-semibold mb-3">Projects</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {plan.projects.map((project) => (
                <div key={project.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                  <h4 className="font-semibold mb-2">{project.name}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                </div>
              ))}
            </div>
  
            <div className="mt-8 flex justify-end">
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

export default AnnualPlanDetail;