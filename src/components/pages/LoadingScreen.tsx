import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingScreen = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={'small'} />
			<ThemedText type={'accent'}>Loading...</ThemedText>
		</View>
	);
};
export default LoadingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
