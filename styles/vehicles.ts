// styles/vehicles.ts
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const vehiclesStyles = StyleSheet.create({
	// Styles communs
	container: {
		flex: 1,
		backgroundColor: Colors.light.background,
		padding: '5%',
	},
	content: {
		flex: 1,
		margin: 'auto',
		marginTop: '10%',
		padding: '7.5%',
		gap: 30,
	},
	title: {
		marginTop: '5%',
		textAlign: 'center',
		fontSize: 24,
	},
	button: {
		width: 'auto',
		paddingHorizontal: '10%',
		marginTop: '5%',
	},

	// Liste des véhicules
	carsContainer: {
		marginTop: '10%',
		gap: 20,
	},
	carCard: {
		marginRight: 'auto',
		minWidth: '55%',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		display: 'flex',
	},
	addButton: {
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		maxWidth: '55%',
		height: '34%',
		marginTop: '5%',
		borderColor: Colors.light.disabledBorder,
	},
	addIcon: {
		textAlign: 'center',
		marginVertical: 'auto',
	},

	// Formulaire
	form: {
		gap: 20,
		marginTop: '5%',
	},
	formField: {
		marginBottom: 15,
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.light.disabledBorder,
		borderRadius: 8,
		padding: 10,
		backgroundColor: Colors.light.background,
	},

	// Menu contextuel
	menuOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},
	menuContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '3%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
	},
	menuSeparator: {
		width: 70,
		height: 1,
		backgroundColor: Colors.light.gray,
		marginVertical: 5,
	},
});
