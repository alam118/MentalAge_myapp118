/**
 * Language Context
 * Manages the global internationalization state, allowing the app to switch
 * between the 6 required languages: EN, HI, ES, FR, DE, IT.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppLanguage, appConfig } from '@/config/appConfig';
import { localStorageService } from '@/services/storage/localStorageService';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  isRTL: boolean; // For future-proofing (e.g., if Arabic is added)
  t: (key: string) => string; // Simple translation helper placeholder
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const savedLang = localStorageService.getLanguage() as AppLanguage;
    return savedLang || appConfig.defaultLanguage;
  });

  // Update localStorage whenever language changes
  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorageService.saveLanguage(lang);
    
    // Update the HTML lang attribute for accessibility/SEO
    document.documentElement.lang = lang;
  };

  // Effect to sync initial state with HTML attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const isRTL = false; // Currently all 6 languages are LTR

  /**
   * Simple Translation Mock
   * In a full-scale production app, this would integrate with a library 
   * like i18next using the data/translations/ files.
   */
  const t = (key: string): string => {
    // This will be expanded once we create the translation data files
    return key; 
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook for easy access to Language Context
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
