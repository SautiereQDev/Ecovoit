import { Image, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import TripLabel from "@/components/UI/TripLabel.tsx";
import { Colors } from "@/constants/Colors.ts";
import { ThemedText } from "@/components/ThemedText.tsx";

const backgroundColor = {
	"en cours": Colors.light.accent,
	effectué: Colors.light.primary,
	annulé: Colors.light.primary,
};

type Props = {
	style?: ViewStyle;
	data: {
		depart: string;
		destination: string;
		status: "en cours" | "effectué" | "annulé";
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
			<ThemedText color={"background"}>{data.nom}</ThemedText>
			<TripLabel status={data.status} />
			<ThemedText color='background'>
				{data.depart}
				{"->"}
				{data.destination}
			</ThemedText>
			<ThemedText color='background'>{data.date}</ThemedText>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		// width: "100%",
		overflow: "hidden",
	},
	userImage: {
		width: 50,
		height: 50,
		borderRadius: 9999,
	},
});
