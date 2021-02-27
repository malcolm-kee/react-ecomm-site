import * as React from 'react';
import {
  DialogOverlay,
  DialogOverlayProps,
  DialogContent,
  DialogContentProps,
} from '@reach/dialog';
import '@reach/dialog/styles.css';
import styles from './dialog.module.scss';

export interface DialogProps extends DialogContentProps {
  isOpen: DialogOverlayProps['isOpen'];
  onDismiss: DialogOverlayProps['onDismiss'];
  children: React.ReactNode;
  'aria-label': string;
}

export const Dialog = ({ isOpen, onDismiss, ...props }: DialogProps) => {
  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={onDismiss}
      className={styles.overlay}
    >
      <DialogContent {...props} />
    </DialogOverlay>
  );
};
