import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { ThemedText } from '../texts';
import { Colors } from '@/constants/Colors';

type Props = {
	status?: Readonly<'upcoming' | 'completed' | 'ongoing' | 'cancelled'>;
	style?: ViewStyle;
	theme?: 'default' | 'bigger';
};

const backgroundColor = {
	upcoming: Colors.light.primary,
	ongoing: Colors.light.secondary,
	completed: '#00B309',
	cancelled: '#C00600',
};

const statusText = {
	current: 'En cours',
	upcoming: 'À venir',
	ongoing: 'En cours',
	completed: 'Effectué',
	cancelled: 'Annulé',
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
				{
					backgroundColor: status
						? backgroundColor[status]
						: Colors.light.hidden,
				},
			]}
		>
			<ThemedText
				type={theme === 'default' ? 'small' : 'header6'}
				style={[{ color: Colors.light.background }, styles.text]}
			>
				{status ? statusText[status] : 'Unknown'}
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
