import { apiGet } from './client';
import { GetUsersType, GetUserType, User } from '@/types';

/**
 * Fetches the list of users.
 *
 * @returns {Promise<GetUsersType>} A promise that resolves to the list of users.
 */
export const fetchUsers = (): Promise<GetUsersType> =>
	apiGet<GetUsersType>('/users');

/**
 * Fetches a user by their ID.
 *
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<GetUserType>} A promise that resolves to the user data.
 */
export const fetchUser = (id: string): Promise<GetUserType> =>
	apiGet<GetUserType>(`/users/${id}`);

/**
 * Fetches the current logged-in user.
 *
 * @returns {Promise<User>} A promise that resolves to the current user data.
 */
export const fetchCurrentUser = (): Promise<User> => apiGet<User>('/users/me');

// /**
//  * Updates a user by their ID.
//  *
//  * @param {string} id - The ID of the user to update.
//  * @param {Partial<User>} data - The data to update the user with.
//  * @returns {Promise<User>} A promise that resolves to the updated user data.
//  */
// export const updateUser = (id: string, data: Partial<User>): Promise<User> =>
// 	apiPut<User>(`/users/${id}`, data);