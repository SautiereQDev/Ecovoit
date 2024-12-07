import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { User } from '@/types/Ecovoit';

interface ProfileContextType {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	profileImage: string | null;
	setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
	children: ReactNode;
}

// TODO : à remplacer par des données dynamiques
const initialData = {
	id: 1,
	username: 'John Doe',
	email: 'johndoe@gmail.com',
	bio: "I'm a cool guy, I like to drive and meet new people. I'm always on time and I have a clean car.",
	firstName: 'John',
	lastName: 'Doe',
	rank: 'member' as 'member' | 'moderator' | 'admin',
	verified: true,
	vehicles: [],
	tripsAsDriver: [],
	tripsAsPassenger: [],
};

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
	const [user, setUser] = useState<User>(initialData);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const contextValue = useMemo(() => ({ user, setUser, profileImage, setProfileImage }), [user, profileImage]);

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
