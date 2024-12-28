import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import { IconButton, SearchTripCard, ThemedText } from '@/components';
import { notify } from 'react-native-notificated';
import ShowFilters from '@/components/modal/ShowFilters';
import ShowOrder from '@/components/modal/ShowOrder';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTripSearch } from '@/context/SearchProvider';
import { searchTripStyles } from '@/styles/searchTrip';

export const Search = () => {
	const { state, dispatch } = useTripSearch();
	const { results, searchData, orderDirection, filters } = state;

	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showOrder, setShowOrder] = useState<boolean>(false);

	const resetSearch = () => {
		dispatch({ type: 'RESET_SEARCH' });
	};

	const reverseOrder = () => {
		dispatch({
			type: 'SET_ORDER_DIRECTION',
			payload: orderDirection === 'asc' ? 'desc' : 'asc',
		});
		notify('success', { params: { title: 'Ordre de tri changé' } });
	};

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
									name={'sort-alpha-asc'}
									lib={'FontAwesome'}
									size={30}
									buttonStyle={searchTripStyles.button}
									backgroundColor={'background'}
									color={Colors.light.primary}
									onPress={() => setShowOrder(!showOrder)}
								/>
								<IconButton
									name={orderDirection === 'asc' ? 'arrow-down' : 'arrow-up'}
									lib={'FontAwesome'}
									size={30}
									buttonStyle={searchTripStyles.button}
									backgroundColor={'background'}
									color={Colors.light.primary}
									onPress={reverseOrder}
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
							renderItem={({ item }) => (
								<SearchTripCard
									data={{
										depart: item.depart,
										destination: item.destination,
										nom: item.nom,
										date: item.date,
										distance: item.distance,
									}}
								/>
							)}
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
