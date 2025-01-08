import { View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import ReturnButton from '@/components/buttons/ReturnButton';
import { vehiclesStyles } from '@/styles/vehicles';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { ErrorScreen } from '@/components/pages';

const Label = () => {
	const handleEditVehicle = (vehicle: EVAPI.VehicleCreation) => {
		router.back();
	};

	const initialData: EVAPI.Vehicle = {
		label: 'Peugeot 208',
		consumption: 5.6,
		emission: 120,
	};

	// Via l'api :
	// Utilisation du paramètre [label] pour récupérer les données initiales du véhicule à modifier
	return (
		<View style={vehiclesStyles.container}>
			<ReturnButton />
			<ErrorScreen error={'Non implémenté dans le backend'} />
			{/*<ThemedText type={'header3'}>Modifier un vehicule</ThemedText>*/}
			{/*/!* @ts-ignore*!/*/}
			{/*<CreateVehicle*/}
			{/*	errors={errors}*/}
			{/*	validateField={validateField}*/}
			{/*	// @ts-ignore*/}
			{/*	handleSubmit={handleEditVehicle}*/}
			{/*	buttonText={'Modifier'}*/}
			{/*	buttonStyle={vehiclesStyles.button}*/}
			{/*	initialData={initialData}*/}
			{/*/>*/}
		</View>
	);
};
export default Label;
