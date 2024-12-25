import React from 'react';
import { Stack } from 'expo-router';
import { RegisterProvider } from '@/context/RegisterProvider';

export default function ProfileLayout() {
	return (
		<RegisterProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='index' />
				<Stack.Screen name='add' />
				<Stack.Screen name='edit' />
			</Stack>
		</RegisterProvider>
	);
}
