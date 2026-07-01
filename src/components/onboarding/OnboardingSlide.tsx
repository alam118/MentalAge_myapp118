/**
 * OnboardingSlide Component
 * Premium slide layout for the introduction screens.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';

interface OnboardingSlideProps {
  title: string;
  description: string;
  image: string; // Emoji or SVG
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ title, description, image }) => {
  return (
    <SlideContainer
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <ImageWrapper>
        <MainEmoji>{image}</MainEmoji>
        <Glow />
      </ImageWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </SlideContainer>
  );
};

const SlideContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const MainEmoji = styled.div`
  font-size: 100px;
  z-index: 2;
`;

const Glow = styled.div`
  position: absolute;
  width: 140px;
  height: 140px;
  background: ${theme.colors.accent};
  filter: blur(60px);
  opacity: 0.4;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSizes.hero};
  font-family: ${theme.typography.fontFamily.heading};
  color: ${theme.colors.textMain};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 300px;
`;

export default OnboardingSlide;
