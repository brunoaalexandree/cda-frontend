import { api } from '@/config/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserEmblems {}

export async function user(token: string) {
  const { data } = await api().get<User>('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function userEmblems() {
  const { data } = await api().get('/user/emblems');

  return data;
}
