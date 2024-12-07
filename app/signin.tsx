import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSession } from '@/context/SessionProvider';
import { Redirect } from 'expo-router';
import { useState } from 'react';

export default function Signin() {
	// console.warn("-- render Signin");

	const { signIn, isAuthenticated, isLoading } = useSession();

	const credentials = {
		username: 'maxime@lr',
		password: 'password_123',
	};

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator
					size={'small'}
					animating
				/>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (isAuthenticated) {
		return <Redirect href='/(app)/(tabs)' />;
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Pressable onPress={() => signIn(credentials)}>
				<Text>SignIn</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({});
