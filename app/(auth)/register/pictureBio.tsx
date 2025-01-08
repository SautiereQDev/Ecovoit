import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ReturnButton from '@/components/buttons/ReturnButton';
import { registerStyles as styles } from '@/styles';
import { ThemedInput } from '@/components/inputs';
import { ThemedText } from '@/components/texts';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterContext } from '@/providers/RegisterProvider';
import { router } from 'expo-router';
import { z } from 'zod';
import { useData } from '@/providers';
import { CustomButton } from '@/components/buttons';
import { EVAPI } from '@ecovoit-api/mock-adapter';

const schema = z.object({
	bio: z
		.string()
		.max(128, 'La biographie doit contenir moins de 128 caractères')
		.optional(),
});

export const RegisterPage5 = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<{ bio?: string }>({
		resolver: zodResolver(schema),
	});

	const { registerQuery, setRegisterQuery } = useRegisterContext();
	const { useAddUser, useAddVehicle } = useData();
	const addUser = useAddUser();
	const addVehicle = useAddVehicle();

	const submit = (data: { bio?: string }) => {
		setRegisterQuery({ ...registerQuery, ...data });
		console.log(registerQuery);

		addUser.mutate(
			{
				userData: {
					firstName: registerQuery.firstName,
					lastName: registerQuery.lastName,
					username: registerQuery.username,
					email: registerQuery.email,
					password: registerQuery.password,
					bio: registerQuery.bio,
				},
			},
			{
				onSuccess: (user: EVAPI.PublicUser) => {
					console.log('User added');
					if (registerQuery.label !== '') {
						addVehicle.mutate(
							{
								userId: user.id as unknown as string,
								vehicle: {
									label: registerQuery.label,
									consumption: registerQuery.consumption,
									emission: registerQuery.emission,
								},
							},
							{
								onSuccess: () => {
									console.log('Vehicle added');
									router.push('/');
								},
								onError: (error) => {
									console.error(error);
									router.push('/error');
								},
							}
						);
					}
				},
				onError: (error) => {
					console.error(error);
					router.push('/error');
				},
			}
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ReturnButton />
				<ThemedText
					type={'header2'}
					style={styles.title}
				>
					Complétez votre profil
				</ThemedText>
				<View>
					<ThemedText style={styles.optionalText}>
						Biographie (optionnel)
					</ThemedText>
					<Controller
						name={'bio'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<ThemedInput
								placeholder='B"ographie'
								value={value}
								onChangeText={onChange}
								hasError={!!errors.bio}
								errorMessage={errors.bio?.message}
								label={'Biographie'}
								multiline
								numberOfLines={4}
								style={styles.biographieInput}
							/>
						)}
					/>
				</View>
				<CustomButton
					text='Terminer'
					textProps={{ color: 'background' }}
					backgroundColor={'primary'}
					onPress={handleSubmit(submit)}
					buttonStyle={styles.buttons}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage5;
