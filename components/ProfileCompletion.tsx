import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/texts';
import { CircularProgress } from '@/components/CircularProgress';
import { CustomButton } from '@/components/buttons';
import Colors from '@/constants/Colors';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { OptionalField } from '@/context/RegisterProvider';

interface ProfileCompletionProps {
	style?: object;
}

// TODO: Regler le bug visual avec les deux bouttons completer

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
					color={Colors.light.primary}
					backgroundColor={Colors.light.background}
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
