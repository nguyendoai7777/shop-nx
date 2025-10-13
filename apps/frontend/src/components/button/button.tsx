'use client';
import { ButtonBase, ButtonBaseProps, CircularProgress } from '@mui/material';
import { Prettify } from '@shop/type';
import { ControlSize } from '@types';
import Button, { ButtonProps } from '@mui/material/Button';

export type CButtonProps = Prettify<
  ButtonProps & {
    rounded?: boolean;
    size?: ControlSize;
  }
>;

export const CButton: FCC<CButtonProps> = ({
  color,
  children,
  rounded = true,
  size = 'sm',
  className = '',
  ...props
}) => {
  const _vcl = color ?? `!bg-gray-300/10 hover:!bg-gray-300/25`,
    _rounded = rounded ? `!rounded-full` : '';
  return (
    /*<ButtonBase {...props} className={`duration-150 CButton !px-4  ${size} ${_rounded} ${className} ${_vcl}`}>
      <CircularProgress size={20} />
      {loading ? <CircularProgress className="mr-2" size={20}  /> : <></>}
      {children}
    </ButtonBase>*/

    <Button
      {...props}
      loadingPosition="start"
      className={`duration-150 CButton !px-4  ${size} ${_rounded} ${className} ${_vcl}`}
    >
      {children}
    </Button>
  );
};
