import { Image, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import TripLabel from "@/components/UI/TripLabel.tsx";
import { Colors } from "@/constants/Colors.ts";
import { ThemedText } from "@/components/ThemedText.tsx";

const backgroundColor = {
	"en cours": Colors.light.accent,
	effectue: Colors.light.primary,
	annule: Colors.light.primary,
};

type Props = {
	style?: ViewStyle;
	data: {
		depart: string;
		destination: string;
		status: "en cours" | "effectue" | "annule";
		nom: string;
		date: string;
	};
};

export default function TripCard({ style, data }: Readonly<Props>) {
	return (
		<View
			style={[
				styles.container,
				style,
				{ backgroundColor: backgroundColor[data.status] },
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
					{data.depart} {"->"} {data.destination}
				</ThemedText>
				<ThemedText
					color='background'
					style={styles.date}
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
	},
	userImage: {
		width: "20%",
		marginVertical: "auto",
		aspectRatio: 1,
		borderRadius: 9999,
		borderWidth: 1,
		borderColor: Colors.light.background,
	},
	textContainer: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		marginLeft: "auto",
		maxWidth: "75%",
	},
	header: {
		display: "flex",
		flexDirection: "row",
		gap: 55,
	},
	date: {
		alignSelf: "flex-end",
		marginTop: 5,
	},
});
