// Icon mapping utility for dynamic icon loading
import React from 'react';
import { 
  GraduationCap, 
  Brain, 
  Zap, 
  Briefcase, 
  Target, 
  Calendar,
  TrendingUp,
  Code
} from 'lucide-react';

// Map of icon names to actual icon components
const iconMap = {
  GraduationCap,
  Brain,
  Zap,
  Briefcase,
  Target,
  Calendar,
  TrendingUp,
  Code
};

/**
 * Get icon component by name
 * @param {string} iconName - Name of the icon
 * @param {object} props - Props to pass to icon component (size, color, etc.)
 * @returns {React.ReactElement|null}
 */
export const getIcon = (iconName, props = {}) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap`);
    return null;
  }
  return React.createElement(IconComponent, props);
};

/**
 * Get plan display element (icon or image)
 * @param {object} plan - Plan object with icon and/or image properties
 * @param {object} props - Props for styling (size, className, etc.)
 * @returns {React.ReactElement|null}
 */
export const getPlanDisplay = (plan, props = {}) => {
  const { size = 16, className = '' } = props;
  
  // If plan has custom image, use it
  if (plan.image) {
    const isSvg = plan.image.endsWith('.svg');
    return React.createElement('img', {
      src: plan.image,
      alt: plan.name,
      className: `${isSvg ? 'rounded-none' : 'rounded-full'} object-cover ${className}`,
      style: { width: size, height: size },
      onError: (e) => {
        // Fallback to icon if image fails to load
        console.warn(`Failed to load image for plan ${plan.id}, falling back to icon`);
        if (plan.icon) {
          const iconElement = getIcon(plan.icon, { size });
          if (iconElement && e.target && e.target.parentNode) {
            e.target.parentNode.replaceChild(iconElement, e.target);
          }
        }
      }
    });
  }
  
  // Fall back to icon if available
  if (plan.icon) {
    return getIcon(plan.icon, { size, className });
  }
  
  // No display available
  return null;
};

/**
 * Get available icon names
 * @returns {string[]}
 */
export const getAvailableIcons = () => {
  return Object.keys(iconMap);
};

export default iconMap; 