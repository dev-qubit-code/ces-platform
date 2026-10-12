import {TOKEN_KEY} from '@/lib/constant';
import {BACKEND_URL} from '@/lib/env';
import {QueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {toast} from 'sonner';
import Cookies from 'universal-cookie';
const baseURL = `${BACKEND_URL}/api`;
export const api = axios.create({
  baseURL
});

export const VERSION_ONE = 'v1';
export const queryClient = new QueryClient({
  defaultOptions: {queries: {refetchOnWindowFocus: false}}
});
const cooke = new Cookies();
api.interceptors.request.use(config => {
  const token = cooke.get(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error(`API Error [${error.response?.status ?? 'Network'}]`, error.response?.data ?? error.message);
    toast.error(`API Error [${error.response?.status ?? 'Network'}]`, error.response?.data ?? error.message);
    return Promise.reject(error);
  }
);
