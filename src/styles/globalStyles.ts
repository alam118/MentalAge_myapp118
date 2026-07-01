import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset & Base */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  :root {
    color-scheme: dark;
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.background};
    color: ${theme.colors.textMain};
    font-family: ${theme.typography.fontFamily.body};
    font-size: 16px;
    line-height: 1.5;
    overflow-x: hidden;
    /* Prevent text size adjustment after orientation change on mobile */
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  #root {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: ${theme.zIndices.base};
  }

  /* Typography Defaults */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily.heading};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: 1.2;
    color: ${theme.colors.textMain};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${theme.transitions.fast};
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    background: none;
    border: none;
    outline: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  /* Premium Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.glassBorder};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.accent};
  }

  /* Global Selection Color */
  ::selection {
    background-color: rgba(0, 240, 255, 0.3);
    color: #FFFFFF;
  }

  /* Glassmorphism Utility Classes */
  .glass-effect {
    background: ${theme.colors.surface};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid ${theme.colors.glassBorder};
    box-shadow: ${theme.shadows.glass};
  }

  /* Page Transition Classes (for Framer Motion) */
  .page-container {
    width: 100%;
    max-width: 500px; /* Optimal mobile reading width */
    margin: 0 auto;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Input Placeholder Styling */
  ::placeholder {
    color: ${theme.colors.textMuted};
    opacity: 0.7;
  }
`;
