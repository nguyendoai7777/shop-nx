'use client';

import { TextField, TextFieldProps } from '@mui/material';

export const CTextField: FCC<TextFieldProps> = (props) => {
  return <TextField size="small" fullWidth variant="outlined" {...props} />;
};
