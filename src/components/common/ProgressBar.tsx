/**
 * ProgressBar Component
 * Animated progress indicator with gradient fill.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, showLabel = false }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <Container>
      <Track>
        <Fill progress={clampedProgress} />
      </Track>
      {showLabel && <Label>{clampedProgress}%</Label>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Track = styled.div`
  flex: 1;
  height: 8px;
  background: ${theme.colors.surface};
  border-radius: ${theme.borders.radius.sm};
  overflow: hidden;
  border: 1px solid ${theme.colors.glassBorder};
`;

const Fill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${theme.colors.primaryGradient};
  border-radius: ${theme.borders.radius.sm};
  transition: width 0.5s ease-out;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
`;

const Label = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.accent};
  min-width: 40px;
`;

export default ProgressBar;
