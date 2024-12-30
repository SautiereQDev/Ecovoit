import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { router } from 'expo-router';
import { useRegister } from '@/src/context/RegisterProvider';
import { Vehicle } from '@/src/types';
import ReturnButton from '@/src/components/buttons/ReturnButton';
import CreateVehicle from '@/src/components/forms/CreateVehicle';
import { ThemedText } from '@/src/components';
import { notify } from 'react-native-notificated';
import { registerStyles as styles } from '@/src/styles';
import { validateField, validatePage } from '@/src/utils';

export const RegisterPage4 = () => {
	const { errors, updateField } = useRegister();

	const handleNext = (vehicle: Vehicle) => {
		if (validatePage(4)) {
			updateField('vehicles', [vehicle]);
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
