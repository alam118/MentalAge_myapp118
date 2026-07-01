/**
 * ShareImageTemplate Component
 * The high-fidelity DOM node that is captured to generate shareable images.
 * Hidden from standard UI, only used for rendering.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { appConfig } from '@/config/appConfig';

interface ShareImageTemplateProps {
  mentalAge: number;
  brainType: string;
  userName: string;
}

const ShareImageTemplate: React.FC<ShareImageTemplateProps> = ({ mentalAge, brainType, userName }) => {
  return (
    <TemplateWrapper id="capture-template">
      <BackgroundGlow />
      <Header>
        <Logo>🧠 {appConfig.name}</Logo>
      </Header>
      
      <MainContent>
        <UserLabel>{userName}'s Result</UserLabel>
        <ResultCircle>
          <AgeLabel>Mental Age</AgeLabel>
          <AgeValue>{mentalAge}</AgeValue>
        </ResultCircle>
        <Archetype>{brainType}</Archetype>
      </MainContent>

      <Footer>
        <Url>{appConfig.url}</Url>
        <Tagline>Analyze your brain type with AI</Tagline>
      </Footer>
    </TemplateWrapper>
  );
};

const TemplateWrapper = styled.div`
  width: 1080px;
  height: 1080px;
  background: #0A0F24;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 80px;
  position: fixed;
  top: -2000px; /* Hide from viewport */
  left: -2000px;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, transparent 70%);
`;

const Header = styled.div`z-index: 1;`;

const Logo = styled.h1`
  font-size: 48px;
  color: ${theme.colors.accent};
  font-family: ${theme.typography.fontFamily.heading};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const UserLabel = styled.div`
  font-size: 36px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 40px;
`;

const ResultCircle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: ${theme.colors.primaryGradient};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 80px rgba(0, 240, 255, 0.4);
  margin-bottom: 40px;
`;

const AgeLabel = styled.span`
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0.8;
`;

const AgeValue = styled.span`
  font-size: 240px;
  font-weight: 900;
  line-height: 1;
`;

const Archetype = styled.div`
  font-size: 54px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const Footer = styled.div`
  text-align: center;
  z-index: 1;
`;

const Url = styled.div`
  font-size: 32px;
  color: ${theme.colors.accent};
  font-weight: bold;
  margin-bottom: 8px;
`;

const Tagline = styled.div`
  font-size: 24px;
  color: ${theme.colors.textMuted};
`;

export default ShareImageTemplate;
