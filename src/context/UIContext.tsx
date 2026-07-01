/**
 * UI Context
 * Manages global UI elements like Snackbars, Modals, and the Exit Confirmation logic.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@/components/common/Snackbar';
import ExitDialog from '@/components/common/ExitDialog';

interface UIContextType {
  showSnackbar: (message: string, type?: 'success' | 'error' | 'info') => void;
  openExitDialog: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{ message: string; type: any } | null>(null);
  const [isExitOpen, setIsExitOpen] = useState(false);

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setSnackbar({ message, type });
  };

  const openExitDialog = () => setIsExitOpen(true);

  return (
    <UIContext.Provider value={{ showSnackbar, openExitDialog }}>
      {children}
      {snackbar && (
        <Snackbar 
          message={snackbar.message} 
          type={snackbar.type} 
          onClose={() => setSnackbar(null)} 
        />
      )}
      <ExitDialog 
        isOpen={isExitOpen} 
        onCancel={() => setIsExitOpen(false)} 
        onConfirm={() => (window as any).close()} // Standard PWA exit attempt
      />
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
