import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/texts';
import { View } from 'react-native';
import { CustomButton, ReturnButton } from '@/components/buttons';
import { Controller, useForm } from 'react-hook-form';
import { globalStyles, postTripStyles } from '@/styles';
import LocationInput from '@/components/inputs/LocationInput';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { useData } from '@/providers';
import { ErrorScreen } from '@/components/pages';
import RouteMap from '@/components/map/RouteMap';

export const Index = () => {
	const initialState: EVAPI.TripCreation = {
		datetime: 0,
		description: undefined,
		points: [
			{ locationName: '', type: 'start', waitingTime: 0 },
			{ locationName: '', type: 'end', waitingTime: 0 },
		],
		seats: 0,
		vehicle: '',
	};

	const { control, handleSubmit, setValue, watch } =
		useForm<EVAPI.TripCreation>({
			defaultValues: initialState,
		});

	const { useLocation } = useData();
	const { data: listePoints, isLoading, error } = useLocation();

	const startPointIndex = 0;
	const endPointIndex = initialState.points.length - 1;

	const [departLocation, setDepartLocation] = useState<
		EVAPI.Location | undefined
	>(undefined);
	const [endLocation, setEndLocation] = useState<EVAPI.Location | undefined>(
		undefined
	);
	const [waypoints, setWaypoints] = useState<EVAPI.Location[]>([]);

	const startLocationName = watch(`points.${startPointIndex}.locationName`);
	const endLocationName = watch(`points.${endPointIndex}.locationName`);
	const points = watch(`points`);

	useEffect(() => {
		if (listePoints) {
			const departLoc = listePoints.find(
				(location: EVAPI.Location) =>
					location.name === watch(`points.${startPointIndex}.locationName`)
			);
			const endLoc = listePoints.find(
				(location: EVAPI.Location) =>
					location.name === watch(`points.${endPointIndex}.locationName`)
			);
			const wp = watch(`points`)
				.slice(1, -1)
				.map((point: { locationName: string }) =>
					listePoints.find((location) => location.name === point.locationName)
				)
				.filter(
					(location): location is EVAPI.Location => location !== undefined
				);

			setDepartLocation(departLoc);
			setEndLocation(endLoc);
			setWaypoints(wp);
		}
	}, [
		startLocationName,
		endLocationName,
		points,
		listePoints,
		watch,
		endPointIndex,
	]);

	if (error) {
		return <ErrorScreen error={error} />;
	}

	const onSubmit = (data: EVAPI.TripCreation) => {
		console.log(data);
		console.log('departLocation', departLocation);
		console.log('endLocation', endLocation);
		console.log('waypoints', waypoints);
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
				{departLocation && endLocation && !isLoading && (
					<RouteMap
						start={departLocation}
						end={endLocation}
						waypoints={waypoints}
						style={postTripStyles.map}
					/>
				)}
				<Controller
					control={control}
					name={`points.${startPointIndex}.locationName`}
					render={({ field: { onChange, value } }) => (
						<LocationInput
							locationName={value || ''}
							setLocationName={(newValue) => {
								onChange(newValue);
								setValue(`points.${startPointIndex}.locationName`, newValue);
							}}
							label={'Départ'}
							placeholder={'Entrez le point de départ'}
						/>
					)}
				/>
				<Controller
					control={control}
					name={`points.${endPointIndex}.locationName`}
					render={({ field: { onChange, value } }) => (
						<LocationInput
							locationName={value || ''}
							setLocationName={(newValue) => {
								onChange(newValue);
								setValue(`points.${endPointIndex}.locationName`, newValue);
							}}
							label={'Arrivée'}
							placeholder={"Entrez le point d'arrivée"}
						/>
					)}
				/>
				<CustomButton
					text='Submit'
					textProps={{ color: 'background' }}
					onPress={handleSubmit(onSubmit)}
					buttonStyle={postTripStyles.submitButton}
				/>
			</View>
		</View>
	);
};

export default Index;
