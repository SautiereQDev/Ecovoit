import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useData } from '@/providers';
import { Image, ScrollView, View } from 'react-native';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { ReturnButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { TripInfoLabel, TripLabel } from '@/components/labels';
import { RouteMap } from '@/components/map';
import { Stars } from '@/components/UI';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { getHoursAndMinutes } from '@/utils';
import { detailTripStyles, globalStyles } from '@/styles';

type ratingType = 1 | 2 | 3 | 4 | 5 | 0.5 | 1.5 | 2.5 | 3.5 | 4.5;

const DetailedTripPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { useTrip, useVehicleByUserByLabel, useUser } = useData();
	const { data: trips, isLoading, error: errorTrip } = useTrip(id);

	const {
		data: vehicle,
		isLoading: vehicleLoading,
		error: errorVehicle,
	} = useVehicleByUserByLabel(trips?.driver?.id!, trips?.vehicle!);

	const {
		data: driver,
		isLoading: driverLoading,
		error: errorDriver,
	} = useUser(trips?.driver?.id!);

	const start: EVAPI.Location | undefined = trips?.points.find(
		(point) => point.type === 'start'
	)?.location;
	const end: EVAPI.Location | undefined = trips?.points.find(
		(point) => point.type === 'end'
	)?.location;
	const checkpoints: EVAPI.Location[] | undefined = trips?.points
		.filter(
			(point) => point.type === 'checkpoint' && point.location !== undefined
		)
		.map((point) => point.location);

	if (errorTrip) {
		return <ErrorScreen error={errorVehicle} />;
	}
	if (errorDriver) {
		return <ErrorScreen error={errorTrip} />;
	}
	if (errorVehicle) {
		return <ErrorScreen error={errorTrip} />;
	}

	if (isLoading || vehicleLoading || driverLoading) {
		return <LoadingScreen />;
	}

	// TODO: Avoir un mode inscription et un mode consultation

	return (
		<ScrollView style={globalStyles.container}>
			<ReturnButton />
			<ThemedText
				type='header3'
				style={detailTripStyles.title}
			>
				{trips &&
					new Date(trips.datetime).toLocaleDateString('fr-FR', {
						day: 'numeric',
						month: 'long',
						hour: 'numeric',
						minute: 'numeric',
					})}
			</ThemedText>
			<ThemedText
				type='header5'
				style={detailTripStyles.title}
			>
				{start && end && `${start.name} -> ${end.name}`}
			</ThemedText>
			<View style={detailTripStyles.labelContainer}>
				<TripLabel status={trips?.status ?? 'upcoming'} />
			</View>
			<View style={detailTripStyles.body}>
				<View style={detailTripStyles.mapContainer}>
					{start && end && trips?.points && trips?.points?.length > 0 && (
						<RouteMap
							start={start}
							end={end}
							waypoints={checkpoints ?? []}
							style={detailTripStyles.map}
						/>
					)}
					{Boolean(
						trips?.distance && vehicle?.consumption && trips?.datetime
					) && (
						<TripInfoLabel
							distance={trips?.distance ?? undefined}
							emission={
								trips?.distance && vehicle?.consumption
									? trips.distance * vehicle.consumption
									: 0
							}
							arrivalTime={
								trips?.datetime ? new Date(trips.datetime).getTime() : 0
							}
						/>
					)}
				</View>
				<View style={detailTripStyles.description}>
					<View style={detailTripStyles.userContainer}>
						<Image
							source={require('@/assets/images/user-picture.jpg')}
							style={detailTripStyles.userImage}
						/>
						{trips?.driver?.username && (
							<ThemedText
								type='header5'
								style={detailTripStyles.driverName}
							>
								{trips?.driver?.username}
							</ThemedText>
						)}
					</View>
					<View style={detailTripStyles.descriptionBody}>
						{trips?.description && (
							<View style={detailTripStyles.descriptionText}>
								<ThemedText type='header6'>Description du trajet</ThemedText>
								<ThemedText>{trips.description}</ThemedText>
							</View>
						)}
						<View style={detailTripStyles.stars}>
							<ThemedText type={'bigger'}>{driver?.stars}</ThemedText>
							<Stars rating={driver?.stars as ratingType} />
						</View>
					</View>
				</View>

				<View style={detailTripStyles.complementaryInfos}>
					<ThemedText
						type={'header5'}
						style={detailTripStyles.titleInfos}
						color={'background'}
					>
						Infos complémentaires
					</ThemedText>
					<ThemedText
						type={'header6'}
						color={'background'}
					>
						{vehicle?.label}
					</ThemedText>
					{trips?.points.map((point) => (
						<ThemedText
							key={point.id}
							color={'background'}
						>
							- {point.location.name}
							{point.waitingTime > 0 &&
								` (${getHoursAndMinutes(point.waitingTime)})`}
						</ThemedText>
					))}
					{/*	Liste des points du trajet + temps d'attente */}
					{/*	 Temps de voyage */}
				</View>
			</View>
		</ScrollView>
	);
};

export default DetailedTripPage;
