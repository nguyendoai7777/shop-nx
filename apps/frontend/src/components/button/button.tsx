'use client';
import { ButtonBase, ButtonBaseProps } from '@mui/material';
import { Prettify } from '@shop/type';
import { ControlSize } from '@types';

export type CButtonProps = Prettify<
  ButtonBaseProps & {
    rounded?: boolean;
    size?: ControlSize;
  }
>;

export const CButton: FCC<CButtonProps> = ({ color, rounded = true, size = 'sm', className = '', ...props }) => {
  const _vcl = color ?? `!bg-gray-300/10 hover:!bg-gray-300/25`,
    _rounded = rounded ? `!rounded-full` : '';
  return <ButtonBase {...props} className={`duration-150 CButton !px-4  ${size} ${_rounded} ${className} ${_vcl}`} />;
};
