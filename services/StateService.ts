import { BehaviorSubject, Subscription } from 'rxjs';
import { axiosInstance } from '@/app/_layout';

/**
 * StateService class to manage global state and interact with API endpoints.
 *
 * @template PostType - The type of data to be posted to the API.
 * @template GetType - The type of data to be retrieved from the API.
 */
export class StateService<PostType, GetType> {
	private readonly state: BehaviorSubject<GetType>;
	private readonly apiEndpoint: string;
	private readonly requiredParams: string[];
	private readonly optionalParams: string[];

	/**
	 * Creates an instance of StateService.
	 *
	 * @param {GetType} initialState - The initial state.
	 * @param {string} endpoint - The API endpoint.
	 * @param {string[]} [requiredParams=[]] - The required parameters for the API endpoint.
	 * @param {string[]} [optionalParams=[]] - The optional parameters for the API endpoint.
	 */
	constructor(
		initialState: GetType,
		endpoint: string,
		requiredParams: string[] = [],
		optionalParams: string[] = []
	) {
		this.state = new BehaviorSubject<GetType>(initialState);
		this.apiEndpoint = endpoint;
		this.requiredParams = requiredParams;
		this.optionalParams = optionalParams;
	}

	/**
	 * Gets the current state.
	 *
	 * @returns {GetType} The current state.
	 */
	getState(): GetType {
		return this.state.getValue();
	}

	/**
	 * Subscribes to state changes.
	 *
	 * @param {(state: GetType) => void} callback - The callback to be invoked on state changes.
	 * @returns {Subscription} The subscription to the state changes.
	 */
	subscribe(callback: (state: GetType) => void): Subscription {
		return this.state.subscribe(callback);
	}

	/**
	 * Updates the state with new values.
	 *
	 * @param {Partial<GetType>} newState - The new state values.
	 * @returns {Promise<void>} A promise that resolves when the state is updated.
	 */
	async updateState(newState: Partial<GetType>): Promise<void> {
		this.state.next({
			...this.state.getValue(),
			...newState,
		});
	}

	/**
	 * Posts data to the API.
	 *
	 * @param {PostType} data - The data to be posted.
	 * @param {Record<string, string>} params - The parameters for the API endpoint.
	 * @returns {Promise<void>} A promise that resolves when the data is posted.
	 * @throws Will throw an error if the post request fails.
	 */
	async postToAPI(
		data: PostType,
		params: Record<string, string>
	): Promise<void> {
		try {
			const url = this.buildUrl(params);
			const response = await axiosInstance.post(url, data, {
				headers: {
					Authorization: `5877943231555567616`,
				},
			});
			if (response.status === 200) {
				this.state.next(response.data as GetType);
			}
		} catch (error) {
			console.error('Error posting state:', error);
			throw error;
		}
	}

	/**
	 * Fetches data from the API.
	 *
	 * @param {Record<string, string>} params - The parameters for the API endpoint.
	 * @returns {Promise<void>} A promise that resolves when the data is fetched.
	 * @throws Will throw an error if the fetch request fails.
	 */
	async fetchFromAPI(params: Record<string, string>): Promise<void> {
		try {
			const url = this.buildUrl(params);
			const response = await axiosInstance.get(url, {
				headers: {
					Authorization: `5877943231555567616`,
				},
			});
			if (response.status === 200) {
				this.state.next(response.data as GetType);
			}
		} catch (error) {
			console.error('Error fetching state:', error);
			throw error;
		}
	}

	/**
	 * Builds the URL for the API request based on the provided parameters.
	 *
	 * @param {Record<string, string>} params - The parameters for the API endpoint.
	 * @returns {string} The constructed URL.
	 * @throws Will throw an error if a required parameter is missing.
	 */
	private buildUrl(params: Record<string, string>): string {
		let url = this.apiEndpoint;
		this.requiredParams.forEach((param) => {
			if (params[param]) {
				url += `/${params[param]}`;
			} else {
				throw new Error(`Missing required parameter: ${param}`);
			}
		});
		this.optionalParams.forEach((param) => {
			if (params[param]) {
				url += `/${params[param]}`;
			}
		});
		return url;
	}
}

export default StateService;
