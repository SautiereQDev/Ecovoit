import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { Vehicle } from '@/types';
import { router } from 'expo-router';
import ReturnButton from '@/components/buttons/ReturnButton';
import { vehiclesStyles } from '@/styles/vehicles';
import { validateField } from '@/utils/validation';

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
