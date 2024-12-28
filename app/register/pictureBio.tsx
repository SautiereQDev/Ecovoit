import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomButton, ThemedInput, ThemedText } from '@/components';
import { ImagePickerButton } from '@/components/buttons/ImagePickerButton';
import { useRegister } from '@/context/RegisterProvider';
import ReturnButton from '@/components/buttons/ReturnButton';
import { registerStyles as styles } from '@/styles';

export const RegisterPage5 = () => {
	const {
		form: data,
		updateField: setData,
		errors,
		validateField,
		submitForm: submit,
	} = useRegister();

	const updateImage = (image: string | null) => {
		setData('profilePicture', image);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ReturnButton />
				<ThemedText
					type={'header2'}
					style={styles.title}
				>
					Complétez votre profil
				</ThemedText>
				<View>
					<ThemedText style={styles.optionalText}>
						Photo de profil (optionnel)
					</ThemedText>
					<ImagePickerButton
						image={data.profilePicture}
						setImage={updateImage}
						style={styles.imagePicker}
					/>
				</View>
				<View>
					<ThemedText style={styles.optionalText}>
						Biographie (optionnel)
					</ThemedText>
					<ThemedInput
						placeholder='Biographie'
						value={data.biographie}
						onChangeText={(value) => {
							setData('biographie', value);
							validateField('biographie', value);
						}}
						hasError={!!errors.biographie}
						errorMessage={errors.biographie}
						label={'Biographie'}
						multiline
						numberOfLines={4}
						style={styles.biographieInput}
					/>
				</View>
				<CustomButton
					text='Terminer'
					textProps={{ color: 'background' }}
					backgroundColor={'primary'}
					onPress={submit}
					buttonStyle={styles.button}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage5;