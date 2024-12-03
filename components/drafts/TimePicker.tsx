import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TimePicker({
	onSet,
}: {
	onSet: (date: Date | undefined) => void;
}) {
	const [date, setDate] = useState<Date>(new Date());
	const [show, setShow] = useState<boolean>(false);
	const colors = useThemeColor();
	// event: DateTimePickerEvent, date?: Date | undefined) => void
	const onChange = (
		event: DateTimePickerEvent,
		selectedDate: Date | undefined
	) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate!);
		if (event.type === 'set') {
			onSet(currentDate);
		}
	};

	return (
		<SafeAreaView
			style={{ flex: 1 / 2, alignItems: 'center', justifyContent: 'center' }}
		>
			<ThemedText
				style={{ fontSize: 50, color: colors['secondary-1'] }}
				type='subtitle'
				onPress={() => setShow(true)}
			>
				{date?.toLocaleTimeString('fr-FR', {
					hour: '2-digit',
					minute: '2-digit',
				})}
			</ThemedText>
			{show && (
				<DateTimePicker
					testID='dateTimePicker'
					value={date}
					mode='time'
					is24Hour={true}
					onChange={onChange}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
