import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/texts';
import { View } from 'react-native';
import { CustomButton, ReturnButton } from '@/components/buttons';
import { Controller, useForm } from 'react-hook-form';
import { globalStyles, postTripStyles } from '@/styles';
import LocationInput from '@/components/inputs/LocationInput';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { useData, usePostTrip } from '@/providers';
import { ErrorScreen } from '@/components/pages';
import RouteMap from '@/components/map/RouteMap';
import { router } from 'expo-router';

export const Index = () => {
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<[EVAPI.PointCreation, EVAPI.PointCreation]>({
		defaultValues: [
			{ locationName: '', type: 'start', waitingTime: 0 },
			{ locationName: '', type: 'end', waitingTime: 0 },
		],
	});

	const { useLocation } = useData();
	const { data: listePoints, isLoading, error } = useLocation();

	const { postTripQuery, setPostTripQuery } = usePostTrip();

	const [locPoints, setLocPoints] = useState<
		[EVAPI.Location, EVAPI.Location] | null
	>(null);

	const [endLocationIndex, setEndLocationIndex] = useState<number>(() => {
		return (
			postTripQuery.points.findIndex((point) => point.type === 'end') ??
			postTripQuery.points.length
		);
	});

	useEffect(() => {
		if (Array.isArray(listePoints) && listePoints.length > 0) {
			const startLocation = listePoints.find(
				(point) => point.name === watch('0.locationName')
			);
			const endLocation = listePoints.find(
				(point) => point.name === watch('1.locationName')
			);

			if (startLocation && endLocation) {
				setLocPoints([startLocation, endLocation]);
			} else {
				setLocPoints(null);
			}
		}
	}, [listePoints, watch('0.locationName'), watch('1.locationName')]);

	if (error) {
		return <ErrorScreen error={error} />;
	}

	const onSubmit = (data: [EVAPI.PointCreation, EVAPI.PointCreation]) => {
		setPostTripQuery({
			...postTripQuery,
			points: [
				{
					locationName: data[0].locationName,
					type: 'start',
					waitingTime: 0,
				},
				{
					locationName: data[1].locationName,
					type: 'end',
					waitingTime: 0,
				},
			],
		});
		console.log(postTripQuery);
		router.push('/post-trip/checkpoints');
	};

	return (
		<View style={globalStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header3'}
				style={globalStyles.title}
			>
				Creation d'un trajet
			</ThemedText>
			<View style={postTripStyles.content}>
				{locPoints && !isLoading && (
					<RouteMap
						start={locPoints[0]}
						end={locPoints[1]}
						style={postTripStyles.map}
					/>
				)}
				<Controller
					control={control}
					name={'0.locationName'}
					render={({ field: { onChange, value } }) => (
						<LocationInput
							locationName={value ?? ''}
							setLocationName={(newValue) => {
								onChange(newValue);
								setValue('0.locationName', newValue);
							}}
							label={'Départ'}
							placeholder={'Entrez le point de départ'}
							hasError={!!errors[0]?.locationName}
							errorMessage={errors[0]?.locationName?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name={'1.locationName'}
					render={({ field: { onChange, value } }) => (
						<LocationInput
							locationName={value ?? ''}
							setLocationName={(newValue) => {
								onChange(newValue);
								setValue('1.locationName', newValue);
							}}
							label={'Arrivée'}
							placeholder={"Entrez le point d'arrivée"}
							hasError={!!errors[1]?.locationName}
							errorMessage={errors[1]?.locationName?.message}
						/>
					)}
				/>
				<CustomButton
					text='Suivant'
					textProps={{ color: 'background' }}
					onPress={handleSubmit(onSubmit)}
					buttonStyle={postTripStyles.submitButton}
				/>
			</View>
		</View>
	);
};

export default Index;
