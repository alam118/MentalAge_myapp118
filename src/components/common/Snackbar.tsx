/**
 * Snackbar Component
 * Toast notification system for user feedback.
 */

import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

interface SnackbarProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Container type={type}>
      <Message>{message}</Message>
    </Container>
  );
};

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div<{ type: string }>`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${theme.zIndices.toast};
  min-width: 280px;
  max-width: 90%;
  padding: 16px 24px;
  background: ${({ type }) => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      default: return theme.colors.surface;
    }
  }};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.lg};
  box-shadow: ${theme.shadows.card};
  animation: ${slideIn} 0.3s ease-out;
`;

const Message = styled.p`
  margin: 0;
  color: ${theme.colors.textMain};
  font-size: ${theme.typography.fontSizes.md};
  text-align: center;
`;

export default Snackbar;
