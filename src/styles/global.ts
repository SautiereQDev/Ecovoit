import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: '7.5%',
		backgroundColor: Colors.light.background,
	},
	title: {
		marginTop: 20,
		textAlign: 'center',
	},
});
