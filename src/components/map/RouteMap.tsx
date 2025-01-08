import { FC, useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MapView, { LatLng, Marker, Polyline, Region } from 'react-native-maps';
import { ThemedText } from '@/components/texts';
import { decode } from '@mapbox/polyline';
import { Colors } from '@/constants';
import { Location, RouteError, useMapCoordinates, useOSRMRoute } from '@/hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type RouteMapProps = {
	start: Location;
	end: Location;
	waypoints?: Location[];
	style?: StyleProp<ViewStyle>;
	onError?: (error: RouteError) => void;
	onRouteFound?: (distance: number, duration: number) => void;
	isStatic?: boolean;
	hideCenterButton?: boolean;
};

export const RouteMap: FC<RouteMapProps> = ({
	start,
	end,
	waypoints = [],
	style,
	onError,
	onRouteFound,
	isStatic = false,
	hideCenterButton = false,
}) => {
	const mapRef = useRef<MapView>(null);
	const { initialRegion } = useMapCoordinates(start, end, waypoints ?? []);
	const [region, setRegion] = useState<Region>(initialRegion);
	const { data, isLoading, error } = useOSRMRoute(
		start,
		end,
		waypoints,
		onError,
		onRouteFound
	);

	// Reset la région quand les points changent
	useEffect(() => {
		setRegion(initialRegion);
		mapRef.current?.animateToRegion(initialRegion, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

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

	if (error || !data) {
		return (
			<View style={[styles.container, style]}>
				<ThemedText>Impossible d'afficher la carte</ThemedText>
			</View>
		);
	}

	return (
		<View style={[styles.container, style]}>
			<MapView
				ref={mapRef}
				style={styles.map}
				region={region}
				onRegionChangeComplete={setRegion}
				moveOnMarkerPress={false}
				showsUserLocation={false}
				loadingEnabled={true}
				scrollEnabled={!isStatic}
				rotateEnabled={!isStatic}
			>
				<Marker
					coordinate={{
						latitude: Number(start.latitude),
						longitude: Number(start.longitude),
					}}
					title={start.name}
					pinColor='green'
				/>

				{waypoints.map((point, index) => (
					<Marker
						key={`waypoint-${index}`}
						coordinate={{
							latitude: Number(point.latitude),
							longitude: Number(point.longitude),
						}}
						title={point.name}
						pinColor='yellow'
					/>
				))}

				<Marker
					coordinate={{
						latitude: Number(end.latitude),
						longitude: Number(end.longitude),
					}}
					title={end.name}
					pinColor='red'
				/>

				<Polyline
					coordinates={decode(data.routes[0].geometry).map(
						([latitude, longitude]): LatLng => ({ latitude, longitude })
					)}
					strokeWidth={3}
					strokeColor='#000'
				/>
			</MapView>
			{!isStatic ||
				(!hideCenterButton && (
					<MaterialCommunityIcons
						name='target'
						size={24}
						color='black'
					/>
				))}
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
