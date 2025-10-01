'use client';
import { createTheme } from '@mui/material/styles';

export const MuiThemeConfig = createTheme({
  palette: {
 
    secondary: {
      main: '#dc004e', // Your secondary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#fff", // text trong input
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #1e293b inset",
            WebkitTextFillColor: "#fff",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.7)",
          "&.Mui-focused": {
            color: "#fff",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottom: "1px solid rgba(255,255,255,0.5)", // normal
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid #fff", // hover
          },
          "&:after": {
            borderBottom: "2px solid #fff", // focus
          },
        },
      },
    },
  },
});
