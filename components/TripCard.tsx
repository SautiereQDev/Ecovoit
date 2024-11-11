import { Image, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { TripLabel, ThemedText } from "@/components";
import { Colors } from "@/constants/Colors.ts";
import { TripCardType } from "@/types/types";

const backgroundColor = {
	"en cours": Colors.light.accent,
	effectue: Colors.light.secondary,
	annule: Colors.light.inputText,
};

type Props = {
	style?: ViewStyle;
	data: TripCardType;
};

export function TripCard({ style, data }: Readonly<Props>) {
	return (
		<View
			style={[
				styles.container,
				style,
				{ backgroundColor: backgroundColor[data.status] },
				data.status === "annule" && styles.cancelledCard,
			]}
		>
			<Image
				source={require("@/assets/images/user-picture.jpg")}
				style={styles.userImage}
			/>
			<View style={styles.textContainer}>
				<View style={styles.header}>
					<ThemedText
						type='header4'
						color={"background"}
						style={{ marginLeft: 20 }}
					>
						{data.nom}
					</ThemedText>
					<TripLabel
						status={data.status}
						style={{ alignSelf: "baseline" }}
					/>
				</View>
				<ThemedText color='background'>
					{data.depart}
					{" -> "}
					{data.destination}
				</ThemedText>
				<ThemedText
					color='background'
					style={styles.date}
					type={"smaller"}
				>
					{data.date}
				</ThemedText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		padding: 10,
		overflow: "hidden",
		borderRadius: 5,
	},
	userImage: {
		width: "20%",
		marginVertical: "auto",
		aspectRatio: 1,
		borderRadius: 9999,
		borderWidth: 1,
		borderColor: Colors.light.background,
		marginLeft: 5,
	},
	cancelledCard: {
		opacity: 0.75, // Apply grayscale effect using opacity
	},
	textContainer: {
		marginLeft: "auto",
		maxWidth: "72%",
	},
	header: {
		display: "flex",
		flexDirection: "row",
		gap: 45,
	},
	date: {
		alignSelf: "flex-end",
		marginTop: 5,
	},
});

export default TripCard;