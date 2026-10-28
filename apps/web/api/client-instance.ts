'use client';
import {TOKEN_KEY} from '@/lib/constant';
import {BACKEND_URL} from '@/lib/env';
import {QueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';
import Cookies from 'universal-cookie';
import {baseApi} from './base-instance';
const baseURL = `${BACKEND_URL}/api`;

export const clientApi = baseApi.create({
  baseURL
});

export const queryClient = new QueryClient({
  defaultOptions: {queries: {refetchOnWindowFocus: false}}
});
const cooke = new Cookies();
clientApi.interceptors.request.use(config => {
  const token = cooke.get(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

clientApi.interceptors.response.use(
  response => response,
  error => {
    console.error(`API Error [${error.response?.status ?? 'Network'}]`, error.response?.data ?? error.message);
    toast.error(`API Error [${error.response?.status ?? 'Network'}]`, error.response?.data ?? error.message);
    return Promise.reject(error);
  }
);
