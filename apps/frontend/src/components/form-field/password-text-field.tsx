import { useState } from 'react';
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function PasswordTextField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      variant="outlined"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((s) => !s)}
                edge="end"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: '#fff' },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 6,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.5)',
          },
          '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: 'oklch(1 0 0 / 0.85)',
            borderWidth: 1,
          },
          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: 'oklch(1 0 0 / 0.85)',
            borderWidth: 1,
          },
          '& input': {
            color: '#fff',
            backgroundColor: 'oklch(1 0 0 / 0.05)',
          },
          '&.Mui-focused input': {
            backgroundColor: 'oklch(1 0 0 / 0.08)',
          },
          '& .MuiInputAdornment-root .MuiIconButton-root': {
            color: 'rgba(255,255,255,0.7)',
            '&:hover': { color: '#fff' },
          },
        },
      }}
    />
  );
}
