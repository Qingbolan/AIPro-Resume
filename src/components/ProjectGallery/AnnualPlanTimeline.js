import { motion} from 'framer-motion';
import { useTheme } from '../ThemeContent';
import { ChevronRight } from 'lucide-react';

const AnnualPlanTimeline = ({ plans, onPlanClick }) => {
    const { isDarkMode } = useTheme();
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 overflow-x-auto"
      >
        <div className="flex space-x-4 pb-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.year}
              className={`flex-shrink-0 w-64 ${isDarkMode ? 'bg-gray-700 shadow-lg' : 'bg-white shadow-md'} rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow`}
              whileHover={{ y: -5, boxShadow: isDarkMode ? "0 10px 20px rgba(255,255,255,0.1)" : "0 10px 20px rgba(0,0,0,0.1)" }}
              onClick={() => onPlanClick(plan)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-sm font-semibold text-purple-600 mb-1">{plan.year}</div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{plan.name}</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-2 line-clamp-2`}>{plan.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-purple-500 text-sm">{plan.projectCount} Projects</span>
                <ChevronRight className="text-purple-500" size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

export default AnnualPlanTimeline;