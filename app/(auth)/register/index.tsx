import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router } from 'expo-router';
import { CustomButton } from '@/components/buttons';
import { ThemedInput } from '@/components/inputs';
import { ThemedText } from '@/components/texts';
import ReturnButton from '@/components/buttons/ReturnButton';
import { registerStyles as styles } from '@/styles';
import { useRegisterContext } from '@/providers/RegisterProvider';

// Define the validation schema using zod
const schema = z.object({
	username: z.string().min(1, "Nom d'utilisateur est requis"),
	email: z.string().email('Adresse mail invalide'),
	password: z
		.string()
		.min(6, 'Mot de passe doit contenir au moins 6 caractères'),
});

export const RegisterPage = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<{ username: string; email: string; password: string }>({
		resolver: zodResolver(schema),
	});

	const { registerQuery, setRegisterQuery } = useRegisterContext();

	const onSubmit = (data: {
		username: string;
		email: string;
		password: string;
	}) => {
		setRegisterQuery({ ...registerQuery, ...data });
		router.push('/register/infosPerso');
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

				<Controller
					control={control}
					name='username'
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedInput
							label="Nom d'utilisateur"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							hasError={!!errors.username}
							errorMessage={errors.username?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name='email'
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedInput
							label='Adresse mail'
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							hasError={!!errors.email}
							errorMessage={errors.email?.message}
							keyboardType='email-address'
						/>
					)}
				/>

				<Controller
					control={control}
					name='password'
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedInput
							label='Mot de passe'
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							hasError={!!errors.password}
							errorMessage={errors.password?.message}
							secureTextEntry
						/>
					)}
				/>

				<CustomButton
					text='Suivant'
					textProps={{ color: 'background' }}
					backgroundColor={'primary'}
					onPress={handleSubmit(onSubmit)}
					buttonStyle={styles.buttonNext}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage;
