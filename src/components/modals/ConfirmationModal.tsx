import { Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import { CustomButton } from '@/components/buttons';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { ThemedText } from '@/components/texts';

type ConfirmationMenuProps = {
	visible: boolean;
	onClose: () => void;
};

export const ConfirmationMenu = ({
	visible,
	onClose,
}: ConfirmationMenuProps) => {
	const deleteVehicle = () => {
		onClose();
		console.log('Vehicle deleted');
		router.push('/profile/vehicles');
	};

	return (
		<Modal
			visible={visible}
			transparent
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<ThemedText type={'bigger'}>
						Êtes-vous sûr de vouloir supprimer ce véhicule ?
					</ThemedText>
					<View style={styles.buttonContainer}>
						<CustomButton
							text={'Oui'}
							onPress={deleteVehicle}
							backgroundColor={'acceptButton'}
							buttonStyle={styles.button}
							textProps={{ color: 'background' }}
						/>
						<CustomButton
							text={'Non'}
							onPress={onClose}
							backgroundColor={'resetButton'}
							buttonStyle={styles.button}
							textProps={{ color: 'background' }}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ConfirmationMenu;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},
	container: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '5%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
		maxWidth: '100%',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '5%',
		gap: 20,
	},
	button: {
		width: '40%',
	},
});
