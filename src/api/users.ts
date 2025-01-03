import { apiGet, apiPost } from './client';
import { EVAPI } from '@ecovoit-api/mock-adapter';

/**
 * Fetches the list of users.
 *
 * @returns {Promise<GetUsersType>} A promise that resolves to the list of users.
 */
export const fetchUsers = (): Promise<EVAPI.User | EVAPI.Error> =>
	apiGet<EVAPI.User>('/users');

/**
 * Fetches a user by their ID.
 *
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<GetUserType>} A promise that resolves to the user data.
 */
export const fetchUser = (
	id: string
): Promise<EVAPI.PublicUser | EVAPI.Error> =>
	apiGet<EVAPI.PublicUser>(`/users/${id}`);

/**
 * Fetches the current logged-in user.
 *
 * @returns {Promise<EVAPI.User>} A promise that resolves to the current user data.
 */
export const fetchCurrentUser = (): Promise<EVAPI.User | EVAPI.Error> =>
	apiGet<EVAPI.User>('/users/me');

/**
 * Creates a new user.
 * @param {PostUserType} data - The data for the new user.
 * @returns {Promise<GetUserType>} A promise that resolves to the created user data.
 */
export const postUser = (
	data: EVAPI.UserEntry
): Promise<EVAPI.PublicUser | EVAPI.Error> =>
	apiPost<EVAPI.UserEntry, EVAPI.PublicUser>('/users', data);

/**
 * Updates a user by their ID.
 *
 * @param {string} id - The ID of the user to update.
 * @param {Partial<User>} data - The data to update the user with.
 * @returns {Promise<User>} A promise that resolves to the updated user data.
 */
export const updateUser = (
	id: string,
	data: Partial<EVAPI.UserEntry>
): Promise<Partial<EVAPI.User> | EVAPI.Error> => {
	throw new Error('Not implemented');
};
