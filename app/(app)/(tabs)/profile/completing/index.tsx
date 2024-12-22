import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { useRegister } from '@/context/RegisterProvider';

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
		}
	}, [data]);

	// Si aucun champ n'est manquant, affiche un message de félicitations.
	return (
		<View style={globalStyle.container}>
			<Text style={globalStyle.title}>Complétez votre profil</Text>
			<Text style={globalStyle.paragraph}>
				Votre profil est complet, félicitations !
			</Text>
			<View style={globalStyle.buttons}>
				<View style={globalStyle.askButton}>
					<Text style={globalStyle.buttonHomeText}>Retour à l'accueil</Text>
				</View>
			</View>
		</View>
	);
}

export default Index;

/**
 * Styles pour le composant Index.
 */
export const globalStyle = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	content: {
		marginHorizontal: 'auto',
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
		paddingVertical: 6,
		borderRadius: 10,
		backgroundColor: Colors.light.secondary,
	},
	buttonHomeText: { color: Colors.light.background, textAlign: 'center' },
	buttons: { display: 'flex', flexDirection: 'row', gap: 30, margin: 'auto' },
	askButton: { width: '40%' },
});
