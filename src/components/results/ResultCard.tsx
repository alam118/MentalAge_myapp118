/**
 * ResultCard Component
 * A container for a single test result summary, used in History and Dashboard.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import GlassCard from '../common/GlassCard';
import { TestResult } from '@/types';
import { formatDate } from '@/utils/helpers';

interface ResultCardProps {
  result: TestResult;
  onClick: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onClick }) => {
  return (
    <GlassCard onClick={onClick} padding="16px">
      <Header>
        <TestBadge>{result.testType.toUpperCase()}</TestBadge>
        <Date>{formatDate(result.timestamp)}</Date>
      </Header>
      <Body>
        <ScoreSection>
          <ScoreLabel>Mental Age</ScoreLabel>
          <ScoreValue>{result.mentalAgeScore}</ScoreValue>
        </ScoreSection>
        <ArchetypeSection>
          <ArchetypeLabel>Archetype</ArchetypeLabel>
          <ArchetypeValue>{result.aiAnalysis.brainType}</ArchetypeValue>
        </ArchetypeSection>
      </Body>
    </GlassCard>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TestBadge = styled.span`
  font-size: 10px;
  background: ${theme.colors.accent};
  color: ${theme.colors.background};
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
`;

const Date = styled.span`
  font-size: 10px;
  color: ${theme.colors.textMuted};
`;

const Body = styled.div`
  display: flex;
  gap: 20px;
`;

const ScoreSection = styled.div``;
const ScoreLabel = styled.div`font-size: 10px; color: ${theme.colors.textMuted};`;
const ScoreValue = styled.div`font-size: 24px; font-weight: bold; color: ${theme.colors.textMain};`;

const ArchetypeSection = styled.div`flex: 1;`;
const ArchetypeLabel = styled.div`font-size: 10px; color: ${theme.colors.textMuted};`;
const ArchetypeValue = styled.div`font-size: 14px; font-weight: medium; color: ${theme.colors.accent}; margin-top: 4px;`;

export default ResultCard;
