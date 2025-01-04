// @ts-ignore
import type { AxiosResponse } from 'axios';
// @ts-ignore
import axios, { AxiosInstance } from 'axios';
import EVAPIMockAdapter, { EVAPI } from '@ecovoit-api/mock-adapter';
import { errorsToString } from '@/utils';

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

// Ajouter un interceptor pour journaliser l'URL de chaque requête
if (process.env.NODE_ENV === 'development') {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const mock = new EVAPIMockAdapter(apiClient);

	apiClient.interceptors.request.use(
		(config: {
			url: string | URL;
			baseURL: string | URL | undefined;
			params: { [x: string]: string };
			method: string;
		}) => {
			let url = new URL(config.url, config.baseURL);
			if (config.params) {
				Object.keys(config.params).forEach((key) => {
					url.searchParams.append(key, config.params[key]);
				});
				// Décodage de l'URL pour éviter l'encodage des crochets
				url = new URL(decodeURIComponent(url.toString()));
			}
			console.log(
				`Request Type: ${config.method?.toUpperCase()} | Request URL: ${url.toString()}`
			);
			return config;
		}
	);
}

/**
 * Extract data from Axios response.
 * @template T
 * @param {AxiosResponse<T>} response - The Axios response object.
 * @returns {T} - The extracted data.
 */
const extractData = <T>(response: AxiosResponse<T>): T => response.data;

/**
 * Effectue une requête GET.
 * @template GetType
 * @param {string} url - L'URL à laquelle envoyer la requête GET.
 * @param params
 * @param filters
 * @param sort
 * @returns {Promise<GetType>} - Une promesse qui se résout avec les données de la réponse.
 */
export const apiGet = <GetType>(
	url: string,
	params?: EVAPI.DB.ListingOptions<EVAPI.Entry>,
	filters?: EVAPI.DB.Filters<EVAPI.Entry>,
	sort?: EVAPI.DB.Sort<EVAPI.Entry>
): Promise<GetType> => {
	const config = {
		params: {
			...params,
		},
	};

	const urlObj = new URL(url, apiClient.defaults.baseURL);

	if (filters) {
		Object.entries(filters).forEach(([key, value]) => {
			urlObj.searchParams.append(`filter[${key}]`, value);
		});
	}

	if (sort) {
		Object.entries(sort).forEach(([key, value]) => {
			urlObj.searchParams.append(`sort[${key}]`, value);
		});
	}

	return apiClient
		.get<ResponseType>(urlObj.toString(), config)
		.then(extractData)
		.catch((error: EVAPI.Error) => {
			throw new Error(errorsToString(error));
		});
};
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
	apiClient
		.post<ResponseType>(url, data)
		.then(extractData)
		.catch((error: EVAPI.Error) => {
			throw new Error(errorsToString(error));
		});

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
	apiClient
		.put<ResponseType>(url, data)
		.then(extractData)
		.catch((error: EVAPI.Error) => {
			throw new Error(errorsToString(error));
		});

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
	data: Partial<RequestType>
): Promise<ResponseType> =>
	apiClient
		.patch<ResponseType>(url, data)
		.then(extractData)
		.catch((error: EVAPI.Error) => {
			throw new Error(errorsToString(error));
		});

/**
 * Perform a DELETE request.
 * @param url - The URL to send the DELETE request to.
 */
export const apiDelete = (url: string): Promise<void> =>
	apiClient
		.delete<void>(url)
		.then(extractData)
		.catch((error: EVAPI.Error) => {
			throw new Error(errorsToString(error));
		});

export default apiClient;
