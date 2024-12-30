import { SetStateAction, useEffect, useState } from 'react';
import { StateService } from '@/services/StateService';

/**
 * Custom hook to manage shared state using a StateService.
 * @template T - The type of the state.
 * @param {StateService<T>} stateService - The StateService instance to manage the state.
 * @returns {{ state: T, updateState: (newState: Partial<T>) => Promise<void> }} An object containing the current state and a function to update the state.
 */
export function useSharedState<PostType, GetType>(
	stateService: StateService<PostType, GetType>
): {
	state: GetType;
	updateState: (newState: Partial<GetType>) => Promise<void>;
	postState: (newState: PostType) => Promise<void>;
} {
	const [state, setState] = useState<GetType>(stateService.getState());

	useEffect(() => {
		const subscription = stateService.subscribe(
			(newState: SetStateAction<GetType>) => {
				setState(newState);
			}
		);

		stateService.fetchFromAPI().catch((error: any) => {
			console.error(error);
		});

		return () => subscription.unsubscribe();
	}, [stateService]);

	const updateState = async (newState: Partial<GetType>): Promise<void> => {
		try {
			await stateService.updateState(newState);
		} catch (error) {
			console.error(error);
		}
	};

	const postState = async (newState: PostType): Promise<void> => {
		try {
			await stateService.postToAPI(newState);
		} catch (error) {
			console.error(error);
		}
	};

	return { state, updateState, postState };
}

export default useSharedState;
