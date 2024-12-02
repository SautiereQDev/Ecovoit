import {
	FlatList,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import CircleButton from '@/components/drafts/CircleButton';
import IconButton from '@/components/drafts/IconButton';
import Map from '@/components/map/Map';
import { useThemeColor } from '@/hooks/useThemeColor';
import CustomInputText from '@/components/drafts/CustomInputText';
import { ThemedText } from '@/components/drafts/ThemedText';
import LocRecord from '@/types/LocRecords';
const lr_cda = require('@/assets/data/lr_cda_division.json');

export default function Destination() {
	const colors = useThemeColor();
	const [searchBarValue, setSearchBarValue] = useState('');
	const [suggestedCDA, setSuggestedCDA] = useState<string[]>([]);

	const handleOnChangeText = (text: string) => {
		setSearchBarValue(text);

		const lrCdaFiltered = lr_cda.filter((field: LocRecord.LRCDADivision) => {
			const textLength = text.length;
			return (
				field.fields.nom_commune.toLowerCase().slice(0, textLength) ===
				text.toLowerCase()
			);
		});
		const currentSuggestedCDA: string[] = [];
		lrCdaFiltered.forEach((field: LocRecord.LRCDADivision) => {
			currentSuggestedCDA.push(field.fields.nom_commune);
		});

		if (currentSuggestedCDA.length > 0) {
			setSuggestedCDA(currentSuggestedCDA);
		} else {
			setSuggestedCDA(['Aucun résultat trouvé']);
		}

		if (text === '') {
			setSuggestedCDA([]);
		}
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
				Où allez-vous ?
			</ThemedText>

			<CustomInputText
				value=''
				iconRight='search-outline'
				style={{ marginTop: 40, elevation: 10, borderRadius: 10 }}
				placeholder='Saisissez une adresse'
				onChangeText={handleOnChangeText}
			/>
			<FlatList
				style={{ width: '90%' }}
				data={suggestedCDA}
				renderItem={(item) => {
					return (
						<TouchableOpacity
							style={{
								zIndex: 100,
								borderRadius: 10,
								padding: 10,
								marginTop: 10,
								backgroundColor: colors['background-2'],
							}}
							onPress={() => {
								if (item.item === 'Aucun résultat trouvé') {
									return;
								}
								setSearchBarValue(item.item);
								setSuggestedCDA([item.item]);
							}}
						>
							<ThemedText
								style={{ width: '100%' }}
								type='subtitle'
							>
								{item.item}
							</ThemedText>
						</TouchableOpacity>
					);
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
