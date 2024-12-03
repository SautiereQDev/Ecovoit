import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PostTripLayout from '@/components/layouts/PostTripLayout';
import { router } from 'expo-router';

export default function Seats() {
	return (
		<PostTripLayout
			title='Combien de passagers ?'
			iconTopLeft='arrow-back-sharp'
			iconTopRight='close-sharp'
			onPressTopLeft={() => {
				router.back();
			}}
			onPressTopRight={() => {
				router.navigate('/(app)/(tabs)/post-trip');
			}}
		></PostTripLayout>
	);
}

const styles = StyleSheet.create({});
