import { CustomButton } from '@/components';
import { StyleSheet } from 'react-native';
import { useNotifications } from 'react-native-notificated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tests() {
	const { notify } = useNotifications();

	return (
		<SafeAreaView style={styles.container}>
			<CustomButton
				text={'Button'}
				buttonStyle={styles.button}
				textProps={{ color: 'background' }}
				onPress={() =>
					notify('info', {
						params: {
							title: 'Attention',
							description:
								"Vous n'avez pas correctement saisi les informations",
						},
					})
				}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 50,
		width: '50%',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
