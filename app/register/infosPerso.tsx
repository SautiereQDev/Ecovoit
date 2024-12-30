import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/texts/ThemedText';
import { router } from 'expo-router';
import ReturnButton from '@/components/buttons/ReturnButton';
import { notify } from 'react-native-notificated';
import { registerStyles as styles } from '@/styles';
import { validateField, validatePage } from '@/utils';

const RegisterPage2 = () => {
	const { form, updateField, errors } = useRegister();

	const handleNext = () => {
		if (validatePage(2)) {
			router.push('/register/confirmation');
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
					Informations personnelles
				</ThemedText>

				<ThemedInput
					placeholder='Prénom'
					value={form.firstName}
					onChangeText={(value) => {
						updateField('firstName', value);
						validateField('firstName', value);
					}}
					hasError={!!errors.firstName}
					errorMessage={errors.firstName}
					label={'Prénom'}
				/>

				<ThemedInput
					placeholder='Nom'
					value={form.lastName}
					onChangeText={(value) => {
						updateField('lastName', value);
						validateField('lastName', value);
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
