/**
 * AIExplanation Component
 * Displays the detailed AI reasoning, emotional style, and advice.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import GlassCard from '../common/GlassCard';
import { AIAnalysis } from '@/types';
import { Lightbulb, Heart, Zap } from 'lucide-react';

interface AIExplanationProps {
  analysis: AIAnalysis;
}

const AIExplanation: React.FC<AIExplanationProps> = ({ analysis }) => {
  return (
    <Container>
      <GlassCard padding="24px">
        <Header>
          <Zap size={20} color={theme.colors.accent} />
          <Title>Thinking Style</Title>
        </Header>
        <Text>{analysis.thinkingStyle}</Text>
      </GlassCard>

      <GlassCard padding="24px">
        <Header>
          <Heart size={20} color={theme.colors.accent} />
          <Title>Emotional Maturity</Title>
        </Header>
        <Text>{analysis.emotionalStyle}</Text>
      </GlassCard>

      <AdviceCard>
        <Header>
          <Lightbulb size={24} color="#FFD700" />
          <Title color="#FFD700">AI Advice</Title>
        </Header>
        <AdviceText>{analysis.advice}</AdviceText>
      </AdviceCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const Title = styled.h4<{ color?: string }>`
  font-size: ${theme.typography.fontSizes.md};
  color: ${({ color }) => color || theme.colors.textMain};
  font-weight: bold;
`;

const Text = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;

const AdviceCard = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: ${theme.borders.radius.lg};
  padding: 24px;
`;

const AdviceText = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: #fff;
  font-style: italic;
  line-height: 1.6;
`;

export default AIExplanation;
