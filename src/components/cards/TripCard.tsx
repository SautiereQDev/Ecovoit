import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { TripLabel } from '@/components/labels';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/texts';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { Ionicons } from '@expo/vector-icons';

const backgroundColor = {
	upcoming: Colors.light.secondary,
	ongoing: Colors.light.accent,
	completed: Colors.light.primary,
	cancelled: Colors.light.error,
};

type Props = {
	style?: ViewStyle;
	data: EVAPI.Trip;
};

export function TripCard({ style, data }: Readonly<Props>) {
	return (
		<View
			style={[
				styles.container,
				style,
				{ backgroundColor: backgroundColor[data.status] },
				data.status === 'cancelled' && styles.cancelledCard,
			]}
		>
			<View style={styles.header}>
				<ThemedText
					type='header6'
					color={'background'}
				>
					{data.points[0].location.name}
					{' -> '}
					{data.points[data.points.length - 1].location.name}
				</ThemedText>
				<TripLabel status={data.status} />
			</View>
			<View style={styles.body}>
				<View style={styles.row}>
					<ThemedText
						color={'background'}
						type={'accent'}
					>
						{data.distance}km
					</ThemedText>
					<ThemedText
						color={'background'}
						style={{ alignSelf: 'flex-end' }}
					>
						{data.points.length}
						{data.points.length > 1 ? ' étapes' : ' étape'}
					</ThemedText>
				</View>
				<View style={styles.row}>
					<ThemedText
						color='background'
						type={'header4'}
					>
						{data.seats}
						<Ionicons
							name='man-sharp'
							size={24}
							color='background'
						/>
					</ThemedText>
					<ThemedText
						color='background'
						style={styles.date}
					>
						{new Date(data.datetime).toLocaleDateString('fr-FR', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: 'numeric',
						})}
					</ThemedText>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		borderRadius: 10,
		padding: 15,
		gap: 10,
	},
	userImage: {
		width: '20%',
		marginVertical: 'auto',
		aspectRatio: 1,
		borderRadius: 9999,
		borderWidth: 1,
		borderColor: Colors.light.background,
		marginLeft: 5,
	},
	cancelledCard: {
		opacity: 0.75, // Apply grayscale effect using opacity
	},
	header: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	body: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: 3,
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	date: {
		alignSelf: 'flex-end',
		marginTop: 5,
	},
});

export default TripCard;
