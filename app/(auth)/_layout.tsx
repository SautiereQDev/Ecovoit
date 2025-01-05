import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AuthLayout() {
	return (
		<GestureHandlerRootView>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='connexion' />
				<Stack.Screen name='register' />
			</Stack>
		</GestureHandlerRootView>
	);
}
