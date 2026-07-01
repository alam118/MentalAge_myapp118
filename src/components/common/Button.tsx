/**
 * Button Component
 * Premium styled button with gradient, glow effects, and animations.
 */

import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  children,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: string;
  size: string;
  fullWidth: boolean;
}>`
  position: relative;
  border: none;
  border-radius: ${theme.borders.radius.lg};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  
  ${({ size }) => {
    switch (size) {
      case 'sm': return css`padding: 10px 20px; font-size: ${theme.typography.fontSizes.sm};`;
      case 'lg': return css`padding: 18px 36px; font-size: ${theme.typography.fontSizes.lg};`;
      default: return css`padding: 14px 28px; font-size: ${theme.typography.fontSizes.md};`;
    }
  }}

  ${({ fullWidth }) => fullWidth && css`width: 100%;`}

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primaryGradient};
          color: ${theme.colors.textMain};
          box-shadow: ${theme.shadows.neon};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryGradientHover};
            box-shadow: ${theme.shadows.neonStrong};
            transform: translateY(-2px);
          }
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.surface};
          color: ${theme.colors.textMain};
          border: 1px solid ${theme.colors.glassBorder};
          backdrop-filter: blur(10px);
          
          &:hover:not(:disabled) {
            background: ${theme.colors.surfaceHighlight};
            border-color: ${theme.colors.accent};
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.accent};
          
          &:hover:not(:disabled) {
            background: rgba(0, 240, 255, 0.1);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export default Button;
