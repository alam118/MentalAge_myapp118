/**
 * Header Component
 * Top navigation bar showing the app logo and quick access to settings/profile.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { Settings, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  // Don't show header on splash or onboarding
  const hideHeader = [ROUTES.SPLASH, ROUTES.ONBOARDING, ROUTES.LANGUAGE_SELECT, ROUTES.PROFILE_SETUP].includes(location.pathname as any);

  if (hideHeader) return null;

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate(ROUTES.HOME)}>
        <BrainEmoji>🧠</BrainEmoji>
        <LogoText>MentalAge</LogoText>
      </Logo>

      <Actions>
        <ActionButton onClick={() => navigate(ROUTES.SETTINGS)}>
          <Settings size={22} />
        </ActionButton>
        <ProfileButton onClick={() => navigate(ROUTES.SETTINGS)}>
          <UserIconWrapper>
            <User size={18} />
          </UserIconWrapper>
          <UserName>{user?.name?.split(' ')[0]}</UserName>
        </ProfileButton>
      </Actions>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(10, 15, 36, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.glassBorder};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndices.header};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const BrainEmoji = styled.span`
  font-size: 24px;
`;

const LogoText = styled.span`
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.textMain};
  letter-spacing: -0.5px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActionButton = styled.button`
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: ${theme.borders.radius.round};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.surface};
    color: ${theme.colors.accent};
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  padding: 4px 12px 4px 4px;
  border-radius: 20px;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.accent};
  }
`;

const UserIconWrapper = styled.div`
  width: 28px;
  height: 28px;
  background: ${theme.colors.primaryGradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const UserName = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textMain};
`;

export default Header;
