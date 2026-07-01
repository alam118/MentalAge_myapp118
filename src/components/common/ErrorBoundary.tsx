/**
 * ErrorBoundary Component
 * Catches runtime crashes and provides a graceful "Oops" screen to the user.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { theme } from '@/styles/theme';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <Emoji>🛸</Emoji>
          <Title>Something went wrong</Title>
          <Message>The AI encountered a glitch in the matrix. Please try restarting the app.</Message>
          <Button onClick={() => window.location.reload()}>Refresh App</Button>
        </ErrorWrapper>
      );
    }
    return this.children;
  }
}

const ErrorWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  background: ${theme.colors.background};
`;

const Emoji = styled.div`font-size: 64px; margin-bottom: 24px;`;
const Title = styled.h1`margin-bottom: 16px; color: white;`;
const Message = styled.p`color: ${theme.colors.textSecondary}; margin-bottom: 32px; max-width: 300px;`;

export default ErrorBoundary;
