'use client';
import { IconButton, TextField } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { AnimateRenderer, CButton, ErrorHelper } from '@components';
import DeleteIcon from '@mui/icons-material/Delete';

export interface EditUserInfoProps {}

const EditUserInfo: FCC<EditUserInfoProps> = () => {
  const {
    control,
    handleSubmit,
    formState: {
      errors: { links },
    },
  } = useForm({
    defaultValues: { links: [{ url: '', alias: '' }] },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'links' });

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="w-full">
      <div className="text-xl mb-3">Liên kết ngoài</div>
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
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
                <Controller
                  name={`links.${index}.url`}
                  control={control}
                  rules={{ required: 'điền đi...' }}
                  render={({ field }) => (
                    <>
                      <TextField {...field} size="small" label="URL" fullWidth error={!!links?.[index]?.url?.message} />
                      <ErrorHelper>{links?.[index]?.url?.message}</ErrorHelper>
                    </>
                  )}
                />
              </motion.div>
              <motion.div
                className="flex flex-col gap-1 w-full"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <Controller
                  name={`links.${index}.alias`}
                  control={control}
                  rules={{ required: 'điền đi...' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Alias"
                      fullWidth
                      helperText={links?.[index]?.alias?.message}
                      error={!!links?.[index]?.alias?.message}
                    />
                  )}
                />
              </motion.div>
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        />

        <div className="flex justify-end gap-2 sticky buttom-0">
          <CButton onClick={() => append({ url: '', alias: '' })}>Thêm link</CButton>

          <CButton className="!bg-purple-500 hover:!bg-purple-500/90 min-w-25" type="submit">
            Lưu
          </CButton>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
