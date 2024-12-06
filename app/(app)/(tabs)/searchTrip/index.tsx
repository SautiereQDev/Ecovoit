import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, ThemedInput, ThemedText } from '@/components';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import validTimestamp from 'ajv/lib/runtime/timestamp';
import { formatDate } from '@/utils/date';
import { useTripSearch } from '@/components/context/SearchProvider';

export const Index = () => {
	const { searchData, setSearchData, submitSearch, errors, setErrors } =
		useTripSearch();

	const [showDatePicker, setShowDatePicker] = useState(false);
	const [mode, setMode] = useState<'date' | 'time'>('date');

	const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (Platform.OS === 'android') {
			if (event.type === 'set') {
				if (mode === 'date') {
					setMode('time');
					return;
				} else if (mode === 'time') {
					if (!validTimestamp(selectedDate?.toISOString() || '', true)) {
						setErrors({ ...errors, date: 'Date invalide' });
						return;
					}
					setSearchData({
						...searchData,
						date: selectedDate?.getTime() ?? searchData.date,
					});
					setShowDatePicker(false);
					setMode('date');
				}
			} else if (event.type === 'dismissed') {
				setShowDatePicker(false);
				setMode('date');
			}
		} else {
			setSearchData({
				...searchData,
				date: selectedDate?.getTime() ?? searchData.date,
			});
			setShowDatePicker(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ThemedText type='header4'>Rechercher votre trajet 🔎</ThemedText>
				<View style={styles.formContainer}>
					<ThemedInput
						label='Départ'
						placeholder='Départ'
						value={searchData.depart}
						onChangeText={(val) => {
							setSearchData({ ...searchData, depart: val });
						}}
						hasError={!!errors.depart}
						errorMessage={errors.depart}
						size='medium'
					/>
					<ThemedInput
						label='Destination'
						placeholder='Destination'
						value={searchData.destination}
						onChangeText={(val) => {
							setSearchData({ ...searchData, destination: val });
						}}
						hasError={!!errors.destination}
						errorMessage={errors.destination}
						size='medium'
					/>
					<View>
						<ThemedText
							type='defaultBody'
							color='text'
						>
							Date
						</ThemedText>
						<IconButton
							name='calendar'
							title={`${formatDate(searchData.date)}`}
							onPress={() => setShowDatePicker(true)}
							style={styles.dateButton}
							size={20}
							iconFirst={true}
						/>
					</View>
					{showDatePicker && (
						<DateTimePicker
							value={new Date(searchData.date)}
							mode={mode}
							is24Hour={true}
							display='default'
							onChange={(event, date) => onDateChange(event, date as Date)}
						/>
					)}
					{Boolean(errors.date) && (
						<ThemedText style={styles.errorText}>{errors.date}</ThemedText>
					)}
					<IconButton
						name='search'
						title='Rechercher'
						size={24}
						color={Colors.light.primary}
						buttonStyle={styles.submitButton}
						textProps={{ type: 'header5', color: 'background' }}
						onPress={submitSearch}
						iconStyle={{ color: Colors.light.background }}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light.background,
	},
	content: {
		marginTop: 10,
		flex: 0,
		width: '90%',
		marginHorizontal: 'auto',
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		gap: 25,
	},
	searchBar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	formContainer: {
		marginTop: '5%',
		gap: 20,
	},
	destination: {
		borderWidth: 1.5,
		borderColor: Colors.light.inputText,
		padding: 10,
		borderRadius: 10,
	},
	resetButton: {
		borderWidth: 2,
		borderColor: Colors.light.resetButton,
		borderRadius: 99999,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		height: 40,
		width: 40,
	},
	submitButton: {
		display: 'flex',
		flexDirection: 'row',
		gap: 15,
		marginTop: 10,
		paddingVertical: 10,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.light.primary,
	},
	dateButton: {
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		borderWidth: 1.5,
		gap: 10,
		width: '100%',
		backgroundColor: Colors.light.background,
		borderColor: Colors.light.inputText,
	},
	errorText: {
		color: Colors.light.error,
		marginTop: 5,
	},
	button: {
		padding: '3%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.light.primary,
	},
	icons: {
		display: 'flex',
		flexDirection: 'row',
		marginRight: 'auto',
		gap: 25,
	},
	orderButtons: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		gap: 10,
	},
});
