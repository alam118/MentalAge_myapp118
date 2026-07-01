/**
 * ConfirmDialog Component
 * A reusable modal for critical actions (Delete, Reset, Exit).
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Modal from './Modal';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <Message>{message}</Message>
      <ActionGroup>
        <Button variant="ghost" onClick={onClose}>
          {cancelText}
        </Button>
        <Button 
          variant="primary" 
          onClick={onConfirm}
          style={isDanger ? { background: theme.colors.error } : {}}
        >
          {confirmText}
        </Button>
      </ActionGroup>
    </Modal>
  );
};

const Message = styled.p`
  margin-bottom: 24px;
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
`;

const ActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export default ConfirmDialog;
