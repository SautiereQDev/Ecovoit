import { apiGet, apiPut } from './client';
import { User } from '@/types';

export const fetchUser = (id: string): Promise<User> =>
	apiGet<User>(`/users/${id}`);

export const fetchCurrentUser = (): Promise<User> => apiGet<User>('/users/me');

export const updateUser = (id: string, data: Partial<User>): Promise<User> =>
	apiPut<User>(`/users/${id}`, data);
