'use client';
import { ButtonBase } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

export interface CardProps {}

export const CardButton: FCC<ButtonProps> = (props) => {

  return (
    <ButtonBase {...props} />
  );
};