/**
 * NotFound Page
 * 404 Error screen with a themed design.
 */

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/common/Button';
import { Ghost } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconWrapper>
        <Ghost size={80} />
      </IconWrapper>
      <ErrorCode>404</ErrorCode>
      <Title>Lost in the Void?</Title>
      <Message>
        It seems this part of your brain is still unexplored. Let's get you back to safety.
      </Message>
      <Button onClick={() => navigate(ROUTES.HOME)}>
        Back to Dashboard
      </Button>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: ${theme.colors.background};
`;

const IconWrapper = styled.div`
  color: ${theme.colors.accent};
  margin-bottom: 24px;
  opacity: 0.5;
`;

const ErrorCode = styled.div`
  font-size: 80px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.05);
  position: absolute;
  z-index: 0;
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.xxl};
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
`;

const Message = styled.p`
  color: ${theme.colors.textSecondary};
  max-width: 300px;
  margin-bottom: 32px;
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

export default NotFound;
