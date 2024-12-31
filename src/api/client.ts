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
 * @template GetType
 * @param {string} url - The URL to send the GET request to.
 * @param params
 * @returns {Promise<GetType>} - A promise that resolves to the response data.
 */
export const apiGet = <GetType>(
	url: string,
	params?: object | object[]
): Promise<GetType> =>
	apiClient.get<GetType>(url, { params }).then(extractData);

/**
 * Perform a POST request.
 * @template RequestType - The type of the request body.
 * @template ResponseType - The type of the response data.
 * @param {string} url - The URL to send the POST request to.
 * @param {RequestType} data - The data to send in the POST request.
 * @returns {Promise<ResponseType>} - A promise that resolves to the response data.
 */
export const apiPost = <RequestType, ResponseType>(
	url: string,
	data: RequestType
): Promise<ResponseType> =>
	apiClient.post<ResponseType>(url, data).then(extractData);

/**
 * Perform a PUT request.
 * @template RequestType - The type of the request body.
 * @template ResponseType - The type of the response data.
 * @param {string} url - The URL to send the PUT request to.
 * @param {RequestType} data - The data to send in the PUT request.
 * @returns {Promise<ResponseType>} - A promise that resolves to the response data.
 */
export const apiPut = <RequestType, ResponseType>(
	url: string,
	data: RequestType
): Promise<ResponseType> =>
	apiClient.put<ResponseType>(url, data).then(extractData);

/**
 * Perform a PATCH request.
 * @template RequestType - The type of the request body.
 * @template ResponseType - The type of the response data.
 * @param {string} url - The URL to send the PATCH request to.
 * @param {RequestType} data - The data to send in the PATCH request.
 * @returns {Promise<ResponseType>} - A promise that resolves to the response data.
 */
export const apiPatch = <RequestType, ResponseType>(
	url: string,
	data: RequestType
): Promise<ResponseType> =>
	apiClient.patch<ResponseType>(url, data).then(extractData);

/**
 * Perform a DELETE request.
 * @param url - The URL to send the DELETE request to.
 */
export const apiDelete = (url: string): Promise<void> => apiClient.delete(url);

export default apiClient;
