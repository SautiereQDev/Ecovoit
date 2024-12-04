import React, { useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	IconButton,
	SearchTripCard,
	ThemedInput,
	ThemedText,
} from '@/components';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import validTimestamp from 'ajv/lib/runtime/timestamp';
import { Filter, FiltreType } from '@/types';
import ShowFilters from '@/components/modal/ShowFilters';
import { formatDate, formatDateReverse } from '@/utils/date';
import ShowOrder from '@/components/modal/ShowOrder';

type tripType = {
	depart: string;
	destination: string;
	date: number;
};

type Error = {
	[key: string]: string;
};

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

	const initialFilters: Filter[] = Object.keys(FiltreType)
		.filter((key) => !isNaN(Number(key))) // Filter out numeric keys
		.map((key) => ({
			name: FiltreType[key as keyof typeof FiltreType],
			value: 0,
			active: false,
		}));

	const [filters, setFilters] = useState<Filter[]>(initialFilters);
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [order, setOrder] = useState<FiltreType>(FiltreType.emission);
	const [showOrder, setShowOrder] = useState<boolean>(false);
	const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

	const validate = (field: string, value: string | number) => {
		switch (field) {
			case 'depart':
			case 'destination':
				if ((value as string).length < 3 || (value as string).length > 32) {
					setErrors({
						...errors,
						[field]:
							'Le champ de recherche doit contenir entre 3 et 32 caractères',
					});
				} else {
					const newErrors = { ...errors };
					delete newErrors[field];
					setErrors(newErrors);
				}
				break;
			case 'date':
				if (!validTimestamp(new Date(value as number).toISOString(), true)) {
					setErrors({ ...errors, [field]: 'Date invalide' });
				} else {
					const newErrors = { ...errors };
					delete newErrors[field];
					setErrors(newErrors);
				}
				break;
			default:
				break;
		}
	};

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
					validate('date', selectedDate?.getTime() ?? searchData.date);
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
			validate('date', selectedDate?.getTime() ?? searchData.date);
			setShowDatePicker(false);
		}
	};

	const handleSubmit = () => {
		if (
			Object.keys(errors).length === 0 &&
			searchData.depart &&
			searchData.destination
		) {
			setIsSearch(true);
			console.log(searchData);
		} else {
			validate('depart', searchData.depart);
			validate('destination', searchData.destination);
			validate('date', searchData.date);
		}
	};

	const resetSearch = () => {
		setSearchData({
			depart: '',
			destination: '',
			date: new Date().getTime(),
		});
		setIsSearch(false);
		setErrors({});
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

	const isFilterActive = filters.some((filter) => filter.active);

	// TODO: Recupération des donnés de manière dynamique et en incluant les filtres et l'ordre de tri

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				{isSearch ? (
					<View style={styles.header}>
						<View style={styles.searchBar}>
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
						<View style={styles.icons}>
							<IconButton
								name={'filter'}
								lib={'MaterialCommunityIcons'}
								size={26}
								buttonStyle={styles.button}
								backgroundColor={isFilterActive ? 'primary' : 'background'}
								color={
									isFilterActive
										? Colors.light.background
										: Colors.light.primary
								}
								onPress={() => setShowFilters(!showFilters)}
							/>
							<View style={styles.orderButtons}>
								<IconButton
									// @ts-ignore
									name={'sort-alpha-asc'}
									lib={'FontAwesome'}
									size={30}
									buttonStyle={styles.button}
									backgroundColor={'background'}
									color={Colors.light.primary}
									onPress={() => setShowOrder(!showOrder)}
								/>
								<IconButton
									// @ts-ignore
									name={orderDirection === 'asc' ? 'arrow-down': 'arrow-up'}
									lib={'FontAwesome'}
									size={30}
									buttonStyle={styles.button}
									backgroundColor={'background'}
									color={Colors.light.primary}
									onPress={() => setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')}
								/>
							</View>
						</View>
						<ShowFilters
							visible={showFilters}
							onClose={() => setShowFilters(false)}
							filters={filters}
							setFilters={setFilters}
						/>
						<ShowOrder
							visible={showOrder}
							order={order}
							setOrder={setOrder}
							onClose={() => setShowOrder(false)}
						/>
						<ThemedText type='header4'>Trajets correspondants 🔗</ThemedText>
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
							keyExtractor={(_, index) => index.toString()}
							ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
						/>
					</View>
				) : (
					<View>
						<ThemedText type='header4'>Rechercher votre trajet 🔎</ThemedText>
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
								onPress={handleSubmit}
								iconStyle={{ color: Colors.light.background }}
							/>
						</View>
					</View>
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
