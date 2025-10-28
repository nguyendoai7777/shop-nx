import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AlertColor, SnackbarProps } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

export interface ToastProviderProps {
  type: AlertColor;
  msg: ReactNode;
}

interface ShowToastOptions {
  msg: ReactNode;
  type?: AlertColor;
  config?: SnackbarProps;
}

interface ToastState {
  open: boolean;
  message: ToastProviderProps | null;
  config: SnackbarProps;
  showToast: (options: ShowToastOptions) => void;
  closeToast: () => void;
}

export const zToastStore = create<ToastState>()((set) => ({
  open: false,
  message: null,
  config: {},
  showToast: ({ msg, type = 'info', config = {} }) => {
    set({
      open: true,
      message: { msg, type },
      config,
    });
  },
  closeToast: () => set({ open: false, message: null }),
}));
