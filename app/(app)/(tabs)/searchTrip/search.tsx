import { FlatList, KeyboardAvoidingView, Pressable, View } from 'react-native';
import { IconButton } from '@/components/buttons';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchTripStyles } from '@/styles/searchTrip';
import { useData, useSearchContext } from '@/providers';
import { router } from 'expo-router';
import { SearchTripCard } from '@/components/cards';
import { ThemedText } from '@/components/texts';

export const Search = () => {
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showOrder, setShowOrder] = useState<boolean>(false);

	const { searchQuery: searchData, setSearchQuery: setSearchData } =
		useSearchContext();

	const { useTrips } = useData();
	const resetSearch = () => {
		setSearchData({
			depart: '',
			destination: '',
			date: new Date().getTime(),
			filters: [],
			sort: { field: 'distance', direction: 'asc' },
		});
		router.push('/searchTrip/search');
	};

	const reverseOrder = () => {
		setSearchData({
			...searchData,
			sort:
				searchData.sort.direction === 'asc'
					? { ...searchData.sort, direction: 'desc' }
					: { ...searchData.sort, direction: 'asc' },
		});
	};

	const { data, isLoading, isError } = useTrips();

	if (isLoading) {
		return (
			<SafeAreaView>
				<ThemedText>Loading...</ThemedText>
			</SafeAreaView>
		);
	}

	if (isError) {
		return (
			<SafeAreaView>
				<ThemedText>Une erreur est survenue</ThemedText>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={searchTripStyles.container}>
			<KeyboardAvoidingView>
				<View style={searchTripStyles.content}>
					<View style={searchTripStyles.header}>
						<View style={searchTripStyles.searchBar}>
							<View style={searchTripStyles.destination}>
								<ThemedText color='text'>
									{searchData.depart}
									{' -> '}
									{searchData.destination}
								</ThemedText>
							</View>
							<IconButton
								name='x'
								color={Colors.light.resetButton}
								onPress={resetSearch}
								size={30}
								buttonStyle={searchTripStyles.resetButton}
							/>
						</View>
						<ThemedText type='header3'>Trajets correspondants 🔗</ThemedText>
						<FlatList
							data={data}
							renderItem={({ item }) => (
								<Pressable
									onPress={() => router.push(`/DetailedTrip/${item.id}`)}
								>
									<SearchTripCard trip={item} />
								</Pressable>
							)}
							keyExtractor={(trip, index) => trip.id}
							ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
						/>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Search;
