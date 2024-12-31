import { SafeAreaView, View } from 'react-native';
import { router } from 'expo-router';
import { CustomButton } from '@/components/buttons';
import { ThemedInput } from '@/components/inputs';
import { ThemedText } from '@/components/texts';
import React from 'react';
import ReturnButton from '@/components/buttons/ReturnButton';
import { notify } from 'react-native-notificated';
import { registerStyles as styles } from '@/styles';
import { useRegister } from '@/providers';

export const RegisterPage = () => {
	const { form, updateField, errors, validatePage } = useRegister();

	const handleNext = () => {
		if (validatePage(1)) {
			router.push('/register/infosPerso');
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
					type='header2'
					style={styles.title}
				>
					Inscription
				</ThemedText>

				<ThemedInput
					label="Nom d'utilisateur"
					value={form.username}
					onChangeText={(value) => updateField('username', value)}
					hasError={!!errors.username}
					errorMessage={errors.username}
				/>

				<ThemedInput
					placeholder='Adresse mail'
					value={form.email}
					onChangeText={(value) => updateField('email', value)}
					hasError={!!errors.email}
					errorMessage={errors.email}
					label={'Adresse mail'}
					keyboardType={'email-address'}
				/>

				<ThemedInput
					placeholder='Mot de passe'
					value={form.password}
					onChangeText={(value) => updateField('password', value)}
					hasError={!!errors.password}
					errorMessage={errors.password}
					label={'Mot de passe'}
					secureTextEntry
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

export default RegisterPage;
