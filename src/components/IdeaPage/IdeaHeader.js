import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContent';

const IdeaHeader = () => {
    const { isDarkMode } = useTheme();
    const { t } = useTranslation();

    return (
        <header className="mb-8">
            {/* 给 motion.h1 添加 key，切换 isDarkMode 时会重新渲染，触发动画 */}
            <motion.h1
                key={`idea-header-${isDarkMode}`}
                className="text-4xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2 leading-tight">
                    {t("My Creative Space")}
                </span>
            </motion.h1>
            <div className="relative">
                <video
                    src="/header.mp4"
                    alt="Idea Cover"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div
                    className={`absolute bottom-4 left-4 p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'
                        }`}
                >
                    <h2
                        className={`text-2xl font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-800'
                            }`}
                    >
                        {t("ZIYUN 2025")}
                    </h2>
                    <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                        {t("AI for Life && AI for ALL")}
                    </p>
                </div>
            </div>
        </header>
    );
};

export default IdeaHeader;
