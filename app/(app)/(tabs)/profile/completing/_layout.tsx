import React from 'react';
import { Stack } from 'expo-router';
import { ProfileProvider } from '@/context/ProfileProvider';
import { RegisterProvider } from '@/context/RegisterProvider';

export default function ProfileLayout() {
	return (
		<ProfileProvider>
			<RegisterProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen
						name='index'
						options={{
							presentation: 'modal',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='biographie'
						options={{
							presentation: 'modal',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='lastName'
						options={{
							presentation: 'modal',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='vehicle'
						options={{
							presentation: 'modal',
							headerShown: false,
						}}
					/>
				</Stack>
			</RegisterProvider>
		</ProfileProvider>
	);
}
