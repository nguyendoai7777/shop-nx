import axios from 'axios';
import { ClientConfiguration } from './client-config.utils';

const httpServer = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

httpServer.interceptors.request.use(
  async (config) => {
    const { api, token } = await ClientConfiguration.getAll();
    const crossDomainUrl = config.url?.startsWith('http') ?? false;
    const vrl = config.url?.replace(/^\/+/, '') ?? '';

    config.url = crossDomainUrl ? config.url : api + '/api/' + vrl;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const HttpClient = httpServer;
