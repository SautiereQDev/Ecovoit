import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import { router } from 'expo-router';

export const Checkpoints = () => {
	// TODO: Afficher une modal pour demander si il souhaite ajouter des checkpoints

	// TODO: Afficher la map avec le point de départ + point d'arrivé
	// TODO: Afficher une liste de LocationInput pour ajouter des checkpoints avec un boutton supprimer à  coté de l'input et enlever l'input si celui au dessus est vide
	// TODO: Update le trajet avec les nouveaux points de passage

	router.push('/post-trip/vehicle');

	return (
		<View>
			<ThemedText>Vehicle</ThemedText>
		</View>
	);
};

export default Checkpoints;
