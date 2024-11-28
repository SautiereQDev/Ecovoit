import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';

export default function Destination() {
	return (
		<View>
			<Text>destination</Text>
			<Link href='/(app)/(post-trip)/date'>Choisir la date du trajet</Link>
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
