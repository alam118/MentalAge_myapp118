/**
 * RecentResults Component
 * A horizontally scrollable list of the latest results for the home screen.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { TestResult } from '@/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

interface RecentResultsProps {
  results: TestResult[];
}

const RecentResults: React.FC<RecentResultsProps> = ({ results }) => {
  const navigate = useNavigate();

  if (results.length === 0) return null;

  return (
    <Container>
      <SectionTitle>Recent Activity</SectionTitle>
      <ScrollArea>
        {results.slice(0, 5).map((res) => (
          <ResultSmallCard 
            key={res.id} 
            onClick={() => navigate(`${ROUTES.RESULTS}/${res.id}`)}
          >
            <Score>{res.mentalAgeScore}</Score>
            <Type>{res.testType.split('-')[0]}</Type>
          </ResultSmallCard>
        ))}
      </ScrollArea>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 32px;
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ResultSmallCard = styled.div`
  flex: 0 0 80px;
  height: 80px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.accent};
    background: ${theme.colors.surfaceHighlight};
  }
`;

const Score = styled.div`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: bold;
  color: ${theme.colors.accent};
`;

const Type = styled.div`
  font-size: 10px;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
`;

export default RecentResults;
