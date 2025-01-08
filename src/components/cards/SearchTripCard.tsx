import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/texts/ThemedText';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Stars } from '@/components/UI';
import { getHoursAndMinutes } from '@/utils';

type Props = {
	style?: ViewStyle;
	trip: EVAPI.Trip;
};

const ICON_SIZE = 20;

export function SearchTripCard({ style, trip }: Readonly<Props>) {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.user}>
				<Image
					source={require('@/assets/images/user-picture.jpg')}
					style={styles.userImage}
				/>
				<ThemedText
					type={'accent'}
					color={'background'}
					style={styles.username}
				>
					{trip.driver.username}
				</ThemedText>
			</View>

			<View style={styles.textContainer}>
				<View style={styles.header}>
					<ThemedText
						type={'header5'}
						color={'background'}
						style={styles.date}
					>
						{new Date(trip.datetime).toLocaleDateString('fr-FR', {
							hour: 'numeric',
							day: 'numeric',
							month: 'long',
							hourCycle: 'h24',
						})}
					</ThemedText>
				</View>
				<View style={styles.body}>
					{trip.driver.stars && (
						<View style={styles.stars}>
							<ThemedText
								type={'accent'}
								color={'background'}
							>
								{trip.driver.stars}
								{''}
							</ThemedText>{' '}
							{/* @ts-ignore */}
							<Stars rating={trip.driver.stars} />
						</View>
					)}
					<View style={styles.row}>
						<View style={styles.element}>
							<Ionicons
								name='man-sharp'
								size={ICON_SIZE}
								color={Colors.light.background}
							/>
							<ThemedText
								color='background'
								type={'header5'}
							>
								{trip.seats}
							</ThemedText>
						</View>
						{trip.duration && (
							<View style={[styles.element, { gap: 3 }]}>
								<AntDesign
									name='clockcircleo'
									size={ICON_SIZE}
									color={Colors.light.background}
								/>
								<ThemedText
									color={'background'}
									type={'bigger'}
								>
									{getHoursAndMinutes(trip.duration)}
								</ThemedText>
							</View>
						)}
					</View>
				</View>
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
		alignItems: 'center',
	},
	user: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center', // Centrer le contenu horizontalement
		width: '25%',
	},
	userImage: {
		width: 50, // Taille fixe pour l'image
		height: 50, // Taille fixe pour l'image
		aspectRatio: 1,
		borderRadius: 9999,
		borderWidth: 1,
		borderColor: Colors.light.background,
		marginLeft: 10,
	},
	username: {
		marginTop: 5, // Ajouter un espace entre l'image et le texte
		textAlign: 'center',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		gap: 40,
		alignItems: 'center',
	},
	date: {
		margin: 'auto',
	},
	textContainer: {
		marginRight: 3,
	},
	element: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	body: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	elements: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		gap: 10,
	},
	stars: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '3%',
		marginVertical: '5%',
	},
});
