import {BACKEND_URL} from '@/lib/env';
import {toast} from 'sonner';
import {baseApi} from './base-instance';
const baseURL = `${BACKEND_URL}/api`;

export const serverApi = baseApi.create({
  baseURL
});

serverApi.interceptors.response.use(
  response => response,
  error => {
    console.error(`API Error [${error.response?.status ?? 'Network'}]`, error.response?.data ?? error.message);
    toast.error(`API Error [${error.response?.status ?? 'Network'}]`, error.response?.data ?? error.message);
    return Promise.reject(error);
  }
);
