'use client';
import type { RegisterAction, RegisterFormDto } from '@types';
import { useFocusElement, useFormChange } from '@client/hooks';
import { CTextField } from '../form-field';

export const Register: FCC<RegisterAction> = ({ valueChange }) => {
  useFocusElement('#AuthForm input');

  const { value, handleInput } = useFormChange<RegisterFormDto>(
    {
      verifiedPassword: 'MinhAnh@2003',
      password: 'MinhAnh@2003',
      firstname: 'Nguyen Hoa',
      lastname: 'Binh',
      username: 'sharkbinh',
      email: 'sharkbinh@gmail.com',
      verified: false,
    },
    valueChange
  );

  return (
    <>
      <CTextField
        fullWidth
        name="username"
        label="Tên đăng nhập"
        value={value.username}
        onChange={(e) => handleInput(e, 'username')}
      />
      <CTextField
        fullWidth
        type="email"
        label="Email"
        name="email"
        value={value.email}
        onChange={(e) => handleInput(e, 'email')}
      />
      <div className="flex flex-col md:flex-row gap-4 md:gap-3">
        <CTextField
          fullWidth
          type="text"
          label="Họ, tên đệm"
          name="firstname"
          value={value.firstname}
          onChange={(e) => handleInput(e, 'firstname')}
        />
        <CTextField
          fullWidth
          type="text"
          label="Tên"
          name="lastname"
          value={value.lastname}
          onChange={(e) => handleInput(e, 'lastname')}
        />
      </div>
      <CTextField
        fullWidth
        type="password"
        label="Mật khẩu"
        name="password"
        value={value.password}
        onChange={(e) => handleInput(e, 'password')}
      />
      <CTextField
        fullWidth
        type="password"
        label="Xác nhận mật khẩu"
        value={value.password}
        onChange={(e) => handleInput(e, 'verifiedPassword')}
      />
    </>
  );
};
