import { ThemedText } from '@/components/texts';
import { View } from 'react-native';
import { CustomButton, ReturnButton } from '@/components/buttons';
import { Controller, useForm } from 'react-hook-form';
import { PostTripType } from '@/types';
import { globalStyles, postTripStyles } from '@/styles';
import LocationInput from '@/components/inputs/LocationInput';

export const Index = () => {
	const initialState: PostTripType = {
		datetime: 0,
		description: undefined,
		points: [],
		seats: 0,
		vehicle: '',
	};

	const { control, handleSubmit, setValue } = useForm<PostTripType>({
		defaultValues: initialState,
	});

	const onSubmit = (data: PostTripType) => {
		console.log(data);
	};

	const startPointIndex = 0;
	const endPointIndex = initialState.points.length - 1;

	return (
		<View style={globalStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header3'}
				style={globalStyles.title}
			>
				Creation d'un trajet
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
