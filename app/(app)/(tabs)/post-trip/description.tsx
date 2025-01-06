import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/texts';
import { ThemedInput } from '@/components/inputs';
import { CustomButton } from '@/components/buttons';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import { globalStyles } from '@/styles';
import { useData, usePostTrip } from '@/providers';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useNotifications } from 'react-native-notificated';

const schema = z.object({
	description: z.string().min(5).max(255),
});

export const Description = () => {
	// TODO: Afficher une modal pour demander si il souhaite ajouter une description

	const [showConfirmationModal, setShowConfirmationModal] = useState(true);

	const { postTripQuery, setPostTripQuery } = usePostTrip();
	const { useAddTrip } = useData();
	const addTrip = useAddTrip();

	const { notify } = useNotifications();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<{ description: string }>({
		resolver: zodResolver(schema),
		defaultValues: {
			description: '',
		},
	});

	const handleDeny = () => {
		// on envoie les donnes à l'api sans la description
		addTrip.mutate(
			{ tripData: postTripQuery },
			{
				onSuccess: () => {
					router.push('/');
				},
				onError: (error) => {
					notify('error', {
						params: {
							title: 'Une erreur est survenue',
							description: error?.toString(),
						},
					});
				},
			}
		);
	};

	const submit = (data: { description: string }) => {
		setPostTripQuery({
			...postTripQuery,
			description: data.description,
		});
		addTrip.mutate(
			{ tripData: postTripQuery },
			{
				onSuccess: () => {
					notify('success', {
						params: {
							title: 'Votre trajet a bien été ajouté',
							description:
								'Vous pouvez désormais le retrouver dans la liste de vos trajets',
						},
					});
					router.push('/');
				},
				onError: (error) => {
					notify('error', {
						params: {
							title: 'Une erreur est survenue',
							description: error?.toString(),
						},
					});
				},
			}
		);
	};

	return (
		<View style={globalStyles.container}>
			<ThemedText
				type={'header3'}
				style={globalStyles.title}
			>
				Description
			</ThemedText>
			<View style={[globalStyles.form, { gap: 20 }]}>
				{/* TODO: Arriver à faire passer l'input sur plusieurs lignes*/}
				<Controller
					name='description'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedInput
							placeholder={"Ajoute d'une description"}
							multiline
							numberOfLines={3}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							hasError={!!errors.description}
							errorMessage={errors.description?.message}
						/>
					)}
				/>
				<CustomButton
					text={'Ajouter'}
					textProps={{ color: 'background' }}
					buttonStyle={styles.button}
					onPress={handleSubmit(submit)}
				/>
			</View>

			<ConfirmationModal
				visible={showConfirmationModal}
				onClose={() => setShowConfirmationModal(false)}
				title={'Ajouter une description'}
				message={'Souhaitez-vous ajouter une description ?'}
				onDeny={handleDeny}
				onConfirm={() => setShowConfirmationModal(false)}
			/>
		</View>
	);
};

export default Description;

const styles = StyleSheet.create({
	button: {
		width: '80%',
		marginHorizontal: 'auto',
	},
});
