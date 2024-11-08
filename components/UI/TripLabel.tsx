import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText.tsx";
import { Colors } from "@/constants/Colors.ts";

type Props = {
	status: "effectue" | "en cours" | "annule";
	style?: ViewStyle;
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

export function TripLabel({ status, style }: Readonly<Props>) {
	return (
		<View
			style={[
				styles.container,
				style,
				{ backgroundColor: backgroundColor[status] },
			]}
		>
			<ThemedText
				type={"small"}
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

const styles = StyleSheet.create({
	container: {
		margin: "auto",
		width: "30%",
		paddingVertical: 3,
		borderRadius: 10,
	},
	text: {
		textAlign: "center",
	},
});

export default TripLabel;