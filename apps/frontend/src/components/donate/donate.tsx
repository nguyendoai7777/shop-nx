'use client';

import { ControlledIntField } from '../form-field';
import { MinReceive, vnd } from '@shop/platform';
import { useForm } from 'react-hook-form';

export interface DonateProps {}

export const Donate: FCC<DonateProps> = () => {
  const d = useForm({});
  return (
    <>
      <div className="mt-4 mb-1 font-semibold text-xl">
        Donate
        <code className="block w-fit mb-2 bg-gray-300/15 rounded font-light text-sm px-2"></code>
      </div>
      <ControlledIntField value={MinReceive} />
    </>
  );
};
