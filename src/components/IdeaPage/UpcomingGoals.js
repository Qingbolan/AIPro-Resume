import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContent';

const UpcomingGoals = ({ goals }) => {
    const { isDarkMode } = useTheme();

    return (
        <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-4`}>
            <motion.h3
                key={`upcoming-goals-title-${isDarkMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}
            >
                未来目标
            </motion.h3>
            <ul className="space-y-2">
                {goals.map((goal, index) => (
                    <motion.li
                        key={index}
                        className={`flex items-center transition duration-300 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                            }`}
                        whileHover={{ x: 5 }}
                    >
                        <ChevronRight size={16} className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                        {goal}
                    </motion.li>
                ))}
            </ul>
        </section>
    );
};

export default UpcomingGoals;
