import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/texts/ThemedText';
import { Link, router } from 'expo-router';
import Colors from '@/constants/Colors';

/**
 * Interface representing the form data structure.
 */
interface formType {
	firstName: string;
	lastName?: string;
	username: string;
	email: string;
	password: string;
	carName?: string;
	carConsommation?: number;
	carEmission?: number;
	biographie: string;
}

/**
 * Type representing the error messages for form fields.
 */
type Error = { [key: string]: string };

/**
 * RegisterPage component handles the user registration process.
 * It includes multiple steps for entering user and vehicle information.
 */
const RegisterPage = () => {
	// State to manage form data
	const [formData, setFormData] = useState<formType>({
		username: '',
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		carName: '',
		carConsommation: undefined,
		carEmission: undefined,
		biographie: '',
	});

	// State to manage the current step of the registration process
	const [step, setStep] = useState(1);
	// State to manage form validation errors
	const [errors, setErrors] = useState<Error>({});
	// State to manage whether to show errors
	const [showErrors, setShowErrors] = useState(false);

	/**
	 * Validates a single form field.
	 * @param field - The name of the field to validate.
	 * @param value - The value of the field to validate.
	 */
	const validate = (field: string, value: string | number | undefined) => {
		const newErrors = { ...errors };
		if (!value) {
			newErrors[field] = `${field} is required`;
		} else {
			switch (field) {
				case 'username':
				case 'firstName':
				case 'lastName':
				case 'carName':
					if (value.length < 3 || value.length > 32) {
						newErrors[field] = `${field} must be between 3 and 32 characters`;
					} else {
						delete newErrors[field];
					}
					break;
				case 'email':
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					if (!emailRegex.test(value as string)) {
						newErrors.email = 'Invalid email';
					} else {
						delete newErrors.email;
					}
					break;
				case 'password':
					const passwordRegex =
						/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
					if (!passwordRegex.test(value as string)) {
						newErrors.password = 'Password must be between 8 and 32 characters';
					} else {
						delete newErrors.password;
					}
					break;
				case 'carConsommation':
				case 'carEmission':
					if (isNaN(Number(value))) {
						newErrors[field] = `${field} must be a number`;
					} else {
						delete newErrors[field];
					}
					break;
				case 'biographie':
					if (value.length > 128) {
						newErrors.biographie = 'Biography must be less than 128 characters';
					} else {
						delete newErrors.biographie;
					}
					break;
			}
		}
		setErrors(newErrors);
	};

	/**
	 * Validates all form fields.
	 * @returns {boolean} - Returns true if all fields are valid, otherwise false.
	 */
	const validateAll = (): boolean => {
		const newErrors: Error = { ...errors };
		[
			'username',
			'email',
			'password',
			'firstName',
			'lastName',
			'biographie',
			'carName',
			'carConsommation',
			'carEmission',
		].forEach((field) => {
			if (!formData[field]) {
				newErrors[field] = `${field} is required`;
			} else {
				validate(field, formData[field]);
			}
		});
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	/**
	 * Advances to the next step of the registration process.
	 */
	const nextStep = () => {
		setShowErrors(true);
		if (validateAll()) setStep(step + 1);
	};

	/**
	 * Handles the form submission.
	 */
	const handleSubmit = () => {
		alert('Registration successful');
		router.navigate('/');
	};

	/**
	 * Goes back to the previous step of the registration process.
	 */
	const previousStep = () => setStep(step - 1);

	/**
	 * Navigates to the home page.
	 */
	const goHome = () => router.navigate('/');

	/**
	 * Renders the current step of the registration process.
	 * @returns {JSX.Element} - The JSX element for the current step.
	 */
	const renderStep = () => {
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
										setFormData({
											...formData,
											carConsommation: Number(value),
										});
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
			default:
				throw new Error('Invalid step');
		}
	};

	return renderStep();
};

export default RegisterPage;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
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
	confirmationPageHeader: { textAlign: 'center', marginTop: '30%' },
	header: { marginBottom: 5, display: 'flex', gap: 12 },
	paragraph: { textAlign: 'center' },
	title: { textAlign: 'center' },
	formulaire: { display: 'flex', gap: 20 },
	buttonNext: {
		marginLeft: 'auto',
		paddingHorizontal: '8%',
		paddingVertical: '3%',
	},
	buttonPrevius: { width: '35%', marginBottom: 20 },
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
