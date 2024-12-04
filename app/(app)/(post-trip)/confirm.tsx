import { StyleSheet } from 'react-native';
import React from 'react';
import PostTripLayout from '@/components/layouts/PostTripLayout';
import { router } from 'expo-router';
import { HelloWave } from '@/components/drafts/HelloWave';

export default function Confirm() {
	return (
		<PostTripLayout
			title='Prêt à partir ?'
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
