/**
 * AnimatedBackground Component
 * Particle animation effect for premium AI feel.
 */

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

const AnimatedBackground: React.FC = () => {
  return (
    <Container>
      <Particle delay={0} />
      <Particle delay={2} />
      <Particle delay={4} />
      <Particle delay={1} />
      <Particle delay={3} />
    </Container>
  );
};

const float = keyframes`
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-100px) translateX(50px);
    opacity: 0.8;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Particle = styled.div<{ delay: number }>`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${theme.colors.accent};
  border-radius: 50%;
  box-shadow: 0 0 10px ${theme.colors.accent};
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
  
  &:nth-child(1) { top: 20%; left: 10%; }
  &:nth-child(2) { top: 40%; left: 80%; }
  &:nth-child(3) { top: 60%; left: 30%; }
  &:nth-child(4) { top: 80%; left: 70%; }
  &:nth-child(5) { top: 50%; left: 50%; }
`;

export default AnimatedBackground;
