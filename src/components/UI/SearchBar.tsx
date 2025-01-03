import React, { useEffect, useState } from 'react';
import { useData } from '@/providers';
import { GetLocationsType, Location } from '@/types';
import { View } from 'react-native';
import { ThemedInput } from '@/components/inputs';
import { ThemedText } from '@/components/texts';

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
			const filteredSuggestions = data.filter((location: Location) =>
				location.name.toLowerCase().includes(query.toLowerCase())
			);
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
