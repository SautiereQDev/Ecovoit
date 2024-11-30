import { StyleSheet, View } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import CircleButton from '@/components/drafts/CircleButton';
import IconButton from '@/components/drafts/IconButton';
import Map from '@/components/map/Map';
import { useThemeColor } from '@/hooks/useThemeColor';
import CustomInputText from '@/components/drafts/CustomInputText';
import { ThemedText } from '@/components/drafts/ThemedText';
import LRDistrictsMarkers from '@/components/map/LRDistrictsMarker';
import { MarkerPressEvent } from 'react-native-maps';

type ChooseLocationLayoutProps = {
	title: string;
	backButton?: boolean;
	nextButton?: boolean;
	onClose: () => void;
	onBackButtonPress?: () => void;
	onNextButtonPress?: () => void;
	onMarkerPress?: () => void;
};

export default function ChooseLocationLayout({
	title,
	backButton = false,
	nextButton = false,
	onClose,
	onBackButtonPress = () => {},
	onNextButtonPress = () => {},
	onMarkerPress = () => {},
	children,
}: ChooseLocationLayoutProps & PropsWithChildren) {
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
				onPress={onClose}
				size='large'
				style={{ position: 'absolute', top: 0, left: 0 }}
			/>
			<ThemedText
				type='title'
				style={{ marginTop: 60 }}
			>
				{title}
			</ThemedText>

			<CustomInputText
				value={searchBarValue}
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
				onMarkerPress={onMarkerPress}
			>
				<LRDistrictsMarkers />
			</Map>
			<CircleButton
				iconName='arrow-back'
				onPress={onBackButtonPress}
				size='medium'
				style={{
					position: 'absolute',
					bottom: 25,
					left: 25,
					display: backButton ? 'flex' : 'none',
				}}
			/>
			<CircleButton
				iconName='arrow-forward'
				onPress={onNextButtonPress}
				size='medium'
				style={{
					position: 'absolute',
					bottom: 25,
					right: 25,
					display: nextButton ? 'flex' : 'none',
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
