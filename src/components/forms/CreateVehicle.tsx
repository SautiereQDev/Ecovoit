import { StyleSheet, View } from 'react-native';
import { CustomButton, ThemedInput } from '@/src/components';
import React, { ReactNode, useState } from 'react';
import { CreateVehicleProps } from '@/src/context/RegisterProvider';
import { Vehicle } from '@/src/types';

/**
 * Validation rules for vehicle fields.
 */
const vehicleValidation = {
	label: (value: string): string | null =>
		value.length >= 2
			? null
			: 'Le nom du véhicule doit contenir au moins 2 caractères',
	consumption: (value: number): string | null =>
		value > 0 && value < 50
			? null
			: 'La consommation doit être entre 0 et 50 L/100km',
	emission: (value: number): string | null =>
		value > 0 && value < 500
			? null
			: 'Les émissions doivent être entre 0 et 500 g/km',
};

/**
 * Component for creating a vehicle.
 *
 * @param {CreateVehicleProps & { handleSubmit: (vehicle: Vehicle) => void }} props - The props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const CreateVehicle = ({
	errors,
	validateField,
	handleSubmit,
	buttonStyle,
	buttonText = 'Enregistrer',
	initialData,
}: CreateVehicleProps): ReactNode => {
	const [vehicle, setVehicle] = useState<Vehicle>({
		label: '',
		consumption: 0,
		emission: 0,
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

		// @ts-ignore
		const error = vehicleValidation[field]?.(value);
		if (error) validateField('vehicles', [updatedVehicle]);
	};

	return (
		<View style={styles.content}>
			<View style={styles.form}>
				<ThemedInput
					placeholder='Nom du véhicule'
					value={vehicle.label ?? initialData?.label}
					onChangeText={(value) => handleVehicleChange('label', value)}
					hasError={!!errors.vehicles?.[0]?.carName}
					errorMessage={errors.vehicles?.[0]?.carName}
					label='Nom du véhicule'
				/>
				<ThemedInput
					placeholder='Consommation (L/100km)'
					value={vehicle.consumption.toString() ?? initialData?.consumption}
					onChangeText={(value) =>
						handleVehicleChange('consumption', parseFloat(value) || 0)
					}
					keyboardType='numeric'
					hasError={!!errors.vehicles?.[0]?.carConsommation}
					errorMessage={errors.vehicles?.[0]?.carConsommation}
					label='Consommation'
				/>
				<ThemedInput
					placeholder='Émissions CO2 (g/km)'
					value={vehicle.emission.toString() ?? initialData?.emission}
					onChangeText={(value) =>
						handleVehicleChange('emission', parseFloat(value) || 0)
					}
					keyboardType='numeric'
					hasError={!!errors.vehicles?.[0]?.carEmission}
					errorMessage={errors.vehicles?.[0]?.carEmission}
					label='Émissions CO2'
				/>
			</View>
			<CustomButton
				text={buttonText}
				onPress={() => handleSubmit(vehicle)}
				buttonStyle={buttonStyle}
			/>
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
