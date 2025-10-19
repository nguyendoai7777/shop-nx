'use client';

import { ImageUpload } from './image-upload';
import { zAuthStore } from '@client/z-state';
import { CButton, ControlledTextField, PasswordTextField } from '@components';
import { useUpdateProfileService } from './update-profile.service';
import { PasswordValidation } from '@client/validators';
import { useEffect, useState } from 'react';
import './setting-info-page.scss';
import { UploadFile } from './update-user-profile.type';

const SettingInfoPage = () => {
  const { user } = zAuthStore();
  const { form, handleUpdate } = useUpdateProfileService();
  const [takeOne, setTakeOne] = useState(0);
  const [banner, setBanner] = useState<UploadFile>();
  const [avatar, setAvatar] = useState<UploadFile>();
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
            <ControlledTextField
              controller={{ control, name: 'firstname', rules: { required: 'Nhập đê' } }}
              controlProps={{
                className: '!mt-3',
                label: 'Họ, tên đệm',
              }}
              textError={errors.firstname?.message}
            />
            <ControlledTextField
              controller={{ control, name: 'lastname', rules: { required: 'Nhập đê' } }}
              controlProps={{
                className: '!mt-3',
                label: 'Tên',
              }}
              textError={errors.lastname?.message}
            />
            <ControlledTextField
              controller={{
                control,
                name: 'password',
                rules: {
                  validate: {
                    requiredIfConfirmPassword: PasswordValidation.requiredIfConfirmPassword(confirmPasswordValue),
                  },
                },
              }}
              component={PasswordTextField}
              textError={errors.password?.message}
              controlProps={{
                className: '!mt-3',
                label: 'Mật khẩu',
              }}
            />
            <ControlledTextField
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
              component={PasswordTextField}
              textError={errors.confirmPassword?.message}
              controlProps={{
                className: '!mt-3',
                label: 'Xác nhận mật khẩu',
              }}
            />
            <CButton onClick={() => handleUpdate({ banner, avatar })} className="!ml-auto">
              Cập nhật
            </CButton>
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};
export default SettingInfoPage;
