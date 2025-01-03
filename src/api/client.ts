// @ts-ignore
import type { AxiosResponse } from 'axios';
// @ts-ignore
import axios, { AxiosInstance } from 'axios';
import EVAPIMockAdapter, { EVAPI } from '@ecovoit-api/mock-adapter';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mock = new EVAPIMockAdapter(apiClient);

// Ajouter un interceptor pour journaliser l'URL de chaque requête
apiClient.interceptors.request.use(
	(config: {
		url: string | URL;
		baseURL: string | URL | undefined;
		params: { [x: string]: string };
		method: string;
	}) => {
		const url = new URL(config.url, config.baseURL);
		if (config.params) {
			Object.keys(config.params).forEach((key) =>
				url.searchParams.append(key, config.params[key])
			);
		}
		console.log(
			`Request Type: ${config.method?.toUpperCase()} | Request URL: ${url.toString()}`
		);
		return config;
	}
);

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
): Promise<GetType | EVAPI.Error> =>
	apiClient.get<GetType | EVAPI.Error>(url, { params }).then(extractData);

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
): Promise<ResponseType | EVAPI.Error> =>
	apiClient.post<ResponseType | EVAPI.Error>(url, data).then(extractData);

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
): Promise<ResponseType | EVAPI.Error> =>
	apiClient.put<ResponseType | EVAPI.Error>(url, data).then(extractData);

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
): Promise<ResponseType | EVAPI.Error> =>
	apiClient.patch<ResponseType | EVAPI.Error>(url, data).then(extractData);

/**
 * Perform a DELETE request.
 * @param url - The URL to send the DELETE request to.
 */
export const apiDelete = (url: string): Promise<void | EVAPI.Error> =>
	apiClient.delete(url);

export default apiClient;
