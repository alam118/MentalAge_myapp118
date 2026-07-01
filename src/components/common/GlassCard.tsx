/**
 * GlassCard Component
 * Premium glassmorphism card with blur and border effects.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface GlassCardProps {
  children: React.ReactNode;
  padding?: string;
  onClick?: () => void;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  padding = '24px',
  onClick,
  className,
}) => {
  return (
    <Card padding={padding} onClick={onClick} className={className}>
      {children}
    </Card>
  );
};

const Card = styled.div<{ padding: string }>`
  background: ${theme.colors.surface};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.lg};
  padding: ${({ padding }) => padding};
  box-shadow: ${theme.shadows.glass};
  transition: all ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.glassBorderHighlight};
    box-shadow: ${theme.shadows.card};
  }
`;

export default GlassCard;
