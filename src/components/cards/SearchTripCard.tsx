import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '@/src/constants/Colors';
import { ThemedText } from '../texts/ThemedText';
import { SearchTripCardType } from '@/src/types/Components';

type Props = {
	style?: ViewStyle;
	data: SearchTripCardType;
};

export function SearchTripCard({ style, data }: Readonly<Props>) {
	return (
		<View style={[styles.container, style]}>
			<Image
				source={require('@/src/assets/images/user-picture.jpg')}
				style={styles.userImage}
			/>
			<View style={styles.textContainer}>
				<View style={styles.header}>
					<ThemedText
						type='header4'
						color={'background'}
						style={{ marginLeft: 20 }}
					>
						{data.nom}
					</ThemedText>
					<ThemedText
						type={'header5'}
						color={'background'}
					>
						{data.distance}m
					</ThemedText>
				</View>
				<ThemedText color='background'>
					{data.depart}
					{' -> '}
					{data.destination}
				</ThemedText>
				<ThemedText
					color='background'
					style={styles.date}
					type={'smaller'}
				>
					{data.date}
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

export default SearchTripCard;
