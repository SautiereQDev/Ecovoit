import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomButton, ThemedInput, ThemedText } from '@/components';
import { ImagePickerButton } from '@/components/buttons/ImagePickerButton';
import { useRegister } from '@/context/RegisterProvider';
import { styles } from './index';
import ReturnButton from '@/components/buttons/ReturnButton';

export const RegisterPage5 = () => {
	const { data, setData, errors, validateField, submit } = useRegister();

	const updateImage = (image: string | null) => {
		setData((prev) => ({ ...prev, profilePicture: image }));
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
					<ThemedText style={customStyle.optionalText}>
						Photo de profil (optionnel)
					</ThemedText>
					<ImagePickerButton
						image={data.profilePicture}
						setImage={updateImage}
						style={customStyle.imagePicker}
					/>
				</View>
				<View>
					<ThemedText style={customStyle.optionalText}>
						Biographie (optionnel)
					</ThemedText>
					{/*TODO: Arriver à metttre le biographie sur plusieurs lignes*/}
					<ThemedInput
						placeholder='Biographie'
						value={data.biographie}
						onChangeText={(value) => {
							setData((prev) => ({ ...prev, biographie: value }));
							validateField('biographie', value);
						}}
						hasError={!!errors.biographie}
						errorMessage={errors.biographie}
						label={'Biographie'}
						multiline
						numberOfLines={4}
						style={customStyle.biographieInput}
					/>
				</View>
				<CustomButton
					text='Terminer'
					textProps={{ color: 'background' }}
					backgroundColor={'primary'}
					onPress={submit}
					buttonStyle={customStyle.button}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage5;

const customStyle = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		marginBottom: 20,
		textAlign: 'center',
	},
	imagePicker: {
		marginTop: '5%',
		marginBottom: '3%',
	},
	optionalText: {
		marginBottom: '3%',
		fontStyle: 'italic',
		color: 'gray',
	},
	button: {
		paddingHorizontal: '5%',
		paddingVertical: '2%',
		marginLeft: 'auto',
		width: '40%',
	},
	biographieInput: {
		paddingHorizontal: 10,
		textAlignVertical: 'top',
	},
});
