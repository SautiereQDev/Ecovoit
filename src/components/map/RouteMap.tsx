import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MapView, { LatLng, Marker, Polyline } from 'react-native-maps';
import { ThemedText } from '@/components/texts';
import { decode } from '@mapbox/polyline';
import { RouteError, RouteMapProps, useOSRMRoute } from '@/hooks';
import { EVAPI } from '@ecovoit-api/mock-adapter';

// Fonction utilitaire pour s'assurer que les coordonnées sont des nombres
const ensureNumericCoordinates = (location: EVAPI.Location): EVAPI.Location => {
	return {
		name: location.name,
		latitude: Number(location.latitude),
		longitude: Number(location.longitude),
	};
};

// Composant principal
export const RouteMap: React.FC<RouteMapProps> = ({
	start,
	end,
	waypoints,
	style,
	onError,
	onRouteFound,
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

	useEffect(() => {
		if (data?.waypoints) {
			const lats = data.waypoints.map((w: any) => Number(w.location[1]));
			const lngs = data.waypoints.map((w: any) => Number(w.location[0]));

			const minLat = Math.min(...lats);
			const maxLat = Math.max(...lats);
			const minLng = Math.min(...lngs);
			const maxLng = Math.max(...lngs);

			setRegion({
				latitude: (minLat + maxLat) / 2,
				longitude: (minLng + maxLng) / 2,
				latitudeDelta: (maxLat - minLat) * 1.5,
				longitudeDelta: (maxLng - minLng) * 1.5,
			});
		}
	}, [data?.waypoints]);

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
});
