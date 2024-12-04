import React, { useEffect, useRef } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { FiltreType } from '@/types';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import { ThemedText } from '@/components/texts/ThemedText';
import { RadioButton } from 'react-native-paper';
import { notify } from 'react-native-notificated';

type Props = {
	visible: boolean;
	onClose: () => void;
	order: FiltreType;
	setOrder: React.Dispatch<React.SetStateAction<FiltreType>>;
};

export const ShowOrder = ({ visible, onClose, order, setOrder }: Props) => {

	const initialOrderValue = useRef(order);

	/**
	 * Checks if any order value has changed compared to its initial value.
	 *
	 * @returns {boolean} - Returns true if order value has changed, false otherwise.
	 */
	const orderChanged = (): boolean => {
		return initialOrderValue.current !== order;
	}

	// Affichage de la notification à la fermeture du modal si l'ordre est modifié
	useEffect(() => {
		if (!visible && orderChanged()) {
			notify('success', {
				params: {
					title: 'Les filtres ont bien été mis à jour',
				},
			});
		}
	}, [visible, order]);
	return (
		<Modal
			visible={visible}
			onRequestClose={onClose}
			transparent={true}
		>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<ThemedText
						type={'header4'}
						style={styles.title}
					>
						Ordre de tri
					</ThemedText>
						<RadioButton.Item
							label={"Emission"}
							value={FiltreType.emission.toString()}
							status={order === FiltreType.emission ? 'checked' : 'unchecked'}
							onPress={() => setOrder(FiltreType.emission)}
							position={'leading'}
							style={styles.radio}
						/>
						<RadioButton.Item
							label="Distance"
							value={FiltreType.distance.toString()}
							status={order === FiltreType.distance ? 'checked' : 'unchecked'}
							onPress={() => setOrder(FiltreType.distance)}
							style={styles.radio}
							position={'leading'}
						/>
						<RadioButton.Item
							label={'Consommation'}
							value={FiltreType.consommation.toString()}
							status={
								order === FiltreType.consommation ? 'checked' : 'unchecked'
							}
							onPress={() => setOrder(FiltreType.consommation)}
							style={styles.radio}
							position={'leading'}
						/>
						<RadioButton.Item
							label={'Ecart horaire'}
							value={FiltreType.ecart_horraire.toString()}
							status={
								order === FiltreType.ecart_horraire ? 'checked' : 'unchecked'
							}
							onPress={() => setOrder(FiltreType.ecart_horraire)}
							style={styles.radio}
							position={'leading'}
						/>
						<CustomButton
							onPress={onClose}
							text={'Fermer'}
							textProps={{ type: 'bigger', color: 'background' }}
							buttonStyle={styles.button}
							backgroundColor={'primary'}
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
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
	},
	container: {
		width: '90%',
		height: '42%',
		paddingTop: '3%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
		display: 'flex',
	},
	title: {
		textAlign: 'center',
		marginBottom: '5%',
	},
	bottomButtons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		gap: 20,
		position: 'absolute',
		bottom: 15,
		right: 10,
	},
	button: {
		position: 'absolute',
		bottom: 15,
		right: 10,
		width: '30%',
	},
	filters: {
		marginTop: '7%',
	},
	filter: {
		width: '90%',
		display: 'flex',
		flexDirection: 'row',
		margin: 'auto',
		alignItems: 'center',
	},
	radio: {
		marginHorizontal: '5%',
	}
});
