import { Stack } from 'expo-router';
import { RegisterProvider } from '@/src/context/RegisterProvider';

export default function CompletingLayout() {
	return (
		<RegisterProvider>
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
		</RegisterProvider>
	);
}
