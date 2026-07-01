/**
 * QuickStats Component
 * A compact dashboard widget showing the latest test performance.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Clock } from 'lucide-react';

interface QuickStatsProps {
  lastMentalAge: number;
  lastTestDate: string;
}

const QuickStats: React.FC<QuickStatsProps> = ({ lastMentalAge, lastTestDate }) => {
  return (
    <Container>
      <Info>
        <IconBox>
          <Clock size={16} />
        </IconBox>
        <TextGroup>
          <Title>Last Result</Title>
          <Date>{lastTestDate}</Date>
        </TextGroup>
      </Info>
      <ScoreBadge>
        Age: {lastMentalAge}
      </ScoreBadge>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borders.radius.md};
  margin-bottom: 24px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  color: ${theme.colors.accent};
`;

const TextGroup = styled.div``;

const Title = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
`;

const Date = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const ScoreBadge = styled.div`
  padding: 4px 12px;
  background: ${theme.colors.primaryGradient};
  border-radius: ${theme.borders.radius.round};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: bold;
`;

export default QuickStats;
