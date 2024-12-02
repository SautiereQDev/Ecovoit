import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

LocaleConfig.locales['fr'] = {
	monthNames: [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre',
	],
	monthNamesShort: [
		'Janv.',
		'Févr.',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juil.',
		'Août',
		'Sept.',
		'Oct.',
		'Nov.',
		'Déc.',
	],
	dayNames: [
		'Dimanche',
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
	],
	dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
	today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

export default function CustomCalendar() {
	const colors = useThemeColor();
	const today = new Date().toISOString().slice(0, 10);
	const [selectedDay, setSelectedDay] = useState<string>(today);
	return (
		<View style={[{ width: '90%' }, styles.container]}>
			<Calendar
				minDate={today}
				onDayPress={(day: DateData) => {
					setSelectedDay(day.dateString);
				}}
				markedDates={{
					[selectedDay]: { selected: true },
				}}
				enableSwipeMonths={true}
				style={{
					height: 450,
				}}
				theme={{
					backgroundColor: colors['background-1'],
					textSectionTitleColor: colors['secondary-2'],
					selectedDayBackgroundColor: colors['primary-1'],
					selectedDayTextColor:
						selectedDay === today
							? colors['text-secondary']
							: colors['primary-1'],
					todayTextColor: colors['primary-1'],
					dayTextColor: colors['secondary-1'],
					textDisabledColor: colors['text-muted'],
					arrowColor: colors['secondary-1'],
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
});
