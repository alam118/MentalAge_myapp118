/**
 * LanguageSelector Component
 * Dropdown/Grid for selecting one of the 6 supported languages.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { appConfig } from '@/config/appConfig';
import { useLanguage } from '@/context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Grid>
      {appConfig.languages.map((lang) => (
        <LangButton
          key={lang.code}
          isActive={language === lang.code}
          onClick={() => setLanguage(lang.code)}
        >
          <LangName>{lang.nativeName}</LangName>
          <LangCode>{lang.code.toUpperCase()}</LangCode>
        </LangButton>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
`;

const LangButton = styled.button<{ isActive: boolean }>`
  padding: 20px;
  background: ${({ isActive }) => 
    isActive ? theme.colors.primaryGradient : theme.colors.surface};
  border: 1px solid ${({ isActive }) =>
    isActive ? theme.colors.accent : theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.md};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const LangName = styled.div`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textMain};
  margin-bottom: 4px;
`;

const LangCode = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textMuted};
`;

export default LanguageSelector;
