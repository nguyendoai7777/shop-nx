'use client';

import { CTextField } from './text-field';

export interface FormFieldProps {}

export const FormField: FCC<FormFieldProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="mx auto w-1/2">
        <h1>Form Field custom</h1>
        <div className="flex flex-col gap-3">
          <CTextField size="small" label="Tài Khoản (filled)" variant="filled" />
          <CTextField size="small" label="Tài Khoản (outlined)" variant="outlined" />
          <CTextField size="small" label="Tài Khoản (standard)" variant="standard" />
        </div>
      </div>
    </div>
  );
};
