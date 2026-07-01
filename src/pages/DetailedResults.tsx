/**
 * DetailedResults Page
 * A deep-dive view of a specific test result, showing full AI analysis and graphs.
 */

import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { ROUTES } from '@/utils/constants';
import { useResults } from '@/hooks/useResults';
import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import MentalAgeDisplay from '@/components/results/MentalAgeDisplay';
import AIExplanation from '@/components/results/AIExplanation';
import ComparisonGraph from '@/components/results/ComparisonGraph';
import TraitsChart from '@/components/results/TraitsChart';
import Button from '@/components/common/Button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

const DetailedResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getResult, shareResult } = useResults();

  const result = id ? getResult(id) : null;

  if (!result) {
    return (
      <Layout>
        <Container>
          <p>Result not found.</p>
          <Button onClick={() => navigate(ROUTES.HOME)}>Go Home</Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <Container>
        <TopNav>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Back
          </BackButton>
          <Title>Analysis Deep-Dive</Title>
        </TopNav>

        <MentalAgeDisplay 
          mentalAge={result.mentalAgeScore} 
          chronologicalAge={result.chronologicalAge} 
        />

        <Section>
          <SectionTitle>How you compare</SectionTitle>
          <ComparisonGraph mentalAge={result.mentalAgeScore} chronologicalAge={result.chronologicalAge} />
        </Section>

        <AIExplanation analysis={result.aiAnalysis} />

        <Section>
          <SectionTitle>Brain Metrics</SectionTitle>
          <TraitsChart traits={[]} /> {/* Logic to map result.answers to traits would go here */}
        </Section>

        <ActionGrid>
          <Button onClick={() => shareResult(result.mentalAgeScore, result.shareId)}>
            <Share2 size={18} /> Share
          </Button>
          <Button variant="secondary">
            <Download size={18} /> Export PDF
          </Button>
        </ActionGrid>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const TopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${theme.colors.textMuted};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.lg};
  font-family: ${theme.typography.fontFamily.heading};
`;

const Section = styled.div`margin-bottom: 32px;`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.accent};
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
`;

export default DetailedResults;
