import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemedInput } from '@/components/inputs';
import { CustomButton } from '@/components/buttons';
import { globalStyles } from '@/styles';
import { ThemedText } from '@/components/texts';
import { useSession } from '@/providers';

const signInSchema = z.object({
	username: z.string().min(3, {
		message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
	}),
	password: z
		.string()
		.min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function Signing() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInSchema),
	});

	const { signIn } = useSession();

	const onSubmit = (data: SignInForm) => {
		console.log(data);
		signIn(data.username, data.password);
	};

	return (
		<View style={globalStyles.container}>
			<ThemedText
				type={'header3'}
				style={globalStyles.title}
			>
				Connexion
			</ThemedText>
			<View style={globalStyles.form}>
				<Controller
					control={control}
					name='username'
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={styles.inputContainer}>
							<ThemedInput
								placeholder='Nom d’utilisateur'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								hasError={!!errors.username}
								errorMessage={errors.username?.message}
							/>
						</View>
					)}
				/>
				<Controller
					control={control}
					name='password'
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={styles.inputContainer}>
							<ThemedInput
								placeholder='Mot de passe'
								secureTextEntry
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								hasError={!!errors.password}
								errorMessage={errors.password?.message}
							/>
						</View>
					)}
				/>
				<CustomButton
					text='Connexion'
					onPress={handleSubmit(onSubmit)}
					textProps={{ color: 'background' }}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 16,
	},
	header: {
		fontSize: 24,
		marginBottom: 24,
		textAlign: 'center',
	},
	inputContainer: {
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 8,
		borderRadius: 4,
	},
	error: {
		color: 'red',
		marginTop: 4,
	},
});
