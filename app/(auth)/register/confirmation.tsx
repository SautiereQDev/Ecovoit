import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts/ThemedText';
import { router } from 'expo-router';
import ReturnButton from '@/components/buttons/ReturnButton';
import { registerStyles as styles } from '@/styles';

const RegisterPage3 = () => {
	const nextStep = () => {
		router.push('/register/vehicle');
	};

	const skip = () => {
		router.push('/register/pictureBio');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.confirmationPage}>
				<ReturnButton />
				<ThemedText
					type={'header5'}
					style={styles.confirmationPageHeader}
				>
					Souhaitez vous enregistrer votre véhicule ?
				</ThemedText>
				<View style={styles.buttons}>
					<CustomButton
						text={'Oui'}
						backgroundColor={'acceptButton'}
						textProps={{ color: 'background' }}
						buttonStyle={styles.askButton}
						onPress={nextStep}
					/>
					<CustomButton
						text={'Non'}
						backgroundColor={'deniedButton'}
						textProps={{ color: 'background' }}
						buttonStyle={styles.askButton}
						onPress={skip}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default RegisterPage3;
