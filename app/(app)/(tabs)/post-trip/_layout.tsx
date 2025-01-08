import { PostTripProvider } from '@/providers';
import { Stack } from 'expo-router';

export default function PostTripLayout() {
	return (
		<PostTripProvider>
			<Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
				<Stack.Screen name='index' />
				<Stack.Screen
					name='[modal]'
					options={{
						presentation: 'modal',
						animation: 'fade',
					}}
				/>

				<Stack.Screen name='trip' />
				<Stack.Screen name='confirm' />
			</Stack>
		</PostTripProvider>
	);
}
