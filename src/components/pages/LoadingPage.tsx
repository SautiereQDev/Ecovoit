import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingPage = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={'large'} />
			<ThemedText type={'accent'}>Loading...</ThemedText>
		</View>
	);
};
export default LoadingPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
