import { useState } from 'react';
import { router } from 'expo-router';
// import CircleButton from '@/components/CircleButton';
import PostTripLayout from '@/components/layouts/PostTripLayout';
import TimePicker from '@/components/TimePicker';
import { useTripCreation } from '@/providers/TripCreationProvider';

export default function Time() {
	const { setTime } = useTripCreation(); // TODO

	const [nextButtonVisible, setNextButtonVisible] = useState<boolean>(false);

	return (
		<PostTripLayout
			title='À quelle heure ?'
			iconTopLeft='arrow-back-sharp'
			iconTopRight='close-sharp'
			onPressTopLeft={() => {
				router.back();
			}}
			onPressTopRight={() => {
				router.navigate('/(app)/(tabs)/post-trip');
			}}
		>
			<TimePicker
				onSet={(date) => {
					setTime(String(date?.toLocaleTimeString()));
					setNextButtonVisible(true);
				}}
			/>

			{/*<CircleButton*/}
			{/*	iconName='arrow-forward'*/}
			{/*	onPress={() => {*/}
			{/*		router.navigate('/(app)/(post-trip)/seats');*/}
			{/*	}}*/}
			{/*	size='medium'*/}
			{/*	style={{*/}
			{/*		position: 'absolute',*/}
			{/*		bottom: 25,*/}
			{/*		right: 25,*/}
			{/*		display: nextButtonVisible ? 'flex' : 'none',*/}
			{/*	}}*/}
			{/*/>*/}
		</PostTripLayout>
	);
}
