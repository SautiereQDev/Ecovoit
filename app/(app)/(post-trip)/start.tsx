import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import CircleButton from '@/components/drafts/CircleButton';
import IconButton from '@/components/drafts/IconButton';
import Map from '@/components/map/Map';
import { useThemeColor } from '@/constants/drafts/useThemeColor';
import CustomInputText from '@/components/drafts/CustomInputText';
import { ThemedText } from '@/components/drafts/ThemedText';
import LRDistrictsMarkers from '@/components/map/LRDistrictsMarker';
import { MarkerPressEvent } from 'react-native-maps';

export default function Start() {
	const colors = useThemeColor();
	const [searchBarValue, setSearchBarValue] = useState('');

	const handleOnChangeText = (text: string) => {
		setSearchBarValue(text);
	};

	const handleOnMarkerPress = (e: MarkerPressEvent) => {
		// TODO: mettre à jour la searchBar avec l'emplacement du marker
	};

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
				D'où partez-vous ?
			</ThemedText>

			<CustomInputText
				value={searchBarValue}
				label='Choisissez un point de départ'
				iconRight='search-outline'
				style={{ marginTop: 40, elevation: 10, borderRadius: 10 }}
				placeholder='Saisissez une adresse'
				onChangeText={handleOnChangeText}
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
				onMarkerPress={handleOnMarkerPress}
			>
				<LRDistrictsMarkers />
			</Map>
			<CircleButton
				iconName='arrow-forward'
				onPress={() => {
					router.navigate('/(app)/(post-trip)/destination');
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
