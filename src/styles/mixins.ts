/**
 * Styled Components Mixins
 * Reusable CSS-in-JS style blocks for consistent glassmorphism and effects.
 */

import { css } from 'styled-components';
import { theme } from './theme';

export const glassEffect = css`
  background: ${theme.colors.surface};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${theme.colors.glassBorder};
`;

export const glassEffectStrong = css`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glassBorderHighlight};
`;

export const neonGlow = css`
  box-shadow: ${theme.shadows.neon};
`;

export const neonGlowStrong = css`
  box-shadow: ${theme.shadows.neonStrong};
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const truncateText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const clampLines = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const hideScrollbar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const cardHover = css`
  transition: all ${theme.transitions.default};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.colors.accent};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const gradientText = css`
  background: ${theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const safeAreaBottom = css`
  padding-bottom: env(safe-area-inset-bottom);
`;

export const safeAreaTop = css`
  padding-top: env(safe-area-inset-top);
`;
