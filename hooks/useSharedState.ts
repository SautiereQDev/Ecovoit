import { useEffect, useState } from 'react';
import { StateService } from '@/services/StateService';

export function useSharedState<T>(stateService: StateService<T>) {
	const [state, setState] = useState<T>(stateService.getState());

	useEffect(() => {
		const subscription = stateService.subscribe((newState) => {
			setState(newState);
		});

		// Charger les données initiales
		stateService.fetchFromAPI();

		return () => subscription.unsubscribe();
	}, [stateService]);

	const updateState = async (newState: Partial<T>) => {
		try {
			await stateService.updateState(newState);
		} catch (error) {
			console.error(error);
		}
	};

	return { state, updateState };
}

export default useSharedState;
