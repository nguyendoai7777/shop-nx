'use client';
import { Alert, Snackbar, IconButton } from '@mui/material';
import { zToastStore } from '@client/z-state';
import CloseIcon from '@mui/icons-material/Close';

export const ToastProvider: FCC = () => {
  const { open, message, closeToast, config } = zToastStore();

  const defaultSnackbarProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' } as const,
    autoHideDuration: 5000,
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={closeToast}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return message ? (
    <Snackbar open={open} onClose={closeToast} {...defaultSnackbarProps} {...config}>
      <Alert className="!text-white" action={action} severity={message.type} variant="filled" sx={{ width: '100%' }}>
        {message.msg}
      </Alert>
    </Snackbar>
  ) : null;
};
