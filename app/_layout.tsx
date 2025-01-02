import { Slot } from 'expo-router';
import { SessionProvider } from '@/providers/SessionProvider';
import { LocationProvider } from '@/providers/LocationProvider';
import { configureReanimatedLogger } from 'react-native-reanimated';
import { DataProvider } from '@/providers';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function RootLayout() {
	configureReanimatedLogger({
		level: 2, //only show errors

		strict: false,
	});

	const queryClient = new QueryClient();

	// TODO:  Creer une stack pour connexion et inscription accessible uniquement si l'utilisateur n'est pas connecté

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<LocationProvider>
					<DataProvider>
						<Slot />
					</DataProvider>
				</LocationProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
}
