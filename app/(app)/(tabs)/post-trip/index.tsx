import { ThemedText } from '@/components/texts';
import { View } from 'react-native';
import { CustomButton, ReturnButton } from '@/components/buttons';
import { Controller, useForm } from 'react-hook-form';
import { PostTripType } from '@/types';
import { globalStyles, postTripStyles } from '@/styles';
import LocationInput from '@/components/inputs/LocationInput';
import { useData } from '@/providers';
import { ErrorScreen } from '@/components/pages';

export const Index = () => {
	const initialState: PostTripType = {
		datetime: 0,
		description: undefined,
		points: [
			{ locationName: '', type: 'start' },
			{ locationName: '', type: 'end' },
		],
		seats: 0,
		vehicle: '',
	};

	const { useLocation } = useData();
	const { data: listePoints, isLoading, error } = useLocation();

	// on récupère les coordonées des points de départ et d'arrivée

	if (error) {
		return <ErrorScreen error={error} />;
	}

	const startPointIndex = 0;
	const endPointIndex = initialState.points.length - 1;

	const { control, handleSubmit, setValue } = useForm<PostTripType>({
		defaultValues: initialState,
	});

	const onSubmit = (data: PostTripType) => {
		console.log(data);
		// if (listePoints) {
		// 	const departLocationId = listePoints.find(
		// 		(location: Location) =>
		// 			location.name === data.points[startPointIndex].locationName
		// 	);
		// 	const endLocationId = listePoints.find(
		// 		(location: Location) =>
		// 			location.name === data.points[endPointIndex].locationName
		// 	).
		// }
	};

	return (
		<View style={globalStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header3'}
				style={globalStyles.title}
			>
				Creation d'un trajet
				{/*TODO: affichage de la map avec un vue + bordure correspondant à la taille de la map pour ne pas avoir d'effect de chargement*/}
				{/*{isLoading && <ThemedText>Loading...</ThemedText>} */}
			</ThemedText>
			<View style={postTripStyles.content}>
				<Controller
					control={control}
					name={`points.${startPointIndex}.locationName`}
					render={({ field: { onChange, value } }) => (
						<LocationInput
							locationName={value || ''}
							setLocationName={(newValue) => {
								onChange(newValue);
								setValue(`points.${startPointIndex}.locationName`, newValue);
							}}
							label={'Départ'}
							placeholder={'Entrez le point de départ'}
						/>
					)}
				/>
				<Controller
					control={control}
					name={`points.${endPointIndex}.locationName`}
					render={({ field: { onChange, value } }) => (
						<LocationInput
							locationName={value || ''}
							setLocationName={(newValue) => {
								onChange(newValue);
								setValue(`points.${endPointIndex}.locationName`, newValue);
							}}
							label={'Arrivée'}
							placeholder={"Entrez le point d'arrivée"}
						/>
					)}
				/>
				<CustomButton
					text='Submit'
					textProps={{ color: 'background' }}
					onPress={handleSubmit(onSubmit)}
					buttonStyle={postTripStyles.submitButton}
				/>
			</View>
		</View>
	);
};

export default Index;
