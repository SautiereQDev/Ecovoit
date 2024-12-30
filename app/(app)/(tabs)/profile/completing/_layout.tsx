import { Stack } from 'expo-router';

export default function CompletingLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='vehicle'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='biographie'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='lastName'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='profilePicture'
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
