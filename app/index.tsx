import { StyleSheet, View, TextInput } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import DestinationForm from "@/components/DestinationForm";
import { useState } from "react";

export default function Index() {
	const [data, setData] = useState({ position: "", destination: "" });

	return (
		<View style={styles.container}>
			<ThemedText
				type='header1'
				color='primary'
			>
				Ecovoit
			</ThemedText>
			<DestinationForm
				formData={data}
				submitForm={setData}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
