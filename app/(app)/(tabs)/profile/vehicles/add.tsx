import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { useRegister } from '@/context/RegisterProvider';
import { globalStyle } from '@/app/(app)/(tabs)/profile';
import { useProfile } from '@/context/ProfileProvider';
import { router } from 'expo-router';
import ReturnButton from '@/components/buttons/ReturnButton';
import { Vehicle } from '@/types';

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
				buttonStyle={globalStyle.button}
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
