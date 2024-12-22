import { View } from 'react-native';
import React from 'react';
import { CustomButton, ThemedInput, ThemedText } from '@/components';
import ReturnButton from '@/components/buttons/ReturnButton';
import { handleBack } from '@/app/(app)/(tabs)/profile/completing/index';
import { useRegister } from '@/context/RegisterProvider';
import { router } from 'expo-router';

export function Biographie() {
	const { validateField, errors, data, setData } = useRegister();

	const handleSubmit = (): void => {
		validateField('biographie', data.biographie);
		if (!errors) {
			router.push('/');
		}
	};

	return (
		<View>
			<ReturnButton handleBack={handleBack} />
			<ThemedText type={'header3'}>Biographie</ThemedText>
			<ThemedInput
				placeholder='Decrire vous en quelques mots'
				value={data.biographie}
				onChangeText={(value) => {
					validateField('biographie', value);
					setData((prev) => ({ ...prev, biographie: value }));
				}}
				hasError={!!errors.biographie}
				errorMessage={errors.biographie}
				label={'Biographie'}
			/>
			<CustomButton
				text={'Valider'}
				onPress={handleSubmit}
			/>
		</View>
	);
}

export default Biographie;
