import {
	StyleProp,
	StyleSheet,
	TextInput,
	View,
	ViewStyle,
} from "react-native";
import React, { SetStateAction } from "react";
import CustomButton from "./CustomButton";
import { destinationSearch } from "../types.ts";
import Octicons from "@expo/vector-icons/Octicons";

type props = {
	style?: StyleProp<ViewStyle>;
	formData: object;
	submitForm: React.Dispatch<SetStateAction<destinationSearch>>;
};

export default function DestinationForm({
	style,
	formData,
	submitForm,
}: props) {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.inputsContainer}>
				<View style={styles.searchInputOnly}>
					<TextInput
						placeholder='Entrez votre position'
						style={styles.searchInput}
					/>
					<TextInput
						placeholder='Entrez votre destination'
						style={styles.searchInput}
					/>
				</View>
				<Octicons name="arrow-switch" size={24} color="black" style={styles.switchButton}/>
			</View>
			<View style={styles.submitButtonContainer}>
				<CustomButton
						title='Rechercher'
						buttonStyle={styles.submitButton}
						textProps={{color: "background"}}
						onPress={() => alert('salut')}
						/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: "#fff",
		alignItems: "center",
		gap: 10,
		width: "75%",
	},
	switchButton: {
		borderWidth: 2,
		height: 40,
		width: 40,
		paddingVertical: 8,
		paddingHorizontal: 10,
		margin: "auto",
		borderRadius: 5,
		transform: [{ rotate: '90deg' }],
	},
	inputsContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		gap: 30
	},
	searchInput: {
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		width: "100%",
		borderRadius: 10,
		flex: 1,
	},
	// style du conteneur du parent pour son integration dans la page
	submitButtonContainer: {
		marginTop: 5,
	},
	searchInputOnly: {
		display: "flex",
		height: 93,
		width: "85%",
		gap: 10,
	},
	// style pour personaliser le boutton
	submitButton: {
		backgroundColor: "green",
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 25,
	},
});
