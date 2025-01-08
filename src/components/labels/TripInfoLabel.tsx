import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { ThemedText } from '../texts';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
	distance?: number;
	emission?: number;
	arrivalTime?: number;
	style?: ViewStyle;
};

export function TripInfoLabel({
	distance,
	emission,
	arrivalTime,
	style,
}: Readonly<Props>) {
	const items = [
		`${distance}km`,
		`${emission?.toFixed()}g de CO2`,
		`Arrivée à ${
			arrivalTime
				? new Date(arrivalTime).toLocaleTimeString('fr-FR', {
						hour: '2-digit',
						minute: '2-digit',
					})
				: ''
		}`,
	];

	function getIconName(item: string): string {
		switch (true) {
			case item.includes('km'):
				return 'car';
			case item.includes('CO2'):
				return 'leaf';
			case item.includes('Arrivée'):
				return 'time';
			default:
				return 'alert';
		}
	}

	return (
		<View style={[styles.container, style]}>
			<FlatList
				horizontal={true}
				data={items}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>
						<Ionicons
							name={getIconName(item) as keyof typeof Ionicons.glyphMap} //choix du nom de l'icon en fonction de l'item
							size={14}
							color={Colors.light.background}
							style={styles.icon}
						/>
						<ThemedText
							color='background'
							style={styles.text}
						>
							{item}
						</ThemedText>
					</View>
				)}
				keyExtractor={(item) => items.indexOf(item).toString()}
				ItemSeparatorComponent={() => (
					<View style={styles.separator}>
						<ThemedText
							color='background'
							style={styles.separatorText}
						>
							•
						</ThemedText>
					</View>
				)}
				contentContainerStyle={styles.contentContainer}
				style={styles.list}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

export default TripInfoLabel;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light.primary,
		borderRadius: 12,
		paddingVertical: 6,
		paddingHorizontal: 10,
	},
	list: {
		flexGrow: 0,
	},
	contentContainer: {
		alignItems: 'center',
		margin: 'auto',
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 2,
	},
	icon: {
		marginRight: 4,
	},
	text: {
		fontSize: 14,
	},
	separator: {
		paddingHorizontal: 8,
	},
	separatorText: {
		fontSize: 15,
	},
});
