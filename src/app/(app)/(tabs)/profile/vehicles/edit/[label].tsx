import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/src/components';
import CreateVehicle from '@/src/components/forms/CreateVehicle';
import { useProfile } from '@/src/context/ProfileProvider';
import { useRegister } from '@/src/context/RegisterProvider';
import { Vehicle } from '@/src/types';
import { router } from 'expo-router';
import ReturnButton from '@/src/components/buttons/ReturnButton';
import { vehiclesStyles } from '@/src/styles/vehicles';
import { validateField } from '@/src/utils/validation';

const Label = () => {
	const { modifyVehicle } = useProfile();
	const { errors } = useRegister();

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

	// Via l'api :
	// Utilisation du paramètre [label] pour récupérer les données initiales du véhicule à modifier
	return (
		<View style={vehiclesStyles.container}>
			<ReturnButton />
			<ThemedText type={'header3'}>Modifier un vehicule</ThemedText>
			{/* @ts-ignore*/}
			<CreateVehicle
				errors={errors}
				validateField={validateField}
				// @ts-ignore
				handleSubmit={handleEditVehicle}
				buttonText={'Modifier'}
				buttonStyle={vehiclesStyles.button}
				initialData={initialData}
			/>
		</View>
	);
};
export default Label;
