import { TripCreationProvider } from '@/providers/TripCreationProvider';
import { Stack } from 'expo-router';

export default function PostTripLayout() {
	return (
		<TripCreationProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='start' />
				<Stack.Screen name='end' />
				<Stack.Screen name='datetime' />
			</Stack>
		</TripCreationProvider>
	);
}
