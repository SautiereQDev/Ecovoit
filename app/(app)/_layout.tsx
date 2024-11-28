import { useSession } from '@/components/context/SessionProvider';
import { Redirect, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
	const { isAuthenticated } = useSession();

	if (!isAuthenticated) {
		return <Redirect href='/signin' />;
	}

	return (
		// Permet l'utilisation de FlatList
		<GestureHandlerRootView>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='(tabs)' />
			</Stack>
		</GestureHandlerRootView>
	);
}
