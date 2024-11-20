import { StyleSheet, View } from "react-native";
import { DestinationForm, ThemedText, TripCard } from "@/components";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const [data, setData] = useState({ position: "", destination: "" });

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ThemedText
					type='header1'
					color='primary'
				>
					Ecovoit
				</ThemedText>
				<DestinationForm
					formData={data}
					submitForm={setData}
					style={styles.searchInput}
				/>
				<ThemedText
					type='header3'
					style={styles.secondaryTitle}
				>
					Mes trajets effectués ou en cours 🌿
				</ThemedText>
				<TripCard
					data={{
						depart: "Super U",
						destination: "Chez Auguste",
						status: "en cours",
						nom: "Thomas",
						date: "12/12/2021",
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light.background,
	},
	content: {
		marginTop: 10,
		alignItems: "center",
		width: "90%",
		marginHorizontal: "auto",
	},
	searchInput: {
		marginTop: 15,
	},
	secondaryTitle: {
		marginTop: 30,
		marginBottom: 20,
	},
});
