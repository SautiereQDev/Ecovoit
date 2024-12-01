import { useState } from 'react';
import { router } from 'expo-router';
import ChooseLocationLayout from '@/components/layouts/post-trip/ChooseLocationLayout';

export default function Start() {
	const [nextButtonVisible, setNextButtonVisible] = useState(true);

	const handleClose = () => {
		router.navigate('/(app)/(tabs)/post-trip');
	};

	const handleNextButtonPress = () => {
		router.navigate('/(app)/(post-trip)/destination');
		// TODO: Mettre à jour le PostTripContext
		// NOTE: Il serait bien de renommer ce contexte par la même occasion.
	};

	return (
		<ChooseLocationLayout
			title="D'où partez-vous ?"
			nextButton={nextButtonVisible}
			onClose={handleClose}
			onNextButtonPress={handleNextButtonPress}
		/>
	);
}
