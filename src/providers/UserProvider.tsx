import React, {
	createContext,
	Dispatch,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addVehicle, fetchCurrentUser, fetchVehiclesByUser } from '@/api';
import userReducer, {
	initialState,
	UserAction,
	UserState,
} from '../reducers/userReducer';
import { GetVehiclesType, PostVehiclesType, Vehicle } from '@/types';

interface UserContextProps {
	state: UserState;
	dispatch: Dispatch<UserAction>;
	useVehicles: (userId: string) => ReturnType<typeof useQuery>;
	useAddVehicle: () => ReturnType<
		typeof useMutation<
			Vehicle,
			unknown,
			{
				userId: string;
				vehicleData: PostVehiclesType;
			},
			unknown
		>
	>;
}

export const UserContext = createContext<UserContextProps | undefined>(
	undefined
);

interface UserProviderProps {
	children: ReactNode;
}

const useVehicles = (userId: string) => {
	return useQuery<GetVehiclesType>(['vehicles', userId], () =>
		fetchVehiclesByUser(userId)
	);
};

const useRemoveVehicle = () => {};
const useAddVehicle = () => {
	const queryClient = useQueryClient();
	return useMutation<
		Vehicle,
		unknown,
		{ userId: string; vehicleData: PostVehiclesType }
	>((variables) => addVehicle(variables.userId, variables.vehicleData), {
		onSuccess: (_, variables) => {
			queryClient
				.invalidateQueries(['vehicles', variables.userId])
				.catch((e) => console.error(e));
			queryClient
				.invalidateQueries(['users', variables.userId])
				.catch((e) => console.error(e));
		},
	});
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	useEffect(() => {
		const fetchUser = async () => {
			dispatch({ type: 'SET_LOADING', payload: true });
			try {
				const user = await fetchCurrentUser();
				dispatch({ type: 'SET_USER', payload: user });
			} catch (error) {
				console.error('Error fetching user:', error);
			} finally {
				dispatch({ type: 'SET_LOADING', payload: false });
			}
		};

		fetchUser().catch((e) => console.error(e));
	}, []);

	const value = useMemo(
		() => ({
			state,
			dispatch,
			useVehicles,
			useAddVehicle,
		}),
		[state, dispatch]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within UserProvider');
	}
	return context;
};
