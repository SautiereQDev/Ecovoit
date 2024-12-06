import React, { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '@/types/Ecovoit';

interface ProfileContextType {
	profileData: User;
	setProfileData: React.Dispatch<React.SetStateAction<User>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
	children: ReactNode;
}

// TODO : utiliser des données dynamiques
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

export const SearchProvider = ({ children }: ProfileProviderProps) => {
	const [profileData, setProfileData] = useState<User>(initialData);

	return (
		<ProfileContext.Provider value={{ profileData, setProfileData }}>
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
