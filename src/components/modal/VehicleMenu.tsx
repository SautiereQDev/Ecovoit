import { Modal, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import ConfirmationMenu from '@/components/modal/ConfirmationModal';

type VehicleMenuProps = {
	visible: boolean;
	onClose: () => void;
	position: { x: number; y: number };
	label: string;
};

const VehicleMenu = ({
	visible,
	onClose,
	position,
	label,
}: VehicleMenuProps) => {
	const [confirmationVisible, setConfirmationVisible] =
		React.useState<boolean>(false);

	const onCloseConfirmation = () => {
		setConfirmationVisible(false);
		onClose();
	};

	return (
		<Modal
			visible={visible}
			transparent
			onRequestClose={onClose}
		>
			<Pressable
				style={styles.overlay}
				onPress={onClose}
			>
				<View style={[styles.container, { top: position.y, left: position.x }]}>
					<Link
						href={{
							pathname: '/profile/vehicles/edit/[label]',
							params: { label },
						}}
					>
						<ThemedText>Modifier</ThemedText>
					</Link>
					<View style={styles.horizontalSeparator} />
					{/* Affiche une modal de confirmation et lancer la fonction deleteVehicle en cas de confirmation*/}
					<Pressable onPress={() => setConfirmationVisible(true)}>
						<ThemedText>Supprimer</ThemedText>
					</Pressable>
					<ConfirmationMenu
						visible={confirmationVisible}
						onClose={onCloseConfirmation}
					/>
				</View>
			</Pressable>
		</Modal>
	);
};

export default VehicleMenu;

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
		padding: '3%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
	},
	horizontalSeparator: {
		width: 70,
		height: 1,
		backgroundColor: Colors.light.gray,
		marginVertical: 5,
	},
});
