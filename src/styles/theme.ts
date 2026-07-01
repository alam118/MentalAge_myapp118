/**
 * Design System Theme
 * Enforces the Premium Neon, Glassmorphism, and Dark Navy styling rules.
 */

export const theme = {
  colors: {
    // Backgrounds
    background: '#0A0F24', // Dark Navy
    surface: 'rgba(255, 255, 255, 0.03)', // Glass base
    surfaceHighlight: 'rgba(255, 255, 255, 0.08)',
    
    // Gradients
    primaryGradient: 'linear-gradient(135deg, #A855F7 0%, #3B82F6 50%, #06B6D4 100%)',
    primaryGradientHover: 'linear-gradient(135deg, #B875F8 0%, #4B8BF6 50%, #16C6D4 100%)',
    
    // Accents
    accent: '#00F0FF', // Neon Blue
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    
    // Typography
    textMain: '#FFFFFF', // White
    textSecondary: '#E2E8F0', // Light Gray
    textMuted: '#94A3B8',
    
    // Glass Borders
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassBorderHighlight: 'rgba(255, 255, 255, 0.2)',
  },
  
  typography: {
    fontFamily: {
      heading: "'Outfit', sans-serif",
      body: "'Inter', sans-serif",
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      title: '2rem',
      hero: '2.5rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  
  borders: {
    radius: {
      sm: '12px',
      md: '16px',
      lg: '24px', // Large rounded corners as per prompt
      xl: '32px',
      round: '50%',
    },
  },
  
  shadows: {
    glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
    neon: '0 0 15px rgba(0, 240, 255, 0.4)', // Neon Blue glow
    neonStrong: '0 0 25px rgba(0, 240, 255, 0.6)',
    card: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
  },
  
  transitions: {
    fast: '0.2s ease-in-out',
    default: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  breakpoints: {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
  },
  
  zIndices: {
    base: 1,
    card: 10,
    header: 50,
    dropdown: 100,
    modal: 1000,
    toast: 2000,
  }
} as const;

export type Theme = typeof theme;
