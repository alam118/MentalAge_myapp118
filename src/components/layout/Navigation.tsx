/**
 * Navigation Component
 * Bottom navigation bar for the PWA experience, providing quick links
 * to Home, History, and Results.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { Home, History, PieChart, Info } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide nav on entry/onboarding screens
  const hideNav = [ROUTES.SPLASH, ROUTES.ONBOARDING, ROUTES.LANGUAGE_SELECT, ROUTES.PROFILE_SETUP].includes(location.pathname as any);

  if (hideNav) return null;

  const navItems = [
    { label: 'Home', icon: <Home size={22} />, path: ROUTES.HOME },
    { label: 'History', icon: <History size={22} />, path: ROUTES.HISTORY },
    { label: 'Stats', icon: <PieChart size={22} />, path: ROUTES.RESULTS },
    { label: 'About', icon: <Info size={22} />, path: ROUTES.SETTINGS },
  ];

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <NavLabel>{item.label}</NavLabel>
          {location.pathname === item.path && <ActiveIndicator layoutId="nav-active" />}
        </NavItem>
      ))}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  background: rgba(10, 15, 36, 0.95);
  backdrop-filter: blur(15px);
  border-top: 1px solid ${theme.colors.glassBorder};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: ${theme.zIndices.header};
`;

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${({ active }) => (active ? theme.colors.accent : theme.colors.textMuted)};
  transition: all ${theme.transitions.default};
  position: relative;
  flex: 1;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: ${theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: -12px;
  width: 20px;
  height: 3px;
  background: ${theme.colors.accent};
  border-radius: 0 0 3px 3px;
  box-shadow: 0 2px 10px ${theme.colors.accent};
`;

export default Navigation;
