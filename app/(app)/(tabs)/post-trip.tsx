import lr_cda from '@/assets/data/lr_cda_division.json';
import lr_districts from '@/assets/data/lr_districts.json';
import { ThemedText } from '@/components/texts';
import { StyleSheet, View } from 'react-native';
import { ReturnButton } from '@/components/buttons';
import { useForm } from 'react-hook-form';
import { PostTripType } from '@/types';
import { useState } from 'react';
import { globalStyles } from '@/styles';

export const PostTrip = () => {
	const data = lr_cda.map((field: any) => field.fields.nom_commune);
	data.push(...lr_districts.map((field: any) => field.fields.cq_nom));

	const initialState: PostTripType = {
		datetime: 0,
		description: undefined,
		points: [],
		seats: 0,
		vehicle: '',
	};

	const [registerQuery, setRegisterQuery] =
		useState<PostTripType>(initialState);

	const { handleSubmit, control } = useForm<PostTripType>({
		defaultValues: registerQuery,
	});

	const submit = (data: PostTripType) => {
		throw new Error('Not implemented');
	};

	return (
		<View style={globalStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header3'}
				style={globalStyles.title}
			>
				Creation d'un trajet
			</ThemedText>
			{/* Départ	*/}
			{/* Destination	*/}
			{/* Checkpoint */}
			{/*	Choix de la date et l'heure */}
			{/*	Choix du véhicle si l'utilisateur en possède plusieurs*/}
			{/*	Choix du nombre de places disponibles*/}
			{/*	Champ de description*/}
			{/*	Affiche de la modal de validation */}
		</View>
	);
};

export default PostTrip;

const style = StyleSheet.create({});
