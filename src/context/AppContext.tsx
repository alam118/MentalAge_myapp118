/**
 * App Context Orchestrator
 * Combines all individual providers (Language, Theme, User, Quiz) into a single 
 * Master Provider. This maintains a clean component tree and ensures proper 
 * dependency ordering between contexts.
 */

import React, { ReactNode } from 'react';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { UserProvider } from './UserContext';
import { QuizProvider } from './QuizProvider'; // We'll name the export/file QuizContext for consistency

interface AppProviderProps {
  children: ReactNode;
}

/**
 * The order of providers is critical:
 * 1. Theme & Language (Base UI configuration)
 * 2. User (Profile & History data)
 * 3. Quiz (Active test state which depends on User/Language)
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
