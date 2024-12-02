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
const lr_cda = require('@/assets/data/lr_cda_division.json');

export default function Destination() {
	const colors = useThemeColor();

	const [nextButtonVisible, setNextButtonVisible] = useState<boolean>(false);
	const [searchBarValue, setSearchBarValue] = useState<string>('');
	const [suggestedCDA, setSuggestedCDA] = useState<string[]>([]);

	const handleOnChangeText = (text: string) => {
		setSearchBarValue(text);

		const lrCdaFiltered = lr_cda.filter((field: LocRecord.LRCDADivision) => {
			return (
				field.fields.nom_commune.toLowerCase().slice(0, text.length) ===
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
			setNextButtonVisible(false);
		}
	};

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
				Où allez-vous ?
			</ThemedText>
			<CustomInputText
				value={searchBarValue}
				iconRight='search-outline'
				style={{ marginTop: 40, elevation: 10, borderRadius: 10 }}
				placeholder='Saisissez une commune'
				onChangeText={handleOnChangeText}
			/>
			<View style={{ width: '90%' }}>
				<ScrollView keyboardShouldPersistTaps='handled'>
					{suggestedCDA.map((cda, index) => {
						return (
							<TouchableOpacity
								key={index}
								style={{
									borderRadius: 10,
									padding: 10,
									marginTop: 10,
									backgroundColor: colors['background-2'],
								}}
								onPress={() => {
									if (cda === 'Aucun résultat trouvé') {
										return;
									}
									setSearchBarValue(cda);
									setSuggestedCDA([]);
									setNextButtonVisible(true);
								}}
							>
								<ThemedText
									style={{ width: '100%' }}
									type='subtitle'
								>
									{cda}
								</ThemedText>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>

			<CircleButton
				iconName='arrow-forward'
				onPress={() => {
					if (suggestedCDA.length > 0) {
						setSearchBarValue(suggestedCDA[0]);
					}
					router.navigate('/(app)/(post-trip)/date');
				}}
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
