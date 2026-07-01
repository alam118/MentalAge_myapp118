/**
 * Leaderboard Page
 * Displays competitive rankings and social standing.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import LeaderboardList from '@/components/leaderboard/LeaderboardList';
import LeaderboardFilter from '@/components/leaderboard/LeaderboardFilter';
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState<'global' | 'country' | 'friends'>('global');

  return (
    <Layout>
      <Header />
      <Container
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeroSection>
          <IconWrapper>
            <Trophy size={40} />
          </IconWrapper>
          <Title>Global Rankings</Title>
          <Subtitle>See where you stand among the most evolved minds.</Subtitle>
        </HeroSection>

        <LeaderboardFilter activeFilter={filter} onFilterChange={setFilter} />
        
        <LeaderboardList />
        
        <PromotionText>
          Take more tests to improve your consistency and climb the ranks!
        </PromotionText>
      </Container>
      <Navigation />
    </Layout>
  );
};

const Container = styled(motion.div)`
  padding: 24px 20px 100px 20px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const IconWrapper = styled.div`
  color: #FFD700;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4));
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.hero};
  font-family: ${theme.typography.fontFamily.heading};
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSizes.sm};
`;

const PromotionText = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
  font-style: italic;
`;

export default Leaderboard;
