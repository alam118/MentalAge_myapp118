/**
 * ProfileAvatar Component
 * A styled, themed avatar display for the user profile.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface ProfileAvatarProps {
  name: string;
  size?: number;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, size = 80 }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <AvatarWrapper size={size}>
      <InnerGlow />
      <Initial>{initial}</Initial>
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${theme.colors.primaryGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: ${theme.shadows.neon};
  border: 2px solid ${theme.colors.accent};
`;

const InnerGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 60%);
`;

const Initial = styled.span`
  color: white;
  font-family: ${theme.typography.fontFamily.heading};
  font-size: 32px;
  font-weight: bold;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export default ProfileAvatar;
