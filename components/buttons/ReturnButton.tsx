import { CustomButton } from '@/components';
import React from 'react';
import { router } from 'expo-router';

interface ReturnButtonProps {
	handleBack?: () => void;
}

export const ReturnButton = ({ handleBack }: ReturnButtonProps) => {
	return (
		<CustomButton
			text='Retour'
			textProps={{ color: 'background' }}
			onPress={
				handleBack ??
				(() => {
					router.back();
				})
			}
			// @ts-ignore
			buttonStyle={styles.buttonPrevious}
		/>
	);
};

export default ReturnButton;

const styles = {
	buttonPrevious: {
		width: '35%',
		marginBottom: 20,
	},
};
