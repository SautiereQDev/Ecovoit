import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	addVehicle,
	fetchCurrentUser,
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
import { EVAPI } from '@ecovoit-api/mock-adapter';

interface DataContextProps {
	useVehicles: (userId: string) => ReturnType<typeof useQuery<EVAPI.Vehicle[]>>;
	useAddVehicle: () => ReturnType<
		typeof useMutation<
			EVAPI.Vehicle,
			unknown,
			{
				userId: string;
				vehicleData: EVAPI.VehicleCreation;
			},
			unknown
		>
	>;
	useAddUser: () => ReturnType<
		typeof useMutation<
			EVAPI.PublicUser,
			unknown,
			{
				userData: EVAPI.UserEntry;
			},
			unknown
		>
	>;
	useAddTrip: () => ReturnType<
		typeof useMutation<EVAPI.Trip, unknown, { tripData: EVAPI.TripEntry }>
	>;
	useUsers: () => ReturnType<typeof useQuery<EVAPI.PublicUser[]>>;
	useUser: (userId: string) => ReturnType<typeof useQuery<EVAPI.PublicUser>>;
	useRemoveVehicle: () => ReturnType<
		typeof useMutation<void, unknown, { userId: string; label: string }>
	>;
	useTrips: (params?: any) => ReturnType<typeof useQuery<EVAPI.Trip[]>>;
	useTrip: (tripId: string) => ReturnType<typeof useQuery<EVAPI.Trip>>;

	useCanceledTrip: () => ReturnType<
		typeof useMutation<unknown, unknown, { tripId: string }>
	>;
	useCurrentUserTrips: () => ReturnType<typeof useQuery<EVAPI.Trip[]>>;
	useCurrentUser: () => ReturnType<typeof useQuery<EVAPI.User>>;
	useLocation: () => ReturnType<typeof useQuery<EVAPI.Location[]>>;
}

export const DataContext = createContext<DataContextProps | undefined>(
	undefined
);

interface UserProviderProps {
	children: ReactNode;
}

const useUsers = () => {
	return useQuery<EVAPI.PublicUser[], EVAPI.Error>(
		['users'],
		() => fetchUsers(),
		{
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to fetch users:', error);
			},
		}
	);
};

export const useUser = (id: string) => {
	return useQuery<EVAPI.PublicUser, EVAPI.Error>(
		['user', id],
		() => fetchUser(id), // fetchUser lève des exceptions en cas d'erreur
		{
			retry: 1, // Limiter le nombre de tentatives
			onError: (error: EVAPI.Error) => {
				console.error(
					"Erreur lors de la récupération de l'utilisateur :",
					error
				);
			},
		}
	);
};

const useCurrentUser = () => {
	return useQuery<EVAPI.User, EVAPI.Error>(
		['user', 'me'],
		() => fetchCurrentUser(),
		{
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to fetch current user:', error);
			},
		}
	);
};

const useVehiclesByUser = (userId: string) => {
	return useQuery<EVAPI.Vehicle[], EVAPI.Error>(
		['vehicles', userId],
		() => fetchVehiclesByUser(userId),
		{
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to fetch vehicles:', error);
			},
		}
	);
};

const useRemoveVehicle = () => {
	const queryClient = useQueryClient();
	return useMutation<void, EVAPI.Error, { userId: string; label: string }>(
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
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to remove vehicle:', error);
			},
		}
	);
};

const useAddVehicle = () => {
	const queryClient = useQueryClient();
	return useMutation<
		EVAPI.Vehicle,
		EVAPI.Error,
		{ userId: string; vehicleData: EVAPI.VehicleCreation }
	>((variables) => addVehicle(variables.userId, variables.vehicleData), {
		onSuccess: (_, variables) => {
			queryClient
				.invalidateQueries(['vehicles', variables.userId])
				.catch((e) => console.error(e));
			queryClient
				.invalidateQueries(['users', variables.userId])
				.catch((e) => console.error(e));
		},
		retry: 1,
		onError: (error: EVAPI.Error) => {
			console.error('Failed to add vehicle:', error);
		},
	});
};

