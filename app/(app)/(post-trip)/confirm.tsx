import React from 'react';
import PostTripLayout from '@/components/layouts/PostTripLayout';
import { router } from 'expo-router';
import CircleButton from '@/components/drafts/CircleButton';
import { useTripCreation } from '@/components/context/TripCreationProvider';
import { ThemedText } from '@/components/drafts/ThemedText';
import { View } from 'react-native';

export default function Confirm() {
	const { trip } = useTripCreation();
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
		>
			<View
				style={{
					marginTop: 50,
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
					gap: 30,
				}}
			>
				<ThemedText type='subtitle'>Départ : {trip.start}</ThemedText>
				<ThemedText type='subtitle'>
					Destination : {trip.destination}
				</ThemedText>
				<ThemedText type='subtitle'>Date : {trip.date}</ThemedText>
				<ThemedText type='subtitle'>Heure : {trip.time}</ThemedText>
				<ThemedText type='subtitle'>
					Passagers : {trip.availableSeats}
				</ThemedText>
				<CircleButton
					iconName='car'
					onPress={() => {
						alert('Trajet enregistré');
					}}
				></CircleButton>
			</View>
		</PostTripLayout>
	);
}
