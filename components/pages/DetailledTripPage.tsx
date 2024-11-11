import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "../ThemedText";
import { RouteMap } from "../RouteMap";
import { Point } from "@/types/map";
import { Colors } from "@/constants/Colors";

interface TripData {
	date?: string;
	start: Point;
	end: Point;
	waypoints?: Point[];
	title?: string;
	userImg?: string;
	driverName?: string;
	description?: string;
}

export const DetailledTrip = () => {
	const data: TripData = {
		date: "12 Novembre 2024",
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
		driverName: "Quentin",
		description:
			"Trajet rapide avant d'aller faire la fête chez Auguste, on va essayer d'éviter les bouchons",
	};

	return (
		<SafeAreaView style={styles.container}>
			{data.date && <ThemedText type='header3'>{data?.date}</ThemedText>}
			<ThemedText
				type='header5'
				style={styles.tripTitle}
			>
				{`${data.start.name} -> ${data.end.name}`}
			</ThemedText>
			<View style={styles.body}>
				<View style={styles.mapContainer}>
					<RouteMap
						start={data.start}
						end={data.end}
						waypoints={data.waypoints}
					/>
				</View>
				<View style={styles.tripDetails}>
					<View style={styles.userContainer}>
						<Image
							source={require("@/assets/images/user-picture.jpg")}
							style={styles.userImage}
						/>
						{data.driverName && (
							<ThemedText type='header5'>{data.driverName}</ThemedText>
						)}
					</View>
					{data.description && (
						<ThemedText
							type='defaultBody'
							style={styles.description}
						>
							{data.description}
						</ThemedText>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25,
		backgroundColor: Colors.light.background,
		alignItems: "center", // Centrer horizontalement
	},
	tripTitle: {
		textAlign: "center",
		marginBottom: 20,
	},
	body:{
		display: "flex",
		flex: 1,
		width: "85%",
	},
	mapContainer: {
		borderWidth: 1,
		borderColor: Colors.light.text,
		height: "45%",
	},
	tripDetails: {
		backgroundColor: Colors.light.accent,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		alignItems: "center",
		paddingHorizontal: 15,
		paddingBottom: 15,
	},
	description: {
		width: "60%",
	},
	userContainer: {
		gap: 3,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginTop: 20,
	},
});

export default DetailledTrip;
