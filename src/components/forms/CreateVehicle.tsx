import { StyleSheet, View } from 'react-native';
import { CustomButton } from '@/components/buttons';
import React, { ReactNode } from 'react';
import { Vehicle } from '@/types';
import { ThemedInput } from '@/components/inputs';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateVehicleProps = {
	handleSubmit: (vehicle: Vehicle) => void;
	buttonStyle: any;
	buttonText?: string;
};

const schema = z.object({
	label: z
		.string()
		.min(2, 'Le nom du véhicule doit contenir au moins 2 caractères'),
	consumption: z
		.number()
		.min(0, 'La consommation doit être entre 0 et 50 L/100km'),
	emission: z.number().min(0, 'Les émissions doivent être entre 0 et 500 g/km'),
});

export const CreateVehicle = ({
	handleSubmit: submit,
	buttonStyle,
	buttonText = 'Enregistrer',
}: CreateVehicleProps): ReactNode => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Vehicle>({
		resolver: zodResolver(schema),
	});

	return (
		<View style={styles.content}>
			<View style={styles.form}>
				<Controller
					name={'label'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemedInput
							placeholder='Nom du véhicule'
							value={value}
							onChangeText={onChange}
							label='Nom du véhicule'
							hasError={!!errors.label}
							errorMessage={errors.label?.message}
						/>
					)}
				/>
				<Controller
					name={'consumption'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemedInput
							placeholder='Consommation (L/100km)'
							value={value?.toString()}
							onChangeText={(text) => onChange(parseFloat(text))}
							keyboardType='numeric'
							label='Consommation'
							hasError={!!errors.consumption}
							errorMessage={errors.consumption?.message}
						/>
					)}
				/>
				<Controller
					name={'emission'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<ThemedInput
							placeholder='Émissions CO2 (g/km)'
							value={value?.toString()}
							onChangeText={(text) => onChange(parseFloat(text))}
							keyboardType='numeric'
							label='Émissions CO2'
							hasError={!!errors.emission}
							errorMessage={errors.emission?.message}
						/>
					)}
				/>
			</View>
			<CustomButton
				text={buttonText}
				onPress={handleSubmit(submit)}
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
