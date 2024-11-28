import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function Date() {
	return (
		<View>
			<Text>date</Text>
			<Button
				onPress={() => {
					router.back();
				}}
				title='Précédent'
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
