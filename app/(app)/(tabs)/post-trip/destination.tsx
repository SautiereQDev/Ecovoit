import { router } from 'expo-router';
import PostTripLayout from '@/components/layouts/PostTripLayout';
// import SearchBar from '@/components/SearchBar';
import { useTripCreation } from '@/providers/TripCreationProvider';

import lr_cda from '@/assets/data/lr_cda_division.json';
import lr_districts from '@/assets/data/lr_districts.json';

export default function Destination() {
	const { setDestination } = useTripCreation(); // TODO

	const data = lr_cda.map((field: any) => field.fields.nom_commune);
	data.push(...lr_districts.map((field: any) => field.fields.cq_nom));

	return (
		<PostTripLayout
			title='Où allez-vous ?'
			iconTopLeft='arrow-back-sharp'
			iconTopRight='close-sharp'
			onPressTopLeft={() => {
				router.back();
			}}
			onPressTopRight={() => {
				router.navigate('/(app)/(tabs)/post-trip');
			}}
		>
			{/*<SearchBar*/}
			{/*	headerIcon='location-outline'*/}
			{/*	placeholder='Rechercher un lieu'*/}
			{/*	headerText='Utiliser ma position actuelle'*/}
			{/*	data={data}*/}
			{/*	onSuggestionsHeaderPress={() => {}} // TODO*/}
			{/*	onSuggestionPress={(item) => {*/}
			{/*		setDestination(item);*/}
			{/*		router.navigate('/(app)/post-trip/date');*/}
			{/*	}}*/}
			{/*/>*/}
		</PostTripLayout>
	);
}
