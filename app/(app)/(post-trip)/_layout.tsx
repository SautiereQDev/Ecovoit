import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='start' />
			<Stack.Screen name='destination' />
			<Stack.Screen name='date' />
			<Stack.Screen name='time' />
			<Stack.Screen name='[location]' />
		</Stack>
	);
}
