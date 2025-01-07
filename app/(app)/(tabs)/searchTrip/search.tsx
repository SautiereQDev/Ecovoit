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
import { ReturnButton } from '@/components/buttons';

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

	// filtre des cards des destinations différentes de la recherche
	// trips?.filter((trip) => {
	// 	const start = trip.points.find((point) => {
	// 		return point.location.name === searchData.start;
	// 	});
	// 	const end = trip.points.find((point) => {
	// 		return point.location.name === searchData.end;
	// 	});
	//
	// 	return (
	// 		start?.location.name === searchData.start &&
	// 		end?.location.name === searchData.end
	// 	);
	// });

	const filteredTrips = trips?.filter((trip) => {
		const start = trip.points.find(
			(point) => point.location.name === searchData.start
		);
		const end = trip.points.find(
			(point) => point.location.name === searchData.end
		);

		return start && end;
	});

	// trips?.sort((a, b) => {
	// 	if (a.datetime > b.datetime) {
	// 		return 1;
	// 	}
	// 	if (a.datetime < b.datetime) {
	// 		return -1;
	// 	}
	// 	return 0;
	// });

	return (
		<SafeAreaView style={searchTripStyles.container}>
			<KeyboardAvoidingView>
				<View style={searchTripStyles.content}>
					<ReturnButton
						handleBack={() => router.push('/(app)/(tabs)/searchTrip')}
					/>
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
							data={!isLoading && filteredTrips}
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
