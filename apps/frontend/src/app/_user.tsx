'use client';
import { zAuthStore } from '@client/z-state';
import { json } from '@client/utils';

export interface _UserProps {}

const _UserPage: FCC<_UserProps> = () => {
  const { user } = zAuthStore();
  return <code>{json(user)}</code>;
};

export default _UserPage;
