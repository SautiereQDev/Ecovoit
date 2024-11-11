// tests.tsx
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteMap } from "@/components/RouteMap";

export default function Tests() {
	const tripData = {
		start: {
			latitude: 48.8584,
			longitude: 2.2945,
			name: "Super U",
		},
		end: {
			latitude: 48.8606,
			longitude: 2.3376,
			name: "Chez Auguste",
		},
		waypoints: [], // optionnel
	};

	return (
		<SafeAreaView style={styles.container}>
			<RouteMap
				start={tripData.start}
				end={tripData.end}
				waypoints={tripData.waypoints}
				style={styles.map}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
});
