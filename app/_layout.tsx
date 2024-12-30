import { Slot } from 'expo-router';
import { SessionProvider } from '@/providers/SessionProvider';
import { LocationProvider } from '@/providers/LocationProvider';
import { configureReanimatedLogger } from 'react-native-reanimated';
import axios from 'axios';
import EVAPIMockAdapter from '@ecovoit-api/mock-adapter';
import { UserProvider } from '@/providers';

// @ts-ignore
export const axiosInstance = axios.create(); // You would probably add options.
const mock = new EVAPIMockAdapter(axiosInstance);

export default function RootLayout() {
	configureReanimatedLogger({
		level: 2, //only show errors
		strict: false,
	});

	// TODO:  Creer une stack pour connexion et inscription accessible uniquement si l'utilisateur n'est pas connecté

	return (
		<SessionProvider>
			<LocationProvider>
				<UserProvider>
					<Slot />
				</UserProvider>
			</LocationProvider>
		</SessionProvider>
	);
}
