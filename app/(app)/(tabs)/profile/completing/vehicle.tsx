import React from 'react';
import { View } from 'react-native';
import { handleBack } from './index';
import CreateVehicle from '@/components/forms/CreateVehicle';
import ReturnButton from '@/components/buttons/ReturnButton';
import { ThemedText } from '@/components';
import { router } from 'expo-router';
import { vehiclesStyles } from '@/styles/vehicles';

const CompletingVehicle = () => {
	const { setData, errors, validateField } = useRegister();

	const handleSubmit = (): void => {
		if (!errors.vehicles) {
			// @ts-ignore
			router.push('/profile');
		}
	};

	return (
		<View style={vehiclesStyles.container}>
			<ReturnButton handleBack={handleBack} />
			<View style={vehiclesStyles.content}>
				<ThemedText
					type={'header2'}
					style={vehiclesStyles.title}
				>
					Modification du véhicule
				</ThemedText>
				<CreateVehicle
					errors={errors}
					setData={setData}
					validateField={validateField}
					handleSubmit={handleSubmit}
				/>
			</View>
		</View>
	);
};

export default CompletingVehicle;
