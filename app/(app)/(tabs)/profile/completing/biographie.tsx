import { View, StyleSheet } from 'react-native';
import React from 'react';
import { CustomButton, ThemedInput, ThemedText } from '@/components';
import ReturnButton from '@/components/buttons/ReturnButton';
import { handleBack } from '@/app/(app)/(tabs)/profile/completing/index';
import { useRegister } from '@/context/RegisterProvider';
import { router } from 'expo-router';
import { vehiclesStyles } from '@/styles/vehicles';

export function Biographie() {
	const { validateField, errors, data, setData } = useRegister();

	const handleSubmit = (): void => {
		validateField('biographie', data.biographie);
		if (!errors.biographie) {
			// @ts-ignore
			router.push('/profile/completing/index');
		}
	};

	return (
		<View style={vehiclesStyles.container}>
			<View style={vehiclesStyles.content}>
				<ReturnButton handleBack={handleBack} />
				<ThemedText type={'header3'}>Biographie</ThemedText>
				<ThemedInput
					placeholder='Decrire vous en quelques mots'
					value={data.biographie}
					onChangeText={(value) => {
						validateField('biographie', value);
						setData((prev) => ({ ...prev, biographie: value }));
					}}
					hasError={!!errors.biographie}
					errorMessage={errors.biographie}
					label={'Biographie'}
					style={styles.input}
					multiline={true}
					numberOfLines={4}
				/>
				<CustomButton
					text={'Valider'}
					onPress={handleSubmit}
					buttonStyle={vehiclesStyles.buttonNext}
					size={'smaller'}
				/>
			</View>
		</View>
	);
}

export default Biographie;

const styles = StyleSheet.create({
	input: {
		height: 200,
		textAlignVertical: 'top',
	},
});
