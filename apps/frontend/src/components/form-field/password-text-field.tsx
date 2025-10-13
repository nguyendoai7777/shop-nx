'use client';
import { useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
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
    />
  );
}
