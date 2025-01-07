import { FlatList, KeyboardAvoidingView, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchTripStyles } from '@/styles/searchTrip';
import { useData, useSearchContext } from '@/providers';
import { router } from 'expo-router';
import { SearchTripCard } from '@/components/cards';
import { ThemedText } from '@/components/texts';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { globalStyles } from '@/styles';

export const Search = () => {
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showOrder, setShowOrder] = useState<boolean>(false);

	const { searchQuery: searchData } = useSearchContext();

	const { useTrips } = useData();

	const { data: trips, isLoading, isError } = useTrips();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (isError) {
		return <ErrorScreen />;
	}

	return (
		<SafeAreaView style={searchTripStyles.container}>
			<KeyboardAvoidingView>
				<View style={searchTripStyles.content}>
					<View style={searchTripStyles.header}>
						<View style={searchTripStyles.searchBar}>
							<View style={searchTripStyles.input}>
								<ThemedText color='text'>
									{searchData.start}
									{' -> '}
									{searchData.end}
								</ThemedText>
							</View>
						</View>
						<ThemedText
							type='header4'
							style={globalStyles.title}
						>
							Trajets correspondants 🔗
						</ThemedText>
						{trips && trips.length < 1 && (
							<ThemedText type={'header4'}>
								Aucun trajets disponibles entre ces deux destinations
							</ThemedText>
						)}
						<FlatList
							data={trips}
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
