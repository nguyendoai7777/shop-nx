'use client';

import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { HttpClient } from '@client';

export interface FormFieldProps {}

export const FormField: FCC<FormFieldProps> = () => {

  return (
    <div className="flex justify-center">
      <div className="mx auto w-1/2">
        <h1>Form Field custom</h1>
        <div className="flex flex-col gap-3">
          <TextField size="small" label="Tài Khoản (filled)" variant="filled" />
          <TextField
            size="small"
            label="Tài Khoản (outlined)"
            variant="outlined"
          />
          <TextField
            size="small"
            label="Tài Khoản (standard)"
            variant="standard"
          />
        </div>
      </div>
    </div>
  );
};
