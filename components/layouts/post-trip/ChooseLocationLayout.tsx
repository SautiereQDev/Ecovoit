import {
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import CircleButton from '@/components/drafts/CircleButton';
import IconButton from '@/components/drafts/IconButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import CustomInputText from '@/components/drafts/CustomInputText';
import { ThemedText } from '@/components/drafts/ThemedText';
import LocRecord from '@/types/LocRecords';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type ChooseLocationLayoutProps = {
	title: string;
	backButton?: boolean;
	nextButton?: boolean;
	onClose: () => void;
	onBackButtonPress?: () => void;
	onNextButtonPress?: () => void;
};

const lr_cda = require('@/assets/data/lr_cda_division.json');

export default function ChooseLocationLayout({
	title,
	backButton = false,
	nextButton = false,
	onClose,
	onBackButtonPress = () => {},
	onNextButtonPress = () => {},
	children,
}: ChooseLocationLayoutProps & PropsWithChildren) {
	const colors = useThemeColor();
	const [nextButtonVisible, setNextButtonVisible] = useState(false);

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
			setNextButtonVisible(false);
		}
	};

	return (
		<SafeAreaView
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
				placeholder='Saisissez une commune'
				onChangeText={handleOnChangeText}
			/>

			<KeyboardAvoidingView style={{ width: '90%' }}>
				<ScrollView keyboardShouldPersistTaps='handled'>
					{suggestedCDA.map((cda) => {
						return (
							<TouchableOpacity
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
			</KeyboardAvoidingView>

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
				onPress={() => {
					if (suggestedCDA.length > 0) {
						setSearchBarValue(suggestedCDA[0]);
					}
					router.navigate('/(app)/(post-trip)/destination');
				}}
				size='medium'
				style={{
					position: 'absolute',
					bottom: 25,
					right: 25,
					display: nextButtonVisible && Keyboard.isVisible() ? 'flex' : 'none',
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
