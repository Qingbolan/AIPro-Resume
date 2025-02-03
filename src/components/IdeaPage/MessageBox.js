import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContent';
import { motion } from 'framer-motion';

const MessageBox = ({ messages, onSendMessage }) => {
    const { isDarkMode } = useTheme();
    const { t } = useTranslation();
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}>
            {/* 标题添加淡入动画，实现闪烁效果 */}
            <motion.h3
                key={`messagebox-title-${isDarkMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}
            >
                {t("Anonymous message box")}
            </motion.h3>
            <div className={`mb-3 h-60 overflow-y-auto rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg max-w-[80%] ${msg.isUser
                                ? (isDarkMode ? 'bg-purple-900 ml-auto text-right' : 'bg-purple-100 ml-auto text-right')
                                : (isDarkMode ? 'bg-gray-800 text-left' : 'bg-white text-left')
                            }`}
                    >
                        <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{msg.content}</p>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{msg.time}</span>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={`flex-grow p-2 rounded-l-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isDarkMode
                            ? 'bg-gray-600 border border-gray-600 text-gray-200 focus:ring-purple-500'
                            : 'bg-white border border-purple-300 text-gray-800 focus:ring-purple-400'
                        }`}
                    placeholder={t('Input your thoughts')}
                />
                <button
                    onClick={handleSend}
                    className={`px-4 py-2 rounded-r-lg flex items-center transition duration-300 ${isDarkMode
                            ? 'bg-purple-500 hover:bg-purple-600'
                            : 'bg-purple-600 hover:bg-purple-700'
                        } text-white`}
                >
                    <Send size={18} className="mr-2" />
                    {t('send')}
                </button>
            </div>
        </div>
    );
};

export default MessageBox;
