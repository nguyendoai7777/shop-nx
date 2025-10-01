'use client';
import { RegisterAction, RegisterFormDto } from '@types';
import { useFocusElement, useFormChange } from '@hooks';
import { TextField } from '@mui/material';

export const Register: FCC<RegisterAction> = ({ valueChange }) => {
  useFocusElement('#AuthForm input');

  const { value, handleInput } = useFormChange<RegisterFormDto>(
    {
      confirmPassword: '',
      password: '',
      firstname: '',
      lastname: '',
      username: '',
      email: '',
    },
    valueChange
  );

  return (
    <>
      <TextField
        fullWidth
        name="username"
        label="Tên đăng nhập"
        variant="standard"
        onChange={(e) => handleInput(e, 'username')}
      />
      <TextField
        fullWidth
        variant="standard"
        type="email"
        label="Email"
        name="username"
        onChange={(e) => handleInput(e, 'email')}
      />
      <div className="flex gap-3">
        <TextField
          fullWidth
          variant="standard"
          type="text"
          label="Họ, tên đệm"
          name="firstname"
          onChange={(e) => handleInput(e, 'firstname')}
        />
        <TextField
          fullWidth
          variant="standard"
          type="text"
          label="Tên"
          name="lastname"
          onChange={(e) => handleInput(e, 'lastname')}
        />
      </div>
      <TextField
        fullWidth
        variant="standard"
        type="password"
        label="Mật khẩu"
        name="password"
        onChange={(e) => handleInput(e, 'password')}
      />
      <TextField
        fullWidth
        variant="standard"
        type="password"
        label="Xác nhận mật khẩu"
        onChange={(e) => handleInput(e, 'confirmPassword')}
      />
    </>
  );
};
