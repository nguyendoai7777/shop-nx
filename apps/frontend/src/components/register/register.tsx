'use client';
import { RegisterAction, RegisterFormDto } from '@types';
import { useFocusElement, useFormChange } from '@hooks';
import { TextField } from '@mui/material';

export const Register: FCC<RegisterAction> = ({ valueChange }) => {
  useFocusElement('#AuthForm input');

  const { value, handleInput } = useFormChange<RegisterFormDto>(
    {
      confirmPassword: 'MinhAnh@2003',
      password: 'MinhAnh@2003',
      firstname: 'Minh',
      lastname: 'Anh',
      username: 'minhanh',
      email: 'ntma2003@gmail.com',
    },
    valueChange
  );

  return (
    <>
      <TextField
        fullWidth
        name="username"
        label="Tên đăng nhập"
        value={value.username}
        onChange={(e) => handleInput(e, 'username')}
      />
      <TextField
        fullWidth
        type="email"
        label="Email"
        name="email"
        value={value.email}
        onChange={(e) => handleInput(e, 'email')}
      />
      <div className="flex gap-3">
        <TextField
          fullWidth
          type="text"
          label="Họ, tên đệm"
          name="firstname"
          value={value.firstname}
          onChange={(e) => handleInput(e, 'firstname')}
        />
        <TextField
          fullWidth
          type="text"
          label="Tên"
          name="lastname"
          value={value.lastname}
          onChange={(e) => handleInput(e, 'lastname')}
        />
      </div>
      <TextField
        fullWidth
        type="password"
        label="Mật khẩu"
        name="password"
        value={value.password}
        onChange={(e) => handleInput(e, 'password')}
      />
      <TextField
        fullWidth
        type="password"
        label="Xác nhận mật khẩu"
        value={value.password}
        onChange={(e) => handleInput(e, 'confirmPassword')}
      />
    </>
  );
};
