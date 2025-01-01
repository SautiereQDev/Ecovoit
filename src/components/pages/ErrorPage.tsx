import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import { ActivityIndicator } from 'react-native-paper';

type Props = {
	error?: any;
};

export const ErrorPage = ({ error = null }: Props) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={'large'} />
			<ThemedText type={'header5'}>Une erreur est survenue</ThemedText>
			{error && <ThemedText>{error}</ThemedText>}
		</View>
	);
};
export default ErrorPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
