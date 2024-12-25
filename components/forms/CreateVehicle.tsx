import { StyleSheet, View } from 'react-native';
import { ThemedInput } from '@/components';
import React, { ReactNode, useState } from 'react';
import { CreateVehicleProps, Vehicle } from '@/context/RegisterProvider';

/**
 * Validation rules for vehicle fields.
 */
const vehicleValidation = {
	/**
	 * Validates the car name.
	 * @param {string} value - The car name.
	 * @returns {string | null} - The validation error message or null if valid.
	 */
	carName: (value: string): string | null =>
		value.length >= 2
			? null
			: 'Le nom du véhicule doit contenir au moins 2 caractères',

	/**
	 * Validates the car consumption.
	 * @param {number} value - The car consumption in L/100km.
	 * @returns {string | null} - The validation error message or null if valid.
	 */
	carConsommation: (value: number): string | null =>
		value > 0 && value < 50
			? null
			: 'La consommation doit être entre 0 et 50 L/100km',

	/**
	 * Validates the car emission.
	 * @param {number} value - The car emission in g/km.
	 * @returns {string | null} - The validation error message or null if valid.
	 */
	carEmission: (value: number): string | null =>
		value > 0 && value < 500
			? null
			: 'Les émissions doivent être entre 0 et 500 g/km',
};

/**
 * Component for creating a vehicle.
 *
 * @param {CreateVehicleProps} props - The props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const CreateVehicle = ({
	errors,
	setData,
	validateField,
}: CreateVehicleProps): ReactNode => {
	const [vehicle, setVehicle] = useState<Vehicle>({
		carName: '',
		carConsommation: 0,
		carEmission: 0,
	});

	/**
	 * Handles changes to vehicle fields.
	 *
	 * @param {keyof Vehicle} field - The field being changed.
	 * @param {string | number} value - The new value for the field.
	 */
	const handleVehicleChange = (
		field: keyof Vehicle,
		value: string | number
	) => {
		const updatedVehicle = { ...vehicle, [field]: value };
		setVehicle(updatedVehicle);

		const error = vehicleValidation[field]?.(value);
		if (error) validateField('vehicles', [updatedVehicle]);

		setData((prev) => ({
			...prev,
			vehicles: [...(prev.vehicles || []), updatedVehicle],
		}));
	};

	return (
		<View style={styles.content}>
			<View style={styles.form}>
				<ThemedInput
					placeholder='Nom du véhicule'
					value={vehicle.carName}
					onChangeText={(value) => handleVehicleChange('carName', value)}
					hasError={!!errors.vehicles?.[0]?.carName}
					errorMessage={errors.vehicles?.[0]?.carName}
					label='Nom du véhicule'
				/>
				<ThemedInput
					placeholder='Consommation (L/100km)'
					value={vehicle.carConsommation.toString()}
					onChangeText={(value) =>
						handleVehicleChange('carConsommation', parseFloat(value) || 0)
					}
					keyboardType='numeric'
					hasError={!!errors.vehicles?.[0]?.carConsommation}
					errorMessage={errors.vehicles?.[0]?.carConsommation}
					label='Consommation'
				/>
				<ThemedInput
					placeholder='Émissions CO2 (g/km)'
					value={vehicle.carEmission.toString()}
					onChangeText={(value) =>
						handleVehicleChange('carEmission', parseFloat(value) || 0)
					}
					keyboardType='numeric'
					hasError={!!errors.vehicles?.[0]?.carEmission}
					errorMessage={errors.vehicles?.[0]?.carEmission}
					label='Émissions CO2'
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	content: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		gap: 30,
	},
	form: {
		gap: 20,
	},
});

export default CreateVehicle;
