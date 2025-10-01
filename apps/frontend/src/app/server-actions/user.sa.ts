'use server';

import { cookieBy, loadConfig } from '@utils';
import { ResponseBase } from '@shop/type';
import { UserInfoByJWT } from '@shop/dto';

export async function fetchUserDetail(): Promise<ResponseBase<UserInfoByJWT>> {
  const token = (await cookieBy('token'))!;
  const { ApiUrl } = await loadConfig();

  const res = await fetch(`${ApiUrl}/user/current`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    return res.json()
  } catch (e) {
    throw Error()
  }

}
