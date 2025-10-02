'use server';

import { Http } from '@utils';
import { ResponseBase } from '@shop/type';
import { UserInfoByJWT } from '@shop/dto';

export async function fetchUserDetail(): Promise<ResponseBase<UserInfoByJWT>> {
  const { data } = await Http.get<ResponseBase<any>>(`/user/current`);
  try {
    return data.data;
  } catch (e) {
    throw Error();
  }
}
