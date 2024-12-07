import React from 'react';
import { Stack } from 'expo-router';
import { ProfileProvider } from '@/context/ProfileProvider';

export default function ProfileLayout() {
	return (
		<ProfileProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='index' />
				<Stack.Screen
					name='edit'
					options={{
						presentation: 'modal',
						headerShown: false,
					}}
				/>
			</Stack>
		</ProfileProvider>
	);
}
