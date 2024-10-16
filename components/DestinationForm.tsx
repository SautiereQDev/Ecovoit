import {Button, StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native'
import React, {SetStateAction} from 'react'
import CustomButton from './CustomButton';
import {destinationSearch} from "../types.ts";

type props = {
	style?: StyleProp<ViewStyle>;
	formData: object;
	submitForm: React.Dispatch<SetStateAction<destinationSearch>>;
}

export default function DestinationForm({style, formData, submitForm}: props) {
	return (
			<View style={styles.container}>
				<TextInput placeholder="Entrez votre position" style={styles.searchInput}/>
				<TextInput placeholder="Entrez votre destination" style={styles.searchInput}/>
				<View style={styles.submitButtonContainer}>
					<CustomButton text="Rechercher" buttonStyle={styles.submitButton} textProps={{color: 'background'}}/>
				</View>
			</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		backgroundColor: '#fff',
		alignItems: 'center',
		gap: 10,
		width: '75%',
	},
	searchInput: {
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		width: '100%',
		borderRadius: 10,
	},
	// style du conteneur du parent pour son integration dans la page
	submitButtonContainer: {
		marginTop: 5,
	},
	// style pour personaliser le boutton
	submitButton: {
		backgroundColor: 'green',
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 25,
	}
});