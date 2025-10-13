'use client';

import { LoginAction, LoginFormDto } from '@types';
import { useFocusElement } from '@client/hooks';
import { PasswordTextField } from '../form-field/password-text-field';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '../form-field/controller-text-field';
import { useEffect, useMemo } from 'react';

export const Login: FCC<LoginAction> = ({ valueChange }) => {
  useFocusElement('#AuthForm input');
  const {
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormDto>({
    defaultValues: {
      password: '',
      username: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  useEffect(() => {
    const subscription = watch(({ password, username }) => {
      valueChange?.({
        password: password ?? '',
        username: username ?? '',
      });
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <>
      <div>
        <ControlledTextField
          controller={{
            control,
            name: 'username',
            rules: { required: 'điền đi...' },
          }}
          textField={{
            label: 'Tên đăng nhập / Email',
          }}
          textError={errors?.username?.message}
        />
      </div>
      <div>
        <ControlledTextField
          component={PasswordTextField}
          controller={{
            control,
            name: 'password',
            rules: { required: 'điền đi...' },
          }}
          textField={{
            label: 'Mật khẩu',
          }}
        />
      </div>
    </>
  );
};
