import * as React from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import styles from './dialog.module.scss';

type DialogOverlayProps = React.ComponentPropsWithRef<typeof DialogOverlay>;

export type DialogProps = {
  isOpen: DialogOverlayProps['isOpen'];
  onDismiss: DialogOverlayProps['onDismiss'];
  children: React.ReactNode;
  'aria-label': string;
} & React.ComponentPropsWithRef<typeof DialogContent>;

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
