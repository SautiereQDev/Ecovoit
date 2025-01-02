import { View } from 'react-native';
import React from 'react';
import { CustomButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { ThemedInput } from '@/components/inputs';
import { handleBack } from './index';
import ReturnButton from '@/components/buttons/ReturnButton';
import { router } from 'expo-router';
import { vehiclesStyles } from '@/styles/vehicles';

const LastName = () => {
	const handleSubmit = (): void => {
		validateField('lastName', data.lastName);
		if (!errors.lastName) {
			// @ts-ignore
			router.push('/profile/completing');
		}
	};

	return (
		<View style={vehiclesStyles.container}>
			<ReturnButton handleBack={handleBack} />
			<View style={vehiclesStyles.content}>
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
					buttonStyle={vehiclesStyles.buttonNext}
					size={'smaller'}
				/>
			</View>
		</View>
	);
};
export default LastName;
