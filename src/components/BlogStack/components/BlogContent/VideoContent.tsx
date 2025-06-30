import React from 'react';
import { BlogContent } from '../../types/blog';
import { useLanguage } from '../../../LanguageContext';

interface VideoContentProps {
  item: BlogContent;
  index: number;
  isWideScreen: boolean;
}

export const VideoContent: React.FC<VideoContentProps> = ({ item, index, isWideScreen }) => {
  const { language } = useLanguage();

  return (
    <figure className={`my-16 ${isWideScreen ? 'col-span-2' : ''} break-inside-avoid`}>
      <div className="bg-theme-surface-elevated rounded-xl overflow-hidden shadow-medium border border-theme-card-border">
        {/* Video Container */}
        <div className="relative overflow-hidden bg-theme-background-secondary">
          <video
            controls
            className="w-full h-auto focus:outline-none focus:ring-4 focus:ring-theme-focus-ring"
            style={{ 
              aspectRatio: '16/9',
              maxHeight: '400px'
            }}
            poster={item.content.startsWith('/api/placeholder') 
              ? `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent('Academic Video Preview')}`
              : undefined
            }
            preload="metadata"
          >
            <source src={item.content} type="video/mp4" />
            <source src={item.content.replace('.mp4', '.webm')} type="video/webm" />
            
            {/* Fallback Content */}
            <div className="absolute inset-0 flex items-center justify-center bg-theme-background-secondary">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-theme-accent/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-theme-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-theme-text-secondary text-sm font-medium">
                  {language === 'en' ? 'Your browser does not support the video tag.' : '您的浏览器不支持视频播放。'}
                </p>
                <p className="text-theme-text-tertiary text-xs mt-2">
                  {language === 'en' ? 'Please try updating your browser or use a different device.' : '请尝试更新浏览器或使用其他设备。'}
                </p>
              </div>
            </div>
          </video>
        </div>
        
        {/* Caption */}
        {item.caption && (
          <figcaption className="p-6 bg-theme-surface-elevated">
            <div className="text-center space-y-2">
              {/* Video Number */}
              <div className="inline-flex items-center px-3 py-1 bg-theme-accent/10 rounded-full mb-2">
                <span className="text-xs font-semibold text-theme-accent uppercase tracking-wider font-sans">
                  Video {index + 1}
                </span>
              </div>
              
              {/* Caption Text */}
              <p className="text-sm text-theme-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
                 style={{ 
                   fontFamily: 'Georgia, "Times New Roman", Charter, serif'
                 }}>
                {item.caption}
              </p>
            </div>
          </figcaption>
        )}
      </div>
    </figure>
  );
}; 