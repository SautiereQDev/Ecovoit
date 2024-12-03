import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	TouchableOpacity,
	View,
} from 'react-native';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import CustomInputText from './CustomInputText';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

export default function SearchBar({
	data,
	headerText,
	headerIcon,
	placeholder,
	// onNoResult,
	// onChangeText,
	// onSuggestionPress,
	onSearch,
	onSuggestionsHeaderPress,
}: {
	data: any;
	headerText: string;
	placeholder: string;
	// onNoResult: () => void;
	// onChangeText: (text: string) => void;
	// onSuggestionPress: () => void;
	onSearch: (value: string) => void;
	onSuggestionsHeaderPress: () => void;
	headerIcon: keyof typeof Ionicons.glyphMap;
}) {
	const colors = useThemeColor();

	const [searchBarValue, setSearchBarValue] = useState<string>('');
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleOnChangeText = (text: string) => {
		setSearchBarValue(text);

		const currentSuggestions: string[] = [];
		data.forEach((field: string) => {
			if (field.toLowerCase().slice(0, text.length) === text.toLowerCase()) {
				currentSuggestions.push(field);
			}
		});

		if (currentSuggestions.length > 0) {
			setSuggestions(currentSuggestions);
		} else {
			setSuggestions(['Aucun résultat trouvé']);
			// onNoResult();
		}

		if (text === '') {
			setSuggestions([]);
		}
	};

	return (
		<View style={{ height: '50%' }}>
			<CustomInputText
				value={searchBarValue}
				iconRight='search-outline'
				style={{ marginTop: 40, elevation: 10, borderRadius: 10 }}
				placeholder={placeholder}
				onChangeText={(text) => {
					handleOnChangeText(text);
					// onChangeText(text);
				}}
				onIconRightPress={() => {
					onSearch(searchBarValue);
				}}
			/>
			<View>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						width: '100%',
						height: 40,
						borderRadius: 10,
						paddingHorizontal: 20,
						paddingVertical: 5,
						marginTop: 10,
						backgroundColor: colors['background-1'],
						borderWidth: 1,
						borderColor: colors['secondary-1'],
					}}
					onPress={onSuggestionsHeaderPress}
				>
					<ThemedText
						style={{ width: '100%' }}
						type='default'
					>
						{headerText}
					</ThemedText>
					{headerIcon && (
						<Ionicons
							style={{ position: 'absolute', right: 10 }}
							name={headerIcon}
							size={24}
							color={colors['secondary-1']}
						/>
					)}
				</TouchableOpacity>
				<FlatList
					showsVerticalScrollIndicator={false}
					fadingEdgeLength={100}
					keyboardShouldPersistTaps='handled'
					data={suggestions}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							key={index}
							style={{
								borderRadius: 10,
								padding: 10,
								paddingHorizontal: 10,
								marginTop: 10,
								backgroundColor: colors['background-2'],
							}}
							onPress={() => {
								if (item === 'Aucun résultat trouvé') {
									return;
								}
								setSearchBarValue(item);
								setSuggestions([]);
								// onSuggestionPress();
							}}
						>
							<ThemedText
								style={{ width: '100%' }}
								type='subtitle'
							>
								{item}
							</ThemedText>
						</TouchableOpacity>
					)}
				/>
			</View>
		</View>
	);
}
