import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	addVehicle,
	fetchLocations,
	fetchTrip,
	fetchTrips,
	fetchUser,
	fetchUsers,
	fetchVehiclesByUser,
	patchTrip,
	postTrip,
	postUser,
	removeVehicle,
} from '@/api';
import {
	GetLocationsType,
	GetTripsType,
	GetTripType,
	GetUsersType,
	GetUserType,
	GetVehiclesType,
	PostTripType,
	PostUserType,
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
	useAddUser: () => ReturnType<
		typeof useMutation<
			GetUserType,
			unknown,
			{
				userData: PostUserType;
			},
			unknown
		>
	>;
	useAddTrip: () => ReturnType<
		typeof useMutation<GetTripType, unknown, { tripData: PostTripType }>
	>;
	useUsers: () => ReturnType<typeof useQuery<GetUsersType>>;
	useUser: (userId: string) => ReturnType<typeof useQuery<GetUserType>>;
	useRemoveVehicle: () => ReturnType<
		typeof useMutation<void, unknown, { userId: string; label: string }>
	>;
	useTrips: (params?: any) => ReturnType<typeof useQuery<GetTripsType>>;
	useTrip: (tripId: string) => ReturnType<typeof useQuery<GetTripType>>;

	useCanceledTrip: () => ReturnType<
		typeof useMutation<unknown, unknown, { tripId: string }>
	>;
	useCurrentUserTrips: () => ReturnType<typeof useQuery<GetTripsType>>;
	useCurrentUser: () => ReturnType<typeof useQuery<GetUserType>>;
	useLocation: () => ReturnType<typeof useQuery<GetLocationsType[]>>;
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

const useCurrentUser = () => {
	return useQuery<GetUserType>(['user', 'me'], () => fetchUser('me'));
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
	return useMutation<GetTripType, unknown, { tripData: PostTripType }>(
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

const useAddUser = () => {
	const queryClient = useQueryClient();
	return useMutation<GetUserType, unknown, { userData: PostUserType }>(
		(variables) => postUser(variables.userData),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['users']).catch((e) => console.error(e));
				queryClient
					.invalidateQueries(['user', 'me'])
					.catch((e) => console.error(e));
				// Fetch the user data after the mutation
				queryClient.setQueryData(['user', data.id], data);
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

const useCurrentUserTrips = () => {
	// TODO: Faire une recherche à [GET] /trips et filtrer par userId avec l'id du currentUser
	// Dans un premier temps on test le système de filtre avec un requête en recuperer seats=3
	let filters = [{ field: 'seats', value: 3 }];
	return useQuery<GetTripsType>(['trips'], () =>
		fetchTrips(undefined, filters)
	);
};

const useLocations = () => {
	return useQuery<GetLocationsType[]>(['locations'], () => fetchLocations());
};

export const DataProvider: React.FC<UserProviderProps> = ({ children }) => {
	const value: DataContextProps = useMemo(
		() => ({
			useVehicles,
			useAddVehicle,
			useAddUser,
			useUsers,
			useUser,
			useRemoveVehicle,
			useTrips,
			useTrip,
			useAddTrip,
			useCanceledTrip,
			useCurrentUserTrips,
			useCurrentUser,
			useLocation: useLocations,
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
