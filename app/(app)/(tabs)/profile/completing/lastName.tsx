import { View } from 'react-native';
import React from 'react';
import { CustomButton, ThemedInput, ThemedText } from '@/components';
import {
	globalStyle,
	handleBack,
} from '@/app/(app)/(tabs)/profile/completing/index';
import ReturnButton from '@/components/buttons/ReturnButton';
import { useRegister } from '@/context/RegisterProvider';
import { router } from 'expo-router';

const LastName = () => {
	const { validateField, errors, data, setData } = useRegister();

	const handleSubmit = (): void => {
		validateField('lastName', data.lastName);
		if (!errors.lastName) {
			// @ts-ignore
			router.push('/profile/completing');
		}
	};

	return (
		<View style={globalStyle.content}>
			<ReturnButton handleBack={handleBack} />
			<ThemedText type={'header4'}>Complétez votre nom de famille</ThemedText>
			<ThemedInput
				placeholder='Entrez votre nom de famille'
				value={data.lastName}
				onChangeText={(value) => {
					validateField('lastName', value);
					setData((prev) => ({ ...prev, lastName: value }));
				}}
				hasError={!!errors.lastName}
				errorMessage={errors.lastName}
				label={'Nom de famille'}
			/>
			<CustomButton
				text={'Valider'}
				onPress={handleSubmit}
				buttonStyle={globalStyle.buttonNext}
			/>
		</View>
	);
};
export default LastName;
