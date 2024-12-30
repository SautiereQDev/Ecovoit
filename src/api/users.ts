import apiClient from './client';
import { User } from '@/types';

export const fetchUser = (id: number | string) => apiClient.get(`/users/${id}`);
export const fetchCurrentUser = () => apiClient.get('/users/me');
export const updateUser = (id: number | string, data: User) =>
	apiClient.put(`/users/${id}`, data);
