import { BehaviorSubject } from 'rxjs';
import { axiosInstance } from '@/app/_layout';

export class StateService<T> {
	private readonly state: BehaviorSubject<T>;
	private readonly apiEndpoint: string;

	constructor(initialState: T, endpoint: string) {
		this.state = new BehaviorSubject<T>(initialState);
		this.apiEndpoint = endpoint;
	}

	getState(): T {
		return this.state.getValue();
	}

	subscribe(callback: (state: T) => void) {
		return this.state.subscribe(callback);
	}

	async updateState(newState: Partial<T>): Promise<void> {
		this.state.next({
			...this.state.getValue(),
			...newState,
		});
	}

	async postToAPI(data: T): Promise<void> {
		try {
			const response = await axiosInstance.post(this.apiEndpoint, data, {
				headers: {
					Authorization: `5877943231555567616`,
				},
			});
			if (response.status === 200) {
				this.state.next(response.data as T);
			}
		} catch (error) {
			console.error('Error posting state:', error);
			throw error;
		}
	}

	async fetchFromAPI(): Promise<void> {
		try {
			const response = await axiosInstance.get(this.apiEndpoint, {
				headers: {
					Authorization: `5877943231555567616`,
				},
			});
			if (response.status === 200) {
				this.state.next(response.data as T);
			}
		} catch (error) {
			console.error('Error fetching state:', error);
			throw error;
		}
	}
}

export default StateService;
