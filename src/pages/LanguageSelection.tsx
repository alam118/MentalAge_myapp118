/**
 * LanguageSelection Page
 * Allows users to select their preferred language from the 6 supported options.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import LanguageSelector from '@/components/common/LanguageSelector';
import Button from '@/components/common/Button';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import { motion } from 'framer-motion';

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(ROUTES.ONBOARDING);
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatedBackground />
      <Content>
        <Header>
          <Title>Choose Language</Title>
          <Subtitle>Select your preferred language to continue the analysis.</Subtitle>
        </Header>
        
        <SelectorWrapper>
          <LanguageSelector />
        </SelectorWrapper>

        <Footer>
          <Button fullWidth size="lg" onClick={handleContinue}>
            Continue
          </Button>
        </Footer>
      </Content>
    </PageContainer>
  );
};

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Content = styled.div`
  z-index: 1;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.hero};
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
`;

const SelectorWrapper = styled.div`
  margin-bottom: 40px;
`;

const Footer = styled.div`
  margin-top: auto;
`;

export default LanguageSelection;
