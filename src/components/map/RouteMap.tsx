import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { OSRMService } from '@/services/routingServices';
import { Location } from '@/types';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';

interface Route {
	points: Location[];
}

interface RouteMapProps {
	style?: any;
	start: Location;
	end: Location;
	waypoints?: Location[];
	onError?: (err: any) => void;
}

export const RouteMap = ({
	style,
	start,
	end,
	waypoints = [],
	onError,
}: RouteMapProps) => {
	const [route, setRoute] = useState<Route | null>(null);
	const mapRef = useRef<MapView>(null);

	const toRoutePoint = (
		point: Location
	): { location: [number, number]; name?: string } => ({
		location: [point.longitude, point.latitude] as [number, number],
		name: point.name,
	});

	const fitParams = useMemo(() => {
		return {
			edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
			animated: true,
		};
	}, []);

	const fitToCoordinates = useMemo(() => {
		return [start, ...waypoints, end];
	}, [start, end, waypoints]);

	useEffect(() => {
		const loadRoute = async () => {
			try {
				const routeData = await OSRMService.getRoute(
					toRoutePoint(start),
					toRoutePoint(end),
					waypoints.map(toRoutePoint)
				);
				setRoute({
					points: routeData.points.map(
						(point: {
							latitude: number;
							longitude: number;
							name?: string;
						}) => ({
							...point,
							name: point.name ?? 'Unnamed',
						})
					),
				});
			} catch (error) {
				console.error('Failed to load route:', error);
				if (onError) {
					onError(error);
				}
			}
		};
		loadRoute().catch(console.error);
		if (start && end) {
			mapRef.current?.fitToCoordinates(fitToCoordinates, fitParams); // recentre la map lors de la modification des points
		}
	}, [start, end, waypoints, fitToCoordinates, fitParams]);

	const initialRegion = {
		...start,
		latitudeDelta: 1.0,
		longitudeDelta: 1.0,
	};

	const mapStyle = [
		{
			featureType: 'poi',
			stylers: [{ visibility: 'off' }],
		},
		{
			featureType: 'transit',
			stylers: [{ visibility: 'off' }],
		},
		{
			featureType: 'road',
			elementType: 'labels',
			stylers: [{ visibility: 'off' }],
		},
	];

	return (
		<View style={style}>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={initialRegion}
				customMapStyle={mapStyle}
				onLayout={() => {
					if (start && end) {
						mapRef.current?.fitToCoordinates(fitToCoordinates, fitParams);
					}
				}}
			>
				<Marker
					coordinate={start}
					title={start.name ?? 'Départ'}
					description={start.name ?? 'Point de départ'}
				/>
				<Marker
					coordinate={end}
					title={end.name ?? 'Arrivée'}
					description={end.name ?? "Point d'arrivée"}
				/>
				{waypoints?.map((point, index) => (
					<Marker
						key={index.toString()}
						coordinate={point}
						title={point.name ?? `Point ${index + 1}`}
						description={point.name ?? `Point ${index + 1}`}
					/>
				))}
				{route?.points && route.points.length > 0 && (
					<Polyline
						coordinates={route.points}
						strokeColor='#2196F3'
						strokeWidth={3}
						geodesic={true}
					/>
				)}
			</MapView>
			<CustomButton
				onPress={() => {
					mapRef.current?.fitToCoordinates(fitToCoordinates, fitParams);
				}}
				style={styles.button}
				textProps={{ type: 'defaultBody', color: 'secondary' }}
				text={'Recentrer'}
			/>
		</View>
	);
};

export default RouteMap;

const styles = StyleSheet.create({
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
