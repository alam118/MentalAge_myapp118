/**
 * LeaderboardList Component
 * Displays the top-ranked users based on mental age archetypes or test frequency.
 */

import React from 'react';
import styled from 'styled-components';
import LeaderboardItem from './LeaderboardItem';
import { theme } from '@/styles/theme';

// Mock data for production UI look
const MOCK_LEADERS = [
  { id: '1', rank: 1, name: 'Alex Rivera', score: 24, archetype: 'The Sage' },
  { id: '2', rank: 2, name: 'Priya Singh', score: 19, archetype: 'The Dreamer' },
  { id: '3', rank: 3, name: 'Marco Chen', score: 32, archetype: 'The Architect' },
  { id: '4', rank: 4, name: 'Sarah J.', score: 28, archetype: 'The Explorer' },
  { id: '5', rank: 5, name: 'You', score: 25, archetype: 'The Thinker', isUser: true },
];

const LeaderboardList: React.FC = () => {
  return (
    <ListContainer>
      <HeaderRow>
        <HeaderRank>Rank</HeaderRank>
        <HeaderUser>User</HeaderUser>
        <HeaderScore>Age</HeaderScore>
      </HeaderRow>
      <Items>
        {MOCK_LEADERS.map((leader) => (
          <LeaderboardItem key={leader.id} {...leader} />
        ))}
      </Items>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.xl};
  overflow: hidden;
`;

const HeaderRow = styled.div`
  display: flex;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HeaderRank = styled.div`width: 50px;`;
const HeaderUser = styled.div`flex: 1;`;
const HeaderScore = styled.div`width: 40px; text-align: right;`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LeaderboardList;
