/**
 * PersonalitySummary Component
 * Displays the AI-generated personality summary and brain type.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import GlassCard from '../common/GlassCard';
import { AIAnalysis } from '@/types';

interface PersonalitySummaryProps {
  analysis: AIAnalysis;
}

const PersonalitySummary: React.FC<PersonalitySummaryProps> = ({ analysis }) => {
  return (
    <GlassCard padding="32px">
      <BrainTypeBadge>
        <span role="img" aria-label="brain">🧠</span> {analysis.brainType}
      </BrainTypeBadge>
      <Title>Your Personality Profile</Title>
      <Summary>{analysis.personalitySummary}</Summary>
      
      <SectionTitle>Core Strengths</SectionTitle>
      <TagContainer>
        {analysis.strengths.map((strength, index) => (
          <Tag key={index} variant="strength">{strength}</Tag>
        ))}
      </TagContainer>

      <SectionTitle>Thinking Style</SectionTitle>
      <InfoBox>{analysis.thinkingStyle}</InfoBox>
    </GlassCard>
  );
};

const BrainTypeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${theme.colors.accent};
  color: ${theme.colors.background};
  border-radius: ${theme.borders.radius.round};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSizes.sm};
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: ${theme.typography.fontSizes.xl};
  color: ${theme.colors.textMain};
  margin-bottom: 16px;
`;

const Summary = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h4`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tag = styled.span<{ variant: 'strength' | 'weakness' }>`
  padding: 6px 12px;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid ${theme.colors.accent};
  border-radius: ${theme.borders.radius.sm};
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMain};
`;

const InfoBox = styled.div`
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${theme.borders.radius.md};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
`;

export default PersonalitySummary;
