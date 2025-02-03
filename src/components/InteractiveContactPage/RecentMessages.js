// src/components/RecentMessages.js
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RecentMessages = ({ recentMessages, showAllMessages, setShowAllMessages, isDarkMode }) => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  const themeColors = isDarkMode
    ? {
        bg: 'bg-gray-800',
        text: 'text-white',
        subText: 'text-gray-300',
        card: 'bg-gray-700',
        button: 'bg-gray-700 hover:bg-gray-600',
        buttonText: 'text-white',
      }
    : {
        bg: 'bg-white',
        text: 'text-gray-800',
        subText: 'text-gray-600',
        card: 'bg-purple-50',
        button: 'bg-purple-100 hover:bg-purple-200',
        buttonText: 'text-purple-700',
      };

  useEffect(() => {
    const updateMasonryLayout = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const gap = 5; // 间隙
      // 设置最小卡片宽度，根据容器宽度动态计算列数
      const minCardWidth = 250;
      // 根据容器宽度和间隙计算列数（至少 1 列）
      const columnCount = Math.max(1, Math.floor((containerWidth + gap) / (minCardWidth + gap)));
      // 计算每个卡片实际宽度，保证列间 gap 一致
      const cardWidth = (containerWidth - (columnCount - 1) * gap) / columnCount;

      // 初始化每列累计高度的数组
      const columnsHeights = new Array(columnCount).fill(0);
      // 获取所有卡片
      const cards = containerRef.current.querySelectorAll('.masonry-card');

      cards.forEach(card => {
        // 设置卡片宽度
        card.style.width = `${cardWidth}px`;
        // 找出当前高度最小的那一列
        const minColIndex = columnsHeights.indexOf(Math.min(...columnsHeights));
        const top = columnsHeights[minColIndex];
        const left = minColIndex * (cardWidth + gap);
        // 设置绝对定位
        card.style.position = 'absolute';
        card.style.top = `${top}px`;
        card.style.left = `${left}px`;
        // 更新该列累计高度（加上卡片下方的间隙）
        columnsHeights[minColIndex] += card.clientHeight + gap;
      });

      // 更新容器高度以包含所有卡片
      containerRef.current.style.height = `${Math.max(...columnsHeights)}px`;
    };

    // 初次计算布局
    updateMasonryLayout();
    // 当窗口尺寸变化时重新计算布局
    window.addEventListener('resize', updateMasonryLayout);
    return () => window.removeEventListener('resize', updateMasonryLayout);
  }, [recentMessages, showAllMessages]);

  return (
    <div className={`${themeColors.text} p-4`} style={{ display: 'block' }}>
      <h2 className="text-2xl font-semibold mb-4 text-purple-500">
        {t('Recent Messages')}
      </h2>

      {/* 绝对定位的容器 */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <AnimatePresence>
          {(showAllMessages ? recentMessages : recentMessages.slice(0, 3)).map((msg, index) => (
            <motion.div
              key={index}
              className={`masonry-card ${themeColors.card} p-4 rounded-lg shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-2">
                <img
                  src="/logo.svg"
                  alt={msg.author}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">{msg.author}</p>
                  <p className={`text-sm ${themeColors.subText}`}>
                    {msg.role}
                  </p>
                </div>
              </div>
              {msg.type === 'job' && (
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold">
                    {msg.company}
                  </span>
                  <span className="mx-2 text-gray-500">|</span>
                  <span className={`text-sm ${themeColors.subText}`}>
                    {msg.position}
                  </span>
                </div>
              )}
              <p className="text-sm">{msg.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 渐变模糊层及按钮，总是渲染，当展开时背景淡出 */}
        {recentMessages.length > 3 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: showAllMessages ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80px',
              // 根据主题设置渐变背景，产生淡出的视觉效果
              background: isDarkMode
                ? 'linear-gradient(transparent, #1f2937)'
                : 'linear-gradient(transparent, #ffffff)',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'auto',
              }}
            >
              <button
                onClick={() => setShowAllMessages(true)}
                className={`flex items-center justify-center px-4 py-2 rounded-lg shadow-lg ${themeColors.button} ${themeColors.buttonText}`}
              >
                {t('Show More')}
                <ChevronDown className="ml-2" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecentMessages;
