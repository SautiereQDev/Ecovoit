import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText.tsx";
import { Colors } from "@/constants/Colors.ts";

type Props = {
	status: "effectué" | "en cours" | "annulé";
	style?: ViewStyle;
};

export default function TripLabel({ status, style }: Readonly<Props>) {
	switch (status) {
		case "en cours":
			return (
				<View style={[styles.enCour, style]}>
					<ThemedText
						type={"small"}
						color='background'
						style={styles.text}
					>
						En cours
					</ThemedText>
				</View>
			);
		case "effectué":
			return (
				<View style={[styles.effectue, style]}>
					<ThemedText
						type={"small"}
						color='background'
						style={styles.text}
					>
						Effectué
					</ThemedText>
				</View>
			);
		case "annulé":
			return (
				<View style={[styles.annule, style]}>
					<ThemedText
						type={"small"}
						color='background'
						style={styles.text}
					>
						Annulé
					</ThemedText>
				</View>
			);
	}
}

const styles = StyleSheet.create({
	enCour: {
		backgroundColor: Colors.light.hidden,
		margin: "auto",
		width: "40%",
		paddingVertical: 3,
		borderRadius: 10,
	},
	effectue: {
		backgroundColor: "#00B309",
		margin: "auto",
		width: "40%",
		paddingVertical: 3,
		borderRadius: 10,
	},
	annule: {
		backgroundColor: "#C00600",
		margin: "auto",
		width: "40%",
		paddingVertical: 3,
		borderRadius: 10,
	},
	text: {
		textAlign: "center",
	},
});
