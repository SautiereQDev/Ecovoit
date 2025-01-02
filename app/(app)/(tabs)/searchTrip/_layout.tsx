import { Stack } from 'expo-router';
import { SearchProvider } from '@/providers/SearchProvider';

export default function SearchTripLayout() {
	return (
		<SearchProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='index' />
				<Stack.Screen name='search' />
			</Stack>
		</SearchProvider>
	);
}
