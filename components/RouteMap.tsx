import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { OSRMService } from "@/services/routingServices";

interface Route {
	points: {
		latitude: number;
		longitude: number;
	}[];
}

interface RouteMapProps {
	style?: any;
	start: {
		latitude: number;
		longitude: number;
		name?: string;
	};
	end: {
		latitude: number;
		longitude: number;
		name?: string;
	};
	waypoints?: {
		latitude: number;
		longitude: number;
		name?: string;
	}[];
}

export const RouteMap: React.FC<RouteMapProps> = ({
	style,
	start,
	end,
	waypoints = [],
}) => {
	const [route, setRoute] = useState<Route | null>(null);
	const mapRef = useRef<MapView>(null);

	const toRoutePoint = (point: {
		latitude: number;
		longitude: number;
		name?: string;
	}): { location: [number, number]; name?: string } => ({
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
		latitude: start.latitude,
		longitude: start.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	// Calculer les limites pour inclure tous les points
	const fitToCoordinates = [start, ...waypoints, end];

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={initialRegion}
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
				/>
				<Marker
					coordinate={end}
					title={end.name || "Arrivée"}
				/>
				{waypoints?.map((point, index) => (
					<Marker
						key={index}
						coordinate={point}
						title={point.name || `Point ${index + 1}`}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
});
