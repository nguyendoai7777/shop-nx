'use server';

import { cookies } from 'next/headers';
import { cookieBy, loadConfig } from '@utils';
import { ResponseBase } from '@shop/type';
import { UserInfoByJWT } from '@shop/dto';

export async function fetchUserDetail(): Promise<ResponseBase<UserInfoByJWT>> {
  const token = (await cookieBy('token'))!;
  /*// token$ = c.get('token')?.value!;*/
  const cookies$ = await cookies();
  const { ApiUrl } = await loadConfig();

  const res = await fetch(`${ApiUrl}/user/current`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

/*
  const re = await res.json();
  console.log(`@@ Server action`, re);
*/

  try {
    return res.json()
  } catch (e) {
    throw Error()
  }

}
