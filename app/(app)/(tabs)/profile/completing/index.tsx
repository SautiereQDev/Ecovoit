import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { useProfile } from '@/context/ProfileProvider';
import { router } from 'expo-router';
import { notify } from 'react-native-notificated';

/**
 * Type définissant les champs manquants possibles.
 */
type MissingFields = 'lastName' | 'biographie' | 'vehicle';

/**
 * Composant principal de la page d'index.
 * Vérifie les champs manquants du profil et redirige l'utilisateur en conséquence.
 * @returns {JSX.Element | null} Le composant JSX à rendre.
 */

export const handleBack = (): void => router.push('/profile');

export function Index() {
	const { checkMissingFields } = useProfile();
	const missingFields = checkMissingFields();

	// Utilise useEffect pour vérifier les champs manquants après le rendu initial.
	useEffect(() => {
		if (missingFields.length > 0) {
			const field: MissingFields = missingFields[0] as MissingFields;
			const routes = {
				lastName: '/(app)/(tabs)/profile/completing/lastName',
				biographie: '/(app)/(tabs)/profile/completing/biographie',
				vehicle: '/(app)/(tabs)/profile/completing/vehicle',
			};

			if (routes[field]) {
				// Redirige vers la route appropriée en fonction du champ manquant.
				// @ts-ignore
				router.push(routes[field]);
			} else {
				// Affiche une notification d'erreur et redirige vers la page d'accueil en cas d'erreur.
				notify('error', {
					params: {
						title: 'Erreur',
						description: 'Une erreur est survenue, veuillez réessayer.',
					},
				});
				router.push('/');
			}
		}
	}, [missingFields]);

	// Si aucun champ n'est manquant, affiche un message de félicitations.
	if (missingFields.length === 0) {
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

	return null;
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
