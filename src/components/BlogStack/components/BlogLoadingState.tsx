import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import { useLanguage } from '../../LanguageContext';

interface BlogLoadingStateProps {
  loading: boolean;
  error?: boolean;
}

export const BlogLoadingState: React.FC<BlogLoadingStateProps> = ({ loading, error }) => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { language } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <BookOpen size={48} className="mx-auto mb-4 animate-pulse" style={{ color: colors.accent }} />
          <p style={{ 
            color: colors.textSecondary,
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            {language === 'en' ? 'Loading article...' : '加载文章中...'}
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: colors.error }} />
          <h2 className="text-xl font-semibold mb-4" style={{ 
            color: colors.textPrimary,
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            {language === 'en' ? 'Article Not Found' : '文章未找到'}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 hover:opacity-70 transition-opacity underline"
            style={{ 
              color: colors.accent,
              fontFamily: 'Georgia, "Times New Roman", serif'
            }}
          >
            {language === 'en' ? 'Go Back' : '返回'}
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
}; 