import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Location, Point } from '@/types';
import { ThemedText } from '../texts';
import { useData } from '@/providers';
import { Image, StyleSheet, View } from 'react-native';
import { RouteMap } from '@/components/map';
import { Stars } from '@/components/UI/Stars';
import { Colors } from '@/constants';
import { ReturnButton } from '@/components/buttons/ReturnButton';
import { router } from 'expo-router';
import { TripLabel } from '@/components/labels';

interface TripData {
	date?: string;
	start: Point;
	end: Point;
	waypoints?: Point[];
	title?: string;
	userImg?: string;
	driverName?: string;
	description?: string;
	distance: number;
	consommation: number;
	rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
}

export const DetailedTrip = ({ tripId }: { tripId: string }) => {
	const { useTrip } = useData();
	const { data: trip, isLoading, isError } = useTrip(tripId);

	const start = trip?.points.find((point) => point.type === 'start');
	const end = trip?.points.find((point) => point.type === 'end');

	const checkpoints = trip?.points
		.filter(
			(point) => point.type === 'checkpoint' && point.location !== undefined
		)
		.map((point) => point.location as unknown as Location);

	if (isError) {
		return (
			<SafeAreaView>
				<ThemedText>Une erreur est survenue</ThemedText>
			</SafeAreaView>
		);
	}

	if (isLoading) {
		return (
			<SafeAreaView>
				<ThemedText>Loading...</ThemedText>
			</SafeAreaView>
		);
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
				{`${start?.location?.name} -> ${end?.location?.name}`}
			</ThemedText>
			<View style={styles.labelContainer}>
				<TripLabel
					status={trip?.status ?? 'upcoming'}
					theme={'bigger'}
				/>
			</View>
			<View style={styles.body}>
				<View style={styles.mapContainer}>
					{start?.location && end?.location && trip?.points && (
						<RouteMap
							start={start.location}
							end={end.location}
							waypoints={checkpoints}
							style={styles.map}
						/>
					)}
					{/*<TripInfoLabel*/}
					{/* data={{*/}
					{/* distance: trip?.distance,*/}
					{/* consumption: trip.consommation,*/}
					{/* arrivalTime: '12h30',*/}
					{/* }}*/}
					{/*/>*/}
				</View>
				{trip?.driver?.stars && (
					<View>
						<ThemedText type='header5'>Note moyenne du conducteur</ThemedText>
						<View>
							<ThemedText type='defaultBody'>{trip.driver.stars}</ThemedText>
							<Stars
								rating={trip.driver.stars}
								style={styles.rating}
							/>
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

export default DetailedTrip;

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
