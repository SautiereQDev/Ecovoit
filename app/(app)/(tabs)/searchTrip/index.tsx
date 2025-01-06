import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchContext } from '@/providers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CustomButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { searchTripStyles } from '@/styles';
import ReturnButton from '@/components/buttons/ReturnButton';
import LocationInput from '@/components/inputs/LocationInput';

const searchSchema = z
	.object({
		start: z.string().min(1, 'Le départ est requis'),
		end: z.string().min(1, 'La destination est requise'),
	})
	.refine((data) => data.start !== data.end, {
		message: 'Le départ et la destination doivent être différents',
		path: ['end'], // Indique que l'erreur est liée au champ 'end'
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

	const onSubmit = (data: { start: string; end: string }) => {
		setSearchQuery({
			...searchQuery,
			...data,
		});
		router.push('/searchTrip/search');
		console.log('searchQuery', searchQuery);
	};

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
						name='start'
						render={({ field: { onChange, onBlur, value } }) => (
							<LocationInput
								placeholder='Departure'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								hasError={!!errors.start}
								errorMessage={errors.start?.message?.toString()}
								locationName={value}
								setLocationName={onChange}
								label={'Départ'}
							/>
						)}
					/>

					<Controller
						control={control}
						name='end'
						render={({ field: { onChange, onBlur, value } }) => (
							<LocationInput
								placeholder='Destination'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								hasError={!!errors.end}
								errorMessage={errors.end?.message?.toString()}
								locationName={value}
								setLocationName={onChange}
								label={'Destination'}
							/>
						)}
					/>
					<CustomButton
						buttonStyle={searchTripStyles.submitButton}
						textProps={{ type: 'header5', color: 'background' }}
						onPress={handleSubmit(onSubmit)}
						text={'Rechercher'}
					/>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SearchForm;
