import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContent';

const SidebarSection = ({ title, items }) => {
    const { isDarkMode } = useTheme();
    return (
        <div
            className={`rounded-lg shadow-sm p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3
                className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}
            >
                {title}
            </h3>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <motion.li
                        key={index}
                        className={`text-md cursor-pointer transition-colors duration-300 ${isDarkMode
                            ? 'text-gray-300 hover:text-purple-400'
                            : 'text-gray-600 hover:text-purple-600'
                            }`}
                        whileHover={{ x: 5 }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarSection;
