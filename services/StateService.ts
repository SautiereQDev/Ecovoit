import { BehaviorSubject } from 'rxjs';
import { axiosInstance } from '@/app/_layout';

export class StateService<T> {
	private state: BehaviorSubject<T>;
	private apiEndpoint: string;

	constructor(initialState: T, endpoint: string) {
		this.state = new BehaviorSubject<T>(initialState);
		this.apiEndpoint = endpoint;
	}

	// Obtenir l'état actuel
	getState(): T {
		return this.state.getValue();
	}

	// S'abonner aux changements
	subscribe(callback: (state: T) => void) {
		return this.state.subscribe(callback);
	}

	// Mettre à jour l'état et synchroniser avec l'API
	async updateState(newState: Partial<T>): Promise<void> {
		try {
			// Appel API
			const response = await axiosInstance.patch(this.apiEndpoint, newState);

			// Mise à jour locale si succès
			if (response.status === 200) {
				this.state.next({
					...this.state.getValue(),
					...newState,
				});
			}
		} catch (error) {
			console.error('Error updating state:', error);
			throw error;
		}
	}

	// Charger les données depuis l'API
	async fetchFromAPI(): Promise<void> {
		try {
			const response = await axiosInstance.get(this.apiEndpoint);
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
