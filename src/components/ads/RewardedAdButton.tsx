/**
 * RewardedAdButton Component
 * A specialized button that triggers a rewarded ad before performing an action.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Button from '../common/Button';
import { PlayCircle, Lock } from 'lucide-react';

interface RewardedAdButtonProps {
  label: string;
  onAdComplete: () => void;
  icon?: React.ReactNode;
}

const RewardedAdButton: React.FC<RewardedAdButtonProps> = ({ label, onAdComplete, icon }) => {
  const [loading, setLoading] = useState(false);

  const handleWatchAd = () => {
    setLoading(true);
    // Simulate Ad Loading and Watching
    setTimeout(() => {
      setLoading(false);
      onAdComplete();
    }, 2000); 
  };

  return (
    <Button fullWidth onClick={handleWatchAd} loading={loading}>
      <Content>
        {icon || <Lock size={18} />}
        <span>{label}</span>
        <AdTag>Watch Ad</AdTag>
      </Content>
    </Button>
  );
};

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const AdTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
  margin-left: 4px;
`;

export default RewardedAdButton;
