/**
 * AnswerOption Component
 * Individual answer choice button with selection state.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { AnswerOption as AnswerType } from '@/types';
import { triggerHaptic } from '@/utils/helpers';

interface AnswerOptionProps {
  option: AnswerType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  const handleClick = () => {
    triggerHaptic(10);
    onSelect(option.id);
  };

  return (
    <OptionButton isSelected={isSelected} onClick={handleClick}>
      <Checkmark isSelected={isSelected}>
        {isSelected && '✓'}
      </Checkmark>
      <OptionText>{option.text}</OptionText>
    </OptionButton>
  );
};

const OptionButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px 20px;
  background: ${({ isSelected }) =>
    isSelected ? theme.colors.primaryGradient : theme.colors.surface};
  border: 1px solid ${({ isSelected }) =>
    isSelected ? theme.colors.accent : theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.md};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  text-align: left;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${theme.colors.accent};
    transform: translateX(4px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Checkmark = styled.div<{ isSelected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ isSelected }) =>
    isSelected ? theme.colors.textMain : theme.colors.glassBorder};
  background: ${({ isSelected }) =>
    isSelected ? 'transparent' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${theme.colors.textMain};
  flex-shrink: 0;
`;

const OptionText = styled.span`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textMain};
  line-height: 1.5;
`;

export default AnswerOption;
