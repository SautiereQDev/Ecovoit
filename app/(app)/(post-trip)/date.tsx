import { useState } from 'react';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import LocRecord from '@/types/LocRecords';
import {
	Keyboard,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	View,
} from 'react-native';
import IconButton from '@/components/drafts/IconButton';
import { ThemedText } from '@/components/drafts/ThemedText';
import CustomInputText from '@/components/drafts/CustomInputText';
import CircleButton from '@/components/drafts/CircleButton';
import { StatusBar } from 'expo-status-bar';
import CustomCalendar from '@/components/calendar/Calendar';

export default function Destination() {
	const colors = useThemeColor();

	const [nextButtonVisible, setNextButtonVisible] = useState<boolean>(false);

	return (
		<View
			style={[{ backgroundColor: colors['background-1'] }, styles.container]}
		>
			<StatusBar translucent />
			<IconButton
				iconName='arrow-back'
				onPress={() => {
					router.back();
				}}
				size='large'
				style={{ position: 'absolute', top: 15, left: 0 }}
			/>
			<IconButton
				iconName='close'
				onPress={() => {
					router.navigate('/(app)/(tabs)/post-trip');
				}}
				size='large'
				style={{ position: 'absolute', top: 15, right: 0 }}
			/>

			<ThemedText
				type='title'
				style={{ marginTop: 100 }}
			>
				Quel jour ?
			</ThemedText>

			<CustomCalendar />

			<CircleButton
				iconName='arrow-forward'
				onPress={() => {}}
				size='medium'
				style={{
					position: 'absolute',
					bottom: 25,
					right: 25,
					display: nextButtonVisible && Keyboard.isVisible() ? 'flex' : 'none',
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
