'use client';
import { ButtonBase, ButtonBaseProps, CircularProgress } from '@mui/material';
import { Prettify } from '@shop/type';
import { ControlSize } from '@types';

export type CButtonProps = Prettify<
  ButtonBaseProps & {
    rounded?: boolean;
    size?: ControlSize;
    loading?: boolean;
  }
>;

export const CButton: FCC<CButtonProps> = ({
  color,
  children,
  rounded = false,
  size = 'sm',
  loading = false,
  className = '',
  ...props
}) => {
  const _vcl = color ?? `!bg-gray-300/10 hover:!bg-gray-300/25`,
    _rounded = rounded ? `!rounded-full` : '';
  return (
    <ButtonBase
      disabled={loading}
      className={`duration-150 CButton !px-4 ${size} ${_rounded} ${className} ${_vcl}`}
      {...props}
    >
      {loading ? <CircularProgress className="mr-2" size={16} /> : <></>}
      {children}
    </ButtonBase>
  );
};
