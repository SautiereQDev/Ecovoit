import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/texts';
import { ThemedInput } from '@/components/inputs';
import { CustomButton } from '@/components/buttons';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import { globalStyles } from '@/styles';

export const Description = () => {
	// TODO: Afficher une modal pour demander si il souhaite ajouter une description

	const [showConfirmationModal, setShowConfirmationModal] = useState(true);

	const handleDeny = () => {
		console.log('Description denied');
		setShowConfirmationModal(false);
	};

	const handleConfirm = () => {
		console.log('Description confirmed');
		setShowConfirmationModal(false);
	};

	return (
		<View style={globalStyles.container}>
			<ThemedText
				type={'header3'}
				style={globalStyles.title}
			>
				Description
			</ThemedText>
			<View style={[globalStyles.form, { gap: 20 }]}>
				{/* TODO: Arriver à faire passer l'input sur plusieurs lignes*/}
				<ThemedInput
					placeholder={'Ajouter une description'}
					multiline
					numberOfLines={3}
				/>
				<CustomButton
					text={'Ajouter'}
					textProps={{ color: 'background' }}
					buttonStyle={styles.button}
				/>
			</View>

			<ConfirmationModal
				visible={showConfirmationModal}
				onClose={() => setShowConfirmationModal(false)}
				title={'Ajouter une description'}
				message={'Souhaitez-vous ajouter une description ?'}
				onConfirm={handleConfirm}
				onDeny={handleDeny}
			/>
		</View>
	);
};

export default Description;

const styles = StyleSheet.create({
	button: {
		width: '80%',
		marginHorizontal: 'auto',
	},
});
