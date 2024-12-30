import { BehaviorSubject, Subscription } from 'rxjs';
import { axiosInstance } from '@/app/_layout';

export class StateService<PostType, GetType> {
	private readonly state: BehaviorSubject<GetType>;
	private readonly apiEndpoint: string;
	private readonly requiredParams: string[];
	private readonly optionalParams: string[];

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

	getState(): GetType {
		return this.state.getValue();
	}

	subscribe(callback: (state: GetType) => void): Subscription {
		return this.state.subscribe(callback);
	}

	async updateState(newState: Partial<GetType>): Promise<void> {
		this.state.next({
			...this.state.getValue(),
			...newState,
		});
	}

	async postToAPI(
		data: PostType,
		params: Record<string, string>
	): Promise<void> {
		try {
			const url = this.buildUrl(params);
			const response = await axiosInstance.post(url, data, {
				headers: {
					Authorization: `Bearer 5877943231555567616`,
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

	async fetchFromAPI(params: Record<string, string>): Promise<void> {
		try {
			const url = this.buildUrl(params);
			const response = await axiosInstance.get(url, {
				headers: {
					Authorization: `Bearer 5877943231555567616`,
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
