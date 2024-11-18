import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Point } from "@/types";
import { Colors } from "@/constants/colors";
import { TripInfoLabel, TripLabel } from "../labels";
import { RouteMap } from "../maps";
import { ThemedText } from "../texts";

interface TripData {
	date?: string;
	start: Point;
	end: Point;
	waypoints?: Point[];
	title?: string;
	userImg?: string;
	driverName?: string;
	description?: string;
	distance: number;
	consommation: number;
}

// TODO: Afficher un label "terminé" et le nombres d'étoiles attribuées si le trajet est terminé
export const DetailledTrip = () => {
	const data: TripData = {
		date: "12 Novembre 2024",
		start: {
			latitude: 46.177673675037354,
			longitude: -1.1183228504255647,
			name: "Super U",
		},
		end: {
			latitude: 46.15565762058419,
			longitude: -1.1501020876315642,
			name: "Chez Auguste",
		},
		waypoints: [], // optionnel
		driverName: "Quentin",
		description:
			"Trajet rapide avant d'aller faire la fête chez Auguste, on va essayer d'éviter les bouchons",
		distance: 45,
		consommation: 12,
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
			<View style={styles.labelContainer}>
				<TripLabel
					status={"effectue"}
					style={styles.label}
					theme={"bigger"}
				/>
			</View>
			<View style={styles.body}>
				<View style={styles.mapContainer}>
					<RouteMap
						start={data.start}
						end={data.end}
						waypoints={data.waypoints}
						style={styles.map}
					/>
					<TripInfoLabel
						data={{
							distance: data.distance,
							consumption: data.consommation,
							arrivalTime: "12h30",
						}}
					/>
				</View>
				<View style={styles.tripInfo}>
					<View style={styles.userContainer}>
						<Image
							source={require("@/assets/images/user-picture.jpg")}
							style={styles.userImage}
						/>
						{data.driverName && (
							<ThemedText
								type='header5'
								style={styles.driverName}
							>
								{data.driverName}
							</ThemedText>
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

export default DetailledTrip;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25,
		backgroundColor: Colors.light.background,
		alignItems: "center",
	},
	tripTitle: {
		textAlign: "center",
		marginBottom: 20,
	},
	body: {
		display: "flex",
		flex: 1,
		gap: 80,
		width: "90%",
	},
	labelContainer: {
		width: "90%",
		marginTop: 10,
		marginBottom: 30
	},
	label: {
	},
	mapContainer: {
		display: "flex",
		height: "50%",
		gap: 10,
	},
	map: {
		borderWidth: 1,
		borderColor: Colors.light.text,
	},
	tripInfo: {
		backgroundColor: Colors.light.accent + "9F", // modifie l'opacité
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
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
		borderColor: "#FFFA",
		borderWidth: 2,
	},
	driverName: {
		textAlign: "center",
	},
});
