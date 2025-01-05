import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { router } from 'expo-router';
import ReturnButton from '@/components/buttons/ReturnButton';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { ThemedText } from '@/components/texts';
import { registerStyles as styles } from '@/styles';
import { useRegisterContext } from '@/providers/RegisterProvider';
import { EVAPI } from '@ecovoit-api/mock-adapter';

export const RegisterPage4 = () => {
	const { registerQuery, setRegisterQuery } = useRegisterContext();

	const submit = (data: EVAPI.VehicleCreation) => {
		setRegisterQuery({ ...registerQuery, ...data });
		router.push('/register/pictureBio');
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
					handleSubmit={submit}
					buttonStyle={styles.buttonNext}
					buttonText={'Suivant'}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage4;
