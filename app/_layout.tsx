import { Slot } from 'expo-router';
import { SessionProvider } from '@/components/context/SessionProvider';
import { MockServiceProvider } from '@/components/context/MockServiceProvider';
import { LocationProvider } from '@/components/context/LocationProvider';

export default function RootLayout() {
	// console.warn("-- render RootLayout");
	return (
		<SessionProvider>
			<LocationProvider>
				<Slot />
			</LocationProvider>
		</SessionProvider>
	);
}
