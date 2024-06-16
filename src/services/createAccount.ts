import { api } from '@/config/api';

export interface CreateAccount {
  name: string;
  email: string;
  password: string;
}

export async function createAccount({ name, email, password }: CreateAccount) {
  const { data } = await api().post('/accounts', {
    name,
    email,
    password,
  });

  return data;
}
