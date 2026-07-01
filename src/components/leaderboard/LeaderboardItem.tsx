/**
 * LeaderboardItem Component
 * A single row in the leaderboard with rank highlighting for top 3.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Trophy } from 'lucide-react';

interface LeaderboardItemProps {
  rank: number;
  name: string;
  score: number;
  archetype: string;
  isUser?: boolean;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ rank, name, score, archetype, isUser }) => {
  return (
    <ItemRow isUser={isUser}>
      <RankCell>
        {rank <= 3 ? (
          <TrophyIcon rank={rank}><Trophy size={16} /></TrophyIcon>
        ) : (
          <RankNumber>{rank}</RankNumber>
        )}
      </RankCell>
      <UserCell>
        <Name>{name} {isUser && '(You)'}</Name>
        <Archetype>{archetype}</Archetype>
      </UserCell>
      <ScoreCell>{score}</ScoreCell>
    </ItemRow>
  );
};

const ItemRow = styled.div<{ isUser?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${theme.colors.glassBorder};
  background: ${({ isUser }) => (isUser ? 'rgba(0, 240, 255, 0.05)' : 'transparent')};
  
  &:last-child { border-bottom: none; }
`;

const RankCell = styled.div`width: 50px;`;

const TrophyIcon = styled.div<{ rank: number }>`
  color: ${({ rank }) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    return '#CD7F32';
  }};
  filter: drop-shadow(0 0 5px currentColor);
`;

const RankNumber = styled.span`
  color: ${theme.colors.textMuted};
  font-weight: bold;
`;

const UserCell = styled.div`flex: 1;`;

const Name = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textMain};
`;

const Archetype = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
`;

const ScoreCell = styled.div`
  width: 40px;
  text-align: right;
  font-weight: bold;
  color: ${theme.colors.accent};
`;

export default LeaderboardItem;
