import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import TopNavigation from './TopNavigation';
import { useTheme } from '../components/ThemeContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { colors, isDarkMode } = useTheme();

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-theme-background"
      style={{
        backgroundImage: 'url(/home-background-light.jpg)',
        // backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80 dark:from-black/60 dark:via-black/40 dark:to-black/70" />
      
      {/* Navigation */}
      <div className="relative z-20">
        <TopNavigation />
      </div>

      {/* Main Content Area */}
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 0.1, 0.25, 1] // Smooth ease
        }}
      >
        {/* Content wrapper with proper spacing and mobile optimization */}
        <div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="relative pt-4 xs:pt-6 sm:pt-8 md:pt-12 pb-8 xs:pb-12 sm:pb-16 md:pb-24">
            {children}
          </div>
        </div>
      </motion.main>

      {/* Futuristic background elements - no borders */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Animated gradient orbs - Smaller on mobile */}
        <motion.div
          className="absolute -top-48 xs:-top-64 sm:-top-96 -right-48 xs:-right-64 sm:-right-96 w-[400px] xs:w-[600px] sm:w-[800px] h-[400px] xs:h-[600px] sm:h-[800px] rounded-full"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)',
            filter: 'blur(40px) xs:blur(50px) sm:blur(60px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-48 xs:-bottom-64 sm:-bottom-96 -left-48 xs:-left-64 sm:-left-96 w-[300px] xs:w-[450px] sm:w-[600px] h-[300px] xs:h-[450px] sm:h-[600px] rounded-full"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
            filter: 'blur(40px) xs:blur(50px) sm:blur(60px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating particles - Smaller on mobile */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full"
          style={{
            backgroundColor: colors.accent,
            filter: 'blur(0.5px) xs:blur(1px)',
            opacity: 0.6,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 25, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 xs:w-1 xs:h-1 rounded-full"
          style={{
            backgroundColor: colors.secondary,
            filter: 'blur(0.25px) xs:blur(0.5px)',
            opacity: 0.8,
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, -15, 0],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid pattern overlay - Hidden on very small screens */}
        <div 
          className="absolute inset-0 opacity-[0.01] xs:opacity-[0.02] hidden xs:block"
        />
      </div>
    </div>
  );
};

export default MainLayout; 