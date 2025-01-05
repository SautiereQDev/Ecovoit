import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Vehicle } from '@/types';
import { ThemedText } from '@/components/texts';
import { Colors } from '@/constants';

type VehicleCardProps = {
	vehicle: Vehicle;
	style?: any;
	isSelected?: boolean;
};

export const VehicleCard = ({
	vehicle,
	style,
	isSelected,
}: VehicleCardProps) => {
	return (
		<View style={[style, isSelected ? styles.selected : styles.container]}>
			<ThemedText
				type={'header5'}
				style={styles.text}
			>
				{vehicle.label}
			</ThemedText>
			<ThemedText style={styles.text}>{vehicle.emission} gCO2/km</ThemedText>
			<ThemedText style={styles.text}>{vehicle.consumption} L/100km</ThemedText>
		</View>
	);
};
export default VehicleCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		display: 'flex',
	},
	text: {
		margin: 0,
		padding: 0,
		borderWidth: 0,
		alignSelf: 'flex-start',
	},
	selected: {
		borderColor: Colors.light.primary,
		borderWidth: 3,
		padding: 10,
		borderRadius: 10,
		display: 'flex',
	},
});
