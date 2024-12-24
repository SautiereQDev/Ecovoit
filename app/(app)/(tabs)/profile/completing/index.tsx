import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { useRegister } from '@/context/RegisterProvider';
import { CustomButton, ThemedText } from '@/components';

export const handleBack = (): void => router.push('/profile');

/**
 * Composant principal de la page d'index.
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
		<View style={globalStyle.content}>
			<ThemedText
				style={globalStyle.title}
				type={'header3'}
			>
				Completion du profil
			</ThemedText>
			<ThemedText
				style={globalStyle.paragraph}
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
				buttonStyle={globalStyle.buttonHome}
			/>
		</View>
	);
}

export default Index;

/**
 * Styles pour le composant Index.
 */
export const globalStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	content: {
		margin: 'auto',
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
	buttonNext: {
		marginLeft: 'auto',
		width: '35%',
	},
	buttonHome: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 7,
		borderRadius: 10,
		backgroundColor: Colors.light.secondary,
		width: '60%',
		marginHorizontal: 'auto',
	},
	buttonHomeText: { color: Colors.light.background, textAlign: 'center' },
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		marginLeft: 'auto',
	},
});
