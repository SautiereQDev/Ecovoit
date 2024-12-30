import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { ThemedText } from '../texts';
import { Colors } from '@/constants/Colors';

type Props = {
	status: 'completed' | 'current' | 'canceled';
	style?: ViewStyle;
	theme?: 'default' | 'bigger';
};

const backgroundColor = {
	current: Colors.light.hidden,
	completed: '#00B309',
	canceled: '#C00600',
};

const statusText = {
	current: 'En cours',
	completed: 'Effectué',
	canceled: 'Annulé',
};

export function TripLabel({
	status,
	style,
	theme = 'default',
}: Readonly<Props>) {
	const styles = theme === 'default' ? tiny : bigger;

	return (
		<View
			style={[
				styles.container,
				style,
				{ backgroundColor: backgroundColor[status] },
			]}
		>
			<ThemedText
				type={theme === 'default' ? 'small' : 'header5'}
				style={[
					{ color: status === 'current' ? Colors.light.text : '#fff' },
					styles.text,
				]}
			>
				{statusText[status]}
			</ThemedText>
		</View>
	);
}

const tiny = StyleSheet.create({
	container: {
		width: '30%',
		paddingVertical: 3,
		borderRadius: 10, // Ensure borderRadius is applied
	},
	text: {
		textAlign: 'center',
	},
});

const bigger = StyleSheet.create({
	container: {
		width: '40%',
		paddingVertical: 5,
		borderRadius: 10, // Ensure borderRadius is applied
	},
	text: {
		textAlign: 'center',
	},
});

export default TripLabel;
