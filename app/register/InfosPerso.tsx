import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/texts/ThemedText';
import { router } from 'expo-router';
import { useRegister } from '@/context/RegisterProvider';
import { styles } from './index';
import ReturnButton from '@/components/buttons/ReturnButton';

const RegisterPage2 = () => {
	const { data, setData, errors, validatePage, validateField } = useRegister();

	const handleNext = () => {
		if (validatePage(2)) {
			router.push('/register/Confirmation');
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
					Informations personnelles
				</ThemedText>

				<ThemedInput
					placeholder='Prénom'
					value={data.firstName}
					onChangeText={(value) => {
						setData((prev) => ({ ...prev, firstName: value }));
						validateField('firstName', value);
					}}
					hasError={!!errors.firstName}
					errorMessage={errors.firstName}
					label={'Prénom'}
				/>

				<ThemedInput
					placeholder='Nom'
					value={data.lastName}
					onChangeText={(value) => {
						setData((prev) => ({ ...prev, lastName: value }));
						validateField('firstName', value);
					}}
					hasError={!!errors.lastName}
					errorMessage={errors.lastName}
					label={'Nom'}
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

export default RegisterPage2;
