import React from 'react';
import { BlogContent } from '../../types/blog';

interface ImageContentProps {
  item: BlogContent;
  index: number;
  isWideScreen: boolean;
}

export const ImageContent: React.FC<ImageContentProps> = ({ item, index, isWideScreen }) => {

  return (
    <figure className={`my-16 ${isWideScreen ? 'col-span-2' : ''} break-inside-avoid`}>
      <div className="bg-theme-surface-elevated rounded-xl overflow-hidden shadow-medium border border-theme-card-border">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-theme-background-secondary">
          <img
            src={item.content.startsWith('/api/placeholder') 
              ? `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent(item.caption || 'Academic Figure')}`
              : item.content
            }
            alt={item.caption || 'Academic figure'}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent('Figure Not Available')}`;
            }}
            loading="lazy"
            style={{ 
              aspectRatio: '16/9',
              maxHeight: '400px',
              objectFit: 'cover'
            }}
          />
          
          {/* Subtle Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Caption */}
        {item.caption && (
          <figcaption className="p-6 bg-theme-surface-elevated">
            <div className="text-center space-y-2">
              {/* Figure Number */}
              <div className="inline-flex items-center px-3 py-1 bg-theme-accent/10 rounded-full mb-2">
                <span className="text-xs font-semibold text-theme-accent uppercase tracking-wider font-sans">
                  Figure {index + 1}
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