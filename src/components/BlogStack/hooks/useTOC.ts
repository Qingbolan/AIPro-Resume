import { useState, useEffect, useCallback } from 'react';
import { BlogData, Section } from '../types/blog';

export const useTOC = (blog: BlogData | null) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState('');

  // Generate sections from blog content
  useEffect(() => {
    if (blog) {
      const generatedSections = blog.content
        .filter(item => item.type === 'text' || item.type === 'quote')
        .map((item) => {
          let title = '';
          let level = 1;
          
          if (item.type === 'quote') {
            title = item.content.substring(0, 60) + (item.content.length > 60 ? '...' : '');
            level = 2; // Quotes are sub-sections
          } else {
            // For text content, determine if it's a heading-like paragraph
            const content = item.content;
            if (content.length < 100 && (content.endsWith('.') === false || content.split('.').length <= 2)) {
              title = content;
              level = 1;
            } else {
              title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
              level = 1;
            }
          }
          
          return {
            id: item.id,
            title,
            level
          };
        });
      
      setSections(generatedSections);
    }
  }, [blog]);

  // Update active section based on scroll position
  const updateActiveSection = useCallback(() => {
    if (sections.length === 0) return;
    
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3; // 30% from top of viewport
    
    let activeId = '';
    
    // Find the section that's currently most visible
    for (let i = 0; i < sections.length; i++) {
      const element = document.getElementById(sections[i].id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementBottom = elementTop + rect.height;
        
        // Check if element is in the threshold area
        if (elementTop <= scrollTop + threshold && elementBottom > scrollTop + threshold) {
          activeId = sections[i].id;
          break;
        }
        
        // If no element is in threshold, use the one closest to it
        if (elementTop <= scrollTop + threshold) {
          activeId = sections[i].id;
        }
      }
    }
    
    if (activeId && activeId !== activeSection) {
      setActiveSection(activeId);
    }
  }, [sections, activeSection]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial calculation
    setTimeout(() => {
      updateActiveSection();
    }, 100); // Small delay to ensure DOM is ready
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateActiveSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return {
    sections,
    activeSection,
    scrollToSection
  };
}; 