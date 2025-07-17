import React from 'react';
import { Comment } from '../types/blog';
import { useTheme } from '../../ThemeContext';
import { useLanguage } from '../../LanguageContext';

interface BlogCommentsProps {
  comments: Comment[];
  newComment: string;
  onSetNewComment: (comment: string) => void;
  onAddComment: () => void;
}

export const BlogComments: React.FC<BlogCommentsProps> = ({
  comments,
  newComment,
  onSetNewComment,
  onAddComment
}) => {
  const { colors } = useTheme();
  const { language } = useLanguage();

  return (
    <section className="mt-32 pt-16" style={{ borderTop: `1px solid ${colors.cardBorder}` }}>
      <h2 className="text-2xl font-light mb-12 text-left lg:text-center tracking-wide" style={{ 
        color: colors.textPrimary,
      }}>
        {language === 'en' ? 'Discussion' : '讨论'} ({comments.length})
      </h2>

      {/* Add Comment */}
      <div className="mb-16 max-w-4xl mx-auto">
        <textarea
          value={newComment}
          onChange={(e) => onSetNewComment(e.target.value)}
          placeholder={language === 'en' ? 'Share your thoughts...' : '分享你的想法...'}
          className="w-full p-6 resize-none font-light leading-relaxed outline-none"
          style={{
            color: colors.textPrimary,
            fontFamily: 'Georgia, "Times New Roman", serif',
            borderBottom: `1px solid ${colors.cardBorder}`
          }}
          rows={4}
        />
        <button
          onClick={onAddComment}
          className="mt-4 px-8 py-3 hover:opacity-70 transition-opacity underline"
          style={{ 
            color: colors.accent,
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}
        >
          {language === 'en' ? 'Post Comment' : '发表评论'}
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {comments.map((comment) => (
          <article key={comment.id} className="pl-6" style={{ borderLeft: `2px solid ${colors.cardBorder}` }}>
            <header className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center text-sm font-medium" 
                   style={{ 
                     color: colors.textPrimary,
                     border: `1px solid ${colors.cardBorder}`
                   }}>
                {comment.author[0]}
              </div>
              <div>
                <span className="font-medium block" style={{ 
                  color: colors.textPrimary,
                  fontFamily: 'Georgia, "Times New Roman", serif'
                }}>
                  {comment.author}
                </span>
                <span className="text-sm" style={{ 
                  color: colors.textTertiary,
                  fontFamily: 'Georgia, "Times New Roman", serif'
                }}>
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
            </header>
            <p className="leading-relaxed font-light" style={{ 
              color: colors.textSecondary,
              fontFamily: 'Georgia, "Times New Roman", serif'
            }}>
              {comment.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}; 