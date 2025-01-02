import lr_cda from '@/assets/data/lr_cda_division.json';
import lr_districts from '@/assets/data/lr_districts.json';
import { ThemedText } from '@/components/texts';
import { View } from 'react-native';
import { useRegisterContext } from '@/providers';

export const PostTrip = () => {
	const data = lr_cda.map((field: any) => field.fields.nom_commune);
	data.push(...lr_districts.map((field: any) => field.fields.cq_nom));

	const { registerQuery, setRegisterQuery } = useRegisterContext();

	return (
		<View>
			<ThemedText>Creation d'un trajet</ThemedText>
			{/* Départ	*/}
			{/* Destination	*/}
			{/*	Choix de la date et l'heure */}
			{/*	Choix du véhicle si l'utilisateur en possède plusieurs*/}
			{/*	Choix du nombre de places disponibles*/}
			{/*	Champ de description*/}
			{/*	Affiche de la modal de validation */}
		</View>
	);
};
