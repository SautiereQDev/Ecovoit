import { Slot } from 'expo-router';
import { SessionProvider } from '@/context/SessionProvider';
import { LocationProvider } from '@/context/LocationProvider';
import { configureReanimatedLogger } from 'react-native-reanimated';

export default function RootLayout() {
	configureReanimatedLogger({
		level: 2, //only show errors
		strict: false,
	});

	// TODO:  Creer une stack pour connexion et inscription accessible uniquement si l'utilisateur n'est pas connecté

	return (
		<SessionProvider>
			<LocationProvider>
				<Slot />
			</LocationProvider>
		</SessionProvider>
	);
}
