import axios from 'axios';
import { ClientConfiguration } from './client.config';

const httpServer = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

httpServer.interceptors.request.use(
  async (config) => {
    const { api, token } = await ClientConfiguration.getAll();
    config.baseURL = api;
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
