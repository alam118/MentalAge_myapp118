/**
 * Loader Component
 * Animated loading spinner with neon glow effect.
 */

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullScreen = false }) => {
  return (
    <Wrapper fullScreen={fullScreen}>
      <Spinner size={size} />
    </Wrapper>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Wrapper = styled.div<{ fullScreen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ fullScreen }) => fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.background};
    z-index: ${theme.zIndices.modal};
  `}
`;

const Spinner = styled.div<{ size: string }>`
  border-radius: 50%;
  border: 3px solid ${theme.colors.glassBorder};
  border-top-color: ${theme.colors.accent};
  animation: ${spin} 0.8s linear infinite;
  
  ${({ size }) => {
    switch (size) {
      case 'sm': return 'width: 24px; height: 24px;';
      case 'lg': return 'width: 64px; height: 64px;';
      default: return 'width: 40px; height: 40px;';
    }
  }}
  
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
`;

export default Loader;
