'use client';

import { LoginAction, LoginFormDto } from '@types';
import { useFocusElement, useFormChange } from '@hooks';

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
      <input
        type="text"
        placeholder="Username"
        name="username"
        onInput={(e) => handleInput(e, 'username')}
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        onInput={(e) => handleInput(e, 'password')}
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  );
};
