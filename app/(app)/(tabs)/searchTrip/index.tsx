import React from 'react';
import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchContext } from '@/providers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchTripFormType } from '@/types';
import { router } from 'expo-router';
import { IconButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { Colors } from '@/constants';
import { searchTripStyles } from '@/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReturnButton from '@/components/buttons/ReturnButton';

const searchSchema = z.object({
	depart: z.string().min(3, 'Le départ est requis'),
	destination: z.string().min(3, 'La destination est requise'),
	// date: z.number().min(Date.now(), 'La date doit être dans le futur'),
});

export const SearchForm = () => {
	const { searchQuery, setSearchQuery } = useSearchContext();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: searchQuery,
		resolver: zodResolver(searchSchema),
	});

	const onSubmit = (data: searchTripFormType) => {
		setSearchQuery(data);
		router.push('/searchTrip/search');
	};

	const [showDatePicker, setShowDatePicker] = React.useState(false);
	const [mode, setMode] = React.useState<'date' | 'time'>('date');

	return (
		<SafeAreaView style={searchTripStyles.container}>
			<KeyboardAvoidingView style={searchTripStyles.content}>
				<ReturnButton />
				<ThemedText
					type='header3'
					style={searchTripStyles.header}
				>
					Rechercher un trajet
				</ThemedText>
				<View style={searchTripStyles.formContainer}>
					<Controller
						control={control}
						name='depart'
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder='Departure'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								style={searchTripStyles.input}
							/>
						)}
					/>
					{errors.depart && <ThemedText>{errors.depart.message}</ThemedText>}

					<Controller
						control={control}
						name='destination'
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder='Destination'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								style={searchTripStyles.input}
							/>
						)}
					/>
					{errors.destination && (
						<ThemedText>{errors.destination.message}</ThemedText>
					)}

					{showDatePicker && (
						<Controller
							control={control}
							name='date'
							render={({ field: { onChange, value } }) => (
								<DateTimePicker
									value={new Date(value)}
									mode={mode}
									is24Hour={true}
									display='default'
									onChange={(event, date) => {
										onChange(date);
										setShowDatePicker(false);
									}}
								/>
							)}
						/>
					)}
					{Boolean(errors.date) && (
						<ThemedText style={searchTripStyles.errorText}>
							{errors?.date?.message}
						</ThemedText>
					)}
					<IconButton
						name='search'
						title='Rechercher'
						size={24}
						color={Colors.light.primary}
						buttonStyle={searchTripStyles.submitButton}
						textProps={{ type: 'header5', color: 'background' }}
						onPress={handleSubmit(onSubmit)}
						iconStyle={{ color: Colors.light.background }}
					/>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SearchForm;
