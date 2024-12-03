import { useState } from 'react';
import { router } from 'expo-router';
import CircleButton from '@/components/drafts/CircleButton';
import CustomCalendar from '@/components/calendar/Calendar';
import { DateData } from 'react-native-calendars';
import PostTripLayout from '@/components/layouts/PostTripLayout';

export default function Destination() {
	const today = new Date().toISOString().slice(0, 10);

	const [selectedDay, setSelectedDay] = useState<string>(today);

	const handleOnDayPress = (day: DateData) => {
		setSelectedDay(day.dateString);
		router.navigate('/(app)/(post-trip)/time');
	};

	return (
		<PostTripLayout
			title='Quel jour ?'
			iconTopLeft='arrow-back-sharp'
			iconTopRight='close-sharp'
			onPressTopLeft={() => {
				router.back();
			}}
			onPressTopRight={() => {
				router.navigate('/(app)/(tabs)/post-trip');
			}}
		>
			<CustomCalendar
				today={today}
				selected={selectedDay}
				onDayPress={handleOnDayPress}
			/>
		</PostTripLayout>
	);
}
