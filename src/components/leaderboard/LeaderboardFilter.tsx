/**
 * LeaderboardFilter Component
 * Tabs to switch between Global, Country, and Friend rankings.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

type FilterType = 'global' | 'country' | 'friends';

interface LeaderboardFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const LeaderboardFilter: React.FC<LeaderboardFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filters: { id: FilterType; label: string }[] = [
    { id: 'global', label: 'Global' },
    { id: 'country', label: 'Country' },
    { id: 'friends', label: 'Friends' },
  ];

  return (
    <FilterContainer>
      {filters.map((f) => (
        <FilterTab
          key={f.id}
          active={activeFilter === f.id}
          onClick={() => onFilterChange(f.id)}
        >
          {f.label}
        </FilterTab>
      ))}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  background: ${theme.colors.surface};
  padding: 4px;
  border-radius: ${theme.borders.radius.round};
  border: 1px solid ${theme.colors.glassBorder};
  margin-bottom: 24px;
`;

const FilterTab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border-radius: ${theme.borders.radius.round};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all ${theme.transitions.default};
  color: ${({ active }) => (active ? theme.colors.background : theme.colors.textSecondary)};
  background: ${({ active }) => (active ? theme.colors.accent : 'transparent')};

  &:hover {
    color: ${({ active }) => (active ? theme.colors.background : theme.colors.textMain)};
  }
`;

export default LeaderboardFilter;
