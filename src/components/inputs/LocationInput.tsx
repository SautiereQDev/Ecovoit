import React, { useEffect, useState } from 'react';
import { useData } from '@/providers';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ThemedInput, ThemedInputProps } from '@/components/inputs/index';
import { ThemedText } from '@/components/texts';
import Fuse, { FuseResult } from 'fuse.js';
import { EVAPI } from '@ecovoit-api/mock-adapter';

interface SearchBarProps extends ThemedInputProps {
	locationName: string;
	setLocationName: (query: string) => void;
	label?: string;
}

const LocationInput = ({
	locationName,
	setLocationName,
	hasError,
	errorMessage,
	label = 'Lieu',
	placeholder = 'Entrez le lieu',
}: SearchBarProps) => {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const { useLocation } = useData();
	const { data, isLoading, error } = useLocation();

	useEffect(() => {
		if (locationName && data) {
			const fuse = new Fuse(data, {
				keys: ['name'], // Indique qu'on souhaite comparer le name
				threshold: 0.4, // Règle le precision de la recherche
				sortFn: (a, b) => (a.score < b.score ? -1 : 1), // Trie les résultats par pertinence
			});
			const filteredSuggestions = fuse
				.search(locationName)
				.map((result: FuseResult<EVAPI.Location>) => result.item.name);
			setSuggestions(filteredSuggestions);
		} else {
			setSuggestions([]);
		}
	}, [locationName, data]);

	const handleChange = (text: string) => {
		setLocationName(text);
	};

	if (error) {
		return <ThemedText>Erreur de chargement des données</ThemedText>;
	}

	return (
		<View>
			<ThemedInput
				value={locationName}
				onChangeText={handleChange}
				placeholder={isLoading ? 'Chargement' : placeholder}
				label={label}
				errorMessage={errorMessage}
				hasError={hasError}
			/>
			{!isLoading && !suggestions.includes(locationName) && (
				<FlatList
					data={suggestions.slice(0, 5)}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Pressable
							onPress={() => setLocationName(item)}
							style={{ width: '100%' }}
						>
							<ThemedText>{item}</ThemedText>
						</Pressable>
					)}
					ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
					style={styles.suggestions}
				/>
			)}
		</View>
	);
};

export default LocationInput;

const styles = StyleSheet.create({
	suggestions: {
		marginTop: 10,
		marginHorizontal: 15,
	},
});
