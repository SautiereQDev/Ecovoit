import { FlatList, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { IconButton, SearchTripCard, ThemedText } from '@/components';
import { notify } from 'react-native-notificated';
import ShowFilters from '@/components/modal/ShowFilters';
import ShowOrder from '@/components/modal/ShowOrder';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTripSearch } from '@/context/SearchProvider';
import { searchStyle } from './index';

export const Search = () => {
	const {
		results,
		resetSearch,
		isFilterActive,
		reverseOrder,
		orderDirection,
		searchData,
	} = useTripSearch();

	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showOrder, setShowOrder] = useState<boolean>(false);

	return (
		<SafeAreaView style={searchStyle.container}>
			<KeyboardAvoidingView>
				<View style={searchStyle.content}>
					<View style={styles.header}>
						<View style={styles.searchBar}>
							<View style={styles.destination}>
								<ThemedText color='text'>
									{searchData.depart} {' -> '} {searchData.destination}
								</ThemedText>
							</View>
							<IconButton
								name='x'
								color={Colors.light.resetButton}
								onPress={resetSearch}
								size={30}
								buttonStyle={styles.resetButton}
							/>
						</View>
						<View style={styles.icons}>
							<IconButton
								name={'filter'}
								lib={'MaterialCommunityIcons'}
								size={26}
								buttonStyle={styles.button}
								backgroundColor={isFilterActive ? 'primary' : 'background'}
								color={
									isFilterActive
										? Colors.light.background
										: Colors.light.primary
								}
								onPress={() => setShowFilters(!showFilters)}
							/>
							<View style={styles.orderButtons}>
								<IconButton
									// @ts-ignore
									name={'sort-alpha-asc'}
									lib={'FontAwesome'}
									size={30}
									buttonStyle={styles.button}
									backgroundColor={'background'}
									color={Colors.light.primary}
									onPress={() => setShowOrder(!showOrder)}
								/>
								<IconButton
									name={orderDirection === 'asc' ? 'arrow-down' : 'arrow-up'}
									lib={'FontAwesome'}
									size={30}
									buttonStyle={styles.button}
									backgroundColor={'background'}
									color={Colors.light.primary}
									onPress={() => {
										reverseOrder();
										notify('success', {
											params: { title: 'Ordre de tri changé' },
										});
									}}
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
						<ThemedText type='header4'>Trajets correspondants 🔗</ThemedText>
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

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'column',
		gap: 25,
	},
	searchBar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	destination: {
		borderWidth: 1.5,
		borderColor: Colors.light.inputText,
		padding: "2%",
		borderRadius: 10,
	},
	resetButton: {
		borderWidth: 2,
		borderColor: Colors.light.resetButton,
		borderRadius: 99999,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		height: 40,
		width: 40,
	},
	button: {
		padding: '3%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.light.primary,
	},
	icons: {
		display: 'flex',
		flexDirection: 'row',
		marginRight: 'auto',
		gap: 25,
	},
	orderButtons: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		gap: 10,
	},
});
