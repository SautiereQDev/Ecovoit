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
					<Stack.Screen name='index'/>
					<Stack.Screen name='page2' />
					<Stack.Screen name='page3' />
					<Stack.Screen name='page4' />
					<Stack.Screen name='page5' />
				</Stack>
		</RegisterProvider>
	);
}
