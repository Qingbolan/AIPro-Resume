import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContent';

const TweetItem = React.memo(({ tweet, index }) => {
    const { isDarkMode } = useTheme();
    return (
        <motion.li
            className={`border-l-4 pl-4 py-2 ${isDarkMode ? 'border-purple-400' : 'border-purple-500'
                }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {tweet.content}
            </p>
            <div
                className={`text-sm mt-2 flex justify-between items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
            >
                <span>{tweet.date}</span>
                <span>{tweet.likes} 赞</span>
            </div>
        </motion.li>
    );
});

const RecentUpdate = ({ tweets }) => {
    const { isDarkMode } = useTheme();
    return (
        <div
            className={`rounded-lg shadow-sm p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
        >
            <h3
                className={`flex items-center text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}
            >
                最近更新
            </h3>
            <ul className="space-y-4">
                {tweets.map((tweet, index) => (
                    <TweetItem key={index} tweet={tweet} index={index} />
                ))}
            </ul>
        </div>
    );
};

export default RecentUpdate;
