import React from 'react';
import { Stack } from 'expo-router';
import { PostTripProvider } from '@/providers/PostTripProvider';

export default function ProfileLayout() {
	return (
		<PostTripProvider>
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
		</PostTripProvider>
	);
}
