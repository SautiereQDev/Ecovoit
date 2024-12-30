import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, ThemedInput, ThemedText } from '@/components';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import validTimestamp from 'ajv/lib/runtime/timestamp';
import { formatDate } from '@/utils/date';
import { useTripSearch } from '@/providers/SearchProvider';
import { searchTripStyles } from '@/styles/searchTrip';

export const Index = () => {
	const { state, handleInputChange, handleSubmit } = useTripSearch();
	const { searchData, errors } = state;

	const { dispatch } = useTripSearch();

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
						dispatch({
							type: 'SET_ERRORS',
							payload: { ...errors, date: 'Date invalide' },
						});
						return;
					}
					dispatch({
						type: 'SET_SEARCH_DATA',
						payload: { date: selectedDate?.getTime() ?? searchData.date },
					});
					setShowDatePicker(false);
					setMode('date');
				}
			} else if (event.type === 'dismissed') {
				setShowDatePicker(false);
				setMode('date');
			}
		} else {
			dispatch({
				type: 'SET_SEARCH_DATA',
				payload: { date: selectedDate?.getTime() ?? searchData.date },
			});
			setShowDatePicker(false);
		}
	};

	return (
		<SafeAreaView style={searchTripStyles.container}>
			<KeyboardAvoidingView style={searchTripStyles.content}>
				<ThemedText type='header3'>Rechercher votre trajet 🔎</ThemedText>
				<View style={searchTripStyles.formContainer}>
					<ThemedInput
						label='Départ'
						placeholder='Départ'
						value={searchData.depart}
						onChangeText={(val) => handleInputChange('depart', val)}
						hasError={!!errors.depart}
						errorMessage={errors.depart}
						size='medium'
						editable={true}
						autoFocus={true}
					/>
					<ThemedInput
						label='Destination'
						placeholder='Destination'
						value={searchData.destination}
						onChangeText={(val) => handleInputChange('destination', val)}
						hasError={!!errors.destination}
						errorMessage={errors.destination}
						size='medium'
						editable={true}
						autoFocus={true}
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
							style={searchTripStyles.dateButton}
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
						<ThemedText style={searchTripStyles.errorText}>
							{errors.date}
						</ThemedText>
					)}
					<IconButton
						name='search'
						title='Rechercher'
						size={24}
						color={Colors.light.primary}
						buttonStyle={searchTripStyles.submitButton}
						textProps={{ type: 'header5', color: 'background' }}
						onPress={handleSubmit}
						iconStyle={{ color: Colors.light.background }}
					/>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Index;