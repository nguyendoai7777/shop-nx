'use client';
import { Alert, Snackbar } from '@mui/material';
import { zToastStore } from '@client/z-state';

export const ToastProvider: FCC = () => {
  const { open, message, closeToast, config } = zToastStore();

  const defaultSnackbarProps = {
    anchorOrigin: { vertical: 'top', horizontal: 'right' } as const,
    autoHideDuration: 5000,
  };
  return message ? (
    <Snackbar open={open} onClose={closeToast} {...defaultSnackbarProps} {...config}>
      <Alert
        className="!text-white"
        onClose={closeToast}
        severity={message.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message.msg}
      </Alert>
    </Snackbar>
  ) : null;
};
