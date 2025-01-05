import { createContext, useContext, useMemo, useState } from 'react';

interface SessionContextType {
	isAuthenticated: boolean | null;
	signIn: (username: string, password: string) => void;
	signOut: () => void;
	signUp: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: any) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // La session n'étant pas implémenté on met true pour l'instant

	// TODO: Faire un requête à l'api en utilisant react-query quand ce sera implémenté

	const signIn = async (username: string, password: string) => {
		throw new Error('Not implemented');
	};
	const signOut = () => {
		throw new Error('Not implemented');
	};
	const signUp = () => {
		throw new Error('Not implemented');
	};

	return (
		<SessionContext.Provider
			value={useMemo(
				() => ({
					isAuthenticated,
					signIn,
					signOut,
					signUp,
				}),
				[isAuthenticated]
			)}
		>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error('useSession must be used within a SessionProvider');
	}
	return context;
};
