/**
 * ProfileSetup Page
 * Initial user registration to personalize the AI analysis.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { useUser } from '@/context/UserContext';
import ProfileForm, { ProfileFormData } from '@/components/profile/ProfileForm';
import { userService } from '@/services/storage/userService';
import { motion } from 'framer-motion';

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { refreshUser } = useUser();

  const handleProfileSubmit = (data: ProfileFormData) => {
    userService.createProfile({
      name: data.name,
      age: data.age,
      gender: data.gender,
      country: data.country
    });
    refreshUser();
    navigate(ROUTES.HOME);
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Header>
        <Emoji>✨</Emoji>
        <Title>Create Profile</Title>
        <Subtitle>This helps our AI provide a more accurate personality analysis.</Subtitle>
      </Header>

      <ProfileForm onSubmit={handleProfileSubmit} />
    </Container>
  );
};

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 60px 24px;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Emoji = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.hero};
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
`;

export default ProfileSetup;
