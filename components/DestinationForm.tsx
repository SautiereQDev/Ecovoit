import {
	StyleProp,
	StyleSheet,
	TextInput,
	View,
	ViewStyle,
} from "react-native";
import React, { SetStateAction } from "react";
import CustomButton from "./UI/CustomButton";
import { destinationSearch } from "../types/types.ts";
import { Colors } from "@/constants/Colors.ts";
import IconButton from "@/components/UI/IconButton.tsx";

type props = {
	style?: StyleProp<ViewStyle>;
	formData: object;
	submitForm: React.Dispatch<SetStateAction<destinationSearch>>;
};

export function DestinationForm({
	style,
	formData,
	submitForm,
}: Readonly<props>) {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.inputsContainer}>
				<View style={styles.searchForm}>
					<TextInput
						placeholder='Entrez votre position'
						style={styles.searchInput}
					/>
					<TextInput
						placeholder='Entrez votre destination'
						style={styles.searchInput}
					/>
					<CustomButton
						text='Rechercher'
						buttonStyle={styles.submitButton}
						textProps={{ color: "background" }}
						onPress={() => alert("salut")}
					/>
				</View>

				<IconButton
					name='arrow-switch'
					size={24}
					color='black'
					style={styles.switchButton}
					title={""}
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
	},
	switchButton: {
		borderWidth: 2,
		height: 40,
		width: 40,
		paddingVertical: 5,
		paddingHorizontal: 8,
		margin: "auto",
		borderRadius: 5,
		transform: [{ rotate: "90deg" }],
	},
	inputsContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		gap: 30,
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
	searchForm: {
		display: "flex",
		height: 160,
		width: "85%",
		gap: 16,
	},
	// style pour personaliser le boutton
	submitButton: {
		backgroundColor: Colors.light.accent,
		borderRadius: 10,
		width: 145,
	},
});

export default DestinationForm;