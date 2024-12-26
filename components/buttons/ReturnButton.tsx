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
			textProps={{ type: 'defaultBody' }}
			backgroundColor={'accentBackground'}
			onPress={
				handleBack ??
				(() => {
					router.back();
				})
			}
			// @ts-ignore
			buttonStyle={styles.buttonPrevious}
			size={'smaller'}
		/>
	);
};

export default ReturnButton;

const styles = {
	buttonPrevious: {
		width: '25%',
		marginBottom: "5%"
	},
};
