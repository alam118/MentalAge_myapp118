/**
 * ShareCard Component
 * A visually optimized card specifically for generating shareable images.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { appConfig } from '@/config/appConfig';

interface ShareCardProps {
  mentalAge: number;
  brainType: string;
  userName: string;
}

const ShareCard: React.FC<ShareCardProps> = ({ mentalAge, brainType, userName }) => {
  return (
    <Wrapper id="share-card">
      <Branding>{appConfig.name}</Branding>
      <Content>
        <Greeting>{userName}'s Result</Greeting>
        <ResultBox>
          <AgeLabel>Mental Age</AgeLabel>
          <AgeValue>{mentalAge}</AgeValue>
        </ResultBox>
        <BrainType>{brainType}</BrainType>
      </Content>
      <Footer>Find your age at {appConfig.url}</Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1080px; /* High-res for Instagram/WhatsApp */
  height: 1080px;
  background: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
    top: -25%;
    left: -25%;
  }
`;

const Branding = styled.div`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 48px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.accent};
  margin-bottom: 60px;
  z-index: 1;
`;

const Content = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 60px;
  padding: 80px;
  width: 100%;
  text-align: center;
  z-index: 1;
`;

const Greeting = styled.div`
  font-size: 36px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 40px;
`;

const ResultBox = styled.div`
  background: ${theme.colors.primaryGradient};
  padding: 60px;
  border-radius: 40px;
  margin-bottom: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
`;

const AgeLabel = styled.div`
  font-size: 32px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 4px;
`;

const AgeValue = styled.div`
  font-size: 240px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
`;

const BrainType = styled.div`
  font-size: 54px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textMain};
`;

const Footer = styled.div`
  margin-top: 60px;
  font-size: 28px;
  color: ${theme.colors.textMuted};
  z-index: 1;
`;

export default ShareCard;
