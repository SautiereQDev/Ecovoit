import { useState } from 'react';
import { router } from 'expo-router';
import CircleButton from '@/components/drafts/CircleButton';
import PostTripLayout from '@/components/layouts/PostTripLayout';
import SearchBar from '@/components/drafts/SearchBar';
const lr_cda = require('@/assets/data/lr_cda_division.json');
const lr_districts = require('@/assets/data/lr_districts.json');

export default function Start() {
	const [nextButtonVisible, setNextButtonVisible] = useState<boolean>(false);

	const data = lr_cda.map((field: any) => field.fields.nom_commune);
	data.push(...lr_districts.map((field: any) => field.fields.cq_nom));

	return (
		<PostTripLayout
			title="D'où partez-vous ?"
			iconTopLeft='arrow-back-sharp'
			iconTopRight='close-sharp'
			onPressTopLeft={() => {
				router.back();
			}}
			onPressTopRight={() => {
				router.navigate('/(app)/(tabs)/post-trip');
			}}
		>
			<SearchBar
				headerIcon='location-outline'
				placeholder='Rechercher un lieu'
				headerText='Utiliser ma position actuelle'
				data={data}
				onSuggestionsHeaderPress={() => {}} // TODO
				onSearch={(value) => {}} // TODO
				onSuggestionPress={() => {
					setNextButtonVisible(true);
				}}
				onChangeText={(text) => {
					if (text === '') {
						setNextButtonVisible(false);
					}
				}}
				onNoResult={() => {
					setNextButtonVisible(false);
				}}
			/>

			<CircleButton
				iconName='arrow-forward'
				onPress={() => {
					router.navigate('/(app)/(post-trip)/destination');
				}}
				size='medium'
				style={{
					position: 'absolute',
					bottom: 25,
					right: 25,
					display: nextButtonVisible ? 'flex' : 'none',
				}}
			/>
		</PostTripLayout>
	);
}
