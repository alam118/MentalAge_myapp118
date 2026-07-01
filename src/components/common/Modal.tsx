/**
 * Modal Component
 * Full-screen overlay modal with backdrop blur.
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Backdrop
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <ModalContainer
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {title && <Title>{title}</Title>}
            <Content>{children}</Content>
          </ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: ${theme.zIndices.modal};
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${theme.zIndices.modal + 1};
  background: ${theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.xl};
  padding: 32px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.card};
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  font-size: ${theme.typography.fontSizes.xxl};
  color: ${theme.colors.textMain};
`;

const Content = styled.div`
  color: ${theme.colors.textSecondary};
`;

export default Modal;
