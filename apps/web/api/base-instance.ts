import {BACKEND_URL} from '@/lib/env';
import axios from 'axios';
import {toast} from 'sonner';
const baseURL = `${BACKEND_URL}/api`;

export const baseApi = axios.create({
  baseURL
});

export const VERSION_ONE = 'v1';
baseApi.interceptors.request.use(config => {
  return config;
});

baseApi.interceptors.response.use(
  response => response,
  error => {
    console.error(`API Error [${error.response?.status ?? 'Network'}]`, error.response?.data ?? error.message);
    toast.error(`API Error [${error.response?.status ?? 'Network'}]`, error.response?.data ?? error.message);
    return Promise.reject(error);
  }
);
