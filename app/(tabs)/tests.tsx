// import { DetailledTrip } from "@/components";
import ThemedInput from '../../components/UI/ThemedInput';
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tests() {
	// const tripData = {
	// 	date: "Jeudi 24 Novembre",
	// 	start: {
	// 		latitude: 48.8584,
	// 		longitude: 2.2945,
	// 		title: "Super U",
	// 	},
	// 	end: {
	// 		latitude: 48.8606,
	// 		longitude: 2.3376,
	// 		title: "Chez Auguste",
	// 	},
	// };

	return (
		<>
			<SafeAreaView style={styles.container}>
				<ThemedInput placeholder="salut" onChange={() => console.log("j'ai été changé")} style={styles.input}/>
				{/* <DetailledTrip data={tripData} /> */}
			</SafeAreaView>
		</>
	);
}

const styles = {
	container: {
		flex: 1,
		marginTop: 50,
	},
	input: {
		width: "80%",
		margin: "auto"
	},
};
