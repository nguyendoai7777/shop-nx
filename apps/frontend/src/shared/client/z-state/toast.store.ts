import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AlertColor, SnackbarProps } from '@mui/material';

export interface ToastProviderProps {
  type: AlertColor;
  msg: string;
}

interface ShowToastOptions {
  msg: string;
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
    console.log(`sao k show`);
    set({
      open: true,
      message: { msg, type },
      config,
    });
  },
  closeToast: () => set({ open: false, message: null }),
}));
