import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
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

export default function CustomCalendar({
	selected,
	today,
	onDayPress,
	style,
}: {
	selected: string;
	today: string;
	onDayPress: (day: DateData) => void;
	style?: StyleProp<ViewStyle>;
}) {
	const colors = useThemeColor();
	return (
		<View style={[{ width: '90%' }, styles.container, style]}>
			<Calendar
				minDate={today}
				onDayPress={onDayPress}
				markedDates={{
					[selected]: { selected: true },
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
						selected === today ? colors['text-secondary'] : colors['primary-1'],
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
