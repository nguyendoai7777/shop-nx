'use client';

import { LoginAction, LoginFormDto } from '@types';
import { useFocusElement, useFormChange } from '@client/hooks';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Login: FCC<LoginAction> = ({ valueChange }) => {
  useFocusElement('#AuthForm input');
  const { handleInput } = useFormChange<LoginFormDto>(
    {
      password: '',
      username: '',
    },
    valueChange
  );
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <TextField label="Tên đăng nhập / Email" name="username" onChange={(e) => handleInput(e, 'username')} />
      <TextField
        fullWidth
        type="password"
        name="password"
        label="Mật khẩu"
        onChange={(e) => handleInput(e, 'password')}
      />
      <TextField
        name="password"
        label="Mật khẩu"
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => handleInput(e, 'password')}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};
