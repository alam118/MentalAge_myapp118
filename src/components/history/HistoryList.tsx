/**
 * HistoryList Component
 * Renders a scrollable list of test results.
 */

import React from 'react';
import styled from 'styled-components';
import HistoryItem from './HistoryItem';
import { TestResult } from '@/types';
import { theme } from '@/styles/theme';

interface HistoryListProps {
  results: TestResult[];
  onItemClick: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ results, onItemClick }) => {
  if (results.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>📁</EmptyIcon>
        <EmptyTitle>No results yet</EmptyTitle>
        <EmptyText>Take your first test to see your mental age history here!</EmptyText>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      {results.map((result) => (
        <HistoryItem key={result.id} result={result} onClick={onItemClick} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 100%;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: ${theme.colors.surface};
  border-radius: ${theme.borders.radius.xl};
  border: 1px dashed ${theme.colors.glassBorder};
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  color: ${theme.colors.textMain};
  margin-bottom: 8px;
`;

const EmptyText = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSizes.sm};
  line-height: 1.5;
`;

export default HistoryList;
