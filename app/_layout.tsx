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

	return (
		<QueryClientProvider client={queryClient}>
			<LocationProvider>
				<DataProvider>
					<SessionProvider>
						<Slot />
					</SessionProvider>
				</DataProvider>
			</LocationProvider>
		</QueryClientProvider>
	);
}
