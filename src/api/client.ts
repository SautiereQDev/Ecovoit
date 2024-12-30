import type { AxiosResponse } from 'axios';
import axios, { AxiosInstance } from 'axios';
import EVAPIMockAdapter from '@ecovoit-api/mock-adapter';

/**
 * Create an Axios instance with predefined configuration.
 * @type {AxiosInstance}
 */
const apiClient: AxiosInstance = axios.create({
	baseURL: 'https://api-ev-qq.pimous.dev/',
	headers: {
		'Content-Type': 'application/json',
		Authorization: '5877943231555567616',
	},
});

const mock = new EVAPIMockAdapter(apiClient);

/**
 * Extract data from Axios response.
 * @template T
 * @param {AxiosResponse<T>} response - The Axios response object.
 * @returns {T} - The extracted data.
 */
const extractData = <T>(response: AxiosResponse<T>): T => response.data;

/**
 * Perform a GET request.
 * @template T
 * @param {string} url - The URL to send the GET request to.
 * @returns {Promise<T>} - A promise that resolves to the response data.
 */
export const apiGet = <T>(url: string): Promise<T> =>
	apiClient.get<T>(url).then(extractData);

/**
 * Perform a POST request.
 * @template T
 * @param {string} url - The URL to send the POST request to.
 * @param {unknown} data - The data to send in the POST request.
 * @returns {Promise<T>} - A promise that resolves to the response data.
 */
export const apiPost = <T>(url: string, data: unknown): Promise<T> =>
	apiClient.post<T>(url, data).then(extractData);

/**
 * Perform a PUT request.
 * @template T
 * @param {string} url - The URL to send the PUT request to.
 * @param {unknown} data - The data to send in the PUT request.
 * @returns {Promise<T>} - A promise that resolves to the response data.
 */
export const apiPut = <T>(url: string, data: unknown): Promise<T> =>
	apiClient.put<T>(url, data).then(extractData);

export default apiClient;
