import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { useProfile } from '@/context/ProfileProvider';
import { useRegister } from '@/context/RegisterProvider';
import { Vehicle } from '@/types';
import { router } from 'expo-router';
import { globalStyle } from '@/app/(app)/(tabs)/profile';

const Edit = () => {
	const { modifyVehicle } = useProfile();
	const { errors, validateField } = useRegister();

	const handleEditVehicle = (vehicle: Vehicle) => {
		// @ts-ignore
		modifyVehicle(vehicle);
		router.back();
	};

	const initialData: Vehicle = {
		label: 'Peugeot 208',
		consumption: 5.6,
		emission: 120,
	};

	return (
		<View>
			<ThemedText type={'header3'}>Modifier un vehicule</ThemedText>
			{/* @ts-ignore*/}
			<CreateVehicle
				errors={errors}
				validateField={validateField}
				// @ts-ignore
				handleSubmit={handleEditVehicle}
				buttonText={'Modifier'}
				buttonStyle={globalStyle.button}
				initialData={initialData}
			/>
		</View>
	);
};
export default Edit;
