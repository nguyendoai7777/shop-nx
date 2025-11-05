'use client';
import { zAuthStore, zToastStore } from '@client/z-state';
import { HttpClient } from '@client/utils';
import { ResponseBase, UserProfileImage } from '@shop/type';
import { useForm } from 'react-hook-form';
import { PickImage } from '../../update-user-profile.type';
import type { UpdateUserProfileDto } from '@shop/dto';
import { httpResource } from '@core/http';

export const settingInfoService = () => {
  const { user, setUser } = zAuthStore();
  const { showToast } = zToastStore();

  const form = useForm<Required<UpdateUserProfileDto>>({
    defaultValues: {
      lastname: user?.lastname ?? '',
      firstname: user?.firstname ?? '',
      password: '',
      verifiedPassword: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const handleUploadFile = (img: PickImage) => {
    const { avatar, banner } = img;
    const fd = new FormData();
    if (banner) {
      fd.append('banner', banner.file);
    }
    if (avatar) {
      fd.append('avatar', avatar.file);
    }
    return HttpClient.post<ResponseBase<UserProfileImage>>('/media/upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });
  };

  const handleUpdate = async (img: PickImage) => {
    const data = form.getValues();
    httpResource(handleUploadFile(img)).subscribe({
      next(res) {
        const {
          data: { avatar, banner },
        } = res;
        avatar &&
          setUser({
            avatar,
          });
        banner &&
          setUser({
            banner,
          });
        httpResource(HttpClient.patch<ResponseBase<any>>('/user/update-profile', data)).subscribe({
          next(res) {
            showToast({
              type: 'success',
              msg: res.message,
            });
          },
        });
      },
      error(err) {
        showToast({
          type: 'error',
          msg: err.message,
        });
      },
    });
  };

  return {
    handleUpdate,
    form,
  };
};
