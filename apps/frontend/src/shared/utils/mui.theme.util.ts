'use client';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export const MuiThemeConfig = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d0c1e',
          borderRadius: '1rem',
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 12,
      },
      styleOverrides: {
        paper: {
          backgroundColor: 'var(--color-dark-lighter)',
          '&::before': {
            backgroundColor: 'var(--color-dark-lighter) !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
          color: '#fff',
        },
      },
      variants: [
        {
          props: { size: 'medium' },
          style: {
            height: '36px',
          },
        },
      ],
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(255,255,255,0.7)',
          '&.Mui-focused': {
            color: '#fff',
          },
        },
      },
    },
    MuiInput: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottom: '1px solid rgba(255,255,255,0.5)', // normal
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: '1px solid #fff', // hover
          },
          '&:after': {
            borderBottom: '2px solid #fff', // focus
          },
        },
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.5)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'oklch(1 0 0 / 0.85)',
            borderWidth: 1,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `oklch(1 0 0 / 0.85)`,
            borderWidth: 1,
          },
          '&.Mui-focused input': {
            backgroundColor: 'oklch(1 0 0 / 0.08)',
          },
          '& input': {
            color: '#fff',
            backgroundColor: 'oklch(1 0 0 / 0.05)',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: purple[500],
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          color: '#fff'
        }
      }
    }
  },
});
