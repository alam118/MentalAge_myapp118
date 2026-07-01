/**
 * QuizTimer Component
 * An optional timer for quiz questions to add engagement.
 * Displays a circular progress ring that counts down.
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface QuizTimerProps {
  seconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ seconds, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const percentage = (timeLeft / seconds) * 100;

  return (
    <TimerContainer>
      <TimerCircle viewBox="0 0 36 36">
        <BackgroundPath d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <ActivePath 
          percentage={percentage}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
        />
      </TimerCircle>
      <TimeText isUrgent={timeLeft <= 5}>{timeLeft}</TimeText>
    </TimerContainer>
  );
};

const TimerContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const TimerCircle = styled.svg`
  width: 100%;
  height: 100%;
`;

const BackgroundPath = styled.path`
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 3;
`;

const ActivePath = styled.path<{ percentage: number }>`
  fill: none;
  stroke: ${theme.colors.accent};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: ${({ percentage }) => `${percentage}, 100`};
  transition: stroke-dasharray 1s linear;
`;

const TimeText = styled.div<{ isUrgent: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: bold;
  color: ${({ isUrgent }) => isUrgent ? theme.colors.error : theme.colors.textMain};
`;

export default QuizTimer;
