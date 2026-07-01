/**
 * QuizProgress Component
 * Shows current progress through the quiz.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import ProgressBar from '../common/ProgressBar';

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  const progress = Math.round((current / total) * 100);

  return (
    <Container>
      <Stats>
        <Current>{current}</Current>
        <Separator>/</Separator>
        <Total>{total}</Total>
      </Stats>
      <ProgressBar progress={progress} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const Stats = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const Current = styled.span`
  font-size: ${theme.typography.fontSizes.xxl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.accent};
`;

const Separator = styled.span`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.textMuted};
`;

const Total = styled.span`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.textSecondary};
`;

export default QuizProgress;
