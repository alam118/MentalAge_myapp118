/**
 * FeatureGrid Component
 * Layout for displaying available tests and tools.
 */

import React from 'react';
import styled from 'styled-components';
import FeatureCard from './FeatureCard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { Brain, User, Zap, Heart, Lightbulb } from 'lucide-react';

const FeatureGrid: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Mental Age Test',
      description: 'Discover the real age of your mindset.',
      icon: <Brain />,
      route: ROUTES.QUIZ.MENTAL_AGE,
    },
    {
      title: 'Personality Test',
      description: 'AI-driven depth analysis of your traits.',
      icon: <User />,
      route: ROUTES.QUIZ.PERSONALITY,
    },
    {
      title: 'IQ Style Quiz',
      description: 'Understand your unique logic style.',
      icon: <Zap />,
      route: ROUTES.QUIZ.IQ_STYLE,
    },
    {
      title: 'Emotional Maturity',
      description: 'How do you handle feelings?',
      icon: <Heart />,
      route: ROUTES.QUIZ.EMOTIONAL,
    },
    {
      title: 'Creativity Score',
      description: 'Measure your imaginative potential.',
      icon: <Lightbulb />,
      route: ROUTES.QUIZ.CREATIVITY,
    },
  ];

  return (
    <Grid>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          onClick={() => navigate(feature.route)}
        />
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default FeatureGrid;
