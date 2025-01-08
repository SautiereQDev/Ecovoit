import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import { CustomButton } from '@/components/buttons';
import { router } from 'expo-router';

type Props = {
	error?: any;
};

export const ErrorScreen = ({ error = null }: Props) => {
	return (
		<View style={styles.container}>
			<ThemedText
				type={'header4'}
				style={styles.title}
			>
				Une erreur est survenue
			</ThemedText>
			{error && <ThemedText>{error.toString()}</ThemedText>}
			<CustomButton
				text={"Retour à l'accueil"}
				onPress={() => router.push('/')}
				buttonStyle={styles.button}
				size={'smaller'}
				textProps={{ color: 'background' }}
			/>
		</View>
	);
};
export default ErrorScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: '25%',
	},
	title: {
		marginBottom: '1%',
	},
	button: {
		marginTop: '10%',
		width: '50%',
		marginHorizontal: 'auto',
	},
});
