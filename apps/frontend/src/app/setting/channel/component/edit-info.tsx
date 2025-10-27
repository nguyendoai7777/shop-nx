'use client';
import { IconButton, InputAdornment } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { AnimateRenderer, CButton, ControlledTextField, ControlledIntField } from '@components';
import DeleteIcon from '@mui/icons-material/Delete';
import { Channel, SettingInfoRequestBody, UserEditSettingError } from '@shop/type';
import { useEffect } from 'react';
import { MinReceive, vnd, vndText } from '@shop/platform';

export interface EditUserInfoProps {
  channel: Channel;
  channelName: string;
  save?(data: SettingInfoRequestBody): void;
  loading?: boolean;
  asyncError?: UserEditSettingError;
}

const EditUserInfo: FCC<EditUserInfoProps> = ({ channel, channelName, save, asyncError = {}, loading = false }) => {
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: {
      errors: { externalLinks, channel: channelError, minReceive: minReceiveError },
    },
  } = useForm<SettingInfoRequestBody>({
    defaultValues: {
      channel: channelName,
      externalLinks: channel.externalLinks, // {url: string; shortname?: string }[]
      description: channel.description,
      minReceive: channel.minReceive ?? MinReceive,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'externalLinks' });
  const receive = watch('minReceive');

  const onSubmit = (data: any) => save?.(data);

  useEffect(() => {
    Object.keys(asyncError).forEach((k) => {
      const key = k as keyof UserEditSettingError;
      setError(key, {
        type: 'custom',
        message: asyncError[key],
      });
    });
  }, [asyncError]);

  const handleKeydown = (e: RKeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      !loading && handleSubmit(onSubmit);
    }
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-3 w-full" onKeyDown={handleKeydown} onSubmit={handleSubmit(onSubmit)}>
        <div className="mr-13">
          <div className="text-xl mb-2">Mã nhận dạng kênh</div>
          <ControlledTextField
            controller={{
              control,
              name: 'channel',
              rules: { required: 'điền đi cụ' },
            }}
            textError={channelError?.message}
            controlProps={{
              error: !!channelError,
              slotProps: {
                input: { startAdornment: <InputAdornment position="start">@</InputAdornment> },
              },
            }}
          />
        </div>

        <div className="mr-13">
          <div className="text-xl">
            Donate tối thiểu
            {receive ? (
              <code className="block w-fit mb-2 bg-gray-300/15 rounded font-light text-sm px-2">
                {vnd(receive)} ~ {vndText(receive)}
              </code>
            ) : (
              <></>
            )}
          </div>
          <ControlledTextField
            controller={{
              control,
              name: `minReceive`,
              rules: {
                min: { value: MinReceive, message: `Tối thiểu ${vnd(MinReceive)} nhé.` },
              },
            }}
            component={ControlledIntField}
            textError={minReceiveError?.message}
          />
        </div>
        <div className="mr-13">
          <div className="text-xl mb-2">Mô tả kênh</div>
          <ControlledTextField
            controller={{
              control,
              name: `description`,
            }}
            controlProps={{
              multiline: true,
            }}
          />
        </div>
        <div className="text-xl">Liên kết ngoài</div>
        <AnimateRenderer
          list={fields}
          render={(item, index) => (
            <div key={item.id} className="flex gap-3 items-start">
              <motion.div
                className="flex flex-col gap-1 w-full"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ControlledTextField
                  controller={{
                    control,
                    name: `externalLinks.${index}.url`,
                    rules: {
                      required: 'điền đi...',
                      pattern: {
                        value: /^(https?:\/\/).+/,
                        message: 'URL phải là dạng url (http://... hoặc https://...)',
                      },
                    },
                  }}
                  controlProps={{
                    label: 'URL',
                  }}
                  textError={externalLinks?.[index]?.url?.message}
                />
              </motion.div>
              <motion.div
                className="flex flex-col gap-1 w-full"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <ControlledTextField
                  controller={{
                    control,
                    name: `externalLinks.${index}.shortname`,
                    rules: {
                      required: 'điền đi...',
                    },
                  }}
                  controlProps={{
                    label: 'Bí danh ',
                  }}
                  textError={externalLinks?.[index]?.shortname?.message}
                />
              </motion.div>
              <IconButton className="" onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        />

        <div className="flex justify-end gap-2 sticky buttom-0 mr-13">
          <CButton onClick={() => append({ url: '', shortname: '' })}>Thêm link</CButton>

          <CButton
            type="submit"
            onClick={() => handleSubmit(onSubmit)()}
            loading={loading}
            className="!bg-purple-500 hover:!bg-purple-500/90 min-w-25 disabled:!text-white/35"
          >
            Lưu
          </CButton>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
