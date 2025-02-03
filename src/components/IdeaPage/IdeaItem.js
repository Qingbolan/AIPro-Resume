import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContent';
import {
    Link,
    Bookmark,
    ThumbsUp,
    MessageSquare,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';

const IdeaItem = ({ item, onLike, onAddComment }) => {
    const { isDarkMode } = useTheme();
    const [showAllImages, setShowAllImages] = useState(false);
    const [showComments, setShowComments] = useState(false);

    // 根据 isDarkMode 返回不同的标签颜色
    const getTagColor = (tag) => {
        const lightColors = {
            achievement: 'bg-green-100 text-green-800',
            thought: 'bg-blue-100 text-blue-800',
            paper: 'bg-purple-100 text-purple-800',
            article: 'bg-yellow-100 text-yellow-800',
            link: 'bg-red-100 text-red-800',
        };
        const darkColors = {
        //     achievement: 'bg-green-900 text-green-300',
        //     thought: 'bg-blue-900 text-blue-300',
        //     paper: 'bg-purple-900 text-purple-300',
        //     article: 'bg-yellow-900 text-yellow-300',
        //     link: 'bg-red-900 text-red-300',
        // };
        achievement: 'bg-green-100 text-green-800',
            thought: 'bg-blue-100 text-blue-800',
            paper: 'bg-purple-100 text-purple-800',
            article: 'bg-yellow-100 text-yellow-800',
            link: 'bg-red-100 text-red-800',
        };
        return isDarkMode
            ? darkColors[tag] || 'bg-gray-900 text-gray-300'
            : lightColors[tag] || 'bg-gray-100 text-gray-800';
    };

    const renderMediaContent = () => {
        if (item.video) {
            return (
                <div className="mb-3">
                    <video
                        src={item.video}
                        controls
                        className="w-full rounded-lg shadow-md"
                    />
                </div>
            );
        } else if (item.image) {
            return (
                <div className="mb-3">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
            );
        } else if (item.images && item.images.length > 0) {
            const displayImages = showAllImages ? item.images : item.images.slice(0, 9);
            const remainingImages = item.images.length - 9;

            return (
                <div className="mb-3">
                    <div
                        className={`grid gap-2 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-3'
                            }`}
                    >
                        {displayImages.map((image, index) => (
                            <img key={index} src={image} alt={`Gallery item ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
                        ))}
                    </div>
                    {!showAllImages && remainingImages > 0 && (
                        <button
                            onClick={() => setShowAllImages(true)}
                            className={`mt-2 font-semibold ${isDarkMode
                                    ? 'text-purple-400 hover:text-purple-300'
                                    : 'text-purple-600 hover:text-purple-800'
                                }`}
                        >
                            查看全部 {item.images.length} 张图片
                        </button>
                    )}
                </div>
            );
        }
        return null;
    };

    const renderContent = () => {
        if (item.type === 'achievement') {
            return (
                <div
                    className={`${isDarkMode ? 'bg-green-900' : 'bg-green-50'} p-4 rounded-lg mb-3`}
                >
                    <h3
                        className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-800'
                            }`}
                    >
                        {item.mainAchievement}
                    </h3>
                    <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.content || item.description}
                    </p>
                    {item.keyAchievements && (
                        <div className="mb-2">
                            <h4
                                className={`font-semibold mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-700'
                                    }`}
                            >
                                主要成就：
                            </h4>
                            <ul
                                className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}
                            >
                                {item.keyAchievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.reflection && (
                        <div className={`italic mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <h4
                                className={`font-semibold mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-700'
                                    }`}
                            >
                                反思：
                            </h4>
                            "{item.reflection}"
                        </div>
                    )}
                    {item.shoutout && (
                        <div className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <h4
                                className={`font-semibold mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-700'
                                    }`}
                            >
                                特别感谢：
                            </h4>
                            {item.shoutout}
                        </div>
                    )}
                </div>
            );
        } else if (item.type === 'article') {
            return (
                <div
                    className={`${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50'} p-4 rounded-lg mb-3`}
                >
                    <h3
                        className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'
                            }`}
                    >
                        {item.title}
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.summary}
                    </p>
                    <button
                        className={`mt-2 font-semibold ${isDarkMode
                                ? 'text-yellow-400 hover:text-yellow-300'
                                : 'text-yellow-600 hover:text-yellow-800'
                            }`}
                    >
                        阅读全文
                    </button>
                </div>
            );
        } else if (item.type === 'link') {
            return (
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${isDarkMode ? 'bg-red-900' : 'bg-red-50'} p-4 rounded-lg mb-3`}
                >
                    <div className="flex items-center">
                        <Link
                            size={20}
                            className={`mr-2 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}
                        />
                        <span
                            className={`${isDarkMode ? 'text-red-300' : 'text-red-600'
                                } hover:underline`}
                        >
                            {item.title}
                        </span>
                    </div>
                    <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.description}
                    </p>
                </a>
            );
        } else if (item.type === 'paper') {
            return (
                <div
                    className={`${isDarkMode ? 'bg-purple-900' : 'bg-purple-50'} p-4 rounded-lg mb-3`}
                >
                    <h3
                        className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'
                            }`}
                    >
                        {item.title}
                    </h3>
                    <p
                        className={`italic mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                    >
                        {item.authors.join(', ')}
                    </p>
                    <p
                        className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                    >
                        {item.journal}, {item.year}
                    </p>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.abstract}
                    </p>
                    <button
                        className={`mt-2 font-semibold ${isDarkMode
                                ? 'text-purple-400 hover:text-purple-300'
                                : 'text-purple-600 hover:text-purple-800'
                            }`}
                    >
                        阅读论文
                    </button>
                </div>
            );
        } else {
            return (
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                    {item.content}
                </p>
            );
        }
    };

    const renderInsights = () => {
        if (!item.insights || item.insights.length === 0) return null;
        return (
            <div>
                {item.insights.map((insight, index) => (
                    <div key={index} className="mb-2">
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {insight.content}
                        </p>
                        <span
                            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                        >
                            {insight.date}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <motion.div
            className={`mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                    {/* 使用 motion.h3 和带有 isDarkMode 的 key 实现文字闪烁动画 */}
                    <motion.h3
                        key={`ideaitem-title-${isDarkMode}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`font-bold text-xl ${isDarkMode ? 'text-purple-300' : 'text-purple-800'
                            }`}
                    >
                        {item.title}
                    </motion.h3>
                    <div className="flex items-center space-x-2">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getTagColor(
                                item.type
                            )}`}
                        >
                            {item.type}
                        </span>
                        {item.isBookmarked && (
                            <Bookmark size={20} className="text-yellow-500" />
                        )}
                    </div>
                </div>
                <span
                    className={`text-sm mb-3 block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                >
                    {item.date || item.timestamp}
                </span>
                {renderContent()}
                {renderMediaContent()}
                {renderInsights()}
                <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags &&
                        item.tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs ${isDarkMode
                                        ? 'bg-gray-900 text-gray-300'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                </div>
                <div
                    className={`flex justify-between items-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                >
                    <button
                        onClick={() => onLike(item.id)}
                        className={`flex items-center transition duration-300 ${isDarkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'
                            }`}
                    >
                        <ThumbsUp size={16} className="mr-1" />
                        <span>{item.likes}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center transition duration-300 ${isDarkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'
                            }`}
                    >
                        <MessageSquare size={16} className="mr-1" />
                        <span>{item.comments.length}</span>
                        {showComments ? (
                            <ChevronUp size={16} className="ml-1" />
                        ) : (
                            <ChevronDown size={16} className="ml-1" />
                        )}
                    </button>
                </div>
                {showComments && (
                    <div
                        className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                            }`}
                    >
                        {item.comments.map((comment, index) => (
                            <div key={index} className="mb-2 text-sm">
                                <span
                                    className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'
                                        }`}
                                >
                                    {comment.user}:{' '}
                                </span>
                                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {comment.content}
                                </span>
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder="添加评论..."
                            className={`w-full px-3 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-1 ${isDarkMode
                                    ? 'bg-gray-600 border-gray-600 focus:ring-purple-500 text-gray-200'
                                    : 'bg-white border-purple-300 focus:ring-purple-500 text-gray-800'
                                }`}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                    onAddComment(item.id, e.target.value.trim());
                                    e.target.value = '';
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default IdeaItem;
