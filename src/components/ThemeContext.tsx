import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Modern, futuristic color schemes without borders
const colorSchemes = {
  light: {
    // Primary colors - futuristic blue system
    primary: '#0066FF',         // Vivid blue
    primaryHover: '#0052CC',    // Darker blue on hover
    primaryLight: '#F0F6FF',    // Very light blue background
    
    // Secondary colors - modern purple/violet
    secondary: '#6366F1',       // Indigo
    secondaryHover: '#4F46E5',  // Darker indigo
    secondaryLight: '#F5F5FF',  // Light indigo background
    
    // Background colors - clean and minimal
    background: '#FFFFFF',       // Pure white
    backgroundSecondary: '#FAFAFA',   // Subtle gray
    backgroundTertiary: '#F5F5F5',    // Light gray
    
    // Text colors - high contrast hierarchy
    textPrimary: '#0A0A0A',     // Almost black
    textSecondary: '#525252',   // Medium gray
    textTertiary: '#737373',    // Light gray
    
    // Accent colors - vibrant and futuristic
    accent: '#00D4AA',          // Cyan-green
    accentHover: '#00B894',     // Darker cyan-green
    
    // Status colors
    success: '#10B981',         // Green
    warning: '#F59E0B',         // Amber
    error: '#EF4444',           // Red
    
    // Gradients for futuristic feel
    gradientPrimary: 'linear-gradient(135deg, #0066FF 0%, #6366F1 100%)',
    gradientSecondary: 'linear-gradient(135deg, #00D4AA 0%, #0066FF 100%)',
    gradientAccent: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
    
    // Surface colors - no borders, just subtle backgrounds
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E7EB',
    surface: '#FAFAFA',
    surfaceSecondary: '#F5F5F5',
    surfaceTertiary: '#E5E7EB',
    surfaceElevated: '#FAFAFA',
    
    // Interactive states
    hoverBackground: '#F9F9F9',
    activeBackground: '#F0F0F0',
    focusRing: '#0066FF',
    
    // Shadows for depth without borders
    shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  dark: {
    // Primary colors - futuristic dark mode
    primary: '#0EA5E9',         // Sky blue
    primaryHover: '#0284C7',    // Darker sky blue
    primaryLight: '#0F172A',    // Dark blue background
    
    // Secondary colors
    secondary: '#8B5CF6',       // Violet
    secondaryHover: '#7C3AED',  // Darker violet
    secondaryLight: '#1E1B3E',  // Dark violet background
    
    // Background colors - deep dark hierarchy
    background: '#0A0A0A',       // Almost black
    backgroundSecondary: '#141414', // Dark gray
    backgroundTertiary: '#1F1F1F',  // Medium dark gray
    
    // Text colors - bright and clear
    textPrimary: '#FFFFFF',     // Pure white
    textSecondary: '#D1D5DB',   // Light gray
    textTertiary: '#9CA3AF',    // Medium gray
    
    // Accent colors
    accent: '#10B981',          // Emerald
    accentHover: '#059669',     // Darker emerald
    
    // Status colors
    success: '#10B981',         // Emerald
    warning: '#F59E0B',         // Amber
    error: '#F87171',           // Red
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
    gradientSecondary: 'linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)',
    gradientAccent: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    
    // Surface colors
    cardBackground: '#141414',
    cardBorder: '#374151',
    surface: '#1F1F1F',
    surfaceSecondary: '#262626',
    surfaceTertiary: '#374151',
    surfaceElevated: '#1F1F1F',
    
    // Interactive states
    hoverBackground: '#1F1F1F',
    activeBackground: '#262626',
    focusRing: '#0EA5E9',
    
    // Shadows for dark mode
    shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
  }
};

interface ColorScheme {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  secondary: string;
  secondaryHover: string;
  secondaryLight: string;
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentHover: string;
  success: string;
  warning: string;
  error: string;
  gradientPrimary: string;
  gradientSecondary: string;
  gradientAccent: string;
  cardBackground: string;
  cardBorder: string;
  surface: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  surfaceElevated: string;
  hoverBackground: string;
  activeBackground: string;
  focusRing: string;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;
}

interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  toggleTheme: () => void;
  colors: ColorScheme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check system preference first
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : systemPreference;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const colors = colorSchemes[isDarkMode ? 'dark' : 'light'];

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Apply theme class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply CSS custom properties for dynamic theming
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply shadow CSS custom properties
    root.style.setProperty('--shadow-sm', colors.shadowSm);
    root.style.setProperty('--shadow-md', colors.shadowMd);
    root.style.setProperty('--shadow-lg', colors.shadowLg);
    root.style.setProperty('--shadow-xl', colors.shadowXl);

    // Apply futuristic design properties
    root.style.setProperty('--border-radius-sm', '0.5rem');
    root.style.setProperty('--border-radius-md', '0.75rem');
    root.style.setProperty('--border-radius-lg', '1rem');
    root.style.setProperty('--border-radius-xl', '1.5rem');
    root.style.setProperty('--transition-fast', '0.15s ease-out');
    root.style.setProperty('--transition-smooth', '0.3s ease-out');
    root.style.setProperty('--backdrop-blur', 'blur(10px)');
    
  }, [isDarkMode, colors]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('darkMode')) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const contextValue: ThemeContextType = {
    isDarkMode,
    setIsDarkMode,
    toggleTheme,
    colors
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 