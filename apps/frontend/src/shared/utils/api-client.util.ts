import axios, { AxiosInstance } from 'axios';
import { loadConfig } from './config-loader.util';
import { cookies } from 'next/headers';


let httpServer: AxiosInstance | null = null;
let httpClient: AxiosInstance | null = null;

/**
 * Server-side Axios instance
 * - Dùng trong Server Component, Route Handler, Server Action
 * - Gắn token từ cookies() vào Authorization header
 */
export async function HttpServer(): Promise<AxiosInstance> {
  if (httpServer) return httpServer;

  const { ApiUrl } = await loadConfig();


  httpServer = axios.create({
    baseURL: ApiUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  httpServer.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return httpServer;
}

/**
 * Client-side Axios instance
 * - Dùng trong Client Component (browser)
 * - Không cần attach token, chỉ set baseURL và Content-Type
 */
export async function HttpClient(): Promise<AxiosInstance> {
  if (httpClient) return httpClient;

  const { ApiUrl } = await loadConfig();

  httpClient = axios.create({
    baseURL: ApiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // để browser tự attach cookie nếu cần
  });

  return httpClient;
}
