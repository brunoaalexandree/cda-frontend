import { api } from '@/config/api';

export interface Emblem {
  id: string;
  slug: string;
  name: string;
  image: string;
}

export interface RedeemEmblem {
  emblemId: string;
}

export interface RedeemEmblemResponse {
  id: string;
  name: string;
  email: string;
  emblems: Emblem[];
}

export async function emblems() {
  const { data } = await api().get<Emblem[]>('/emblems');

  return data;
}

export async function redeemEmblem({ emblemId }: RedeemEmblem) {
  const { data } = await api().post('/redeem-emblem', { emblemId });

  return data;
}
