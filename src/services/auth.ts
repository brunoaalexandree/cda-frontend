import { api } from '@/config/api';

export interface SignIn {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
}

export async function signIn({ email, password }: SignIn) {
  const { data } = await api().post<SignInResponse>('/auth', {
    email,
    password,
  });

  return data;
}
