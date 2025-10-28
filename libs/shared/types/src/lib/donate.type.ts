export interface RSBDonated {
  balance: number;
}
export interface RSBDonor {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string | null;
}

export interface RSBDonation {
  id: number;
  amount: number;
  message: string | null;
  createdAt: string | Date;
  sender: RSBDonor;
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

export interface RSBDonorTop extends RSBDonor {
  amount: number;
}
