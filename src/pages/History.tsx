/**
 * History Page
 * Displays a list of all previous test results.
 */

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { ROUTES } from '@/utils/constants';
import { useUser } from '@/context/UserContext';
import HistoryList from '@/components/history/HistoryList';
import Button from '@/components/common/Button';
import { ArrowLeft } from 'lucide-react';

const History: React.FC = () => {
  const navigate = useNavigate();
  const { history } = useUser();

  const handleItemClick = (id: string) => {
    // In a full build, this would navigate to a detailed result page
    navigate(ROUTES.RESULTS); 
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(ROUTES.HOME)}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Test History</Title>
      </Header>

      <StatsRow>
        <StatCard>
          <StatValue>{history.length}</StatValue>
          <StatLabel>Tests Taken</StatLabel>
        </StatCard>
      </StatsRow>

      <HistoryList results={history} onItemClick={handleItemClick} />

      {history.length > 0 && (
        <Footer>
          <Button variant="secondary" fullWidth onClick={() => navigate(ROUTES.HOME)}>
            Take Another Test
          </Button>
        </Footer>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: ${theme.colors.background};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  color: ${theme.colors.textMain};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.xl};
  font-family: ${theme.typography.fontFamily.heading};
`;

const StatsRow = styled.div`
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.lg};
  padding: 20px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSizes.xxl};
  font-weight: bold;
  color: ${theme.colors.accent};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textMuted};
`;

const Footer = styled.div`
  margin-top: 32px;
`;

export default History;
