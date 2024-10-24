import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors.ts";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchTripCard from "@/components/SearchTripCard.tsx";

export default function Index() {
	const data = { position: "Super U", destination: "Chez Auguste" };

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.searchInput}>
				<ThemedText color='text'>
					{data.position}
					{" -> "}
					{data.destination}
				</ThemedText>
			</View>
			<ThemedText
				type='header3'
				style={styles.secondaryTitle}
			>
				Trajets correspondants 🔗
			</ThemedText>
			<SearchTripCard
				data={{
					depart: "Super U",
					destination: "Chez Auguste",
					nom: "Thomas",
					date: "12 Décembre 2021 - 15h20",
					distance: 500,
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		flex: 1,
		backgroundColor: Colors.light.background,
		alignItems: "center",
		paddingHorizontal: 35,
	},
	secondaryTitle: {
		marginTop: 15,
		marginBottom: 15,
	},
	searchInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: "#fff",
	},
});
