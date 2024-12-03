import { useLocation } from '@/components/context/LocationProvider';
import SearchBar from '@/components/drafts/SearchBar';
import PostTripLayout from '@/components/layouts/PostTripLayout';
import { Alert } from 'react-native';

const lr_cda = require('@/assets/data/lr_cda_division.json');
const lr_districts = require('@/assets/data/lr_districts.json');

export default function Tests() {
	const { location } = useLocation();

	const data = lr_cda.map((field: any) => field.fields.nom_commune);
	data.push(...lr_districts.map((field: any) => field.fields.cq_nom));

	return (
		<PostTripLayout title='Test factorisation'>
			<SearchBar
				headerIcon='location-outline'
				placeholder='Rechercher une ville'
				headerText='Utiliser ma position actuelle'
				data={data}
				onSuggestionsHeaderPress={() => {
					Alert.alert('Header pressed');
					console.log(data);
				}}
			/>
		</PostTripLayout>
	);
}
