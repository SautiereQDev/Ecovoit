import { CustomButton } from './CustomButton';
import React from 'react';
import { router } from 'expo-router';

interface ReturnButtonProps {
	handleBack?: () => void;
	style?: any;
}

export const ReturnButton = ({ handleBack, style }: ReturnButtonProps) => {
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
			buttonStyle={[style, styles.buttonPrevious]}
			size={'smaller'}
		/>
	);
};

export default ReturnButton;

const styles = {
	buttonPrevious: {
		width: '25%',
		marginBottom: '5%',
	},
};
