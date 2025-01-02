import { createContext, PropsWithChildren, useContext } from 'react';

interface EcovoitApiContextType {}

const EcovoitApiContext = createContext<EcovoitApiContextType>({});

export function useEcovoitApi() {
	const value = useContext(EcovoitApiContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error(
				"useEcovoitApi doit être appelé au sein d'un <EcovoitApiProvider />"
			);
		}
	}
	return value;
}

export function EcovoitApiProvider({
	children,
}: PropsWithChildren): JSX.Element {
	const providedContext = {};

	return (
		<EcovoitApiContext.Provider value={providedContext}>
			{children}
		</EcovoitApiContext.Provider>
	);
}
