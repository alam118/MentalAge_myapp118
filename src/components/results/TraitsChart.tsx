/**
 * TraitsChart Component
 * Visual representation of the mental age breakdown across categories.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import ProgressBar from '../common/ProgressBar';
import { QuizCategory } from '@/types';

interface TraitData {
  category: QuizCategory;
  score: number; // 0..100
}

interface TraitsChartProps {
  traits: TraitData[];
}

const TraitsChart: React.FC<TraitsChartProps> = ({ traits }) => {
  return (
    <Container>
      <Title>Category Breakdown</Title>
      <List>
        {traits.map((trait, index) => (
          <TraitItem key={index}>
            <Header>
              <CategoryName>{trait.category}</CategoryName>
              <ScoreValue>{Math.round(trait.score)}%</ScoreValue>
            </Header>
            <ProgressBar progress={trait.score} />
          </TraitItem>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.textMain};
  margin-bottom: 20px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TraitItem = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CategoryName = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const ScoreValue = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.accent};
`;

export default TraitsChart;
