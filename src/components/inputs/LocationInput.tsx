import React, { useEffect, useState } from 'react';
import { useData } from '@/providers';
import { Location } from '@/types';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ThemedInput } from '@/components/inputs/index';
import { ThemedText } from '@/components/texts';
import Fuse, { FuseResult } from 'fuse.js';

interface SearchBarProps {
	locationName: string;
	setLocationName: (query: string) => void;
	hasError?: boolean;
	errorMessage?: string;
	label?: string;
	placeholder?: string;
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
				.map((result: FuseResult<Location>) => result.item.name);
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
				placeholder={placeholder}
				label={label}
				errorMessage={errorMessage}
				hasError={hasError}
			/>
			{isLoading && !!locationName && <ThemedText>Chargement...</ThemedText>}
			{!isLoading &&
				!suggestions.includes(locationName) && ( // on cache les suggestion si les donnés chargent ou si locationName est déjà correct
					<FlatList
						data={suggestions.slice(0, 5)} // on affiche seulement les 3 premières suggestions
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
