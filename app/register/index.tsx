import { SafeAreaView, StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import { useRegister } from '@/context/RegisterProvider';
import { router } from 'expo-router';
import { CustomButton, ThemedInput, ThemedText } from '@/components';
import React from 'react';
import ReturnButton from '@/components/buttons/ReturnButton';

export const Index = () => {
	const { data, setData, errors, validatePage, validateField } = useRegister();

	const handleNext = () => {
		if (validatePage(1)) {
			router.push('/register/page2');
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
					Inscription
				</ThemedText>

				<ThemedInput
					placeholder="Nom d'utilisateur"
					value={data.username}
					onChangeText={(value) => {
						setData((prev) => ({ ...prev, username: value }));
						validateField('username', value);
					}}
					hasError={!!errors.username}
					errorMessage={errors.username}
					label={"Nom d'utilisateur"}
				/>

				<ThemedInput
					placeholder='Adresse mail'
					value={data.email}
					onChangeText={(value) => {
						setData((prev) => ({ ...prev, email: value }));
						validateField('email', value);
					}}
					hasError={!!errors.email}
					errorMessage={errors.email}
					label={'Adresse mail'}
					keyboardType={'email-address'}
				/>

				<ThemedInput
					placeholder='Mot de passe'
					value={data.password}
					onChangeText={(value) => {
						setData((prev) => ({ ...prev, password: value }));
						validateField('password', value);
					}}
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

export default Index;

export const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	content: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		width: '80%',
		gap: 30,
	},
	confirmationPage: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		width: '80%',
		gap: 30,
	},
	confirmationPageHeader: { textAlign: 'center', marginTop: '30%' },
	header: { marginBottom: 5, display: 'flex', gap: 12 },
	paragraph: { textAlign: 'center' },
	title: { textAlign: 'center' },
	formulaire: { display: 'flex', gap: 20 },
	buttonNext: {
		marginLeft: 'auto',
		paddingHorizontal: '8%',
		paddingVertical: '2.5%',
	},
	buttonHome: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 6,
		borderRadius: 10,
		backgroundColor: Colors.light.secondary,
	},
	buttonHomeText: { color: Colors.light.background, textAlign: 'center' },
	buttons: { display: 'flex', flexDirection: 'row', gap: 30, margin: 'auto' },
	askButton: { width: '40%' },
});
