import axios, { AxiosInstance } from 'axios';

import { STATE_STORAGE_LOCATION } from '@/const';

export const api = () => {
  const defaultOptions = {
    baseURL: 'http://localhost:3333',
    // validateStatus: (statusNumber: number) => statusNumber >= 200 && statusNumber < 300,
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
