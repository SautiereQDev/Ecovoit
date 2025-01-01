import { TripCreationProvider } from '@/context/TripCreationProvider';
import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<TripCreationProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='start' />
				<Stack.Screen name='destination' />
				<Stack.Screen name='date' />
				<Stack.Screen name='time' />
				<Stack.Screen name='seats' />
				<Stack.Screen name='confirm' />
			</Stack>
		</TripCreationProvider>
	);
}
