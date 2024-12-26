import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { router } from 'expo-router';
import { Vehicle, useRegister } from '@/context/RegisterProvider';
import { styles } from './index';
import ReturnButton from '@/components/buttons/ReturnButton';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { ThemedText } from '@/components';

export const RegisterPage4 = () => {
	const { errors, data, setData, validateField, validatePage } = useRegister();

	const handleNext = (vehicle: Vehicle) => {
		if (validatePage(4)) {
			setData({ ...data, vehicles: [vehicle] });
			router.push('/register/pictureBio');
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ReturnButton />
				<ThemedText
					type={'header2'}
					style={styles.title}
				>
					Informations du véhicule
				</ThemedText>
				 {/*@ts-ignore */}
				<CreateVehicle
					errors={errors}
					validateField={validateField}
					handleSubmit={handleNext}
					buttonStyle={styles.buttonNext}
					buttonText={'Suivant'}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage4;
