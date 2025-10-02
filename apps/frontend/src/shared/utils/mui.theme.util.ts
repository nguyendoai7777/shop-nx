'use client';
import { createTheme } from '@mui/material/styles';

export const MuiThemeConfig = createTheme({
  palette: {

  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d0c1e',
          borderRadius: '1rem'
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

        },
      },
      variants: [
        {
          props: {size: 'medium'},
          style: {
            height: '36px'
          }
        },

      ]
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
      },
    },
  },
});
