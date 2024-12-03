import { useState } from 'react';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet } from 'react-native';
import CircleButton from '@/components/drafts/CircleButton';
import PostTripLayout from '@/components/layouts/PostTripLayout';

export default function Time() {
	const [nextButtonVisible, setNextButtonVisible] = useState<boolean>(true);

	return (
		<PostTripLayout
			title='À quelle heure ?'
			iconTopLeft='arrow-back-sharp'
			iconTopRight='close-sharp'
			onPressTopLeft={() => {
				router.back();
			}}
			onPressTopRight={() => {
				router.navigate('/(app)/(tabs)/post-trip');
			}}
		>
			<CircleButton
				iconName='arrow-forward'
				onPress={() => {}}
				size='medium'
				style={{
					position: 'absolute',
					bottom: 25,
					right: 25,
					display: nextButtonVisible ? 'flex' : 'none',
				}}
			/>
		</PostTripLayout>
	);
}
