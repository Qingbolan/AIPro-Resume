import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import TopNavigation from './TopNavigation';
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-theme-background"
      style={{
        // backgroundImage: 'url(/home-background-light.jpg)',
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
    </div>
  );
};

export default MainLayout; 