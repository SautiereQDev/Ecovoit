import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/src/components/texts';
import { CircularProgress } from '@/src/components/UI/CircularProgress';
import { CustomButton } from '@/src/components/buttons';
import Colors from '@/src/constants/Colors';
import { useProfileCompletion } from '@/src/hooks/useProfileCompletion';
import { OptionalField } from '@/src/context/RegisterProvider';

interface ProfileCompletionProps {
	style?: object;
}

export const ProfileCompletion = ({ style }: ProfileCompletionProps) => {
	const { getMissingFields, getCompletionPercentage } = useProfileCompletion();

	const missingFields = getMissingFields();
	const completionPercentage = getCompletionPercentage(missingFields);

	const handleCompleting = (field: OptionalField) => {
		router.push('/profile/completing');
	};

	return (
		<View style={[styles.container, style]}>
			<ThemedText
				color='background'
				type='header4'
			>
				Complétez votre profil
			</ThemedText>
			<ThemedText color='background'>
				{missingFields.length > 1
					? `Il vous reste ${missingFields.length} champs à compléter.`
					: 'Il vous reste 1 champ à compléter.'}
			</ThemedText>
			<View style={styles.footer}>
				<CustomButton
					text='Compléter'
					onPress={() => handleCompleting(missingFields[0])}
					size='smaller'
					buttonStyle={styles.completeButton}
				/>
				<CircularProgress
					size={80}
					progress={completionPercentage}
					textColor='background'
					color={Colors.light.background}
					backgroundColor={Colors.light.primary}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'green',
		borderRadius: 15,
		padding: '5%',
	},
	progressContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	progress: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '5%',
	},
	text: {
		marginRight: 10,
	},
	completeButton: {
		width: '40%',
		marginVertical: 'auto',
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: '5%',
	},
});
