import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 25,
		backgroundColor: Colors.light.background,
		display: 'flex',
		paddingHorizontal: '7.5%',
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
