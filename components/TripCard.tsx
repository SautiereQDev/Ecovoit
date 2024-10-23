import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TripLabel from "@/components/UI/TripLabel.tsx";

type Props = {
	style: ViewStyle;
	data: {
		depart: string;
		destination: string;
		status: "en cours" | "terminé" | "annulé";
		nom: string;
	};
};

export default function TripCard({ style, data }: Readonly<Props>) {
	return (
		<View style={[styles.container, style]}>
			<Text>TripCard</Text>
			<TripLabel status={"en cours"} />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		width: 100,
		overflow: "hidden",
	},
});
