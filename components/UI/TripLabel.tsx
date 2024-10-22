import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText.tsx";
import { Colors } from "@/constants/Colors.ts";

type Props = {
	status: "effectué" | "en cours" | "annulé";
	style?: ViewStyle;
};

const labelColors = {
	"en cours": Colors.light.hidden,
	effectué: "#00B309",
	annulé: "#C00600",
};

const textColor = (status: "effectué" | "en cours" | "annulé") =>
	status === "en cours" ? Colors.light.text : "#fff";

export default function TripLabel({ status, style }: Readonly<Props>) {
	return (
		<View
			style={[
				styles.container,
				style,
				{ backgroundColor: labelColors[status] },
			]}
		>
			<ThemedText
				type={"small"}
				style={[
					{ color: status === "en cours" ? Colors.light.text : "#fff" },
					styles.text,
				]}
			>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: "auto",
		width: "40%",
		paddingVertical: 3,
		borderRadius: 10,
	},
	text: {
		textAlign: "center",
	},
});
