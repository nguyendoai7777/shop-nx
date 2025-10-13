'use client';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { AnimateRenderer, CButton, ErrorHelper } from '@components';
import DeleteIcon from '@mui/icons-material/Delete';
import { Channel, SettingInfoRequestBody } from '@shop/type';

export interface EditUserInfoProps {
  channel: Channel;
  channelName: string;
  save?(data: SettingInfoRequestBody): void;
  loading?: boolean;
}

const EditUserInfo: FCC<EditUserInfoProps> = ({ channel, channelName, save, loading = false }) => {
  const {
    control,
    handleSubmit,
    formState: {
      errors: { externalLinks },
    },
  } = useForm<SettingInfoRequestBody>({
    defaultValues: {
      channel: channelName,
      externalLinks: channel.externalLinks,
      description: channel.description,
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'externalLinks' });

  const onSubmit = (data: any) => save?.(data);

  return (
    <div className="w-full">
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xl">Mã nhận dạng kênh</div>
        <div className="mr-13">
          <Controller
            name="channel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                  },
                }}
              />
            )}
          />
        </div>
        <div className="text-xl">Mô tả kênh</div>
        <div className="mr-13">
          <Controller name="description" control={control} render={({ field }) => <TextField {...field} multiline />} />
        </div>
        <div className="text-xl">Liên kết ngoài</div>
        <AnimateRenderer
          list={fields}
          emptyComponent={<>Bạn chưa có liên kết nào</>}
          render={(item, index) => (
            <div key={item.id} className="flex gap-3 items-start">
              <motion.div
                className="flex flex-col gap-1 w-full"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
              >
                <>
                  <Controller
                    name={`externalLinks.${index}.url`}
                    control={control}
                    rules={{ required: 'điền đi...' }}
                    render={({ field }) => (
                      <>
                        <TextField {...field} label="URL" error={!!externalLinks?.[index]?.url?.message} />
                        <ErrorHelper>{externalLinks?.[index]?.url?.message}</ErrorHelper>
                      </>
                    )}
                  />
                </>
              </motion.div>
              <motion.div
                className="flex flex-col gap-1 w-full"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <Controller
                  name={`externalLinks.${index}.shortname`}
                  control={control}
                  rules={{ required: 'điền đi...' }}
                  render={({ field }) => (
                    <>
                      <TextField {...field} label="Alias" error={!!externalLinks?.[index]?.shortname?.message} />
                      <ErrorHelper>{externalLinks?.[index]?.url?.message}</ErrorHelper>
                    </>
                  )}
                />
              </motion.div>
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        />

        <div className="flex justify-end gap-2 sticky buttom-0 mr-13">
          <CButton onClick={() => append({ url: '', shortname: '' })}>Thêm link</CButton>

          <CButton loading className="!bg-purple-500 hover:!bg-purple-500/90 min-w-25">
            Lưu
          </CButton>

          <Button loadingPosition="start" loading={true} className="!bg-purple-500 hover:!bg-purple-500/90 min-w-25">
            Lưu
          </Button>
          <Button loading variant="outlined">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
