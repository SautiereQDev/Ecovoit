import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/texts/ThemedText';
import { Link, router } from 'expo-router';
import Colors from '@/constants/Colors';

interface formType {
	firstName: string;
	lastName: string | undefined;
	username: string;
	email: string;
	password: string;
	carName?: string;
	carConsommation?: number;
	carEmission?: number;
	biographie: string;
}

type Error = {
	[key: string]: string;
};

const RegisterPage = () => {
	const [formData, setFormData] = useState<formType>({
		username: '',
		email: '',
		firstName: '',
		lastName: undefined,
		password: '',
		carName: undefined,
		carConsommation: undefined,
		carEmission: undefined,
		biographie: '',
	});

	const [step, setStep] = useState<number>(1);
	const [errors, setErrors] = useState<Error>({});
	const [showErrors, setShowErrors] = useState<boolean>(false);

	const validate = (
		field: string,
		value: string | number | null | undefined
	) => {
		const newErrors = { ...errors };
		if (value === undefined || value === null || value === '') {
			newErrors[field] = `${field} is required`;
		} else {
			switch (field) {
				case 'username':
					if ((value as string).length < 3 || (value as string).length > 32) {
						newErrors.username =
							'Le username doit contenir entre 3 et 32 caractères';
					} else {
						delete newErrors.username;
					}
					break;
				case 'email':
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					if (!emailRegex.test(value as string)) {
						newErrors.email = 'Email invalide';
					} else {
						delete newErrors.email;
					}
					break;
				case 'password':
					const passwordRegex =
						/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
					if (
						(value as string).length < 8 ||
						(value as string).length > 32 ||
						!passwordRegex.test(value as string)
					) {
						newErrors.password =
							'Le mot de passe doit contenir entre 8 et 32 caractères';
					} else {
						delete newErrors.password;
					}
					break;
				case 'firstName':
					if ((value as string).length < 3 || (value as string).length > 32) {
						newErrors.firstName =
							'Le prénom doit contenir entre 3 et 32 caractères';
					} else {
						delete newErrors.firstName;
					}
					break;
				case 'lastName':
					if ((value as string).length < 3 || (value as string).length > 32) {
						newErrors.lastName =
							'Le nom doit contenir entre 3 et 32 caractères';
					} else {
						delete newErrors.lastName;
					}
					break;
				case 'carName':
					if ((value as string).length < 3 || (value as string).length > 32) {
						newErrors.carName =
							'Le nom du véhicule doit contenir entre 3 et 32 caractères';
					} else {
						delete newErrors.carName;
					}
					break;
				case 'carConsommation':
					if (value === undefined || value === null || value === '') {
						newErrors.carConsommation = 'Consommation is required';
					} else if (isNaN(Number(value))) {
						newErrors.carConsommation = 'Consommation must be a number';
					} else {
						delete newErrors.carConsommation;
					}
					break;
				case 'carEmission':
					if (value === undefined || value === null || value === '') {
						newErrors.carEmission = 'Emission is required';
					} else if (isNaN(Number(value))) {
						newErrors.carEmission = 'Emission must be a number';
					} else {
						delete newErrors.carEmission;
					}
					break;
				case 'biographie':
					if ((value as string).length > 128) {
						newErrors.biographie =
							'La biographie doit contenir moins de 128 caractères';
					} else {
						delete newErrors.biographie;
					}
					break;
				default:
					break;
			}
		}
		setErrors(newErrors);
	};

	const validateAll = (): boolean => {
		const newErrors: Error = { ...errors };
		switch (step) {
			case 1:
				// Vérifiez explicitement si les champs sont vides
				if (!formData.username) {
					newErrors.username = 'Username is required';
				} else {
					validate('username', formData.username);
				}

				if (!formData.email) {
					newErrors.email = 'Email is required';
				} else {
					validate('email', formData.email);
				}

				if (!formData.password) {
					newErrors.password = 'Password is required';
				} else {
					validate('password', formData.password);
				}
				break;
			case 2:
				if (!formData.firstName) {
					newErrors.firstName = 'Prénom est requis';
				} else {
					validate('firstName', formData.firstName);
				}
				if (!formData.lastName) {
					newErrors.lastName = 'Nom est requis';
				} else {
					validate('lastName', formData.lastName);
				}
				if (!formData.biographie) {
					newErrors.biographie = 'Biographie est requise';
				} else {
					validate('biographie', formData.biographie);
				}
				break;
			case 4:
				if (!formData.carName) {
					newErrors.carName = 'Nom du véhicule est requis';
				} else {
					validate('carName', formData.carName);
				}
				if (!formData.carConsommation) {
					newErrors.carConsommation = 'Consommation est requise';
				} else {
					validate('carConsommation', formData.carConsommation);
				}
				if (!formData.carEmission) {
					newErrors.carEmission = 'Emission est requise';
				} else {
					validate('carEmission', formData.carEmission);
				}
				break;
			default:
				break;
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const nextStep = () => {
		setShowErrors(true);
		console.log(formData);
		if (validateAll()) {
			setStep(step + 1);
		}
	};

	const handleSubmit = () => {
		alert('Inscription réussie');
		router.navigate('/');
	};

	const previousStep = () => setStep(step - 1);
	const goHome = () => router.navigate('/');

	const renderStep1 = () => (
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
					onChangeText={(value) => {
						setFormData({ ...formData, username: value });
						if (showErrors) validate('username', value);
					}}
					hasError={!!errors.username}
					errorMessage={errors.username}
					label={'Pseudo'}
					value={formData.username}
				/>
				<ThemedInput
					placeholder='Email'
					onChangeText={(value) => {
						setFormData({ ...formData, email: value });
						if (showErrors) validate('email', value);
					}}
					keyboardType={'email-address'}
					hasError={!!errors.email}
					errorMessage={errors.email}
					label={'Email'}
					value={formData.email}
				/>
				<ThemedInput
					placeholder='Mot de passe'
					onChangeText={(value) => {
						setFormData({ ...formData, password: value });
						if (showErrors) validate('password', value);
					}}
					secureTextEntry={true}
					hasError={!!errors.password}
					errorMessage={errors.password}
					label={'Mot de passe'}
					value={formData.password}
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

	const renderStep2 = () => (
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
						Afin de vous identifiez en tant que conducteur veuillez entrer les
						informations de votre véhicule
					</ThemedText>
				</View>
				<View style={styles.formulaire}>
					<ThemedInput
						placeholder='Prénom'
						onChangeText={(value) => {
							setFormData({ ...formData, firstName: value });
							if (showErrors) validate('firstName', value);
						}}
						hasError={!!errors.firstName}
						errorMessage={errors.firstName}
						label={'Prénom'}
						value={formData.firstName}
					/>
					<ThemedInput
						placeholder='Nom'
						onChangeText={(value) => {
							setFormData({ ...formData, lastName: value });
							if (showErrors) validate('lastName', value);
						}}
						hasError={!!errors.lastName}
						errorMessage={errors.lastName}
						label={'Nom'}
						value={formData.lastName}
					/>
					<ThemedInput
						placeholder='Biographie de 128 caractères maximum'
						multiline={true}
						onChangeText={(value) => {
							setFormData({ ...formData, biographie: value });
							if (showErrors) validate('biographie', value);
						}}
						hasError={!!errors.biographie}
						errorMessage={errors.biographie}
						theme={'TextArea'}
						label={'Biographie (optionelle)'}
						value={formData.biographie}
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

	const renderStep3 = () => (
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
					type={'header5'}
					style={styles.confirmationPageHeader}
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

	const renderStep4 = () => (
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
						Afin de vous identifiez en tant que conducteur veuillez entrer les
						informations de votre véhicule
					</ThemedText>
				</View>
				<View style={styles.formulaire}>
					<ThemedInput
						placeholder='Nom du véhicule'
						onChangeText={(value) => {
							setFormData({ ...formData, carName: value });
							if (showErrors) validate('carName', value);
						}}
						hasError={!!errors.carName}
						errorMessage={errors.carName}
						label={'Nom du véhicule'}
						value={formData.carName}
					/>
					<ThemedInput
						placeholder='en L/100km'
						onChangeText={(value) => {
							setFormData({ ...formData, carConsommation: Number(value) });
							if (showErrors) validate('carConsommation', value);
						}}
						keyboardType={'numeric'}
						label={'Consommation moyenne'}
						value={formData.carConsommation?.toString()}
					/>
					<ThemedInput
						placeholder='en g/km'
						onChangeText={(value) => {
							setFormData({ ...formData, carEmission: Number(value) });
							if (showErrors) validate('carEmission', value);
						}}
						keyboardType={'numeric'}
						label={'Emission de CO2'}
						value={formData.carEmission?.toString()}
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

	switch (step) {
		case 1:
			return renderStep1();
		case 2:
			return renderStep2();
		case 3:
			return renderStep3();
		case 4:
			return renderStep4();
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
	confirmationPageHeader: {
		textAlign: 'center',
		marginTop: '30%',
	},
	header: {
		marginBottom: 5,
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
		paddingVertical: '3%',
	},
	buttonPrevius: {
		width: '35%',
		marginBottom: 20,
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
