import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const vehiclesStyles = StyleSheet.create({
	// Styles communs
	container: {
		flex: 1,
		backgroundColor: Colors.light.background,
		padding: '5%',
	},
	title: {
		marginTop: '5%',
		textAlign: 'center',
	},
	button: {
		width: 'auto',
		paddingHorizontal: '10%',
		marginTop: '5%',
	},

	// Styles pour la liste des véhicules (index.tsx)
	carsContainer: {
		marginTop: '10%',
		gap: 20,
	},
	carCard: {
		marginRight: 'auto',
		minWidth: '55%',
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

	// Styles pour le formulaire de création/édition
	form: {
		gap: 20,
		marginTop: '5%',
	},
	formField: {
		marginBottom: 15,
	},

	// Styles pour le menu contextuel
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
