import { cookies } from 'next/headers';

const Collection = new Map<string, string>();

export const cookieBy = async (key: string) => {
  const _value = Collection.get(key);
  if (_value) return _value;
  const c = await cookies();
  const value = c.get(key)?.value;
  value && Collection.set(key, value);
  return value;
};

export const cookieReset = () => {
  Collection.clear();
};

export const cookieRemove = (key: string) => {
  Collection.delete(key);
};

export const Cookie = {
  get: cookieBy,
  reset: cookieReset,
  remove: cookieRemove,
};
