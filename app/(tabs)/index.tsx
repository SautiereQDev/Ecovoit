import {StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import DestinationForm from "@/components/DestinationForm";
import {useState} from "react";
import {Colors} from "@/constants/Colors.ts";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
	const [data, setData] = useState({ position: "", destination: "" });

	return (
		<SafeAreaView style={styles.container}>
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
			<ThemedText type="header4" style={styles.secondaryTitle}>Mes trajets effectués ou en cours</ThemedText>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		flex: 1,
		backgroundColor: Colors.light.background,
		alignItems: "center",
		paddingHorizontal: 30
	},
	searchInput: {
		marginTop: 15,
	},
	secondaryTitle: {
		marginTop: 30
	}

});
