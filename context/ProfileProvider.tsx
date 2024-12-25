import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react';
import { User, Vehicle } from '@/types/Ecovoit';

/**
 * Type representing the user profile context.
 */
interface ProfileContextType {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	profileImage: string | null;
	setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
	addVehicle: (vehicle: Vehicle) => void;
	modifyVehicle: (vehicle: Vehicle, index: number) => void;
	deleteVehicle: (index: number) => void;
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
	const [profileImage, setProfileImage] = useState<string | null>(null);

	/**
	 * Adds a vehicle to the user's profile.
	 * @param {Vehicle} vehicle - The vehicle to add.
	 */
	const addVehicle = (vehicle: Vehicle) => {
		setUser((prevUser: User) => {
			if (prevUser.vehicles.length >= 4) {
				return prevUser; // Do not add more than 4 vehicles
			}
			const newVehicles = [...prevUser.vehicles, vehicle].slice(0, 4);
			return {
				...prevUser,
				vehicles: newVehicles as [
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
				],
			};
		});
	};

	/**
	 * Modifies a vehicle in the user's profile.
	 * @param {Vehicle} vehicle - The vehicle to modify.
	 * @param {number} index - The index of the vehicle to modify.
	 */
	const modifyVehicle = (vehicle: Vehicle, index: number) => {
		setUser((prevUser) => {
			const vehicles = [...prevUser.vehicles];
			vehicles[index] = vehicle;
			return {
				...prevUser,
				vehicles: vehicles as [
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
				],
			};
		});
	};

	/**
	 * Deletes a vehicle from the user's profile.
	 * @param {number} index - The index of the vehicle to delete.
	 */
	const deleteVehicle = (index: number) => {
		setUser((prevUser) => {
			const vehicles = [...prevUser.vehicles];
			vehicles.splice(index, 1);
			return {
				...prevUser,
				vehicles: vehicles as [
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
					(Vehicle | undefined)?,
				],
			};
		});
	};

	/**
	 * Value of the user profile context.
	 */
	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			profileImage,
			setProfileImage,
			addVehicle,
			modifyVehicle,
			deleteVehicle,
		}),
		[user, profileImage, addVehicle]
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