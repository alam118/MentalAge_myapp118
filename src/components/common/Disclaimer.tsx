/**
 * Disclaimer Component
 * Displays the legal notice about the entertainment nature of the test.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { LEGAL } from '@/utils/constants';

interface DisclaimerProps {
  variant?: 'short' | 'full';
}

const Disclaimer: React.FC<DisclaimerProps> = ({ variant = 'short' }) => {
  return (
    <Container>
      <Icon>ℹ️</Icon>
      <Text>
        {variant === 'short' ? LEGAL.DISCLAIMER_SHORT : LEGAL.DISCLAIMER_FULL}
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: ${theme.borders.radius.md};
  margin: 16px 0;
`;

const Icon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
`;

const Text = styled.p`
  margin: 0;
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
`;

export default Disclaimer;
