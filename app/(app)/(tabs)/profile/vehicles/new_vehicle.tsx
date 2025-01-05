import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { router } from 'expo-router';
import ReturnButton from '@/components/buttons/ReturnButton';
import { vehiclesStyles } from '@/styles/vehicles';
import { useData } from '@/providers';
import { EVAPI } from '@ecovoit-api/mock-adapter';

const AddVehicle = () => {
	const { useAddVehicle } = useData();
	const addVehicleMutation = useAddVehicle();

	const handleAddVehicle = (vehicle: EVAPI.VehicleCreation) => {
		addVehicleMutation.mutate(
			{ vehicle },
			{
				onSuccess: () => {
					router.back();
				},
				onError: (error) => {
					console.error(error);
				},
			}
		);
	};

	return (
		<View style={vehiclesStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header3'}
				style={styles.title}
			>
				Ajouter un vehicle
			</ThemedText>
			<CreateVehicle
				handleSubmit={handleAddVehicle}
				buttonText={'Ajouter'}
				buttonStyle={vehiclesStyles.button}
			/>
		</View>
	);
};

export default AddVehicle;

const styles = StyleSheet.create({
	title: {
		marginTop: '10%',
		textAlign: 'center',
	},
});
