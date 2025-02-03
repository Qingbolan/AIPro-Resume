import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContent';

const OpenTopic = ({ topic }) => {
    const { isDarkMode } = useTheme();

    return (
        <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-4`}>
            <motion.h3
                key={`open-topic-title-${isDarkMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}
            >
                开放话题
            </motion.h3>
            <p className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {topic}
            </p>
            <button
                className={`px-4 py-2 rounded-lg transition duration-300 font-semibold ${isDarkMode
                        ? 'bg-blue-900 text-blue-300 hover:bg-blue-800'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
            >
                参与讨论
            </button>
        </section>
    );
};

export default OpenTopic;
