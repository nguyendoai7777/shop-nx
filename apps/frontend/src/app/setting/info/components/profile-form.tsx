'use client';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

export interface UpdateUserProfile {
  firstname: string;
  lastname: string;
}
export interface ProfileFormProps {}

export const ProfileForm: FCC<ProfileFormProps> = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {
      errors: { channel: channelError },
    },
  } = useForm({
    defaultValues: {
      channel: '',
      description: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  return (
    <div className="max-w-100 mx-auto mt-4">
      <Button>123</Button>
      <TextField fullWidth label="Tên đăng nhập" />
    </div>
  );
};
