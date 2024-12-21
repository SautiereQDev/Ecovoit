import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/texts/ThemedText';
import { router } from 'expo-router';
import { useRegister } from '@/context/RegisterProvider';
import { styles } from './index';
import ReturnButton from '@/components/buttons/ReturnButton';

const RegisterPage4 = () => {
	const { data, setData, errors, validatePage, validateField } = useRegister();

	const handleNext = () => {
		if (validatePage(4)) {
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
					Informations véhicule
				</ThemedText>

				<ThemedInput
					placeholder='Nom du véhicule'
					value={data.carName}
					onChangeText={(value) => {
						setData((prev) => ({ ...prev, carName: value }));
						validateField('carName', value);
					}}
					hasError={!!errors.carName}
					errorMessage={errors.carName}
					label={'Nom du véhicule'}
				/>

				<ThemedInput
					placeholder='Consommation (L/100km)'
					value={data.carConsommation?.toString()}
					onChangeText={(value) => {
						setData((prev) => ({ ...prev, carConsommation: Number(value) }));
						validateField('carConsommation', Number(value));
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
						setData((prev) => ({ ...prev, carEmission: Number(value) }));
						validateField('carEmission', Number(value));
					}}
					keyboardType='numeric'
					hasError={!!errors.carEmission}
					errorMessage={errors.carEmission}
					label={'Émissions CO2'}
				/>

				<CustomButton
					text='Suivant'
					textProps={{ color: 'background' }}
					backgroundColor={'primary'}
					onPress={handleNext}
					buttonStyle={styles.buttonNext}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage4;