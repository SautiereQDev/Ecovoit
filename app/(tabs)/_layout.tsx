import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#000",
				headerShown: false
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "home-sharp" : "home-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='profil'
				options={{
					title: "Profil",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "person-sharp" : "person-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='tests'
				options={{
					title: "Tests",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "cube-sharp" : "cube-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
