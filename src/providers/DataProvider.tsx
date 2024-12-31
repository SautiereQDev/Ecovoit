import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	addVehicle,
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
	GetUsersType,
	GetUserType,
	GetVehiclesType,
	PostTripsType,
	PostVehicleType,
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
	useTrips: () => ReturnType<typeof useQuery<GetTripsType>>;
	useTrip: (tripId: string) => ReturnType<typeof useQuery<GetTripsType>>;
	useAddTrip: () => ReturnType<
		typeof useMutation<GetTripsType, unknown, { tripData: PostTripsType }>
	>;
	useCanceledTrip: () => ReturnType<
		typeof useMutation<unknown, unknown, { tripId: string }>
	>;
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

const useTrips = () => {
	return useQuery<GetTripsType>(['trips'], () => fetchTrips());
};

const useTrip = (tripId: string) => {
	return useQuery<GetTripsType>(['trip', tripId], () => fetchTrips());
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
