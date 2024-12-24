import { View } from 'react-native';
import React from 'react';
import { CustomButton, ThemedText } from '@/components';
import {
	globalStyle,
	handleBack,
} from '@/app/(app)/(tabs)/profile/completing/index';
import ReturnButton from '@/components/buttons/ReturnButton';
import { useRegister } from '@/context/RegisterProvider';
import { router } from 'expo-router';
import ImagePickerButton from '@/components/buttons/ImagePickerButton';

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
		<View style={globalStyle.content}>
			<ReturnButton handleBack={handleBack} />
			<ThemedText type={'header4'}>Ajouter une photo de profil</ThemedText>
			<ImagePickerButton
				image={data.profilePicture}
				setImage={setImage}
			/>
			<CustomButton
				text={'Valider'}
				onPress={handleSubmit}
				buttonStyle={globalStyle.buttonNext}
				size={"smaller"}
			/>
		</View>
	);
};
export default LastName;
