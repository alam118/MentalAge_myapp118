/**
 * OnboardingNavigation Component
 * Controls for the onboarding flow, including skip and next buttons.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Button from '../common/Button';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onSkip,
}) => {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <NavContainer>
      <SkipButton onClick={onSkip} hidden={isLastStep}>
        Skip
      </SkipButton>
      <Button size="lg" onClick={onNext} fullWidth={isLastStep}>
        {isLastStep ? 'Get Started' : 'Continue'}
      </Button>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 20px;
  gap: 20px;
`;

const SkipButton = styled.button<{ hidden: boolean }>`
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: bold;
  padding: 10px 20px;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.textMain};
  }
`;

export default OnboardingNavigation;
