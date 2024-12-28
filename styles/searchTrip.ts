// styles/searchTrip.ts
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const searchTripStyles = StyleSheet.create({
	// Styles communs
	container: {
		flex: 1,
		backgroundColor: Colors.light.background,
	},
	content: {
		marginTop: '2%',
		width: '80%',
		marginHorizontal: 'auto',
	},

	// Styles du formulaire
	formContainer: {
		marginTop: '5%',
		gap: 20,
	},
	dateButton: {
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: '2%',
		paddingHorizontal: '3%',
		borderRadius: 10,
		borderWidth: 1.5,
		gap: 10,
		width: '100%',
		backgroundColor: Colors.light.background,
		borderColor: Colors.light.inputText,
	},
	errorText: {
		color: Colors.light.error,
		marginTop: '1%',
	},
	submitButton: {
		display: 'flex',
		flexDirection: 'row',
		gap: 15,
		marginTop: '2%',
		paddingVertical: '2%',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.light.primary,
	},

	// Styles de la recherche
	header: {
		display: 'flex',
		flexDirection: 'column',
		gap: 25,
	},
	searchBar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	destination: {
		borderWidth: 1.5,
		borderColor: Colors.light.inputText,
		padding: '2%',
		borderRadius: 10,
	},
	resetButton: {
		borderWidth: 2,
		borderColor: Colors.light.resetButton,
		borderRadius: 99999,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		height: 40,
		width: 40,
	},
	buttonCommon: {
		padding: '3%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.light.primary,
	},
	button: {
		borderWidth: 1,
		borderColor: Colors.light.primary,
		padding: '3%',
	},
	icons: {
		display: 'flex',
		flexDirection: 'row',
		marginRight: 'auto',
		gap: 25,
	},
	orderButtons: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		gap: 10,
	},
});
