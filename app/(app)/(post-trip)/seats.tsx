import { useTripCreation } from '@/providers/TripCreationProvider';
// import SeatPicker from '@/components/SeatPicker';
import PostTripLayout from '@/components/layouts/PostTripLayout';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import { useState } from 'react';
import { IconButton } from '@/components/buttons';

export default function Seats() {
	const { setInitialSeats } = useTripCreation(); // TODO

	const colors = useThemeColor();
	const [seats, setSeats] = useState<number>(1);
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
		>
			{/*<SeatPicker*/}
			{/*	activeColor={colors['secondary-1']}*/}
			{/*	inactiveColor={colors['text-muted']}*/}
			{/*	availableSeats={4} // Hardcode : correspond au nombre de places dispos dans le véhicule par défaut*/}
			{/*	style={{ marginTop: 50 }}*/}
			{/*	onAdd={() => {*/}
			{/*		setSeats(seats + 1);*/}
			{/*	}}*/}
			{/*	onRemove={() => {*/}
			{/*		setSeats(seats - 1);*/}
			{/*	}}*/}
			{/*/>*/}
			<IconButton
				name='arrow-forward'
				onPress={() => {
					setInitialSeats(seats);
					router.navigate('/(app)/(post-trip)/confirm');
				}}
				// size='medium'
				style={{
					position: 'absolute',
					bottom: 25,
					right: 25,
				}}
			/>
		</PostTripLayout>
	);
}
