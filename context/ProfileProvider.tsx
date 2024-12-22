import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { User } from '@/types/Ecovoit';

/**
 * Type représentant le contexte du profil utilisateur.
 */
interface ProfileContextType {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	profileImage: string | null;
	setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * Contexte pour le profil utilisateur.
 */
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

/**
 * Propriétés du composant ProfileProvider.
 */
interface ProfileProviderProps {
	children: ReactNode;
}

/**
 * Données initiales de l'utilisateur.
 */
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

/**
 * Composant fournisseur de contexte pour le profil utilisateur.
 * @param {ProfileProviderProps} props - Les propriétés du composant.
 * @returns {ReactNode} Le composant fournisseur de contexte.
 */
export const ProfileProvider = ({
	children,
}: ProfileProviderProps): ReactNode => {
	const [user, setUser] = useState<User>(initialData);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	/**
	 * Valeur du contexte du profil utilisateur.
	 */
	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			profileImage,
			setProfileImage,
		}),
		[user, profileImage]
	);

	return (
		<ProfileContext.Provider value={contextValue}>
			,{children}
		</ProfileContext.Provider>
	);
};

/**
 * Hook pour utiliser le contexte du profil utilisateur.
 * @returns {ProfileContextType} Le contexte du profil utilisateur.
 * @throws {Error} Si le hook est utilisé en dehors d'un ProfileProvider.
 */
export const useProfile = (): ProfileContextType => {
	const context = useContext(ProfileContext);
	if (context === undefined) {
		throw new Error('useSearchData must be used within a SearchProvider');
	}
	return context;
};
