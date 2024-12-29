import React, { createContext, ReactNode, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { User, Vehicle } from '@/types/Ecovoit';
import { initialProfileState, profileReducer } from '@/reducers';

/**
 * Type representing the user profile context.
 */
interface ProfileContextType {
	user: User;
	setProfileImage: (payload: string | null) => void;
	addVehicle: (vehicle: Vehicle) => void;
	modifyVehicle: (vehicle: Vehicle, index: number) => void;
	deleteVehicle: (index: number) => void;
	setErrors: (errors: object) => void;
	clearErrors: () => void;
	modifyRank: (rank: 'member' | 'moderator' | 'admin') => void;
	setVerified: () => void;
}

/**
 * Context for the user profile.
 */
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

/**
 * Properties for the ProfileProvider component.
 */
interface ProfileProviderProps {
	children: ReactNode;
}

/**
 * Initial user data.
 */
const initialData: User = {
	profilePicture: null,
	id: 1,
	username: 'John Doe',
	email: 'johndoe@gmail.com',
	password: '',
	firstName: 'John',
	lastName: undefined,
	rank: 'member',
	bio: undefined,
	verified: true,
	vehicles: [],
	tripsAsDriver: [],
	tripsAsPassenger: [],
};

/**
 * Context provider component for the user profile.
 * @param {ProfileProviderProps} props - The properties of the component.
 * @returns {ReactNode} The context provider component.
 */
export const ProfileProvider = ({
	children,
}: ProfileProviderProps): ReactNode => {
	const [user, setUser] = useState<User>(initialData);

	const [state, dispatch] = useReducer(profileReducer, initialProfileState);

	const modifyUser = useCallback((payload: User) => {
		dispatch({ type: 'MODIFY_USER', payload });
	}, []);

	const setProfileImage = useCallback((payload: string | null) => {
		dispatch({ type: 'SET_PROFILE_IMAGE', payload });
	}, []);

	/**
	 * Adds a vehicle to the user's profile.
	 * @param {Vehicle} vehicle - The vehicle to add.
	 */
	const addVehicle = useCallback((vehicle: Vehicle) => {
		dispatch({ type: 'ADD_VEHICLE', vehicle });
	}, []);

	/**
	 * Modifies a vehicle in the user's profile.
	 * @param {Vehicle} vehicle - The vehicle to modify.
	 * @param {number} index - The index of the vehicle to modify.
	 */
	const modifyVehicle = (vehicle: Vehicle, index: number) => {
		dispatch({ type: 'MODIFY_VEHICLE', vehicle, index });
	};

	/**
	 * Deletes a vehicle from the user's profile.
	 * @param {number} index - The index of the vehicle to delete.
	 */
	const deleteVehicle = (index: number) => {
		dispatch({ type: 'DELETE_VEHICLE', index });
	};

	const setErrors = useCallback((errors: object) => {
		dispatch({ type: 'SET_ERRORS', errors });
	}, []);

	const clearErrors = useCallback(() => {
		dispatch({ type: 'CLEAR_ERRORS' });
	}, []);

	const modifyRank = useCallback((rank: 'member' | 'moderator' | 'admin') => {
		dispatch({ type: 'MODIFY_RANK', rank });
	}, []);

	const setVerified = useCallback(() => {
		dispatch({ type: 'SET_VERIFIED' });
	}, []);

	/**
	 * Value of the user profile context.
	 */
	const contextValue = useMemo(
		() => ({
			user,
			setProfileImage,
			addVehicle,
			modifyVehicle,
			deleteVehicle,
			setErrors,
			clearErrors,
			modifyRank,
			setVerified,
		}),
		[
			user,
			setProfileImage,
			addVehicle,
			setErrors,
			clearErrors,
			modifyRank,
			setVerified,
		]
	);

	return (
		<ProfileContext.Provider value={contextValue}>
			,{children}
		</ProfileContext.Provider>
	);
};

/**
 * Hook to use the user profile context.
 * @returns {ProfileContextType} The user profile context.
 * @throws {Error} If the hook is used outside of a ProfileProvider.
 */
export const useProfile = (): ProfileContextType => {
	const context = useContext(ProfileContext);
	if (context === undefined) {
		throw new Error('useSearchData must be used within a SearchProvider');
	}
	return context;
};
