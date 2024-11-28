import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function PostTrip() {
	return (
		<View>
			<Text>Publier un trajet</Text>
			<Link href='/(app)/(post-trip)/start'>Choisir le point de départ</Link>
		</View>
	);
}