const useTrips = (
	params?: EVAPI.DB.ListingOptions<EVAPI.Entry>,
	filters?: EVAPI.DB.Filters<EVAPI.Entry>,
	sort?: EVAPI.DB.Sort<EVAPI.Entry>
) => {
	return useQuery<EVAPI.Trip[], EVAPI.Error>(
		['trips', params],
		() => fetchTrips(params, filters, sort),
		{
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to fetch trips:', error);
			},
		}
	);
};
const useTrip = (tripId: string) => {
	return useQuery<EVAPI.Trip, EVAPI.Error>(
		['trip', tripId],
		() => fetchTrip(tripId),
		{
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to fetch trip:', error);
			},
		}
	);
};

const useAddTrip = () => {
	const queryClient = useQueryClient();
	return useMutation<EVAPI.Trip, EVAPI.Error, { tripData: EVAPI.TripEntry }>(
		(variables) => postTrip(variables.tripData),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['trips']).catch((e) => console.error(e));
				queryClient
					.invalidateQueries(['user', 'me'])
					.catch((e) => console.error(e));
			},
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to add trip:', error);
			},
		}
	);
};

const useAddUser = () => {
	const queryClient = useQueryClient();
	return useMutation<
		EVAPI.PublicUser,
		EVAPI.Error,
		{ userData: EVAPI.UserEntry }
	>((variables) => postUser(variables.userData), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['users']).catch((e) => console.error(e));
			queryClient
				.invalidateQueries(['user', 'me'])
				.catch((e) => console.error(e));
			// Fetch the user data after the mutation
			queryClient.setQueryData(['user', data.id], data);
		},
		retry: 1,
		onError: (error: EVAPI.Error) => {
			console.error('Failed to add user:', error);
		},
	});
};

const useCanceledTrip = () => {
	const queryClient = useQueryClient();
	return useMutation<unknown, EVAPI.Error, { tripId: string }>(
		(variables) => patchTrip(variables.tripId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['trips']).catch((e) => console.error(e));
				queryClient
					.invalidateQueries(['user', 'me'])
					.catch((e) => console.error(e));
			},
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to cancel trip:', error);
			},
		}
	);
};

const useCurrentUserTrips = () => {
	// TODO: Faire une recherche à [GET] /trips et filtrer par userId avec l'id du currentUser
	// Dans un premier temps on test le système de filtre avec un requête en recuperer seats=3
	const filters: EVAPI.DB.Filters<EVAPI.TripEntry> = {
		// vehicle: 'Audi R8 II LMS 5.2L',
		seats: 3,
	};
	return useQuery<EVAPI.Trip[], EVAPI.Error>(
		['trips'],
		() =>
			fetchTrips(undefined, filters).then(
				(data: EVAPI.Trip[] | EVAPI.Error) => {
					if ('type' in data) {
						throw data;
					}
					return data;
				}
			),
		{
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to fetch trips:', error);
			},
		}
	);
};

const useLocations = (
	params?: EVAPI.DB.ListingOptions<EVAPI.Location>,
	filters?: EVAPI.DB.Filters<EVAPI.Location>,
	sort?: EVAPI.DB.Sort<EVAPI.Location>
) => {
	return useQuery<EVAPI.Location[], EVAPI.Error>(
		['locations'],
		() => {
			return fetchLocations(params, filters, sort);
		},
		{
			retry: 1,
			onError: (error: EVAPI.Error) => {
				console.error('Failed to fetch locations:', error);
			},
		}
	);
};

export const DataProvider: React.FC<UserProviderProps> = ({ children }) => {
	const value: DataContextProps = useMemo(
		() => ({
			useVehicles: useVehiclesByUser,
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
