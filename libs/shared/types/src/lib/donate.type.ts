export interface RSBDonated {
  balance: number;
}

export interface RSBDonation {
  id: number;
  amount: number;
  message: string | null;
  createdAt: string | Date;
  sender: {
    id: number;
    firstname: string;
    lastname: string;
    avatar: string | null;
  };
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
