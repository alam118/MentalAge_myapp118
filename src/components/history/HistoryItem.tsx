/**
 * HistoryItem Component
 * Displays a summarized row for a previous test result.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { TestResult } from '@/types';
import { formatDate } from '@/utils/helpers';
import { Brain, ArrowRight } from 'lucide-react';

interface HistoryItemProps {
  result: TestResult;
  onClick: (id: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ result, onClick }) => {
  return (
    <ItemContainer onClick={() => onClick(result.id)}>
      <IconWrapper>
        <Brain size={20} />
      </IconWrapper>
      <Info>
        <TopRow>
          <TestType>{result.testType.replace('-', ' ').toUpperCase()}</TestType>
          <DateStr>{formatDate(result.timestamp)}</DateStr>
        </TopRow>
        <BottomRow>
          <MentalAge>Age: {result.mentalAgeScore}</MentalAge>
          <BrainType>• {result.aiAnalysis.brainType}</BrainType>
        </BottomRow>
      </Info>
      <ArrowWrapper>
        <ArrowRight size={18} />
      </ArrowWrapper>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.lg};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  margin-bottom: 12px;

  &:hover {
    border-color: ${theme.colors.accent};
    transform: scale(1.02);
    background: ${theme.colors.surfaceHighlight};
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(168, 85, 247, 0.2);
  border-radius: ${theme.borders.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.accent};
  margin-right: 16px;
`;

const Info = styled.div`
  flex: 1;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const TestType = styled.span`
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.accent};
  letter-spacing: 0.5px;
`;

const DateStr = styled.span`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
`;

const BottomRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const MentalAge = styled.span`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textMain};
`;

const BrainType = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
`;

const ArrowWrapper = styled.div`
  color: ${theme.colors.textMuted};
  margin-left: 8px;
`;

export default HistoryItem;
