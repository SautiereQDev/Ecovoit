import { mockFetchData } from '@/mock/mockFetch';
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';

// À revoir selon les champs renvoyés par l'API
export interface UserType {
	id: number; // Primary key
	firstName: string;
	lastName: string; // Nullable
	username: string; // Unique
	email: string;
	password: string;
	bio: string | null; // Nullable
	rank: string | undefined;
	verified: boolean;
}

interface CredentialsType {
	username: string | undefined;
	password: string | undefined;
}

interface SessionContextType {
	currentUser: UserType | null | undefined; // Revoir ce typage
	isAuthenticated: boolean | null;
	isLoading: boolean | null;
	signIn: (credentials: CredentialsType) => Promise<void> | null;
	signOut: () => void;
	signUp: () => void;
}

const SessionContext = createContext<SessionContextType>({
	currentUser: null, // Revoir cette valeur par défaut
	isAuthenticated: null,
	isLoading: null,
	signIn: (credentials) => null,
	signOut: () => null,
	signUp: () => null, // Not implemented
});

export function useSession() {
	const value = useContext(SessionContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error(
				"useAuth doit être appelé au sein d'un <SessionProvider />"
			);
		}
	}
	return value;
}

/**
 * Fournit le contexte de session pour gérer l'authentification des utilisateurs.
 *
 * @see "./README.md" pour plus d'informations sur l'utilisation du composant.
 *
 * @param {PropsWithChildren} Props - Les props du composant.
 * @returns {JSX.Element} Le composant `SessionProvider`
 */
export function SessionProvider({ children }: PropsWithChildren): JSX.Element {
	/**
	 * À voir si il existe une technique plus performante pour gérer l'état de la session
	 */
	const [currentUser, setCurrentUser] = useState<UserType | null | undefined>(
		null
	);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	/**
	// 	 * Implémentation factice d'une connexion ne nécessitant pas les identifiants
	// 	 * On recherche un token dans le SecureStore
	// 	 */
	// 	const loadSession = async () => {
	// 		console.log("Recherche d'un token dans le SecureStore...");
	// 		try {

	// 			if (userToken) {
	// 				console.log(
	// 					'Token trouvé dans le SecureStore : ' + JSON.stringify(userToken)
	// 				);
	// 				// GET api/auth/signin
	// 				// On récupère le Token
	// 				// On place le token en header "par défaut" pour les prochaines requêtes
	// 				console.log("L'utilisateur est maintenant connecté.");
	// 				setIsAuthenticated(true);
	// 			}
	// 		} catch (e) {
	// 			console.error(e);
	// 		}
	// 		setIsLoading(false);
	// 	};
	// 	loadSession();
	// }, []);

	/**
	 * Implémentation factice d'une connexion avec les identifiants.
	 * @param credentials username & password
	 */
	const onSignIn = async (credentials: CredentialsType) => {
		console.log('Connexion par identifiants en cours...');

		setIsLoading(true);
		try {
			const response = await mockFetchData('SIGN_IN');
			// !!!! On vérifiera la réponse avant traitement
			// On récupère le Token
			// On place le token en header "par défaut" pour les prochaines requêtes
			console.log('mockFetch réussi : ' + JSON.stringify(response?.data));

			setIsAuthenticated(true);
			setCurrentUser(response?.data.user);
			console.log("L'utilisateur est maintenant connecté.");
		} catch (e) {
			console.error(e);
		}
		setIsLoading(false);
	};

	/**
	 * Implémentation factice d'une déconnexion.
	 */
	const onSignOut = () => {
		console.log('Déconnexion en cours...');
		setIsLoading(true);
		setTimeout(() => {
			setIsAuthenticated(false);
			setIsLoading(false);
			// Il faut maintenant enlever le header "par défaut" avec le token
			// Cependant le token persiste dans le SecureStorage
			console.log('Utilisateur déconnecté.');
		}, 2000);
	};

	return (
		<SessionContext.Provider
			value={{
				currentUser: currentUser,
				isAuthenticated: isAuthenticated,
				isLoading: isLoading,
				signIn: (credentials) => onSignIn(credentials),
				signOut: () => onSignOut(),
				signUp: () => null, // Not implemented
			}}
		>
			{children}
		</SessionContext.Provider>
	);
}
