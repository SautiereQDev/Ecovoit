import { StyleSheet, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import CircleButton from '@/components/drafts/CircleButton';
import IconButton from '@/components/drafts/IconButton';
import Map from '@/components/map/Map';
import { useThemeColor } from '@/constants/drafts/useThemeColor';
import CustomInputText from '@/components/drafts/CustomInputText';
import { ThemedText } from '@/components/drafts/ThemedText';

export default function Destination() {
	const colors = useThemeColor();
	return (
		<View
			style={[{ backgroundColor: colors['background-1'] }, styles.container]}
		>
			<IconButton
				iconName='close'
				onPress={() => {
					router.navigate('/(app)/(tabs)/post-trip');
				}}
				size='large'
				style={{ position: 'absolute', top: 0, left: 0 }}
			/>
			<ThemedText
				type='title'
				style={{ marginTop: 60 }}
			>
				Où allez-vous ?
			</ThemedText>

			<CustomInputText
				value=''
				label="Choisissez un point d'arrivée"
				iconRight='search-outline'
				style={{ marginTop: 40, elevation: 10, borderRadius: 10 }}
				placeholder='Saisissez une adresse'
			/>
			<Map
				style={{
					width: '90%',
					height: '70%',
					elevation: 10,
					borderRadius: 10,
					overflow: 'hidden',
					marginTop: 20,
				}}
			/>
			<CircleButton
				iconName='arrow-back'
				onPress={() => {
					router.navigate('/(app)/(post-trip)/start');
				}}
				size='medium'
				style={{ position: 'absolute', bottom: 25, left: 25 }}
			/>
			<CircleButton
				iconName='arrow-forward'
				onPress={() => {
					router.navigate('/(app)/(post-trip)/date');
				}}
				size='medium'
				style={{ position: 'absolute', bottom: 25, right: 25 }}
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
