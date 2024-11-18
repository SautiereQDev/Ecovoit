import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { ThemedText } from "../texts";
import { Colors } from "@/constants/colors";

type Props = {
	status: "effectue" | "en cours" | "annule";
	style?: ViewStyle;
	theme?: "default" | "bigger";
};

const backgroundColor = {
	"en cours": Colors.light.hidden,
	effectue: "#00B309",
	annule: "#C00600",
};

const statusText = {
	"en cours": "En cours",
	effectue: "Effectué",
	annule: "Annulé",
};

export function TripLabel({
	status,
	style,
	theme = "default",
}: Readonly<Props>) {

	const styles = theme === "default" ? tiny : bigger;

	return (
		<View
			style={[
				styles.container,
				style,
				{ backgroundColor: backgroundColor[status] },
			]}
		>
			<ThemedText
				type={theme === "default" ? "small" : "header5"}
				style={[
					{ color: status === "en cours" ? Colors.light.text : "#fff" },
					styles.text,
				]}
			>
				{statusText[status]}
			</ThemedText>
		</View>
	);
}

const tiny = StyleSheet.create({
	container: {
		width: "30%",
		paddingVertical: 3,
		borderRadius: 10,
	},
	text: {
		textAlign: "center",
	},
});

const bigger = StyleSheet.create({
	container: {
		width: "40%",
		paddingVertical: 5,
		borderRadius: 10,
	},
	text: {
		textAlign: "center",
	},
});

export default TripLabel;
