// styles/profile.ts
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const profileStyles = StyleSheet.create({
	// Styles communs
	container: {
		flex: 1,
		padding: '7.5%',
		backgroundColor: Colors.light.background,
	},
	content: {
		margin: 'auto',
		marginTop: '10%',
		padding: '7.5%',
		gap: 30,
	},
	title: {
		textAlign: 'center',
		marginTop: '5%',
		marginBottom: '7.5%',
	},
	button: {
		width: 'auto',
		paddingHorizontal: '10%',
	},

	// Styles du profil
	profilePicture: {
		borderRadius: 9999,
		height: 100,
		aspectRatio: 1,
		alignSelf: 'center',
	},
	username: {
		textAlign: 'center',
		marginTop: '2%',
	},
	biography: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: Colors.light.accentBackground,
		marginVertical: '5%',
		paddingVertical: '5%',
		borderRadius: 10,
		gap: 5,
	},
	biographyText: {
		textAlign: 'center',
	},

	// Statistiques
	stats: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginHorizontal: 'auto',
		marginBottom: '5%',
	},
	statCell: {
		flex: 1,
		marginHorizontal: 'auto',
	},
	separator: {
		width: 1,
		backgroundColor: Colors.light.disabledBorder,
		marginHorizontal: 10,
	},

	// Boutons
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		margin: 'auto',
		gap: 40,
		marginTop: '5%',
		paddingBottom: 50,
	},
	carButton: {
		alignSelf: 'flex-start',
		marginVertical: '7.5%',
		marginLeft: '5%',
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.light.disabledBorder,
		padding: '3%',
	},

	// Edition du profil
	formContainer: {
		flex: 1,
		maxWidth: '85%',
		marginHorizontal: 'auto',
	},
	formGroup: {
		marginBottom: '5%',
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.light.disabledBorder,
		borderRadius: 8,
		padding: '3%',
		backgroundColor: Colors.light.background,
	},
	multilineInput: {
		height: 100,
		textAlignVertical: 'top',
	},

	// Completion du profil
	completionContainer: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		gap: 30,
	},
	completionHeader: {
		textAlign: 'center',
		marginTop: '30%',
	},
	completionButton: {
		marginLeft: 'auto',
		paddingHorizontal: '5%',
	},
	homeButton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 7,
		borderRadius: 10,
		backgroundColor: Colors.light.secondary,
		width: '60%',
		marginHorizontal: 'auto',
	},
});
