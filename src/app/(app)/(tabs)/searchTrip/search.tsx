import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import { IconButton, SearchTripCard, ThemedText } from '@/src/components';
import ShowFilters from '@/src/components/modal/ShowFilters';
import ShowOrder from '@/src/components/modal/ShowOrder';
import React, { useState } from 'react';
import Colors from '@/src/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTripSearch } from '@/src/context/SearchProvider';
import { searchTripStyles } from '@/src/styles/searchTrip';

export const Search = () => {
	const { state, resetSearch, reverseOrder } = useTripSearch();
	const { results, searchData, filters } = state;

	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showOrder, setShowOrder] = useState<boolean>(false);

	const isFilterActive = filters.some((filter) => filter.active);

	return (
		<SafeAreaView style={searchTripStyles.container}>
			<KeyboardAvoidingView>
				<View style={searchTripStyles.content}>
					<View style={searchTripStyles.header}>
						<View style={searchTripStyles.searchBar}>
							<View style={searchTripStyles.destination}>
								<ThemedText color='text'>
									{searchData.depart} {' -> '} {searchData.destination}
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
						<View style={searchTripStyles.icons}>
							<IconButton
								name={'filter'}
								lib={'MaterialCommunityIcons'}
								size={26}
								buttonStyle={searchTripStyles.button}
								backgroundColor={isFilterActive ? 'primary' : 'background'}
								color={
									isFilterActive
										? Colors.light.background
										: Colors.light.primary
								}
								onPress={() => setShowFilters(!showFilters)}
							/>
							<View style={searchTripStyles.orderButtons}>
								<IconButton
									// @ts-ignore
									name={'sort'}
									lib={'MaterialCommunityIcons'}
									size={26}
									buttonStyle={searchTripStyles.button}
									onPress={reverseOrder}
								/>
								<IconButton
									// @ts-ignore
									name={'sort'}
									lib={'MaterialCommunityIcons'}
									size={26}
									buttonStyle={searchTripStyles.button}
									onPress={() => setShowOrder(!showOrder)}
								/>
							</View>
						</View>
						<ShowFilters
							visible={showFilters}
							onClose={() => setShowFilters(false)}
						/>
						<ShowOrder
							visible={showOrder}
							onClose={() => setShowOrder(false)}
						/>
						<ThemedText type='header3'>Trajets correspondants 🔗</ThemedText>
						<FlatList
							data={results}
							renderItem={({ item }) => <SearchTripCard data={item} />}
							keyExtractor={(_, index) => index.toString()}
							ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
						/>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Search;
