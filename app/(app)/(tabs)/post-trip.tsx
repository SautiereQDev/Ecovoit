import CustomButton from '@/components/drafts/CustomButton';
import { StyleSheet, View, Image } from 'react-native';
import Cover from '@/assets/images/Ecovoit_logo.png';
import { router } from 'expo-router';

export default function PostTrip() {
	const handlePostTrip = () => {
		router.navigate('/(app)/(post-trip)/start');
	};

	return (
		<View style={[styles.container]}>
			<Image
				style={[styles.image, { alignSelf: 'center' }]}
				source={Cover}
			/>
			<CustomButton
				iconLeft='add'
				title='Publier un trajet'
				onPress={handlePostTrip}
				style={{ marginVertical: 10, elevation: 5 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FDFFFD',
	},
	image: {
		width: '80%',
		height: '40%',
		marginVertical: 10,
	},
});
