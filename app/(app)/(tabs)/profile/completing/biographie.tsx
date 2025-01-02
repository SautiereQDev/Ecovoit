import { View } from 'react-native';
import React from 'react';
import { CustomButton } from '@/components/buttons';
import { ThemedInput } from '@/components/inputs';
import { ThemedText } from '@/components/texts';
import ReturnButton from '@/components/buttons/ReturnButton';
import { handleBack } from './index';
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
			<ReturnButton handleBack={handleBack} />
			<View style={vehiclesStyles.content}>
				<ThemedText
					type={'header2'}
					style={vehiclesStyles.title}
				>
					Biographie
				</ThemedText>
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
