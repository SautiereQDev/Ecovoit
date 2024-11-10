// components/pages/DetailledTrip.tsx
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "../ThemedText";
import { RouteMap } from "../RouteMap";
import { Point } from "@/types/map";

interface TripData {
	date: string;
	start: Point;
	end: Point;
	waypoints?: Point[];
	title?: string;
}

interface DetailledTripProps {
	style?: ViewStyle;
	data: TripData;
}

export const DetailledTrip: React.FC<DetailledTripProps> = ({
	style,
	data,
}) => {
	return (
		<SafeAreaView style={[styles.container, style]}>
			<ThemedText type='header3'>{data.date}</ThemedText>
			<ThemedText
				type='header5'
				style={styles.tripTitle}
			>
				{`${data.start.name} -> ${data.end.name}`}
			</ThemedText>
			<RouteMap
				style={styles.map}
				start={data.start}
				end={data.end}
				waypoints={data.waypoints}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: "auto",
		marginTop: 25,
	},
	tripTitle: {
		textAlign: "center",
		marginBottom: 20,
	},
	map: {
		flex: 1,
		borderRadius: 10,
		overflow: "hidden",
	},
});

export default DetailledTrip;
