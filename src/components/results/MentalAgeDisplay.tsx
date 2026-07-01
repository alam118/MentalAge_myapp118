/**
 * MentalAgeDisplay Component
 * Large, animated display of the calculated mental age score.
 */

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';

interface MentalAgeDisplayProps {
  mentalAge: number;
  chronologicalAge: number;
}

const MentalAgeDisplay: React.FC<MentalAgeDisplayProps> = ({
  mentalAge,
  chronologicalAge,
}) => {
  const delta = mentalAge - chronologicalAge;
  const comparison = delta > 0 ? 'ahead' : delta < 0 ? 'behind' : 'in-sync';

  return (
    <Container
      as={motion.div}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', duration: 0.8 }}
    >
      <Label>Your Mental Age</Label>
      <Age>{mentalAge}</Age>
      <Subtitle>
        {comparison === 'in-sync' && '🎯 Perfectly balanced!'}
        {comparison === 'ahead' && `🚀 ${Math.abs(delta)} years ahead!`}
        {comparison === 'behind' && `🌟 ${Math.abs(delta)} years young at heart!`}
      </Subtitle>
    </Container>
  );
};

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }
  50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.8); }
`;

const Container = styled.div`
  text-align: center;
  padding: 40px;
  background: ${theme.colors.primaryGradient};
  border-radius: ${theme.borders.radius.xl};
  animation: ${glow} 2s ease-in-out infinite;
  margin-bottom: 32px;
`;

const Label = styled.div`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Age = styled.div`
  font-size: 72px;
  font-weight: ${theme.typography.fontWeight.extrabold};
  color: ${theme.colors.textMain};
  font-family: ${theme.typography.fontFamily.heading};
  line-height: 1;
  margin-bottom: 16px;
`;

const Subtitle = styled.div`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.textMain};
`;

export default MentalAgeDisplay;
