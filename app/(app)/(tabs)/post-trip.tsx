import CustomButton from '@/components/drafts/CustomButton';
import { StyleSheet, View, Image } from 'react-native';
import Cover from '@/assets/images/Ecovoit_logo.png'; // TODO: Fix the TS
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function PostTrip() {
	const colors = useThemeColor();
	const handlePostTrip = () => {
		router.navigate('/(app)/(post-trip)/start');
	};

	return (
		<View
			style={[{ backgroundColor: colors['background-1'] }, styles.container]}
		>
			<Image
				style={[styles.image, { alignSelf: 'center' }]}
				source={Cover}
			/>
			<CustomButton
				iconLeft='add'
				title='Publier un trajet'
				onPress={handlePostTrip}
				style={{ marginVertical: 10, elevation: 5 }}
				color='primary-1'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: '80%',
		height: '40%',
		marginVertical: 10,
	},
});
