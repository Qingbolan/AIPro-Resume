import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContent';
import { Eye, MessageSquare, ThumbsUp } from 'lucide-react';

const BlogPost = ({ title, excerpt, date, category, views, comments, likes, image }) => {
    const { isDarkMode } = useTheme();

    return (
        <div
            className={`rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mb-4 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
        >
            <div className="flex flex-col md:flex-row">
                {image && (
                    <div className="md:w-1/3">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-36 md:h-full object-cover"
                        />
                    </div>
                )}
                <div className={`p-4 flex flex-col justify-between ${image ? 'md:w-2/3' : 'w-full'}`}>
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <motion.h2
                                key={`blogpost-title-${isDarkMode}-${title}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className={`text-xl font-semibold leading-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-800'
                                    }`}
                            >
                                {title}
                            </motion.h2>
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${isDarkMode
                                        ? 'bg-purple-900 text-purple-300'
                                        : 'bg-purple-100 text-purple-800'
                                    }`}
                            >
                                {category}
                            </span>
                        </div>
                        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {excerpt}
                        </p>
                    </div>
                    <div className={`flex justify-between items-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span>{date}</span>
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                                <Eye size={14} className="mr-1" /> {views}
                            </span>
                            <span className="flex items-center">
                                <MessageSquare size={14} className="mr-1" /> {comments}
                            </span>
                            <span className="flex items-center">
                                <ThumbsUp size={14} className="mr-1" /> {likes}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
