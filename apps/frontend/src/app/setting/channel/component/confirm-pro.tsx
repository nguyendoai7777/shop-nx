'use client';
import { ButtonBase, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { RegisterChannelReqBody } from '@shop/type';
import { Controller, useForm } from 'react-hook-form';
import { ControlledTextField } from '@components';

export interface ConfirmProDialogProps {
  onClose(): void;

  onSave(c: RegisterChannelReqBody): void;
}

const ConfirmProDialog: FCC<ConfirmProDialogProps> = ({ onClose, onSave }) => {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<RegisterChannelReqBody>({
    defaultValues: {
      channel: '312fddfdf',
      subscription: 6,
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  return (
    <>
      <div className="text-white pt-4 py-2 w-100">
        <label id="selectSubscriptionMethod" className="block px-6 pb-2 border-b border-gray-600 text-xl">
          Chọn gói
        </label>
        <Controller
          control={control}
          name="subscription"
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="selectSubscriptionMethod"
              color="#fff"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            >
              <FormControlLabel
                className="pl-6 duration-150 hover:bg-gray-500/25 !mr-0"
                value={1}
                control={<Radio />}
                label="1 tháng"
              />
              <FormControlLabel
                className="pl-6 duration-150 hover:bg-gray-500/25 !mr-0"
                value={6}
                control={<Radio />}
                label="6 tháng"
              />
              <FormControlLabel
                className="pl-6 duration-150 hover:bg-gray-500/25 !mr-0"
                value={12}
                control={<Radio />}
                label="1 năm"
              />
            </RadioGroup>
          )}
        />
        <div className="px-6 mt-2">
          <div className="mt-1 w-fit text-xs rounded px-2 mb-1 bg-gray-400/20">/streamer/@{watch('channel')}</div>
          <ControlledTextField
            controller={{
              control,
              name: 'channel',
              rules: {
                required: 'Điền đi',
                maxLength: {
                  value: 24,
                  message: 'tối đa 24 ký tự',
                },
              },
            }}
            textError={errors.channel?.message}
          />
        </div>
        <div className="px-6 text-xs py-3 text-gray-400 border-t border-gray-600">
          Không thể hoàn tác hoặc thay đổi sau khi đã đăng ký, vui lòng cân nhắc kỹ.
          <div className="mt-1">
            Sau khi đăng ký, bạn sẽ có thể thêm cách thông tin như mô tả kênh, liên kết ngoài, ...
          </div>
        </div>
        <div className="flex justify-end px-2 gap-2 pt-3 border-t border-gray-600">
          <ButtonBase className="duration-150 !rounded-full hover:!bg-btn-base-hover-bg" onClick={onClose}>
            <div className="w-25 py-1.5">Hủy</div>
          </ButtonBase>
          <ButtonBase onClick={handleSubmit(onSave)} className="duration-150 !rounded-full hover:!bg-purple-500/10">
            <span className="w-25 py-1.5 text-purple-500">Đăng ký</span>
          </ButtonBase>
        </div>
      </div>
    </>
  );
};

export default ConfirmProDialog;
