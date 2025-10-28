'use client';

import { ImageUpload } from './image-upload';
import { zAuthStore } from '@client/z-state';
import { CButton, ControlledField, PasswordTextField } from '@components';
import { useUpdateProfileService } from './update-profile.service';
import { PasswordValidation } from '@client/validators';
import { ChangeEvent, useEffect, useState } from 'react';
import './setting-info-page.scss';
import { UploadFile } from './update-user-profile.type';
import { Checkbox, FormControlLabel } from '@mui/material';

const SettingInfoPage = () => {
  const { user } = zAuthStore();
  const { form, handleUpdate } = useUpdateProfileService();
  const [takeOne, setTakeOne] = useState(0);
  const [banner, setBanner] = useState<UploadFile>();
  const [avatar, setAvatar] = useState<UploadFile>();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
  useEffect(() => {
    if (user && takeOne !== 1) {
      setValue('lastname', user.lastname);
      setValue('firstname', user.firstname);
      setTakeOne(1);
    }
  }, [user]);

  const handleShowPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log({ event: event.target.checked });
    setShowPassword(event.target.checked);
  };

  return (
    <div className="flex-1">
      <ImageUpload
        onPick={({ avatar, banner }) => {
          console.log(`@@ just set`, { avatar, banner });
          avatar && setAvatar(avatar);
          banner && setBanner(banner);
        }}
      />
      <div className="max-w-100 mx-auto mt-4 flex flex-col">
        {user ? (
          <>
            <ControlledField
              controller={{ control, name: 'firstname', rules: { required: 'Nhập đê' } }}
              controlProps={{
                className: '!mt-3',
                label: 'Họ, tên đệm',
              }}
              textError={errors.firstname?.message}
            />
            <ControlledField
              controller={{ control, name: 'lastname', rules: { required: 'Nhập đê' } }}
              controlProps={{
                className: '!mt-3',
                label: 'Tên',
              }}
              textError={errors.lastname?.message}
            />
            <ControlledField
              controller={{
                control,
                name: 'password',
                rules: {
                  validate: {
                    requiredIfConfirmPassword: PasswordValidation.requiredIfConfirmPassword(confirmPasswordValue),
                  },
                },
              }}
              textError={errors.password?.message}
              controlProps={{
                className: '!mt-3',
                label: 'Mật khẩu',
                type: showPassword ? 'text' : 'password',
              }}
            />
            <ControlledField
              controller={{
                control,
                name: 'confirmPassword',
                rules: {
                  validate: {
                    requiredIfPassword: PasswordValidation.requiredIfPassword(passwordValue),
                    matchPassword: PasswordValidation.matchPassword(passwordValue),
                  },
                },
              }}
              textError={errors.confirmPassword?.message}
              controlProps={{
                className: '!mt-3',
                label: 'Xác nhận mật khẩu',
                type: showPassword ? 'text' : 'password',
              }}
            />
            <div className="flex items-center justify-between">
              <FormControlLabel
                control={<Checkbox checked={showPassword} onChange={handleShowPasswordChange} />}
                label={<span className="select-none">Hiện mật khẩu</span>}
              />
              <CButton onClick={() => handleUpdate({ banner, avatar })}>Cập nhật</CButton>
            </div>
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};
export default SettingInfoPage;
