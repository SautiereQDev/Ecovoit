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
			<Stack.Screen name='description' />
			<Stack.Screen name='checkpoints' />
			<Stack.Screen name='vehicle' />
		</Stack>
	);
}
