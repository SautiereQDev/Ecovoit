import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useData } from '@/providers';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { ReturnButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { TripInfoLabel, TripLabel } from '@/components/labels';
import { RouteMap } from '@/components/map';
import { Colors } from '@/constants';
import { Stars } from '@/components/UI';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { globalStyles } from '@/styles';

type ratingType = 1 | 2 | 3 | 4 | 5 | 0.5 | 1.5 | 2.5 | 3.5 | 4.5;

// TODO: Afficher le nom du vehicle à côté d'une icone de voiture et le nombre de passagers actuellement inscris dans le trajet
// TODO: Créer deux modes : un premier mode lorsque le voyage est terminé et un second mode lorsque le voyage n'est pas encore commencé et qui permet de s'inscrire

const DetailedTripPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { useTrip, useVehicleByUserByLabel, useUser } = useData();
	const { data: trip, isLoading, error: errorTrip } = useTrip(id);

	const {
		data: vehicle,
		isLoading: vehicleLoading,
		error: errorVehicle,
	} = useVehicleByUserByLabel(trip?.driver?.id!, trip?.vehicle!);

	const {
		data: driver,
		isLoading: driverLoading,
		error: errorDriver,
	} = useUser(trip?.driver?.id!);

	const start: EVAPI.Location | undefined = trip?.points.find(
		(point) => point.type === 'start'
	)?.location;
	const end: EVAPI.Location | undefined = trip?.points.find(
		(point) => point.type === 'end'
	)?.location;
	const checkpoints: EVAPI.Location[] | undefined = trip?.points
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

	return (
		<SafeAreaView style={globalStyles.container}>
			<ReturnButton />
			<ThemedText
				type='header3'
				style={styles.title}
			>
				{trip &&
					new Date(trip.datetime).toLocaleDateString('fr-FR', {
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
				<TripLabel status={trip?.status ?? 'upcoming'} />
			</View>
			<View style={styles.body}>
				<View style={styles.mapContainer}>
					{start && end && trip?.points && trip?.points?.length > 0 && (
						<RouteMap
							start={start}
							end={end}
							waypoints={checkpoints ?? []}
							style={styles.map}
						/>
					)}
					<TripInfoLabel
						distance={trip?.distance ?? undefined}
						consumption={
							trip?.distance && vehicle?.consumption
								? trip.distance * vehicle.consumption
								: undefined
						}
						arrivalTime={trip?.datetime}
					/>
				</View>
				{trip?.driver?.stars && (
					<View>
						<ThemedText type='header5'>Note moyenne du conducteur</ThemedText>
						<View>
							<ThemedText type='defaultBody'>{trip.driver.stars}</ThemedText>
							{
								<Stars
									rating={driver?.stars as ratingType}
									style={styles.rating}
								/>
							}
						</View>
					</View>
				)}
				<View style={styles.description}>
					<View style={styles.userContainer}>
						<Image
							source={require('@/assets/images/user-picture.jpg')}
							style={styles.userImage}
						/>
						{trip?.driver?.username && (
							<ThemedText
								type='header5'
								style={styles.driverName}
							>
								{trip?.driver?.username}
							</ThemedText>
						)}
					</View>
					{trip?.description && (
						<ThemedText
							type='defaultBody'
							style={styles.descriptionText}
						>
							{trip.description}
						</ThemedText>
					)}
				</View>
			</View>
		</SafeAreaView>
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
		height: '50%',
		gap: 12,
	},
	map: {
		borderWidth: 1,
		borderColor: Colors.light.text,
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
	descriptionText: {
		width: '60%',
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
	driverName: {
		textAlign: 'center',
	},
});

export default DetailedTripPage;
