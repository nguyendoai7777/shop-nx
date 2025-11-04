'use client';
import { CircularProgress } from '@mui/material';

export interface LsdProps {}

export const XLoadingCircular: FCC<LsdProps> = ({ className }) => {
  return (
    <>
      <CircularProgress className={className} />
    </>
  );
};
