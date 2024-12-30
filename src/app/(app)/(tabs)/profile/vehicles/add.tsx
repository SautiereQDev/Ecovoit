import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/src/components';
import CreateVehicle from '@/src/components/forms/CreateVehicle';
import { useRegister } from '@/src/context/RegisterProvider';
import { useProfile } from '@/src/context/ProfileProvider';
import { router } from 'expo-router';
import ReturnButton from '@/src/components/buttons/ReturnButton';
import { Vehicle } from '@/src/types';
import { vehiclesStyles } from '@/src/styles/vehicles';

const AddVehicle = () => {
	const { addVehicle } = useProfile();
	const { errors, validateField } = useRegister();

	const handleAddVehicle = (vehicle: Vehicle) => {
		// @ts-ignore
		addVehicle(vehicle);
		router.back();
	};

	return (
		<View style={vehiclesStyles.container}>
			<ReturnButton />
			{/*/@ts-ignore */}
			<ThemedText
				type={'header3'}
				style={styles.title}
			>
				Ajouter un vehicle
			</ThemedText>
			{/* @ts-ignore */}
			<CreateVehicle
				errors={errors}
				validateField={validateField}
				handleSubmit={handleAddVehicle}
				buttonText={'Ajouter'}
				buttonStyle={vehiclesStyles.button}
			/>
		</View>
	);
};
export default AddVehicle;

const styles = {
	title: {
		margiTop: '10%',
		textAlign: 'center',
	},
};
