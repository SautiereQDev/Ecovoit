import React from 'react';
import { View } from 'react-native';
import { Vehicle, useRegister } from '@/context/RegisterProvider';
import { handleBack } from './index';
import CreateVehicle from '@/components/forms/CreateVehicle';
import ReturnButton from '@/components/buttons/ReturnButton';
import { CustomButton, ThemedText } from '@/components';
import { router } from 'expo-router';
import {vehiclesStyles} from '@/styles/vehicles';

const CompletingVehicle = () => {
	const { setData, errors, validateField } = useRegister();

	const handleSubmit = (): void => {
		if (!errors.vehicles) {
			// @ts-ignore
			router.push('/profile/completing/');
		}
	};

	return (
		<View style={vehiclesStyles.content}>
			<ReturnButton handleBack={handleBack} />
			<ThemedText type={'header2'}>Modification du véhicule</ThemedText>
			<CreateVehicle
				errors={errors}
				setData={setData}
				validateField={validateField}
				handleSubmit={function (vehicle: Vehicle): void {}}
			/>
			<CustomButton
				text={'Valider'}
				onPress={handleSubmit}
				buttonStyle={vehiclesStyles.buttonNext}
			/>
		</View>
	);
};

export default CompletingVehicle;
