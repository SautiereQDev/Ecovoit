import { apiGet, apiPost } from './client';
import { GetUsersType, GetUserType, PostUserType, User } from '@/types';

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

/**
 * Creates a new user.
 * @param {PostUserType} data - The data for the new user.
 * @returns {Promise<GetUserType>} A promise that resolves to the created user data.
 */
export const postUser = (data: PostUserType): Promise<GetUserType> =>
	apiPost<PostUserType, GetUserType>('/users', data);

// /**
//  * Updates a user by their ID.
//  *
//  * @param {string} id - The ID of the user to update.
//  * @param {Partial<User>} data - The data to update the user with.
//  * @returns {Promise<User>} A promise that resolves to the updated user data.
//  */
// export const updateUser = (id: string, data: Partial<User>): Promise<User> =>
// 	apiPut<User>(`/users/${id}`, data);