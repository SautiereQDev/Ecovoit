import React, { useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, SearchTripCard, ThemedInput, ThemedText } from '@/components';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import validTimestamp from 'ajv/lib/runtime/timestamp';
import FilterDropDown from '@/components/inputs/FilterDropDown';

/**
 * Type definition for trip data.
 */
type tripType = {
	depart: string;
	destination: string;
	date: number;
};

/**
 * @override
 * Error type definition.
 */
type Error = {
	[key: string]: string;
};

enum Elements {
	CONSOMMATION,
	DISTANCE,
	DATE,
	HEURE,
	ECART_TEMPS,
}

type Filter = {
	[key in Elements]: { value: number; condition: 'uper' | 'lower' };
};

/**
 * SearchPage component allows users to search for trips by providing departure, destination, and date.
 * It validates the inputs and displays error messages if the inputs are invalid.
 */
export const SearchPage = () => {
	const [searchData, setSearchData] = useState<tripType>({
		depart: '',
		destination: '',
		date: new Date().getTime(),
	});
	const [isSearch, setIsSearch] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [mode, setMode] = useState<'date' | 'time'>('date');
	const [errors, setErrors] = useState<Error>({});
	const [filters, setFilters] = useState<Filter>([]);
	/**
	 * Validates the input fields and sets error messages if the inputs are invalid.
	 * @param {string} field - The field to validate.
	 * @param {string | number} value - The value of the field to validate.
	 */
	const validate = (field: string, value: string | number) => {
		switch (field) {
			case 'depart':
				if ((value as string).length >= 3 && (value as string).length <= 32) {
					setErrors({
						...errors,
						[field]: 'Le username doit contenir entre 3 et 32 caractères',
					});
				}
				break;
			case 'destination':
				if ((value as string).length >= 3 && (value as string).length <= 32) {
					setErrors({
						...errors,
						[field]: 'Le username doit contenir entre 3 et 32 caractères',
					});
				}
				break;
			case 'date':
				if (!validTimestamp(new Date(value as number).toISOString(), true)) {
					setErrors({ ...errors, [field]: 'Date invalide' });
				}
				break;
			default:
				break;
		}
	};

	/**
	 * Handles the date change event from the DateTimePicker.
	 * @param {DateTimePickerEvent} event - The event object from the DateTimePicker.
	 * @param {Date} [selectedDate] - The selected date.
	 */
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
						date: selectedDate?.getTime() || searchData.date,
					});
					validate('date', selectedDate?.getTime() || searchData.date);
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
				date: selectedDate?.getTime() || searchData.date,
			});
			validate('date', selectedDate?.getTime() || searchData.date);
			setShowDatePicker(false);
		}
	};

	/**
	 * Handles the form submission. Validates the inputs and sets the search state if valid.
	 */
	const handleSubmit = () => {
		if (Object.keys(errors).length === 0) {
			setIsSearch(true);
			console.log(searchData);
		}
	};

	/**
	 * Resets the search form and clears the search data and errors.
	 */
	const resetSearch = () => {
		setSearchData({
			depart: '',
			destination: '',
			date: new Date().getTime(),
		});
		setIsSearch(false);
		setErrors({});
	};

	/**
	 * Formats the date to a string in the format "DD/MM/YYYY HH:MM".
	 * @param {number} timestamp - The timestamp to format.
	 * @returns {string} - The formatted date string.
	 */
	const formatDate = (timestamp: number): string => {
		const date = new Date(timestamp);
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
	};

	/**
	 * Formats the date to a string in the format "DD Month YYYY - HHhMM".
	 * @param {number} timestamp - The timestamp to format.
	 * @returns {string} - The formatted date string.
	 */
	const formatDateReverse = (timestamp: number): string => {
		const date = new Date(timestamp);
		return `${date.toLocaleDateString('fr-FR', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})} - ${date.getHours()}h${date.getMinutes()}`;
	};

	const data = [
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
		{
			depart: searchData.depart,
			destination: searchData.destination,
			nom: 'Thomas',
			date: formatDateReverse(searchData.date),
			distance: 500,
		},
	];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				{isSearch ? (
					<>
						<View style={styles.header}>
							<View style={styles.destination}>
								<ThemedText color='text'>
									{searchData.depart} {' -> '} {searchData.destination}
								</ThemedText>
							</View>
							<IconButton
								name='x'
								color={Colors.light.resetButton}
								onPress={resetSearch}
								size={30}
								buttonStyle={styles.resetButton}
							/>
						</View>
						<ThemedText
							type='header4'
							style={styles.secondaryTitle}
						>
							Trajets correspondants 🔗
						</ThemedText>
						<FlatList
							data={data}
							renderItem={({ item }) => (
								<SearchTripCard
									data={{
										depart: item.depart,
										destination: item.destination,
										nom: item.nom,
										date: item.date,
										distance: item.distance,
									}}
								/>
							)}
							keyExtractor={(item, index) => index.toString()}
							ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
						/>
					</>
				) : (
					<>
						<View>
							<ThemedText
								type='header4'
								style={styles.secondaryTitle}
							>
								Rechercher votre trajet 🔎
							</ThemedText>
							<View style={styles.formContainer}>
								<ThemedInput
									label='Départ'
									placeholder='Départ'
									value={searchData.depart}
									onChangeText={(val) => {
										setSearchData({ ...searchData, depart: val });
										validate('depart', val);
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
										validate('destination', val);
									}}
									hasError={!!errors.destination}
									errorMessage={errors.destination}
									size='medium'
								/>
								<View>
									<FilterDropDown />
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
										onChange={(event, date) =>
											onDateChange(event as DateTimePickerEvent, date as Date)
										}
									/>
								)}
								{errors.date && (
									<ThemedText style={styles.errorText}>
										{errors.date}
									</ThemedText>
								)}
								<IconButton
									name='search'
									title='Rechercher'
									size={24}
									color={Colors.light.primary}
									buttonStyle={styles.submitButton}
									textProps={{ type: 'header5', color: 'background' }}
									onPress={handleSubmit}
									iconStyle={{ color: Colors.light.background }}
								/>
							</View>
						</View>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default SearchPage;

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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	formContainer: {
		gap: 20,
	},
	secondaryTitle: {
		marginTop: 25,
		marginBottom: 25,
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
		marginTop: 5,
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
});
