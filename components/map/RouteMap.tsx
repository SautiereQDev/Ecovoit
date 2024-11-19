import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { OSRMService } from "@/services/routingServices";
import { Location } from "@/types";

interface Route {
	points: Location[];
}

interface RouteMapProps {
	style?: any;
	start: Location;
	end: Location;
	waypoints?: Location[];
}

//TODO: integrer un boutton recenter
export const RouteMap = ({
	style,
	start,
	end,
	waypoints = [],
}: RouteMapProps) => {
	const [route, setRoute] = useState<Route | null>(null);
	const mapRef = useRef<MapView>(null);

	const toRoutePoint = (
		point: Location,
	): { location: [number, number]; name?: string } => ({
		location: [point.longitude, point.latitude] as [number, number],
		name: point.name,
	});

	useEffect(() => {
		const loadRoute = async () => {
			try {
				const routeData = await OSRMService.getRoute(
					toRoutePoint(start),
					toRoutePoint(end),
					waypoints.map(toRoutePoint),
				);
				setRoute(routeData);
			} catch (error) {
				console.error("Failed to load route:", error);
			}
		};
		loadRoute();
	}, [start, end, waypoints]);

	const initialRegion = {
		...start,
		latitudeDelta: 1.00,
		longitudeDelta: 1.00,
	};

	// Calculer les limites pour inclure tous les points
	const fitToCoordinates = [start, ...waypoints, end];

  const mapStyle = [
	{
	  "featureType": "poi",
	  "stylers": [{ "visibility": "off" }],
	},
	{
	  "featureType": "transit",
	  "stylers": [{ "visibility": "off" }],
	},
	{
	  "featureType": "road",
	  "elementType": "labels",
	  "stylers": [{ "visibility": "off" }],
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
					// Ajuster la vue pour montrer toute la route
					mapRef.current?.fitToCoordinates(fitToCoordinates, {
						edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
						animated: true,
					});
				}}
			>
				<Marker
					coordinate={start}
					title={start.name || "Départ"}
					description={start.name || "Point de départ"}
				/>
				<Marker
					coordinate={end}
					title={end.name || "Arrivée"}
					description={end.name || "Point d'arrivée"}
				/>
				{waypoints?.map((point, index) => (
					<Marker
						key={index}
						coordinate={point}
						title={point.name || `Point ${index + 1}`}
						description={point.name || `Point ${index + 1}`}
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
		</View>
	);
};

export default RouteMap;

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
	},
});
