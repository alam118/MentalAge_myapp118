/**
 * Home Page (Dashboard)
 * The main hub where users can access different AI tests and see quick stats.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useUser } from '@/context/UserContext';
import FeatureGrid from '@/components/dashboard/FeatureGrid';
import Disclaimer from '@/components/common/Disclaimer';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <PageWrapper>
      <AnimatedBackground />
      <Content
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Header>
          <Greeting>
            <Welcome>Welcome back,</Welcome>
            <Name>{user?.name || 'Explorer'} 👋</Name>
          </Greeting>
          <StatsCard>
            <StatItem>
              <StatValue>{user?.age || '--'}</StatValue>
              <StatLabel>Real Age</StatLabel>
            </StatItem>
            <Divider />
            <StatItem>
              <StatValue>AI</StatValue>
              <StatLabel>Ready</StatLabel>
            </StatItem>
          </StatsCard>
        </Header>

        <SectionTitle>Pick a Test</SectionTitle>
        <FeatureGrid />

        <Disclaimer variant="full" />
      </Content>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 32px 20px;
  position: relative;
`;

const Content = styled(motion.div)`
  z-index: 1;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 40px;
`;

const Greeting = styled.div`
  margin-bottom: 24px;
`;

const Welcome = styled.div`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
`;

const Name = styled.h1`
  font-size: ${theme.typography.fontSizes.hero};
  font-family: ${theme.typography.fontFamily.heading};
`;

const StatsCard = styled.div`
  display: flex;
  background: ${theme.colors.surface};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.lg};
  padding: 20px;
  justify-content: space-around;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: bold;
  color: ${theme.colors.accent};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
`;

const Divider = styled.div`
  width: 1px;
  background: ${theme.colors.glassBorder};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.lg};
  margin-bottom: 20px;
`;

export default Home;
