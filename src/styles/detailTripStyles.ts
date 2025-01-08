import { StyleSheet } from 'react-native';
import { Colors } from '@/constants';

export const detailTripStyles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25,
		backgroundColor: Colors.light.background,
		display: 'flex',
		width: '85%',
		marginHorizontal: 'auto',
		height: '100%',
	},
	title: {
		textAlign: 'center',
		marginBottom: 5,
	},
	body: {
		gap: 20,
	},
	labelContainer: {
		width: '90%',
		marginTop: 10,
		marginBottom: 30,
	},
	mapContainer: {
		display: 'flex',
		gap: 12,
		height: '40%',
	},
	map: {
		borderWidth: 1,
		borderColor: Colors.light.text,
		flex: 1,
		// maxHeight: '50%',
	},
	description: {
		backgroundColor: Colors.light.accent + '9F', // modifie l'opacité
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingBottom: 15,
	},
	rating: {
		marginTop: 45,
	},
	descriptionBody: {
		width: '  60%',
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 'auto',
		marginBottom: '2%',
		gap: 20,
	},
	userContainer: {
		gap: 3,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginTop: 20,
		borderColor: '#FFFA',
		borderWidth: 2,
	},
	descriptionText: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	driverName: {
		textAlign: 'center',
	},
	stars: {
		marginLeft: '3%',
		marginRight: 'auto',
		display: 'flex',
		flexDirection: 'row',
		gap: '5%',
		alignItems: 'center',
	},
	complementaryInfos: {
		backgroundColor: Colors.light.primary,
		padding: '5%',
	},
	titleInfos: {
		textAlign: 'center',
		marginBottom: '1%',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	joinButton: {
		maxWidth: '60%',
		marginBottom: '5%',
	},
	backButton: {
		paddingVertical: '2%',
	},
});

export default detailTripStyles;
