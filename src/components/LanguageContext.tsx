import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import i18n from '../i18n/index';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      return savedLanguage;
    }
    // Set default language based on browser language
    return navigator.language.startsWith('zh') ? 'zh' : 'en';
  });

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const t = (key: string): string => {
    return i18n.t(key);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language]);

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 