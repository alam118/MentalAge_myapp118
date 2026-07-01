/**
 * Onboarding Page
 * Introduction flow explaining Mental Age, Personality, and AI analysis.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import OnboardingSlide from '@/components/onboarding/OnboardingSlide';
import Button from '@/components/common/Button';
import { AnimatePresence, motion } from 'framer-motion';

const ONBOARDING_DATA = [
  {
    title: "Discover Your Mind",
    description: "Your brain age might be different from your real age. Let's find out yours!",
    image: "🧠"
  },
  {
    title: "AI Analysis",
    description: "Our advanced AI analyzes your behavior and habits to build a unique personality profile.",
    image: "⚡"
  },
  {
    title: "Share with Friends",
    description: "Get detailed insights and share your results with your community.",
    image: "🎉"
  }
];

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < ONBOARDING_DATA.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate(ROUTES.PROFILE_SETUP);
    }
  };

  return (
    <Container>
      <SlideWrapper>
        <AnimatePresence mode="wait">
          <OnboardingSlide
            key={currentStep}
            title={ONBOARDING_DATA[currentStep].title}
            description={ONBOARDING_DATA[currentStep].description}
            image={ONBOARDING_DATA[currentStep].image}
          />
        </AnimatePresence>
      </SlideWrapper>

      <Footer>
        <Pagination>
          {ONBOARDING_DATA.map((_, i) => (
            <Dot key={i} active={i === currentStep} />
          ))}
        </Pagination>
        <Button fullWidth size="lg" onClick={handleNext}>
          {currentStep === ONBOARDING_DATA.length - 1 ? "Get Started" : "Next"}
        </Button>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
`;

const SlideWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? '24px' : '8px')};
  height: 8px;
  border-radius: 4px;
  background: ${({ active }) => (active ? theme.colors.accent : 'rgba(255, 255, 255, 0.2)')};
  transition: all 0.3s ease;
`;

export default Onboarding;
