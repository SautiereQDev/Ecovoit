import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { useRegister, Vehicle } from '@/context/RegisterProvider';
import { globalStyle } from '@/app/(app)/(tabs)/profile';
import { useProfile } from '@/context/ProfileProvider';
import { router } from 'expo-router';

const AddVehicle = () => {
	const { addVehicle } = useProfile();
	const { errors, validateField } = useRegister();

	const handleAddVehicle = (vehicle: Vehicle) => {
		// @ts-ignore
		addVehicle(vehicle);
		router.back();
	};

	return (
		<View style={globalStyle.container}>
			<ThemedText type={'header3'}>Ajouter un vehicle</ThemedText>
			{/* @ts-ignore */}
			<CreateVehicle
				errors={errors}
				validateField={validateField}
				handleSubmit={handleAddVehicle}
				buttonText={'Ajouter'}
				buttonStyle={globalStyle.button}
			/>
		</View>
	);
};
export default AddVehicle;
