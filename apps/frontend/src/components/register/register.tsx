'use client';
import { RegisterAction, RegisterFormDto } from '@types';
import { useFocusElement, useFormChange } from '@hooks';
import { useEffect } from 'react';

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
    <>
      {/* Username */}
      <input
        type="text"
        placeholder="Tên đăng nhập"
        name="username"
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={(e) => handleInput(e, 'username')}
      />
      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        name="username"
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={(e) => handleInput(e, 'email')}
      />
      {/* Display name */}
      <input
        type="text"
        placeholder="Tên hiển thị"
        name="name"
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={(e) => handleInput(e, 'name')}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Mật khẩu"
        name="password"
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={(e) => handleInput(e, 'password')}
      />
      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Xác nhận mật khẩu"
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={(e) => handleInput(e, 'confirmPassword')}
      />
    </>
  );
};
