import React, { useEffect, useRef } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { FiltreType } from '@/types';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import { ThemedText } from '@/components/texts/ThemedText';
import { RadioButton } from 'react-native-paper';
import { notify } from 'react-native-notificated';
import { useTripSearch } from '@/context/SearchProvider';

type Props = {
	visible: boolean;
	onClose: () => void;
};

export const ShowOrder = ({ visible, onClose }: Props) => {
	const { order, updateOrder } = useTripSearch();
	const initialOrderValue = useRef(order);

	useEffect(() => {
		if (!visible && initialOrderValue.current !== order) {
			notify('success', { params: { title: 'Les filtres ont bien été mis à jour' } });
		}
	}, [visible, order]);

	return (
		<Modal visible={visible} onRequestClose={onClose} transparent>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<ThemedText type="header4" style={styles.title}>Ordre de tri</ThemedText>
					{Object.values(FiltreType).map((type) => (
						<RadioButton.Item
							key={type.toString()}
							label={type.toString()}
							value={type.toString()}
							status={order === type ? 'checked' : 'unchecked'}
							onPress={() => updateOrder(type as FiltreType)}
							style={styles.radio}
							position="leading"
						/>
					))}
					<CustomButton
						onPress={onClose}
						text="Fermer"
						textProps={{ type: 'bigger', color: 'background' }}
						buttonStyle={styles.button}
						backgroundColor="primary"
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
	radio: {
		marginHorizontal: '5%',
	},
});