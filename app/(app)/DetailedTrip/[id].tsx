import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
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

type ratingType = 1 | 2 | 3 | 4 | 5 | 0.5 | 1.5 | 2.5 | 3.5 | 4.5;

const DetailedTripPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { useTrip, useUser } = useData();
	const { data: trip, isLoading, error } = useTrip(id);

	// TODO: faire sa propre requête pour récupérer le user après avoir récupéré le trip
	const { data: driver, isLoading: driverLoading } = useUser(
		trip?.driver?.id ?? ''
	);

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

	if (error) {
		return <ErrorScreen error={error} />;
	}

	if (isLoading || driverLoading) {
		return <LoadingScreen />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ReturnButton handleBack={() => router.push('/searchTrip/search')} />
			<ThemedText
				type='header3'
				style={styles.title}
			>
				{trip?.datetime
					? new Date(trip.datetime).toLocaleDateString('fr-FR', {
							day: 'numeric',
							month: 'long',
							hour: 'numeric',
							minute: 'numeric',
						})
					: 'Date not available'}
			</ThemedText>
			<ThemedText
				type='header5'
				style={styles.title}
			>
				{start && end && `${start.name} -> ${end.name}`}
			</ThemedText>
			<View style={styles.labelContainer}>
				<TripLabel
					status={trip?.status ?? 'upcoming'}
					theme={'bigger'}
				/>
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
						data={{
							distance: trip?.distance ?? undefined,
							consumption: trip?.distance ?? undefined, // TODO : distance * tripVehicle.consumption
							arrivalTime: '12h30', // TODO : trip datetime + trip duration
						}}
					/>
				</View>
				{trip?.driver?.stars && (
					<View>
						<ThemedText type='header5'>Note moyenne du conducteur</ThemedText>
						<View>
							<ThemedText type='defaultBody'>{trip.driver.stars}</ThemedText>
							{driver && (
								<Stars
									rating={driver.stars as ratingType}
									style={styles.rating}
								/>
							)}
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
