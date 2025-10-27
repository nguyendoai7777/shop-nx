'use client';

import { SelectProps, Select } from '@mui/material';

export const SelectField: FCC<SelectProps> = (props) => {
  return <Select size="small" {...props} />;
};
