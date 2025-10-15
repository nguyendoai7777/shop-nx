'use client';
import { zAuthStore } from '@client/z-state';
import { json } from '@client/utils';

export interface _UserProps {}

const _UserPage: FCC<_UserProps> = () => {
  const { user } = zAuthStore();
  return <div>{json(user)}</div>;
};

export default _UserPage;
