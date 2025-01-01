import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import { CustomButton } from '@/components/buttons';
import { router } from 'expo-router';

type Props = {
	error?: any;
};

export const ErrorPage = ({ error = null }: Props) => {
	return (
		<View style={styles.container}>
			<ThemedText type={'header4'}>Une erreur est survenue</ThemedText>
			{error && <ThemedText>{error}</ThemedText>}
			<CustomButton
				text={"Retour à l'accueil"}
				onPress={() => router.push('/')}
				buttonStyle={styles.button}
				size={'smaller'}
			/>
		</View>
	);
};
export default ErrorPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: '25%',
	},
	button: {
		marginTop: '5%',
		width: '50%',
		marginHorizontal: 'auto',
	},
});
