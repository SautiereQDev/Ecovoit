import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/texts';
import { CircularProgress } from '@/components/CircularProgress';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { CustomButton } from '@/components/buttons';

interface ProfileCompletionProps {
	style?: object;
	missingFields: () => string[];
}

const ProfileCompletion = ({
	style,
	missingFields,
}: ProfileCompletionProps) => {
	const fields = missingFields();

	if (fields.length === 0) {
		throw new Error("Aucun champ manquant n'a été trouvé.");
	}

	const [progression, setProgression] = useState<number>(100);

	useEffect(() => {
		setProgression(100 - fields.length * 10); // chaque champ manquant enlève 10%
	}, [fields]);

	const handleComplete = (): void => {
		if (fields.length > 0) {
			// @ts-ignore
			router.push('/profile/completing/');
		}
	};

	return (
		<View style={[style, styles.container]}>
			<ThemedText
				color={'background'}
				type={'header4'}
			>
				Complétez votre profil
			</ThemedText>
			{fields.length > 1 ? (
				<ThemedText color={'background'}>
					Il vous reste {fields.length} champs à compléter.
				</ThemedText>
			) : (
				<ThemedText color={'background'}>
					Il vous reste {fields.length} champ à compléter.
				</ThemedText>
			)}
			<View style={styles.progress}>
				<View style={styles.progressContainer}>
					<ThemedText
						color={'background'}
						style={styles.text}
						type={'header5'}
					>
						{fields[0] !== 'vehicle'
							? 'Complétez votre ' + fields[0]
							: 'Ajoutez un véhicule'}
					</ThemedText>
					<CustomButton
						buttonStyle={styles.completeButton}
						onPress={handleComplete}
						text={'Compléter'}
					/>
				</View>
				<CircularProgress
					size={80}
					progress={progression}
					textColor={'background'}
					color={Colors.light.secondary}
					backgroundColor={Colors.light.background}
					textType={'accent'}
				/>
			</View>
		</View>
	);
};

export default ProfileCompletion;

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
		marginTop: '3%',
		width: '65%',
	},
});
