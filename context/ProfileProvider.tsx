import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { User } from '@/types/Ecovoit';

interface ProfileContextType {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	profileImage: string | null;
	setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
	defaultFields: string[];
	checkMissingFields: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
	children: ReactNode;
}

const initialData: User = {
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

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
	const [user, setUser] = useState<User>(initialData);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const checkMissingFields = useCallback(() => {
		const missingFields: string[] = [];
		const fieldsToCheck = ['firstName', 'lastName', 'username', 'email', 'bio'];

		fieldsToCheck.forEach((field) => {
			if (user[field as keyof User] === undefined) {
				missingFields.push(field);
			}
		});

		return missingFields;
	}, [user]);

	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			profileImage,
			setProfileImage,
			checkMissingFields,
		}),
		[user, profileImage, checkMissingFields]
	);

	return (
		<ProfileContext.Provider value={contextValue}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = (): ProfileContextType => {
	const context = useContext(ProfileContext);
	if (context === undefined) {
		throw new Error('useSearchData must be used within a SearchProvider');
	}
	return context;
};
