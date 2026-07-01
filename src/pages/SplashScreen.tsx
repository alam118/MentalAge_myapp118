/**
 * SplashScreen Page
 * The initial landing experience with animated logo and PWA prep.
 */

import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Logic to check if profile exists, otherwise go to language/onboarding
      navigate(ROUTES.LANGUAGE_SELECT);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <AnimatedBackground />
      <LogoWrapper
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <BrainIcon>🧠</BrainIcon>
        <AppTitle>MENTAL AGE</AppTitle>
        <Subtitle>AI Personality Analyzer</Subtitle>
      </LogoWrapper>
      
      <LoadingBar>
        <Progress />
      </LoadingBar>
    </Container>
  );
};

const pulse = keyframes`
  0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.4)); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 30px rgba(0, 240, 255, 0.8)); }
  100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.4)); }
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const LogoWrapper = styled(motion.div)`
  text-align: center;
  z-index: 10;
`;

const BrainIcon = styled.div`
  font-size: 100px;
  margin-bottom: 20px;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const AppTitle = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 42px;
  font-weight: 800;
  letter-spacing: 4px;
  color: ${theme.colors.textMain};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.accent};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 8px;
`;

const load = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const LoadingBar = styled.div`
  position: absolute;
  bottom: 80px;
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: ${theme.colors.primaryGradient};
  animation: ${load} 2.5s ease-in-out forwards;
`;

export default SplashScreen;
