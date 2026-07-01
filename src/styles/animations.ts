/**
 * CSS Keyframe Animations
 * Reusable keyframes for styled-components to provide that premium AI feel.
 */

import { keyframes } from 'styled-components';

export const fadeInKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeInUpKeyframes = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const floatKeyframes = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const pulseGlowKeyframes = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 240, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 240, 255, 0.2); }
`;

export const shimmerKeyframes = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const spinKeyframes = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const skeletonLoading = keyframes`
  0% { background-color: rgba(255, 255, 255, 0.05); }
  50% { background-color: rgba(255, 255, 255, 0.1); }
  100% { background-color: rgba(255, 255, 255, 0.05); }
`;
