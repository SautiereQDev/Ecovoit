import { FC, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MapView, { LatLng, Marker, Polyline } from 'react-native-maps';
import { ThemedText } from '@/components/texts';
import { decode } from '@mapbox/polyline';
import { Location, RouteError, useOSRMRoute } from '@/hooks';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { CustomButton } from '@/components/buttons';
import { Colors } from '@/constants';

export type RouteMapProps = {
	start: Location;
	end: Location;
	waypoints?: Location[];
	style?: StyleProp<ViewStyle>;
	onError?: (error: RouteError) => void;
	onRouteFound?: (distance: number, duration: number) => void;
	isStatic?: boolean;
};

// Fonction utilitaire pour s'assurer que les coordonnées sont des nombres
const ensureNumericCoordinates = (location: EVAPI.Location): EVAPI.Location => {
	return {
		name: location.name,
		latitude: Number(location.latitude),
		longitude: Number(location.longitude),
	};
};

// Composant principal
export const RouteMap: FC<RouteMapProps> = ({
	start,
	end,
	waypoints,
	style,
	onError,
	onRouteFound,
	isStatic,
}) => {
	// Conversion des coordonnées en nombres
	const numericDeparture = ensureNumericCoordinates(start);
	const numericArrival = ensureNumericCoordinates(end);
	const numericWaypoints = waypoints?.map(ensureNumericCoordinates);

	const { data, isLoading, error } = useOSRMRoute(
		numericDeparture,
		numericArrival,
		numericWaypoints ?? [],
		onError,
		onRouteFound
	);

	const [region, setRegion] = useState({
		latitude: numericDeparture.latitude,
		longitude: numericDeparture.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const recenterMap = () => {
		if (data?.waypoints) {
			const lats = data.waypoints.map((w: any) => Number(w.location[1]));
			const lngs = data.waypoints.map((w: any) => Number(w.location[0]));

			const minLat = Math.min(...lats);
			const maxLat = Math.max(...lats);
			const minLng = Math.min(...lngs);
			const maxLng = Math.max(...lngs);

			setRegion({
				latitude: (minLat + maxLat) / 2,
				longitude: (minLng + maxLng) / 2 + 0.001,
				latitudeDelta: (maxLat - minLat) * 1.5,
				longitudeDelta: (maxLng - minLng) * 1.5,
			});
		}
	};

	useEffect(() => {
		// Valider les coordonnées
		const validateCoordinates = (location: EVAPI.Location) => {
			const numericLoc = ensureNumericCoordinates(location);
			const isValid =
				!isNaN(numericLoc.latitude) &&
				!isNaN(numericLoc.longitude) &&
				numericLoc.latitude >= -90 &&
				numericLoc.latitude <= 90 &&
				numericLoc.longitude >= -180 &&
				numericLoc.longitude <= 180;

			if (!isValid) {
				const error: RouteError = {
					code: 'INVALID_COORDINATES',
					message: `Coordonnées invalides pour le point: ${location.name}`,
					details: location,
				};
				onError?.(error);
			}
			return isValid;
		};

		const allLocations = [
			numericDeparture,
			...(numericWaypoints ?? []),
			numericArrival,
		];
		allLocations.forEach(validateCoordinates);
	}, [numericDeparture, numericArrival, numericWaypoints, onError]);

	useEffect(recenterMap, [data?.waypoints]);

	if (isLoading) {
		return (
			<View style={[styles.container, style]}>
				<ActivityIndicator
					size='large'
					color='#0000ff'
				/>
			</View>
		);
	}

	if (error) {
		return (
			<View style={[styles.container, style]}>
				<ThemedText>Impossible d'afficher la carte</ThemedText>
			</View>
		);
	}

	return (
		<View style={[styles.container, style]}>
			<MapView
				style={styles.map}
				region={region}
				onRegionChangeComplete={setRegion}
				rotateEnabled={!isStatic}
				scrollEnabled={!isStatic}
				pitchEnabled={!isStatic}
			>
				{/* Point de départ */}
				<Marker
					coordinate={{
						latitude: numericDeparture.latitude,
						longitude: numericDeparture.longitude,
					}}
					title={numericDeparture.name}
					pinColor='green'
				/>

				{/* Points intermédiaires */}
				{numericWaypoints?.map((point, index) => (
					<Marker
						key={`waypoint-${index}`}
						coordinate={{
							latitude: point.latitude,
							longitude: point.longitude,
						}}
						title={point.name}
						pinColor='yellow'
					/>
				))}

				{/* Point d'arrivée */}
				<Marker
					coordinate={{
						latitude: numericArrival.latitude,
						longitude: numericArrival.longitude,
					}}
					title={numericArrival.name}
					pinColor='red'
				/>
				{/* Tracé de l'itinéraire */}
				{data?.routes[0]?.geometry && (
					<Polyline
						coordinates={decode(data.routes[0].geometry).map(
							([latitude, longitude]): LatLng => ({ latitude, longitude })
						)}
						strokeWidth={3}
						strokeColor='#000'
					/>
				)}
			</MapView>
			{!isStatic && (
				<CustomButton
					onPress={recenterMap}
					style={styles.button}
					textProps={{ type: 'defaultBody', color: 'secondary' }}
					text={'Recentrer'}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	button: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		backgroundColor: Colors.light.background,
		paddingVertical: '2%',
		paddingHorizontal: '4%',
		borderRadius: 20,
		borderColor: '#617ad2',
		borderWidth: 1,
	},
});
