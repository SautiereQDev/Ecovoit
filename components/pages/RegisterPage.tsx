import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, ThemedInput } from '@/components';
import React, { useState } from 'react';
import { ThemedText } from '@/components/texts/ThemedText';
import { Link, router } from 'expo-router';
import Colors from '@/constants/Colors';

interface formType {
	firstName: string;
	lastName: string | null;
	username: string;
	email: string;
	password: string;
	carName?: string;
	carConsommation?: number;
	carEmission?: number;
}

const RegisterPage = () => {
	const [formData, setFormData] = useState<formType>({
		username: '',
		email: '',
		firstName: '',
		lastName: null,
		password: '',
		carName: undefined,
		carConsommation: undefined,
		carEmission: undefined,
	});

	const [step, setStep] = useState<number>(1);

	const handleSubmit = () => {
		alert('Inscription réussie');
		router.navigate('/');
		// axios.post
	};

	function nextStep() {
		setStep(step + 1);
	}

	function previousStep() {
		setStep(step - 1);
	}

	function goHome() {
		router.navigate('/');
	}

	switch (step) {
		case 1:
			return (
				<SafeAreaView style={styles.container}>
					<View style={styles.content}>
						<Link
							style={[styles.buttonHome, styles.buttonPrevius]}
							href={'/'}
						>
							<ThemedText
								type={'accent'}
								style={styles.buttonHomeText}
							>
								Retour
							</ThemedText>
						</Link>
						<ThemedText
							type={'header2'}
							style={styles.title}
						>
							Inscription
						</ThemedText>
						<ThemedInput
							placeholder='Pseudo'
							onChangeText={(value) =>
								setFormData({ ...formData, username: value })
							}
						/>
						<ThemedInput
							placeholder='Email'
							onChangeText={(value) =>
								setFormData({ ...formData, email: value })
							}
							keyboardType={'email-address'}
						/>
						<ThemedInput
							placeholder='Mot de passe'
							onChangeText={(value) =>
								setFormData({ ...formData, password: value })
							}
							secureTextEntry={true}
						/>
						<CustomButton
							text='Suivant'
							textProps={{ color: 'background' }}
							backgroundColor={'primary'}
							onPress={nextStep}
							buttonStyle={styles.buttonNext}
						/>
					</View>
				</SafeAreaView>
			);
		case 2:
			return (
				<SafeAreaView style={styles.container}>
					<View style={styles.content}>
						<CustomButton
							text={'Retour'}
							textProps={{ color: 'background' }}
							backgroundColor={'secondary'}
							buttonStyle={styles.buttonPrevius}
							onPress={previousStep}
						/>
						<View style={styles.header}>
							<ThemedText
								type={'header3'}
								style={styles.title}
							>
								Informations personelles
							</ThemedText>
							<ThemedText
								type={'header6'}
								style={styles.paragraph}
							>
								Afin de vous identifiez en tant que conducteur veuillez entrer
								les informations de votre véhicule
							</ThemedText>
						</View>
						<View style={styles.formulaire}>
							<ThemedInput
								placeholder='Prénom'
								onChangeText={(value) =>
									setFormData({ ...formData, firstName: value })
								}
							/>
							<ThemedInput
								placeholder='Nom'
								onChangeText={(value) =>
									setFormData({ ...formData, lastName: value })
								}
							/>
							<CustomButton
								text="Finaliser l'inscription"
								textProps={{ color: 'background' }}
								backgroundColor={'primary'}
								onPress={nextStep}
								buttonStyle={styles.buttonNext}
							/>
						</View>
					</View>
				</SafeAreaView>
			);
		case 3:
			return (
				<SafeAreaView style={styles.container}>
					<View style={styles.confirmationPage}>
						<CustomButton
							text={'Retour'}
							textProps={{ color: 'background' }}
							backgroundColor={'secondary'}
							buttonStyle={styles.buttonPrevius}
							onPress={previousStep}
						/>
						<ThemedText
							type={'header3'}
							style={styles.confirmationPage}
						>
							Souhaitez vous enregistrer votre véhicule ?
						</ThemedText>
						<View style={styles.buttons}>
							<CustomButton
								text={'Oui'}
								backgroundColor={'acceptButton'}
								textProps={{ color: 'background' }}
								buttonStyle={styles.askButton}
								onPress={nextStep}
							/>
							<CustomButton
								text={'Non'}
								backgroundColor={'deniedButton'}
								textProps={{ color: 'background' }}
								buttonStyle={styles.askButton}
								onPress={goHome}
							/>
						</View>
					</View>
				</SafeAreaView>
			);
		case 4:
			return (
				<SafeAreaView style={styles.container}>
					<View style={styles.confirmationPage}>
						<CustomButton
							text={'Retour'}
							textProps={{ color: 'background' }}
							backgroundColor={'secondary'}
							buttonStyle={styles.buttonPrevius}
							onPress={previousStep}
						/>
						<View style={styles.header}>
							<ThemedText
								type={'header3'}
								style={styles.title}
							>
								Enregistrement du véhicule
							</ThemedText>
							<ThemedText
								type={'header6'}
								style={styles.paragraph}
							>
								Afin de vous identifiez en tant que conducteur veuillez entrer
								les informations de votre véhicule
							</ThemedText>
						</View>
						<View style={styles.formulaire}>
							<ThemedInput
								placeholder='Nom du véhicule'
								onChangeText={(value) =>
									setFormData({ ...formData, carName: value })
								}
							/>
							<ThemedInput
								placeholder='Consommation moyenne'
								onChangeText={(value) =>
									setFormData({ ...formData, carConsommation: Number(value) })
								}
								keyboardType={'numeric'}
							/>
							<ThemedInput
								placeholder='Emission de CO2'
								onChangeText={(value) =>
									setFormData({ ...formData, carEmission: Number(value) })
								}
								keyboardType={'numeric'}
							/>
							<CustomButton
								text='Enregistrer'
								textProps={{ color: 'background' }}
								backgroundColor={'primary'}
								onPress={handleSubmit}
								buttonStyle={styles.buttonNext}
							/>
						</View>
					</View>
				</SafeAreaView>
			);
		default:
			throw new Error('Invalid step');
	}
};

export default RegisterPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		width: '80%',
		gap: 25,
	},
	confirmationPage: {
		marginHorizontal: 'auto',
		marginTop: '10%',
		width: '80%',
		gap: 30,
	},
	header: {
		marginBottom: 15,
		display: 'flex',
		gap: 12,
	},
	paragraph: {
		textAlign: 'center',
	},
	title: {
		textAlign: 'center',
	},
	formulaire: {
		display: 'flex',
		gap: 20,
	},
	buttonNext: {
		marginLeft: 'auto',
		paddingHorizontal: '8%',
		paddingVertical: '2%',
	},
	buttonPrevius: {
		width: '35%',
		marginBottom: 50,
	},
	buttonHome: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 6,
		borderRadius: 10,
		backgroundColor: Colors.light.secondary,
	},

	buttonHomeText: {
		color: Colors.light.background,
		textAlign: 'center',
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		gap: 30,
		margin: 'auto',
	},
	askButton: {
		width: '40%',
	},
});
