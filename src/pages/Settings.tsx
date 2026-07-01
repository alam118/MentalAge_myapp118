/**
 * Settings Page
 * User preferences, language selection, and data management.
 */

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { ROUTES } from '@/utils/constants';
import { useUser } from '@/context/UserContext';
import LanguageSelector from '@/components/common/LanguageSelector';
import Button from '@/components/common/Button';
import GlassCard from '@/components/common/GlassCard';
import { ArrowLeft, Trash2, Shield, Share2, Star } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { clearAllData, user } = useUser();

  const handleDeleteData = () => {
    if (window.confirm("Are you sure? This will delete all your scores and profile.")) {
      clearAllData();
      navigate(ROUTES.SPLASH);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(ROUTES.HOME)}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Settings</Title>
      </Header>

      <Section>
        <SectionTitle>Profile</SectionTitle>
        <GlassCard padding="20px">
          <InfoRow>
            <Label>Name</Label>
            <Value>{user?.name}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Real Age</Label>
            <Value>{user?.age}</Value>
          </InfoRow>
        </GlassCard>
      </Section>

      <Section>
        <SectionTitle>Language</SectionTitle>
        <LanguageSelector />
      </Section>

      <Section>
        <SectionTitle>App</SectionTitle>
        <MenuButton>
          <Shield size={20} />
          <span>Privacy Policy</span>
        </MenuButton>
        <MenuButton>
          <Share2 size={20} />
          <span>Share App</span>
        </MenuButton>
        <MenuButton>
          <Star size={20} />
          <span>Rate Us</span>
        </MenuButton>
      </Section>

      <DangerZone>
        <Button variant="ghost" fullWidth onClick={handleDeleteData}>
          <Trash2 size={18} style={{ marginRight: '8px' }} />
          Clear All Data
        </Button>
      </DangerZone>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const BackButton = styled.button``;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.xl};
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.accent};
  text-transform: uppercase;
  margin-bottom: 16px;
  letter-spacing: 1px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  &:not(:last-child) { border-bottom: 1px solid ${theme.colors.glassBorder}; }
`;

const Label = styled.span`color: ${theme.colors.textSecondary};`;
const Value = styled.span`font-weight: bold;`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px;
  background: ${theme.colors.surface};
  border-radius: ${theme.borders.radius.md};
  margin-bottom: 8px;
  color: ${theme.colors.textMain};
`;

const DangerZone = styled.div`
  margin-top: 40px;
  padding-bottom: 40px;
`;

export default Settings;
