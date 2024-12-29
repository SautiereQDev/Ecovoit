import { useEffect, useState } from 'react';
import { StateService } from '@/services/StateService';

/**
 * Custom hook to manage shared state using a StateService.
 * @template T - The type of the state.
 * @param {StateService<T>} stateService - The StateService instance to manage the state.
 * @returns {{ state: T, updateState: (newState: Partial<T>) => Promise<void> }} An object containing the current state and a function to update the state.
 */
export function useSharedState<T>(stateService: StateService<T>): {
	state: T;
	updateState: (newState: Partial<T>) => Promise<void>;
} {
	const [state, setState] = useState<T>(stateService.getState());

	useEffect(() => {
		const subscription = stateService.subscribe((newState) => {
			setState(newState);
		});

		stateService.fetchFromAPI().catch((error) => {
			console.error(error);
		});

		return () => subscription.unsubscribe();
	}, [stateService]);

	const updateState = async (newState: Partial<T>): Promise<void> => {
		try {
			await stateService.updateState(newState);
		} catch (error) {
			console.error(error);
		}
	};

	return { state, updateState };
}

export default useSharedState;
