import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	addVehicle,
	fetchTrip,
	fetchTrips,
	fetchUser,
	fetchUsers,
	fetchVehiclesByUser,
	patchTrip,
	postTrip,
	removeVehicle,
} from '@/api';
import {
	GetTripsType,
	GetTripType,
	GetUsersType,
	GetUserType,
	GetVehiclesType,
	PostTripsType,
	PostVehicleType,
	TripParamsType,
	Vehicle,
} from '@/types';

interface DataContextProps {
	useVehicles: (userId: string) => ReturnType<typeof useQuery<GetVehiclesType>>;
	useAddVehicle: () => ReturnType<
		typeof useMutation<
			Vehicle,
			unknown,
			{
				userId: string;
				vehicleData: PostVehicleType;
			},
			unknown
		>
	>;
	useUsers: () => ReturnType<typeof useQuery<GetUsersType>>;
	useUser: (userId: string) => ReturnType<typeof useQuery<GetUserType>>;
	useRemoveVehicle: () => ReturnType<
		typeof useMutation<void, unknown, { userId: string; label: string }>
	>;
	useTrips: (params?: any) => ReturnType<typeof useQuery<GetTripsType>>;
	useTrip: (tripId: string) => ReturnType<typeof useQuery<GetTripType>>;
	useAddTrip: () => ReturnType<
		typeof useMutation<GetTripsType, unknown, { tripData: PostTripsType }>
	>;
	useCanceledTrip: () => ReturnType<
		typeof useMutation<unknown, unknown, { tripId: string }>
	>;
	useCurrentUserTrips: () => ReturnType<typeof useQuery<GetTripsType>>;
}

export const DataContext = createContext<DataContextProps | undefined>(
	undefined
);

interface UserProviderProps {
	children: ReactNode;
}

const useUsers = () => {
	return useQuery<GetUsersType>(['users'], () => fetchUsers());
};

const useUser = (userId: string) => {
	return useQuery<GetUserType>(['user', userId], () => fetchUser(userId));
};

const currentUser = () => {
	throw new Error('Function not implemented.');
	// TODO: Faire une recherche à [GET] /users/me
};

const useVehicles = (userId: string) => {
	return useQuery<GetVehiclesType>(['vehicles', userId], () =>
		fetchVehiclesByUser(userId)
	);
};

const useRemoveVehicle = () => {
	const queryClient = useQueryClient();
	return useMutation<void, unknown, { userId: string; label: string }>(
		(variables) => removeVehicle(variables.userId, variables.label),
		{
			onSuccess: (_, variables) => {
				queryClient
					.invalidateQueries(['vehicles', variables.userId])
					.catch((e) => console.error(e));
				queryClient
					.invalidateQueries(['users', variables.userId])
					.catch((e) => console.error(e));
			},
		}
	);
};

const useAddVehicle = () => {
	const queryClient = useQueryClient();
	return useMutation<
		Vehicle,
		unknown,
		{ userId: string; vehicleData: PostVehicleType }
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

const useTrips = (params?: TripParamsType) => {
	return useQuery<GetTripsType>(['trips', params], () => fetchTrips(params));
};
const useTrip = (tripId: string) => {
	return useQuery<GetTripType>(['trip', tripId], () => fetchTrip(tripId));
};

const useAddTrip = () => {
	const queryClient = useQueryClient();
	return useMutation<GetTripsType, unknown, { tripData: PostTripsType }>(
		(variables) => postTrip(variables.tripData),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['trips']).catch((e) => console.error(e));
				queryClient
					.invalidateQueries(['user', 'me'])
					.catch((e) => console.error(e));
			},
		}
	);
};

const useCanceledTrip = () => {
	const queryClient = useQueryClient();
	return useMutation<unknown, unknown, { tripId: string }>(
		(variables) => patchTrip(variables.tripId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['trips']).catch((e) => console.error(e));
				queryClient
					.invalidateQueries(['user', 'me'])
					.catch((e) => console.error(e));
			},
		}
	);
};

const useCurrentUserTrip = () => {
	// TODO: Faire une recherche à [GET] /trips et filtrer par userId avec l'id du currentUser
	// Dans un premier temps on test le système de filtre avec un requête en recuperer seats=3
	let filters = [{ field: 'seats', value: 3 }];
	return useQuery<GetTripsType>(['trips'], () =>
		fetchTrips(undefined, filters)
	);
};

export const DataProvider: React.FC<UserProviderProps> = ({ children }) => {
	const value: DataContextProps = useMemo(
		() => ({
			useVehicles,
			useAddVehicle,
			useUsers,
			useUser,
			useRemoveVehicle,
			useTrips,
			useTrip,
			useAddTrip,
			useCanceledTrip,
			useCurrentUserTrips: useCurrentUserTrip,
		}),
		[]
	);

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error('useUser must be used within DataProvider');
	}
	return context;
};
