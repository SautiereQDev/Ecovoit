import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import ReturnButton from '@/components/buttons/ReturnButton';
import { ThemedInput, ThemedText } from '@/components';
import { FormType } from '@/context/RegisterProvider';

interface CreateVehicleProps {
	errors: { [key in keyof FormType]?: string };
	style?: ViewStyle;
	data: FormType;
	setData: React.Dispatch<React.SetStateAction<FormType>>;
	handleNext: () => void;
	validateField: (
		field: keyof FormType,
		value: string | number | undefined
	) => void;
}

const CreateVehicle = ({
	errors,
	data,
	setData,
	handleNext,
	validateField,
}: Readonly<CreateVehicleProps>) => {
	return (
		<View style={styles.content}>
			<ReturnButton />
			<ThemedText
				type={'header2'}
				style={styles.title}
			>
				Informations véhicule
			</ThemedText>

			<ThemedInput
				placeholder='Nom du véhicule'
				value={data.carName}
				onChangeText={(value) => {
					validateField('carName', value);
					setData((prev) => ({ ...prev, carName: value }));
				}}
				hasError={!!errors.carName}
				errorMessage={errors.carName}
				label={'Nom du véhicule'}
			/>

			<ThemedInput
				placeholder='Consommation (L/100km)'
				value={data.carConsommation?.toString()}
				onChangeText={(value) => {
					validateField('carConsommation', Number(value));
					setData((prev) => ({ ...prev, carConsommation: Number(value) }));
				}}
				keyboardType='numeric'
				hasError={!!errors.carConsommation}
				errorMessage={errors.carConsommation}
				label={'Consommation'}
			/>

			<ThemedInput
				placeholder='Émissions CO2 (g/km)'
				value={data.carEmission?.toString()}
				onChangeText={(value) => {
					validateField('carEmission', Number(value));
					setData((prev) => ({ ...prev, carEmission: Number(value) }));
				}}
				keyboardType='numeric'
				hasError={!!errors.carEmission}
				errorMessage={errors.carEmission}
				label={'Émissions CO2'}
			/>
		</View>
	);
};
export default CreateVehicle;
const styles = StyleSheet.create({
	content: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		width: '80%',
		gap: 30,
	},
	title: { textAlign: 'center' },
	buttonNext: {
		marginLeft: 'auto',
		paddingHorizontal: '8%',
		paddingVertical: '2.5%',
	},
});
