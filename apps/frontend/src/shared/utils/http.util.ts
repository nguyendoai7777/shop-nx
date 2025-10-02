import axios from 'axios';
import { loadConfig } from './config-loader.util';
import { cookies } from 'next/headers';
import { Cookie } from '@utils';

const httpServer = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

httpServer.interceptors.request.use(
  async (config) => {
    const { ApiUrl } = await loadConfig();
    config.baseURL = ApiUrl;
    // const cookieStore = await cookies();
    // const token = cookieStore.get('token')?.value;

    const token = await Cookie.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const Http = httpServer; /* {
  get: async (url: string, config: any) =>
    (await fetch(url, {
      method: 'GET',
      ...config,
    })).json(),
};*/
