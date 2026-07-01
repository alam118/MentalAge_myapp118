/**
 * ProfileStats Component
 * Displays key user statistics in the profile view.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import GlassCard from '../common/GlassCard';

interface ProfileStatsProps {
  totalTests: number;
  avgMentalAge: number;
  brainType: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ totalTests, avgMentalAge, brainType }) => {
  return (
    <StatsGrid>
      <StatCard>
        <Value>{totalTests}</Value>
        <Label>Tests</Label>
      </StatCard>
      <StatCard>
        <Value>{avgMentalAge || '--'}</Value>
        <Label>Avg Age</Label>
      </StatCard>
      <StatCard full>
        <Value small>{brainType || 'Explorer'}</Value>
        <Label>Current Archetype</Label>
      </StatCard>
    </StatsGrid>
  );
};

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
`;

const StatCard = styled(GlassCard)<{ full?: boolean }>`
  grid-column: ${({ full }) => (full ? 'span 2' : 'span 1')};
  text-align: center;
  padding: 16px;
`;

const Value = styled.div<{ small?: boolean }>`
  font-size: ${({ small }) => (small ? theme.typography.fontSizes.lg : theme.typography.fontSizes.xxl)};
  font-weight: bold;
  color: ${theme.colors.accent};
  margin-bottom: 4px;
`;

const Label = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default ProfileStats;
