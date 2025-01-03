import React, { useEffect, useState } from 'react';
import { useData } from '@/providers';
import { GetLocationsType, Location } from '@/types';
import { View } from 'react-native';
import { ThemedInput } from '@/components/inputs';
import { ThemedText } from '@/components/texts';
import Fuse, { FuseResult } from 'fuse.js';

interface SearchBarProps {
	query: string;
	setQuery: (query: string) => void;
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
	const [suggestions, setSuggestions] = useState<GetLocationsType>([]);
	const { useLocation } = useData();
	const { data, isLoading, error } = useLocation();

	useEffect(() => {
		if (query && data) {
			const fuse = new Fuse(data, {
				keys: ['name'], // Indique qu'on souhaite comparer le name
				threshold: 0.4, // Règle le precision de la recherche
				sortFn: (a, b) => (a.score < b.score ? -1 : 1), // Trie les résultats par pertinence
			});
			const filteredSuggestions = fuse
				.search(query)
				.map((result: FuseResult<Location>) => result.item);
			setSuggestions(filteredSuggestions);
		} else {
			setSuggestions([]);
		}
	}, [query, data]);

	const handleChange = (text: string) => {
		setQuery(text);
	};

	if (error) {
		return <ThemedText>Erreur de chargement des données</ThemedText>;
	}

	return (
		<View>
			<ThemedInput
				value={query}
				onChangeText={handleChange}
				placeholder='Rechercher une localisation'
			/>
			{isLoading ? (
				<ThemedText>Chargement...</ThemedText>
			) : (
				<View>
					{suggestions.map((suggestion, index) => (
						<ThemedText key={index}>{suggestion.name}</ThemedText>
					))}
				</View>
			)}
		</View>
	);
};

export default SearchBar;
