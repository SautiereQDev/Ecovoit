import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components';
import { GetTripType } from '@/types';

type Props = {
	style?: ViewStyle;
	trip: GetTripType;
};

export function SearchTripCard({ style, trip }: Readonly<Props>) {
	const depart = trip.points.find((point) => point.type === 'start');
	const destination = trip.points.find((point) => point.type === 'end');

	return (
		<View style={[styles.container, style]}>
			<Image
				source={require('@/assets/images/user-picture.jpg')}
				style={styles.userImage}
			/>
			<View style={styles.textContainer}>
				<View style={styles.header}>
					<ThemedText
						type={'header5'}
						color={'background'}
					>
						{trip.distance} km
					</ThemedText>
				</View>
				<ThemedText color='background'>
					{depart?.location?.name ?? 'Unknown'}
					{' -> '}
					{destination?.location?.name ?? 'Unknown'}
				</ThemedText>
				<ThemedText
					color='background'
					style={styles.date}
					type={'smaller'}
				>
					{new Date(trip.datetime).toLocaleDateString('fr-FR', {
						hour: 'numeric',
						day: 'numeric',
						month: 'long',
						hourCycle: 'h24',
					})}{' '}
				</ThemedText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		padding: 10,
		overflow: 'hidden',
		borderRadius: 5,
		backgroundColor: Colors.light.secondary,
	},
	userImage: {
		width: '20%',
		marginVertical: 'auto',
		aspectRatio: 1,
		borderRadius: 9999,
		borderWidth: 1,
		borderColor: Colors.light.background,
		marginLeft: 10,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		gap: 40,
		alignItems: 'center',
	},
	date: {
		alignSelf: 'flex-end',
		marginTop: 5,
	},
	textContainer: {
		marginRight: 3,
	},
});
