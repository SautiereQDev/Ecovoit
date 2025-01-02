import { StyleSheet } from 'react-native';
import { Colors } from '@/constants';

export const registerStyles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	content: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		width: '80%',
		gap: 30,
	},
	confirmationPage: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		width: '80%',
		gap: 30,
	},
	confirmationPageHeader: { textAlign: 'center', marginTop: '30%' },
	header: { marginBottom: 5, display: 'flex', gap: 12 },
	paragraph: { textAlign: 'center' },
	title: { textAlign: 'center' },
	formulaire: { display: 'flex', gap: 20 },
	buttonNext: {
		marginLeft: 'auto',
		paddingHorizontal: '8%',
		paddingVertical: '2.5%',
	},
	buttonHome: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 6,
		borderRadius: 10,
		backgroundColor: Colors.light.secondary,
	},
	buttonHomeText: { color: Colors.light.background, textAlign: 'center' },
	buttons: { display: 'flex', flexDirection: 'row', gap: 30, margin: 'auto' },
	askButton: { width: '40%' },
	biographieInput: {
		paddingHorizontal: 10,
		textAlignVertical: 'top',
	},
	optionalText: {
		marginBottom: '3%',
		fontStyle: 'italic',
		color: 'gray',
	},
	imagePicker: {
		marginTop: '5%',
		marginBottom: '3%',
	},
});
