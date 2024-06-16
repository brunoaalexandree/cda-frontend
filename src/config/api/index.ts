import axios, { AxiosInstance } from 'axios';

import { STATE_STORAGE_LOCATION } from '@/const';

export const api = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  };

  const instance = axios.create(defaultOptions);
  instance.defaults.headers.common['Content-Type'] = 'application/json';

  addTokenToHeaders(instance);

  return instance;
};

const addTokenToHeaders = (instance: AxiosInstance) => {
  if (!localStorage.getItem(STATE_STORAGE_LOCATION)) return;
  const token = localStorage.getItem(STATE_STORAGE_LOCATION);

  instance.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : '';
};
