'use client';
import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, useState, KeyboardEvent } from 'react';

export type ControlledIntFieldProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  value?: number;
  onChange?(value: number): void;
};

export const ControlledIntField: FCC<ControlledIntFieldProps> = ({ value, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(String(value ?? ''));

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    if (event.ctrlKey || event.altKey || key === 'Backspace' || key === 'Tab') {
      return;
    }
    if (!/[0-9]/.test(key)) {
      event.preventDefault();
      return;
    }
    if (inputValue === '' && key === '0') {
      event.preventDefault();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    let finalValue = numericValue;
    if (finalValue.length > 1 && finalValue.startsWith('0')) {
      finalValue = finalValue.substring(1);
    }
    const vx = inputValue.length ? parseInt(inputValue, 10) : 0;
    setInputValue(finalValue);

    // Gọi onChange của cha (nếu có)
    onChange?.(vx);
  };

  return <TextField {...props} value={value} onChange={handleChange} onKeyDown={handleKeyPress} />;
};

export default ControlledIntField;
