import React from 'react';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContent';

const IdeaClassify = ({ archivedIdeas: IdeasClass }) => {
    const { isDarkMode } = useTheme();

    return (
        <section
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-4 mb-8`}
        >
            <motion.h3
                key={`idea-classify-title-${isDarkMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}
            >
                想法归档
            </motion.h3>
            <ul className="space-y-2">
                {IdeasClass.map((idea, index) => (
                    <motion.li
                        key={index}
                        className={`flex items-center transition duration-300 ${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'
                            }`}
                        whileHover={{ x: 5 }}
                    >
                        <Bookmark size={16} className={`mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                        <span>{idea.title}</span>
                        <span className={`ml-auto text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {idea.date}
                        </span>
                    </motion.li>
                ))}
            </ul>
            <button
                className={`mt-4 px-4 py-2 rounded-lg transition duration-300 font-semibold ${isDarkMode
                        ? 'bg-purple-900 text-purple-300 hover:bg-purple-800'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
            >
                查看更多
            </button>
        </section>
    );
};

export default IdeaClassify;
