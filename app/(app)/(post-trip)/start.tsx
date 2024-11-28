import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Start() {
	return (
		<View>
			<Text>start</Text>
			<Link href='/(app)/(post-trip)/destination'>Choisir la destination</Link>
		</View>
	);
}

const styles = StyleSheet.create({});
