import axios, { AxiosError } from 'axios';
import { loadConfig } from './config-loader.util';
import { CatchAxiosInterceptorError, Cookie } from '@utils';

const httpServer = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

httpServer.interceptors.request.use(
  async (config) => {
    const { ApiUrl } = await loadConfig();
    config.baseURL = ApiUrl;
    // const cookieStore = await cookies();
    // const token = cookieStore.get('token')?.value;

    const token = await Cookie.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpServer.interceptors.response.use(
  (success) => {
    return success;
  },
  (error) => {
    const e = error as AxiosError;
    return Promise.reject(
      e.response?.data ?? {
        data: e.request?.path ?? null,
        status: e.response?.status,
        message: e.response?.statusText,
      }
    );
  }
);

export const Http = httpServer;
