import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	addVehicle,
	fetchUser,
	fetchUsers,
	fetchVehiclesByUser,
	removeVehicle,
} from '@/api';
import {
	GetUsersType,
	GetUserType,
	GetVehiclesType,
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

export const DataProvider: React.FC<UserProviderProps> = ({ children }) => {
	const value: DataContextProps = useMemo(
		() => ({
			useVehicles,
			useAddVehicle,
			useUsers,
			useUser,
			useRemoveVehicle,
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
