import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { router } from 'expo-router';
import { useRegister } from '@/context';
import { Vehicle } from '@/types';
import ReturnButton from '@/components/buttons/ReturnButton';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { ThemedText } from '@/components';
import { notify } from 'react-native-notificated';
import { registerStyles as styles } from '@/styles';

export const RegisterPage4 = () => {
	const {
		errors,
		updateField: setData,
		validateField,
		validatePage,
	} = useRegister();

	const handleNext = (vehicle: Vehicle) => {
		if (validatePage(4)) {
			setData('vehicles', [vehicle]);
			router.push('/register/pictureBio');
		} else {
			notify('error', {
				params: {
					title: 'Erreur',
					description: 'Veuillez remplir tous les champs correctement',
				},
			});
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
