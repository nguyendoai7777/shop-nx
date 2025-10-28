'use client';
import { Skeleton } from '@mui/material';

export const LoadingTopDonate = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="!rounded-xl" animation="wave" variant="rounded" height={50} />
      <Skeleton className="!rounded-xl" animation="wave" variant="rounded" height={50} />
      <Skeleton className="!rounded-xl" animation="wave" variant="rounded" height={50} />
    </div>
  );
};
