/**
 * useTheme Hook
 * Provides easy access to theme variables and toggling logic.
 */

import { useAppTheme } from '@/context/ThemeContext';
import { theme as themeConfig } from '@/styles/theme';

export const useTheme = () => {
  const { currentTheme, isDarkMode, toggleTheme } = useAppTheme();

  return {
    theme: currentTheme,
    isDarkMode,
    toggleTheme,
    // Helper to get specific theme values quickly
    colors: themeConfig.colors,
    typography: themeConfig.typography,
    shadows: themeConfig.shadows
  };
};
