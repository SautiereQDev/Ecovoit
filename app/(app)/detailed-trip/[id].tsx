import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useData } from '@/providers';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { ReturnButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { TripInfoLabel, TripLabel } from '@/components/labels';
import { RouteMap } from '@/components/map';
import { Colors } from '@/constants';
import { Stars } from '@/components/UI';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { globalStyles } from '@/styles';
import { getHoursAndMinutes } from '@/utils';

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
				style={styles.title}
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
				style={styles.title}
			>
				{start && end && `${start.name} -> ${end.name}`}
			</ThemedText>
			<View style={styles.labelContainer}>
				<TripLabel status={trips?.status ?? 'upcoming'} />
			</View>
			<View style={styles.body}>
				<View style={styles.mapContainer}>
					{start && end && trips?.points && trips?.points?.length > 0 && (
						<RouteMap
							start={start}
							end={end}
							waypoints={checkpoints ?? []}
							style={styles.map}
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
				<View style={styles.description}>
					<View style={styles.userContainer}>
						<Image
							source={require('@/assets/images/user-picture.jpg')}
							style={styles.userImage}
						/>
						{trips?.driver?.username && (
							<ThemedText
								type='header5'
								style={styles.driverName}
							>
								{trips?.driver?.username}
							</ThemedText>
						)}
					</View>
					<View style={styles.descriptionBody}>
						{trips?.description && (
							<View style={styles.descriptionText}>
								<ThemedText type='header6'>Description du trajet</ThemedText>
								<ThemedText>{trips.description}</ThemedText>
							</View>
						)}
						<View style={styles.stars}>
							<ThemedText type={'bigger'}>{driver?.stars}</ThemedText>
							<Stars rating={driver?.stars as ratingType} />
						</View>
					</View>
				</View>

				<View style={styles.complementaryInfos}>
					<ThemedText
						type={'header5'}
						style={styles.titleInfos}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25,
		backgroundColor: Colors.light.background,
		display: 'flex',
		width: '85%',
		marginHorizontal: 'auto',
		height: '100%',
	},
	title: {
		textAlign: 'center',
		marginBottom: 5,
	},
	body: {
		gap: 20,
	},
	labelContainer: {
		width: '90%',
		marginTop: 10,
		marginBottom: 30,
	},
	mapContainer: {
		display: 'flex',
		gap: 12,
		height: '40%',
	},
	map: {
		borderWidth: 1,
		borderColor: Colors.light.text,
		flex: 1,
		// maxHeight: '50%',
	},
	description: {
		backgroundColor: Colors.light.accent + '9F', // modifie l'opacité
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingBottom: 15,
	},
	rating: {
		marginTop: 45,
	},
	descriptionBody: {
		width: '  60%',
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 'auto',
		marginBottom: '2%',
		gap: 20,
	},
	userContainer: {
		gap: 3,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginTop: 20,
		borderColor: '#FFFA',
		borderWidth: 2,
	},
	descriptionText: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	driverName: {
		textAlign: 'center',
	},
	stars: {
		marginLeft: '3%',
		marginRight: 'auto',
		display: 'flex',
		flexDirection: 'row',
		gap: '5%',
		alignItems: 'center',
	},
	complementaryInfos: {
		backgroundColor: Colors.light.primary,
		padding: '5%',
	},
	titleInfos: {
		textAlign: 'center',
		marginBottom: '1%',
	},
});

export default DetailedTripPage;
