import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { ThemedText } from '@/components/texts';
import { CustomButton, ReturnButton } from '@/components/buttons';
import LocationInput from '@/components/inputs/LocationInput';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { router } from 'expo-router';
import { useData, usePostTrip } from '@/providers';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { globalStyles, postTripStyles } from '@/styles';
import { RouteMap } from '@/components/map';

type FormValues = [EVAPI.PointCreation, EVAPI.PointCreation];

export default function PostTrip() {
	const defaultFormValues: FormValues = [
		{ locationName: '', type: 'start', waitingTime: 0 },
		{ locationName: '', type: 'end', waitingTime: 0 },
	];

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const { useLocation } = useData();
	const { data: listePoints, error, isLoading } = useLocation();
	const { postTripQuery, setPostTripQuery } = usePostTrip();

	const [locPoints, setLocPoints] = useState<
		[EVAPI.Location, EVAPI.Location] | null
	>(null);

	// Safe watch values extraction with defaults
	const formValues = watch();
	const startPoint = formValues?.[0] ?? defaultFormValues[0];
	const endPoint = formValues?.[1] ?? defaultFormValues[1];

	useEffect(() => {
		// Guard clauses for invalid data
		if (!Array.isArray(listePoints) || !listePoints.length) {
			setLocPoints(null);
			return;
		}

		const startLocationName = startPoint?.locationName;
		const endLocationName = endPoint?.locationName;

		if (!startLocationName || !endLocationName) {
			setLocPoints(null);
			return;
		}

		// Find locations with safe navigation
		const startLocation = listePoints.find(
			(loc) => loc && loc.name === startLocationName
		);
		const endLocation = listePoints.find(
			(loc) => loc && loc.name === endLocationName
		);

		// Update points only if both locations are found
		if (startLocation && endLocation) {
			setLocPoints([startLocation, endLocation]);
		} else {
			setLocPoints(null);
		}
	}, [listePoints, startPoint?.locationName, endPoint?.locationName]);

	// Loading and error states
	if (isLoading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	const onSubmit = (data: FormValues) => {
		setPostTripQuery({
			...postTripQuery,
			points: [
				{
					locationName: data[0]?.locationName ?? '',
					type: 'start',
					waitingTime: 0,
				},
				{
					locationName: data[1]?.locationName ?? '',
					type: 'end',
					waitingTime: 0,
				},
			],
		});
		router.push('/post-trip/checkpoints');
	};

	return (
		<SafeAreaView style={globalStyles.container}>
			<ReturnButton />
			<ThemedText
				type='header3'
				style={globalStyles.title}
			>
				Création d'un trajet
			</ThemedText>

			<View style={postTripStyles.content}>
				{locPoints && (
					<RouteMap
						start={locPoints[0]}
						end={locPoints[1]}
						style={postTripStyles.map}
						onError={(err) => console.error('RouteMap error:', err)}
					/>
				)}

				<Controller
					control={control}
					name='0'
					render={({ field: { onChange, value } }) => (
						<LocationInput
							locationName={value?.locationName ?? ''}
							placeholder='Lieu de départ'
							setLocationName={(val) =>
								onChange({ ...defaultFormValues[0], locationName: val })
							}
							hasError={!!errors[0]}
							errorMessage={errors[0]?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name='1'
					render={({ field: { onChange, value } }) => (
						<LocationInput
							locationName={value?.locationName ?? ''}
							placeholder="Lieu d'arrivée"
							setLocationName={(val) =>
								onChange({ ...defaultFormValues[1], locationName: val })
							}
							hasError={!!errors[1]}
							errorMessage={errors[1]?.message}
						/>
					)}
				/>

				<CustomButton
					text='Suivant'
					onPress={handleSubmit(onSubmit)}
					textProps={{ color: 'background' }}
					buttonStyle={postTripStyles.submitButton}
				/>
			</View>
		</SafeAreaView>
	);
}
