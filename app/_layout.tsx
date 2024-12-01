import { Slot } from 'expo-router';
import { SessionProvider } from '@/components/context/SessionProvider';
import { LocationProvider } from '@/components/context/LocationProvider';
import { configureReanimatedLogger } from 'react-native-reanimated';

export default function RootLayout() {
	configureReanimatedLogger({
		level: 2, //only show errors
		strict: false,
	});

	return (
		<SessionProvider>
			<LocationProvider>
				<Slot />
			</LocationProvider>
		</SessionProvider>
	);
}
