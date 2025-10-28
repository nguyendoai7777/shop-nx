'use client';
import { TextFieldProps } from '@mui/material';
import type { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { ErrorHelper } from './error-helper';
import { ComponentType } from 'react';
import { CTextField } from './text-field';

type FormControlComponent<P> = ComponentType<P & { value?: any; onChange?: (event: any) => void }>;

type ControllerConfig<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = UseControllerProps<TFieldValues, TName, TTransformedValues>;

export type ControlledTextFieldProps<T extends FieldValues, P extends TextFieldProps = TextFieldProps> = {
  controller: ControllerConfig<T>;
  controlProps?: Omit<P, 'name' | 'value' | 'onChange'>;
  textError?: string;
  component?: FormControlComponent<P>;
  disableFixedError?: boolean;
};

// 🔹 Implementation
export const ControlledField = <T extends FieldValues, P extends TextFieldProps = TextFieldProps>({
  controller,
  controlProps,
  textError,
  component,
  disableFixedError = false,
}: ControlledTextFieldProps<T, P>) => {
  const Component = component || CTextField;

  return (
    <Controller
      {...controller}
      render={({ field }) => (
        <>
          <Component inputRef={field.ref} {...(field as any)} {...(controlProps as P)} error={!!textError} />
          {disableFixedError ? (
            <>{textError ? <ErrorHelper>{textError}</ErrorHelper> : <></>}</>
          ) : (
            <>
              <ErrorHelper>{textError}</ErrorHelper>
            </>
          )}
        </>
      )}
    />
  );
};
