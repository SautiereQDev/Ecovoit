import React from 'react';
import { SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useRegister } from '@/context/RegisterProvider';
import { styles } from './index';
import ReturnButton from '@/components/buttons/ReturnButton';
import CreateVehicle from '@/components/forms/CreateVehicle';
import { CustomButton } from '@/components';

export const RegisterPage4 = () => {
	const { errors, data, setData, validateField, validatePage } = useRegister();

	const handleNext = () => {
		if (validatePage(4)) {
			router.push('/register/pictureBio');
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ReturnButton />
			<CreateVehicle
				errors={errors}
				data={data}
				setData={setData}
				validateField={validateField}
			/>
			<CustomButton
				text={'Suivant'}
				textProps={{ color: 'background' }}
				backgroundColor={'primary'}
				onPress={handleNext}
				buttonStyle={styles.buttonNext}
			/>
		</SafeAreaView>
	);
};

export default RegisterPage4;
