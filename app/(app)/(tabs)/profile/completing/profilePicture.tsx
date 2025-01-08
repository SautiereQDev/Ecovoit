import { View } from 'react-native';
import React from 'react';
import { CustomButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { handleBack } from './index';
import ReturnButton from '@/components/buttons/ReturnButton';
import { router } from 'expo-router';
import ImagePickerButton from '@/components/buttons/ImagePickerButton';
import { vehiclesStyles } from '@/styles/vehicles';

const LastName = () => {
	const { validateField, errors, data, setData } = useRegister();

	const handleSubmit = (): void => {
		validateField('profilePicture', data.profilePicture);
		if (!errors.lastName) {
			// @ts-ignore
			router.push('/profile/completing');
		}
	};

	const setImage = (image: string) => {
		setData({ ...data, profilePicture: image });
	};

	return (
		<View style={vehiclesStyles.content}>
			<ReturnButton handleBack={handleBack} />
			<ThemedText type={'header4'}>Ajouter une photo de profil</ThemedText>
			<ImagePickerButton
				image={data.profilePicture}
				setImage={setImage}
			/>
			<CustomButton
				text={'Valider'}
				onPress={handleSubmit}
				buttonStyle={vehiclesStyles.buttonNext}
				size={'smaller'}
			/>
		</View>
	);
};
export default LastName;
