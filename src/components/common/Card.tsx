/**
 * Card Component
 * A base card component for standard UI elements that don't require 
 * heavy glassmorphism, used for contrast in the Dashboard.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface CardProps {
  children: React.ReactNode;
  padding?: string;
  margin?: string;
  background?: string;
}

const Card: React.FC<CardProps> = ({ children, padding, margin, background }) => {
  return (
    <StyledCard padding={padding} margin={margin} background={background}>
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div<{ padding?: string; margin?: string; background?: string }>`
  background: ${({ background }) => background || 'rgba(255, 255, 255, 0.02)'};
  border-radius: ${theme.borders.radius.lg};
  padding: ${({ padding }) => padding || '20px'};
  margin: ${({ margin }) => margin || '0'};
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export default Card;
