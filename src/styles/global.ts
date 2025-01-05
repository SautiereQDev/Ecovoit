import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: '7.5%',
		backgroundColor: Colors.light.background,
	},
	title: {
		marginTop: 25,
		marginBottom: 20,
		textAlign: 'center',
	},
	form: {
		marginTop: 20,
		display: 'flex',
		gap: 10,
	},
});
