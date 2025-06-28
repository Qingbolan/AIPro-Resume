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
  Code,
  LucideIcon
} from 'lucide-react';

// Type for icon names
export type IconName = 'GraduationCap' | 'Brain' | 'Zap' | 'Briefcase' | 'Target' | 'Calendar' | 'TrendingUp' | 'Code';

// Interface for icon props
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

// Interface for plan object - using import to avoid conflicts
import type { Plan as ProjectPlan } from '../types';

// Interface for plan display props
interface PlanDisplayProps {
  size?: number;
  className?: string;
}

// Map of icon names to actual icon components
const iconMap: Record<IconName, LucideIcon> = {
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
 * @param iconName - Name of the icon
 * @param props - Props to pass to icon component (size, color, etc.)
 * @returns React element or null
 */
export const getIcon = (iconName: IconName, props: IconProps = {}): React.ReactElement | null => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap`);
    return null;
  }
  return React.createElement(IconComponent, props);
};

/**
 * Get plan display element (icon or image)
 * @param plan - Plan object with icon and/or image properties
 * @param props - Props for styling (size, className, etc.)
 * @returns React element or null
 */
export const getPlanDisplay = (plan: ProjectPlan, props: PlanDisplayProps = {}): React.ReactElement | null => {
  const { size = 16, className = '' } = props;
  
  // If plan has custom image, use it
  if (plan.image) {
    const isSvg = plan.image.endsWith('.svg');
    return React.createElement('img', {
      src: plan.image,
      alt: plan.name,
      className: `${isSvg ? 'rounded-none' : 'rounded-full'} object-cover ${className}`,
      style: { width: size, height: size },
      onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // Fallback to icon if image fails to load
        console.warn(`Failed to load image for plan ${plan.id}, falling back to icon`);
        if (plan.icon && e.currentTarget && e.currentTarget.parentNode && plan.icon in iconMap) {
          // Create a new img element with the icon as fallback
          const fallbackImg = document.createElement('div');
          fallbackImg.className = `${className}`;
          fallbackImg.style.width = `${size}px`;
          fallbackImg.style.height = `${size}px`;
          fallbackImg.style.display = 'flex';
          fallbackImg.style.alignItems = 'center';
          fallbackImg.style.justifyContent = 'center';
          fallbackImg.textContent = '?';
          e.currentTarget.parentNode.replaceChild(fallbackImg, e.currentTarget);
        }
      }
    });
  }
  
  // Fall back to icon if available
  if (plan.icon && plan.icon in iconMap) {
    return getIcon(plan.icon as IconName, { size, className });
  }
  
  // No display available
  return null;
};

/**
 * Get available icon names
 * @returns Array of available icon names
 */
export const getAvailableIcons = (): IconName[] => {
  return Object.keys(iconMap) as IconName[];
};

export default iconMap; 