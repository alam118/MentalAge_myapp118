/**
 * ExitDialog Component
 * Confirmation dialog for app exit with double-back functionality.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Button from './Button';
import Modal from './Modal';

interface ExitDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitDialog: React.FC<ExitDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Exit App?">
      <Message>Are you sure you want to exit the Mental Age Test?</Message>
      <Actions>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Exit
        </Button>
      </Actions>
    </Modal>
  );
};

const Message = styled.p`
  margin: 0 0 24px 0;
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export default ExitDialog;
