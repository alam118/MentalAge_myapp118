/**
 * NativeAd Component
 * A "Integrated" ad style that matches the glassmorphism UI cards.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { ExternalLink } from 'lucide-react';

const NativeAd: React.FC = () => {
  return (
    <AdCard>
      <AdBadge>SPONSORED</AdBadge>
      <Content>
        <ImagePlaceholder />
        <Info>
          <AdTitle>Upgrade Your IQ Today</AdTitle>
          <AdDesc>Join 1M+ users in the ultimate brain training program.</AdDesc>
          <CTAButton>
            Install <ExternalLink size={12} />
          </CTAButton>
        </Info>
      </Content>
    </AdCard>
  );
};

const AdCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorderHighlight};
  border-radius: ${theme.borders.radius.lg};
  padding: 16px;
  margin: 24px 0;
  position: relative;
`;

const AdBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 8px;
  color: ${theme.colors.textMuted};
  letter-spacing: 1px;
`;

const Content = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ImagePlaceholder = styled.div`
  width: 64px;
  height: 64px;
  background: ${theme.colors.primaryGradient};
  border-radius: ${theme.borders.radius.md};
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
`;

const AdTitle = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: bold;
  color: ${theme.colors.textMain};
  margin-bottom: 4px;
`;

const AdDesc = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
  line-height: 1.3;
  margin-bottom: 8px;
`;

const CTAButton = styled.button`
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default NativeAd;
