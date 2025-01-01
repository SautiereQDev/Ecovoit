import {
	OpaqueColorValue,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CircleButton from './CircleButton';

export default function SeatPicker({
	availableSeats,
	minSeats = 1,
	activeColor = 'black',
	inactiveColor = 'lightgray',
	onAdd,
	onRemove,
	style,
}: {
	availableSeats: number;
	minSeats?: number;
	activeColor?: string | OpaqueColorValue;
	inactiveColor?: string | OpaqueColorValue;
	style: StyleProp<ViewStyle>;
	onAdd: () => void;
	onRemove: () => void;
}) {
	const MAX_SEATS = 6; // Le nombre de siège maximum du véhicule par défaut de l'utilisateur
	const [seats, setSeats] = useState<number>(1);
	return (
		<View style={[styles.container, style]}>
			<View style={[styles.seatContainer]}>
				{Array.from({ length: availableSeats }).map((_, index) => (
					<Ionicons
						key={index}
						name='person'
						size={50}
						color={index < seats ? activeColor : inactiveColor}
					/>
				))}
			</View>

			<View style={[styles.buttonContainer]}>
				<CircleButton
					iconName='remove'
					size='large'
					color='primary-1'
					onPress={() => {
						if (seats > minSeats) {
							setSeats(seats - 1);
							onRemove();
						}
					}}
				/>
				<CircleButton
					iconName='add'
					size='large'
					color='primary-1'
					onPress={() => {
						if (seats < availableSeats) {
							setSeats(seats + 1);
							onAdd();
						}
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		width: '100%',
		alignItems: 'center',
	},
	seatContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	buttonContainer: { flexDirection: 'row', gap: 50 },
});
