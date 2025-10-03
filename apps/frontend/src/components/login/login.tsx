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
        label="Tên đăng nhập / Email"
        name="username"
        onChange={(e) => handleInput(e, 'username')}
      />
      <TextField
        fullWidth
        type="password"
        name="password"
        label="Mật khẩu"
        onChange={(e) => handleInput(e, 'password')}
      />
    </>
  );
};
