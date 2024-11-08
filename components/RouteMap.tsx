// components/Map/RouteMap.tsx
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Coordinates, Route } from "@/types/map";
import { OSRMService } from "@/services/routingServices";

interface RouteMapProps {
	style?: ViewStyle;
	start: Coordinates;
	end: Coordinates;
	waypoints?: Coordinates[];
}

export const RouteMap: React.FC<RouteMapProps> = ({
	style,
	start,
	end,
	waypoints = [],
}) => {
	const [route, setRoute] = useState<Route | null>(null);

	useEffect(() => {
		const loadRoute = async () => {
			try {
				const routeData = await OSRMService.getRoute(start, end, waypoints);
				setRoute(routeData);
			} catch (error) {
				console.error("Failed to load route:", error);
			}
		};

		loadRoute();
	}, [start, end, waypoints]);

	const initialRegion = {
		...start,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	return (
		<View style={[styles.container, style]}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={initialRegion}
			>
				<Marker
					coordinate={start}
					title={start.title || "Départ"}
				/>
				<Marker
					coordinate={end}
					title={end.title || "Arrivée"}
				/>

				{waypoints.map((point, index) => (
					<Marker
						key={index}
						coordinate={point}
						title={point.title || `Point ${index + 1}`}
					/>
				))}

				{route && (
					<Polyline
						coordinates={route.points}
						strokeWidth={3}
						strokeColor='#2196F3'
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
