import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function PostTripLayout() {
	return (
		<View>
			<Text>PostTripLayout</Text>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#f4511e',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				<Stack.Screen
					name='index'
					options={{}}
				/>
			</Stack>
		</View>
	);
}
