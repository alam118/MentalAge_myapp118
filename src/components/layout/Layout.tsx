/**
 * Layout Component
 * The main container for the application. Handles page transitions,
 * global navigation, and the background system.
 */

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { theme } from '@/styles/theme';
import AnimatedBackground from '../common/AnimatedBackground';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Root>
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        <PageTransition
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </PageTransition>
      </AnimatePresence>
    </Root>
  );
};

const Root = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${theme.colors.background};
  color: ${theme.colors.textMain};
  position: relative;
  overflow-x: hidden;
`;

const PageTransition = styled(motion.main)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

export default Layout;
