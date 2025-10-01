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
      name: '',
      username: '',
      email: '',
    },
    valueChange
  );

  return (
    <div className="flex flex-col gap-y-4">
      <TextField
        className="text-white"
        fullWidth
        placeholder="Tên đăng nhập"
        name="username"
        label="Tên đăng nhập"
        variant="standard"
        onChange={(e) => handleInput(e, 'username')}
      />
      <TextField
        className="text-white"
        fullWidth
        variant="standard"
        type="email"
        placeholder="Email"
        label="Email"
        name="username"
        onChange={(e) => handleInput(e, 'email')}
      />
      <TextField
        className="text-white"
        fullWidth
        variant="standard"
        type="text"
        placeholder="Tên hiển thị"
        label="Tên hiển thị"
        name="name"
        onChange={(e) => handleInput(e, 'name')}
      />
      <TextField
        className="text-white"
        fullWidth
        variant="standard"
        type="password"
        placeholder="Mật khẩu"
        label="Mật khẩu"
        name="password"
        onChange={(e) => handleInput(e, 'password')}
      />
      <TextField
        className="text-white"
        fullWidth
        variant="standard"
        type="password"
        placeholder="Xác nhận mật khẩu"
        label="Xác nhận mật khẩu"
        onChange={(e) => handleInput(e, 'confirmPassword')}
      />
    </div>
  );
};
