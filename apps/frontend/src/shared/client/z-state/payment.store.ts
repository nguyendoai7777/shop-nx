import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RSBUser } from '@shop/type';

interface PaymentStore {
  balance: number;
  setBalance(balance: number): void;
}

export const zPaymentStore = create<PaymentStore>()((set, get) => ({
  balance: 0,
  setBalance: (balance) => set({ balance }),
}));
