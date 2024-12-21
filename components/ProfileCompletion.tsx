import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/texts';
import { CircularProgress } from '@/components/CircularProgress';
import Colors from '@/constants/Colors';
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
		setProgression(100 - fields.length * 20); // chaque champs manquants enlève 20%
	}, [fields]);

	return (
		<View style={[style, styles.container]}>
			<ThemedText
				color={'background'}
				type={'header5'}
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
					>
						Complétez la {fields[0]}.
					</ThemedText>
					<CustomButton text={'Compléter'} />
				</View>
				<CircularProgress
					size={100}
					strokeWidth={10}
					progress={progression}
					textColor={'text'}
					color={Colors.light.secondary}
					backgroundColor={Colors.light.background}
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
		padding: '3%',
	},
	progressContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	progress: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		marginRight: 10,
	},
});
