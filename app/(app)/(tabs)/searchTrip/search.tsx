import { FlatList, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchTripStyles } from '@/styles/searchTrip';
import { useData, useSearchContext } from '@/providers';
import { router } from 'expo-router';
import { SearchTripCard } from '@/components/cards';
import { ThemedText } from '@/components/texts';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { globalStyles } from '@/styles';
import { IconButton, ReturnButton } from '@/components/buttons';
import { ShowFilters, ShowOrder } from '@/components/modals';
import { Colors } from '@/constants';
import { EVAPI } from '@ecovoit-api/mock-adapter';

export const Search = () => {
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showOrder, setShowOrder] = useState<boolean>(false);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [filters, setFilters] =
		useState<EVAPI.DB.Filters<EVAPI.TripEntry> | null>({
			vehicle: undefined,
			id: undefined,
			driver: undefined,
			distance: undefined,
			duration: undefined,
			cancelled: undefined,
			seats: undefined,
			datetime: undefined,
			description: undefined,
		});
	const [order, setOrder] = useState<Record<keyof EVAPI.TripEntry, boolean>>({
		vehicle: false,
		id: false,
		driver: false,
		distance: false,
		duration: false,
		cancelled: false,
		seats: false,
		datetime: true,
		description: false,
	});

	const reverseOrder = () => {
		setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
	};

	const { searchQuery: searchData } = useSearchContext();

	const { useTrips } = useData();

	const { data: trips, isLoading, isError } = useTrips();

	console.log('filters', filters);
	console.log('order', order);

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (isError) {
		return <ErrorScreen />;
	}

	const filteredTrips = trips?.filter((trip) => {
		const start = trip.points.find(
			(point) => point.location.name === searchData.start
		);
		const end = trip.points.find(
			(point) => point.location.name === searchData.end
		);

		return start && end;
	});

	// tri par date de trajet
	trips?.sort((a, b) => {
		if (a.datetime > b.datetime) {
			return 1;
		}
		if (a.datetime < b.datetime) {
			return -1;
		}
		return 0;
	});

	return (
		<SafeAreaView style={searchTripStyles.container}>
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
					<View style={searchTripStyles.icons}>
						<IconButton
							name={'filter'}
							lib={'MaterialCommunityIcons'}
							size={26}
							buttonStyle={searchTripStyles.button}
							backgroundColor={
								Object.values(filters ?? {}).findIndex(
									(filter) => filter !== undefined
								) !== -1
									? 'primary'
									: 'background'
							}
							color={
								Object.values(filters ?? {}).findIndex(
									(filter) => filter !== undefined
								) !== -1
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
								size={26}
								buttonStyle={searchTripStyles.button}
								onPress={() => setShowOrder(!showOrder)}
								color={Colors.light.primary}
							/>
							<IconButton
								name={sortDirection === 'asc' ? 'sort-asc' : 'sort-desc'}
								lib={'FontAwesome'}
								size={26}
								buttonStyle={searchTripStyles.button}
								onPress={reverseOrder}
							/>
						</View>
					</View>
					<ShowFilters
						visible={showFilters}
						onClose={() => setShowFilters(false)}
						filters={filters}
						setFilters={setFilters}
					/>
					<ShowOrder
						visible={showOrder}
						onClose={() => setShowOrder(false)}
						order={order}
						setOrder={setOrder}
					/>
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
						keyExtractor={(trip) => trip.id}
						ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Search;
