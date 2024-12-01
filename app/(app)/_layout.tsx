import { useSession } from '@/components/context/SessionProvider';
import { Redirect, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNotifications } from 'react-native-notificated';

export default function AppLayout() {
	const { isAuthenticated } = useSession();
	const { NotificationsProvider } = createNotifications({
		defaultStylesSettings: {
			globalConfig: {
				borderWidth: 2,
				multiline: 3,
			},
			successConfig: {
				leftIconSource: require('@/assets/images/icons/success.png'),
				accentColor: '#20c200',
			},
			errorConfig: {
				leftIconSource: require('@/assets/images/icons/error.png'),
			},
			warningConfig: {
				leftIconSource: require('@/assets/images/icons/warning.png'),
				accentColor: '#ff7b00',
			},
			infoConfig: {
				leftIconSource: require('@/assets/images/icons/info.png'),
				accentColor: '#147aff',
			},
		},
	});

	if (!isAuthenticated) {
		return <Redirect href='/signin' />;
	}

	return (
		<GestureHandlerRootView>
			<NotificationsProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name='(tabs)' />
				</Stack>
			</NotificationsProvider>
		</GestureHandlerRootView>
	);
}
