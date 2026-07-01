/**
 * FeatureCard Component
 * Interactive cards for the home dashboard categories.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <Card
      as={motion.div}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

const Card = styled.div`
  background: ${theme.colors.surface};
  backdrop-filter: blur(12px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.lg};
  padding: 24px;
  cursor: pointer;
  transition: border-color ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.accent};
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(0, 240, 255, 0.1);
  border-radius: ${theme.borders.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
  color: ${theme.colors.accent};
`;

const Title = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.textMain};
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textMuted};
  line-height: 1.4;
`;

export default FeatureCard;
