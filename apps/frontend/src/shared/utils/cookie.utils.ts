import { cookies } from 'next/headers';

export const cookieBy = async (key: string) => {
  const c = await cookies();
  return c.get(key)?.value;
};

export const Cookie = {
  get: cookieBy
}