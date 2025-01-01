import { useSession } from '@/components/context/SessionProvider';
import { Redirect, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
	const { isAuthenticated } = useSession();
	const { NotificationsProvider } = createNotifications({
		defaultStylesSettings: {
			globalConfig: {
				borderWidth: 2,
				multiline: 3,
			},
			successConfig: {
				leftIconSource: (
					<Ionicons
						name={'checkmark-circle-outline'}
						size={32}
						color={'#20c200'}
					/>
				),
				accentColor: '#20c200',
			},
			errorConfig: {
				leftIconSource: (
					<Ionicons
						name={'alert-circle-outline'}
						size={32}
						color={'#FC6060'}
					/>
				),
			},
			warningConfig: {
				leftIconSource: (
					<Ionicons
						name={'warning-outline'}
						size={32}
						color={'#ff7b00'}
					/>
				),
				accentColor: '#ff7b00',
			},
			infoConfig: {
				leftIconSource: (
					<Ionicons
						name={'information-circle-outline'}
						size={32}
						color={'#147aff'}
					/>
				),
				accentColor: '#147aff',
			},
		},
	});

	if (!isAuthenticated) {
		return <Redirect href='/signin' />;
	}

	return (
		// Permet l'utilisation de FlatList "
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
