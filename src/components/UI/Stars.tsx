import { StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
	style?: ViewStyle;
	rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
	size?: number;
}

export const Stars = ({ rating, style, size = 32 }: Props) => {
	const nbFullStars = Math.floor(rating);
	const nbHalfStar = rating - nbFullStars >= 0.5 ? 1 : 0; // vérifie s'il y a une demi-étoile

	return (
		<View style={[style, styles.container]}>
			{/* Etoiles entières */}
			{Array(nbFullStars)
				.fill(0)
				.map((_, index) => (
					<Ionicons
						key={index}
						name='star'
						size={size}
						color='gold'
					/>
				))}
			{/* Demi étoiles */}
			{Array(nbHalfStar)
				.fill(0)
				.map((_, index) => (
					<Ionicons
						key={index}
						name='star-half'
						size={size}
						color='gold'
					/>
				))}
			{/* Etoiles vides */}
			{Array(5 - nbFullStars - nbHalfStar)
				.fill(0)
				.map((_, index) => (
					<Ionicons
						key={index}
						name='star-outline'
						size={size}
						color='gold'
					/>
				))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
});
