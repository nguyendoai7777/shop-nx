import { RSBUser, RSBUserBase } from './user.types.js';

export interface RSBDonated {
  balance: number;
}

export interface RSBDonation {
  id: number;
  amount: number;
  message: string | null;
  createdAt: string | Date;
  sender: RSBUserBase;
}

export type AppWSType = 'donate';

export interface SocketIoJoinPayload {
  id: number;
  type: AppWSType;
}

export interface WSPayload<D> {
  type: AppWSType;
  data: D;
}

export type TopDonateQueryType = 'today' | 'month' | 'all';
export interface TopDonateQuery {
  filter: TopDonateQueryType;
}

export interface RSBDonorTop extends RSBUserBase {
  amount: number;
}
