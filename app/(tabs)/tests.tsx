import { DetailledTrip } from "@/components";
import ThemedInput from "../../components/UI/ThemedInput";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Tests() {
	const tripData = {
		date: "Jeudi 24 Novembre",
		start: {
			latitude: 48.8584,
			longitude: 2.2945,
			title: "Super U",
		},
		end: {
			latitude: 48.8606,
			longitude: 2.3376,
			title: "Chez Auguste",
		},
	};

	// tests.tsx
	return (
		<SafeAreaView style={styles.container}>
			<ThemedInput
				placeholder='salut'
				onChange={() => console.log("j'ai été changé")}
				style={styles.inputContainer}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
	inputContainer: {
		width: "80%",
		margin: 20,
	},
});
