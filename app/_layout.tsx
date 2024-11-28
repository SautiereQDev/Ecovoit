import { Slot } from 'expo-router';
import { SessionProvider } from '@/components/context/SessionProvider';
import { LocationProvider } from '@/components/context/LocationProvider';

export default function RootLayout() {
	return (
		<SessionProvider>
			<LocationProvider>
				<Slot />
			</LocationProvider>
		</SessionProvider>
	);
}
