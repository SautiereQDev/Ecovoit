import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import { ThemedText } from '@/components/texts/ThemedText';
import { Checkbox } from 'react-native-paper';
import { EVAPI } from '@ecovoit-api/mock-adapter';

type Props = {
	visible: boolean;
	onClose: () => void;
	order: Record<keyof EVAPI.TripEntry, boolean>;
	setOrder: React.Dispatch<
		React.SetStateAction<Record<keyof EVAPI.TripEntry, boolean>>
	>;
};

export const ShowOrder = ({ visible, onClose, order, setOrder }: Props) => {
	const handleCheckboxPress = (field: keyof EVAPI.TripEntry) => {
		setOrder((prevOrder) => ({
			...Object.keys(prevOrder).reduce(
				(acc, key) => {
					acc[key as keyof EVAPI.TripEntry] = false;
					return acc;
				},
				{} as Record<keyof EVAPI.TripEntry, boolean>
			),
			[field]: true,
		}));
	};

	const keys = [
		'id',
		'driver',
		'distance',
		'duration',
		'cancelled',
		'seats',
		'datetime',
		'description',
	] as (keyof EVAPI.TripEntry)[];

	return (
		<Modal
			visible={visible}
			onRequestClose={onClose}
			transparent
		>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<ThemedText
						type='header4'
						style={styles.title}
					>
						Ordre de tri
					</ThemedText>
					{keys.map((field) => (
						<Checkbox.Item
							key={String(field)}
							label={String(field)}
							status={order[field] ? 'checked' : 'unchecked'}
							onPress={() => handleCheckboxPress(field)}
							style={styles.checkbox}
						/>
					))}
					<CustomButton
						onPress={onClose}
						text='Fermer'
						textProps={{ type: 'bigger', color: 'background' }}
						buttonStyle={styles.button}
						backgroundColor='primary'
					/>
				</View>
			</View>
		</Modal>
	);
};

export default ShowOrder;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	container: {
		width: '90%',
		height: '42%',
		paddingTop: '3%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
		paddingHorizontal: '10%',
	},
	title: {
		textAlign: 'center',
		marginBottom: '5%',
	},
	button: {
		position: 'absolute',
		bottom: 15,
		right: 10,
		width: '30%',
	},
	checkbox: {
		marginHorizontal: '5%',
	},
});
