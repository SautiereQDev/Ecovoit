import React, { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { CustomButton, ThemedText } from '@/components';
import { profileStyles } from '@/styles/profile';

export const handleBack = (): void => router.push('/profile');

/**
 * Composant principal de la page d'vehicles.
 * Vérifie les champs manquants du profil et redirige l'utilisateur en conséquence.
 * @returns {ReactNode} Le composant JSX à rendre.
 */
export function Index(): React.ReactNode {
	const { data } = useRegister();

	useEffect(() => {
		if (data.lastName === undefined) {
			router.push('/profile/completing/lastName');
		} else if (data.biographie === undefined) {
			router.push('/profile/completing/biographie');
		} else if (data.vehicles.length === 0) {
			router.push('/profile/completing/vehicle');
		} else if (
			data.profilePicture === null ||
			data.profilePicture === undefined
		) {
			router.push('/profile/completing/profilePicture');
		}
	}, [data]);

	// Si aucun champ n'est manquant, affiche un message de félicitations.
	return (
		<View style={profileStyles.content}>
			<ThemedText
				style={profileStyles.title}
				type={'header3'}
			>
				Completion du profil
			</ThemedText>
			<ThemedText
				style={profileStyles.paragraph}
				type={'header4'}
			>
				Votre profil est complet, félicitations !
			</ThemedText>
			<CustomButton
				text={"Retour à l'accueil"}
				onPress={() => {
					router.push('/profile'); //permet de reinitialiser la stack de navigation de l'onglet profile
					router.push('/');
				}}
				buttonStyle={profileStyles.buttonHome}
			/>
		</View>
	);
}

export default Index;
