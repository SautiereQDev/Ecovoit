import { User } from '@/types/Ecovoit';
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';

interface SessionContextType {
	currentUser: User | null | undefined; // Revoir ce typage
	isAuthenticated: boolean | null;
	isLoading: boolean | null;
	signIn: (username: string, password: string) => Promise<void> | null;
	signOut: () => void;
	signUp: () => void;
}

const SessionContext = createContext<SessionContextType>({
	currentUser: null, // Revoir cette valeur par défaut
	isAuthenticated: null,
	isLoading: null,
	signIn: (username: string, password: string) => null,
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
	const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		/**
		 * Implémentation factice d'une connexion ne nécessitant pas les identifiants
		 * On recherche un token dans le SecureStore
		 */
		const loadSession = async () => {
			console.log("Recherche d'un token dans le SecureStore...");
			try {
				const userToken = 'my_fake_jwt';

				if (userToken) {
					console.log('Token trouvé dans le SecureStore : ' + userToken);
					console.log("L'utilisateur est maintenant connecté.");
					setIsAuthenticated(true);
				}
			} catch (e) {
				console.error(e);
			}
			setIsLoading(false);
		};
		loadSession();
	}, []);

	const onSignIn = async (username: string, password: string) => {
		console.log('Connexion par identifiants en cours...');

		setIsLoading(true);
		try {
			setIsAuthenticated(true);
			console.log(`L'utilisateur ${username} est maintenant connecté.`);
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
		}, 1000);
	};

	return (
		<SessionContext.Provider
			value={{
				currentUser: currentUser,
				isAuthenticated: isAuthenticated,
				isLoading: isLoading,
				signIn: (username: string, password: string) =>
					onSignIn(username, password),
				signOut: () => onSignOut(),
				signUp: () => null, // Not implemented
			}}
		>
			{children}
		</SessionContext.Provider>
	);
}
