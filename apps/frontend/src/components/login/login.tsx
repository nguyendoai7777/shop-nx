'use client';

import { LoginAction, LoginFormDto } from '@types';
import { useFocusElement, useFormChange } from '@hooks';
import { TextField } from '@mui/material';

export const Login: FCC<LoginAction> = ({ valueChange }) => {
  useFocusElement('#AuthForm input');
  const { handleInput } = useFormChange<LoginFormDto>(
    {
      password: '',
      username: '',
    },
    valueChange
  );
  return (
    <>
      <TextField
        fullWidth
        variant="standard"
        label="Tên đăng nhập / Email"
        onChange={(e) => handleInput(e, 'username')}
      />

      {/* Password */}
      <TextField
        fullWidth
        type="password"
        name="password"
        variant="standard"
        label="mật khẩu"
        onChange={(e) => handleInput(e, 'password')}
      />
    </>
  );
};
