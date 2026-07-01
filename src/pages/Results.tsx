/**
 * Results Page
 * Displays the final Mental Age, Personality Analysis, and sharing options.
 */

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { ROUTES } from '@/utils/constants';
import { resultsService } from '@/services/storage/resultsService';
import MentalAgeDisplay from '@/components/results/MentalAgeDisplay';
import PersonalitySummary from '@/components/results/PersonalitySummary';
import TraitsChart from '@/components/results/TraitsChart';
import Button from '@/components/common/Button';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';
import { shareService } from '@/services/share/shareService';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const result = resultsService.getLatestResult();

  if (!result) {
    navigate(ROUTES.HOME);
    return null;
  }

  const handleShare = async () => {
    await shareService.shareResult(result.mentalAgeScore, result.shareId);
  };

  return (
    <PageWrapper>
      <AnimatedBackground />
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MentalAgeDisplay 
          mentalAge={result.mentalAgeScore} 
          chronologicalAge={result.chronologicalAge} 
        />
        
        <PersonalitySummary analysis={result.aiAnalysis} />

        <TraitsChart 
          traits={result.answers.reduce((acc: any[], curr) => {
            const existing = acc.find(t => t.category === curr.category);
            if (existing) {
              existing.score = (existing.score + curr.weight * 20) / 2;
            } else {
              acc.push({ category: curr.category, score: curr.weight * 20 });
            }
            return acc;
          }, [])} 
        />

        <ButtonGroup>
          <Button fullWidth onClick={handleShare}>
            <Share2 size={20} style={{ marginRight: '8px' }} />
            Share Result
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate(ROUTES.HOME)}>
            <RotateCcw size={20} style={{ marginRight: '8px' }} />
            Back to Home
          </Button>
        </ButtonGroup>
      </Content>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
`;

const Content = styled(motion.div)`
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

export default Results;
