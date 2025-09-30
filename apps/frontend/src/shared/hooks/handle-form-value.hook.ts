'use client';
import { FormEvent, useEffect, useState } from 'react';

type ValueChangeFn<T> = (value: T) => void;

export const useFormChange = <T extends object>(
  initial: T,
  onChange?: ValueChangeFn<T>
) => {
  const [value, setValue] = useState<T>(initial);

  // cập nhật parent khi state thay đổi
  useEffect(() => {
    onChange?.(value);
  }, [value]);

  // hàm handle input
  const handleInput = (e: FormEvent<HTMLInputElement>, key: keyof T) => {
    setValue((prev) => ({
      ...prev,
      [key]: (e.target as HTMLInputElement).value,
    }));
  };

  return { value, setValue, handleInput };
};
