/**
 * BannerAd Component
 * Ad placement placeholder. In a production environment with AdMob or similar,
 * this would wrap the native ad SDK component.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface BannerAdProps {
  placementId: string;
}

const BannerAd: React.FC<BannerAdProps> = ({ placementId }) => {
  // We only show ads if it's not a premium version (logic handled by caller)
  return (
    <AdWrapper>
      <AdLabel>Sponsored Content • {placementId}</AdLabel>
      <AdPlaceholder>
        <AdText>Discover More Insights</AdText>
        <AdCTA>Learn More</AdCTA>
      </AdPlaceholder>
    </AdWrapper>
  );
};

const AdWrapper = styled.div`
  width: 100%;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AdLabel = styled.span`
  font-size: 10px;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-left: 4px;
`;

const AdPlaceholder = styled.div`
  height: 60px;
  background: linear-gradient(90deg, #1A2138 0%, #0F172A 100%);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const AdText = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const AdCTA = styled.div`
  padding: 6px 12px;
  background: ${theme.colors.accent};
  color: ${theme.colors.background};
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
`;

export default BannerAd;
