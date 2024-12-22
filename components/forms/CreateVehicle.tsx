import { StyleSheet, View } from 'react-native';
import { ThemedInput, ThemedText } from '@/components';
import React, { useState } from 'react';
import { CreateVehicleProps, Vehicle } from '@/context/RegisterProvider';

const vehicleValidation: Record<
	keyof Vehicle,
	(value: string | number) => string | null
> = {
	carName: (value: string | number) =>
		String(value).length >= 2
			? null
			: 'Le nom du véhicule doit contenir au moins 2 caractères',
	carConsommation: (value: string | number) =>
		Number(value) > 0 && Number(value) < 50
			? null
			: 'La consommation doit être entre 0 et 50 L/100km',
	carEmission: (value: string | number) =>
		Number(value) > 0 && Number(value) < 500
			? null
			: 'Les émissions doivent être entre 0 et 500 g/km',
};

export const CreateVehicle = ({
	errors,
	data,
	setData,
	validateField,
}: Readonly<CreateVehicleProps>) => {
	const [vehicle, setVehicle] = useState<Vehicle>({
		carName: '',
		carConsommation: 0,
		carEmission: 0,
	});

	const handleVehicleChange = (
		field: keyof Vehicle,
		value: string | number
	) => {
		const updatedVehicle = { ...vehicle, [field]: value };
		setVehicle(updatedVehicle);

		// Valider le champ
		const error = vehicleValidation[field]?.(value);
		if (error) {
			validateField('vehicles', [updatedVehicle]);
		}

		// Mettre à jour les véhicules dans le state global
		setData((prev) => ({
			...prev,
			vehicles: [updatedVehicle],
		}));
	};

	return (
		<View style={styles.content}>
			<ThemedText
				type={'header2'}
				style={styles.title}
			>
				Informations du véhicule
			</ThemedText>

			<View style={styles.form}>
				<ThemedInput
					placeholder='Nom du véhicule'
					value={vehicle.carName}
					onChangeText={(value) => handleVehicleChange('carName', value)}
					hasError={!!errors.vehicles?.[0]?.carName}
					errorMessage={errors.vehicles?.[0]?.carName}
					label={'Nom du véhicule'}
				/>
				<ThemedInput
					placeholder='Consommation (L/100km)'
					value={vehicle.carConsommation?.toString()}
					onChangeText={(value) =>
						handleVehicleChange('carConsommation', parseFloat(value) || 0)
					}
					keyboardType='numeric'
					hasError={!!errors.vehicles?.[0]?.carConsommation}
					errorMessage={errors.vehicles?.[0]?.carConsommation}
					label={'Consommation'}
				/>
				-
				<ThemedInput
					placeholder='Émissions CO2 (g/km)'
					value={vehicle.carEmission?.toString()}
					onChangeText={(value) =>
						handleVehicleChange('carEmission', parseFloat(value) || 0)
					}
					keyboardType='numeric'
					hasError={!!errors.vehicles?.[0]?.carEmission}
					errorMessage={errors.vehicles?.[0]?.carEmission}
					label={'Émissions CO2'}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	content: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		width: '80%',
		gap: 30,
	},
	title: {
		textAlign: 'center',
	},
	form: {
		gap: 20,
	},
});

export default CreateVehicle;
