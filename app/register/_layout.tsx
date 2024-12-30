import React from 'react';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='index' />
			<Stack.Screen name='confirmation' />
			<Stack.Screen name='infosPerso' />
			<Stack.Screen name='vehicle' />
			<Stack.Screen name='pictureBio' />
		</Stack>
	);
}
