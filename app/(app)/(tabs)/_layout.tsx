import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
	type IoniconNames = keyof typeof Ionicons.glyphMap;

	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: IoniconNames;

					switch (route.name) {
						case 'index':
							iconName = focused ? 'home' : 'home-outline';
							break;
						case 'searchTrip':
							iconName = focused ? 'search' : 'search-outline';
							break;
						case 'postTrip':
							iconName = focused ? 'add-circle' : 'add-circle-outline';
							break;
						case 'profile':
							iconName = focused ? 'person' : 'person-outline';
							break;
						case 'tests':
							iconName = focused ? 'flask' : 'flask-outline';
							break;
						default:
							iconName = 'alert';
							break;
					}

					return (
						<Ionicons
							name={iconName}
							size={size}
							color={color}
						/>
					);
				},
			})}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Accueil',
					tabBarHideOnKeyboard: true,
				}}
			/>
			<Tabs.Screen
				name='searchTrip'
				options={{
					title: 'Rechercher',
					tabBarHideOnKeyboard: true,
				}}
			/>
			<Tabs.Screen
				name='postTrip'
				options={{
					title: 'Publier',
					tabBarHideOnKeyboard: true,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profil',
					tabBarHideOnKeyboard: true,
				}}
			/>
			<Tabs.Screen name='tests' />
		</Tabs>
	);
}
