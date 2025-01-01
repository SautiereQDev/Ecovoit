import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomButton } from '@/components/buttons';
import { ThemedInput } from '@/components/inputs';
import { ThemedText } from '@/components/texts/ThemedText';
import { router } from 'expo-router';
import ReturnButton from '@/components/buttons/ReturnButton';
import { registerStyles as styles } from '@/styles';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PostUserType } from '@/types';
import { useRegisterContext } from '@/providers/RegisterProvider';

const schema = z.object({
	firstName: z.string().min(1, 'Prénom est requis'),
	lastName: z.string().min(1, 'Nom est requis'),
});

const RegisterPage2 = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<PostUserType>({
		resolver: zodResolver(schema),
	});

	const { registerQuery, setRegisterQuery } = useRegisterContext();

	const submit = (data: PostUserType) => {
		setRegisterQuery({ ...registerQuery, ...data });
		console.log(registerQuery);
		router.push('/register/confirmation');
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

				<Controller
					control={control}
					name={'firstName'}
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedInput
							placeholder='Prénom'
							value={value}
							onChangeText={onChange}
							hasError={!!errors.firstName}
							errorMessage={errors.firstName?.message}
							label={'Prénom'}
							onBlur={onBlur}
						/>
					)}
				/>

				<Controller
					name={'lastName'}
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedInput
							placeholder='Nom'
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							hasError={!!errors.lastName}
							errorMessage={errors.lastName?.message}
							label={'Nom'}
						/>
					)}
				/>

				<CustomButton
					text='Suivant'
					textProps={{ color: 'background' }}
					backgroundColor={'primary'}
					onPress={handleSubmit(submit)}
					buttonStyle={styles.buttonNext}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage2;
