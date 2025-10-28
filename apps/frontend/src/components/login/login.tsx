'use client';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { LoginAction, LoginFormDto } from '@types';
import { useFocusElement } from '@client/hooks';
import { ControlledField, PasswordTextField } from '../form-field';

export const Login: FCC<LoginAction> = ({ valueChange }) => {
  useFocusElement('#AuthForm input');
  const {
    control,
    formState: { errors, defaultValues: dv },

    watch,
  } = useForm<LoginFormDto>({
    defaultValues: {
      password: 'MinhAnh@2003',
      username: 'sharkbinh',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  useEffect(() => {
    valueChange?.({
      password: dv?.password ?? '',
      username: dv?.username ?? '',
    });
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
        <ControlledField
          controller={{
            control,
            name: 'username',
            rules: { required: 'điền đi...' },
          }}
          controlProps={{
            label: 'Tên đăng nhập / Email',
          }}
          textError={errors?.username?.message}
        />
      </div>
      <div>
        <ControlledField
          component={PasswordTextField}
          controller={{
            control,
            name: 'password',
            rules: { required: 'điền đi...' },
          }}
          controlProps={{
            label: 'Mật khẩu',
          }}
        />
      </div>
    </>
  );
};
