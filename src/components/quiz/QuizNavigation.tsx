/**
 * QuizNavigation Component
 * Standard controls for the quiz flow, used in all test pages.
 */

import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface QuizNavigationProps {
  onBack: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  canContinue: boolean;
  loading?: boolean;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  onBack,
  onNext,
  isFirst,
  isLast,
  canContinue,
  loading
}) => {
  return (
    <NavWrapper>
      {!isFirst && (
        <Button variant="secondary" onClick={onBack} disabled={loading}>
          <ChevronLeft size={20} />
        </Button>
      )}
      <Button 
        fullWidth 
        onClick={onNext} 
        disabled={!canContinue || loading}
        loading={loading}
      >
        <BtnContent>
          <span>{isLast ? "Complete Analysis" : "Next Question"}</span>
          {isLast ? <CheckCircle size={20} /> : <ChevronRight size={20} />}
        </BtnContent>
      </Button>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;
`;

const BtnContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export default QuizNavigation;
