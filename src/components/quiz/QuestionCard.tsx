/**
 * QuestionCard Component
 * Displays a single quiz question with glassmorphism styling.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import GlassCard from '../common/GlassCard';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <GlassCard>
      <QuestionNumber>
        Question {questionNumber} of {totalQuestions}
      </QuestionNumber>
      <Category>{question.category}</Category>
      <QuestionText>{question.text}</QuestionText>
    </GlassCard>
  );
};

const QuestionNumber = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.accent};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: 8px;
`;

const Category = styled.div`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(168, 85, 247, 0.2);
  border-radius: ${theme.borders.radius.sm};
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
  margin-bottom: 16px;
`;

const QuestionText = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  color: ${theme.colors.textMain};
  line-height: 1.4;
  margin: 0;
`;

export default QuestionCard;
