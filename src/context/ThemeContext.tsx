/**
 * Theme Context
 * Manages the visual state of the application and provides the Styled Components 
 * ThemeProvider to the entire app. This ensures the Dark Navy + Glassmorphism 
 * design system is applied consistently.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme, Theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/globalStyles';
import { localStorageService } from '@/services/storage/localStorageService';
import { STORAGE_KEYS } from '@/utils/constants';

interface ThemeContextType {
  currentTheme: Theme;
  isDarkMode: boolean; // For this PWA, we default to Dark Navy (Modern AI look)
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // We initialize state. While the app is "Dark Navy" by design, 
  // we build this to be extensible for a "Premium Neon" variant.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorageService.get<boolean>(STORAGE_KEYS.THEME);
    return saved !== null ? saved : true; // Default to dark navy
  });

  // Sync theme with localStorage
  useEffect(() => {
    localStorageService.set(STORAGE_KEYS.THEME, isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {/* Inject global styles and CSS reset into the component tree */}
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook for easy access to the theme state
 */
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
