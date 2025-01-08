import { FlatList, Pressable, SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { useData, useSearchContext } from '@/providers';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { IconButton, ReturnButton } from '@/components/buttons';
import { ShowFilters, ShowOrder } from '@/components/modals';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { router } from 'expo-router';
import { ThemedText } from '@/components/texts';
import { globalStyles, searchTripStyles } from '@/styles';
import { Colors } from '@/constants';
import { SearchTripCard } from '@/components/cards';

export const Result = () => {
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showOrder, setShowOrder] = useState<boolean>(false);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [filters, setFilters] =
		useState<EVAPI.DB.Filters<EVAPI.TripEntry> | null>({
			vehicle: undefined,
			driver: undefined,
			duration: undefined,
			cancelled: undefined,
			datetime: undefined,
		});
	const [order, setOrder] = useState<
		Record<
			| keyof Omit<EVAPI.TripEntry, 'description' | 'id' | 'distance' | 'seats'>
			| 'id'
			| 'distance'
			| 'seats'
			| 'description',
			boolean
		>
	>({
		vehicle: false,
		driver: false,
		duration: false,
		cancelled: false,
		datetime: true,
		id: false,
		distance: false,
		seats: false,
		description: false,
	});

	const { searchQuery: searchData } = useSearchContext();

	const { useCurrentUser, useTrips } = useData();

	const {
		data: currentUser,
		isLoading: userLoading,
		error: userError,
	} = useCurrentUser();
	const {
		data: trips,
		isLoading: tripsLoading,
		error: tripsError,
	} = useTrips({ order, filters });

	const reverseOrder = () => {
		setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
	};

	// On filtre les trajets que l'on ne veut pas afficher
	const filterTrips = (
		trips: EVAPI.Trip[],
		filters: EVAPI.DB.Filters<EVAPI.TripEntry> | null,
		start: string,
		end: string
	) => {
		return trips
			.filter((trip) => {
				// on recupère les trajets qui ont les points de départ et d'arrivée correspondant à la recherche
				const hasStart = trip.points.some(
					(point) => point.location.name === start
				);
				const hasEnd = trip.points.some((point) => point.location.name === end);

				if (!hasStart || !hasEnd) return false;

				if (!filters) return true;

				// on filtre les trajets en fonction des filtres
				return Object.keys(filters).every((key) => {
					const filterValue = filters[key as keyof EVAPI.TripEntry];
					if (filterValue === undefined) return true;
					return trip[key as keyof EVAPI.TripEntry]
						?.toString()
						.includes(filterValue?.toString() ?? '');
				});
			})
			.filter((trip) => trip.status === 'upcoming') // on n'affiche que les trajets ayant le status 'upcoming' (à venir)
			.filter((trip) => trip.datetime < new Date().getTime()) // on n'affiche que les trajets ayant une date supérieure à la date actuelle au cas ou la BDD ce soit trompé
			.filter((trip) => trip.availableSeats > 0) // on n'affiche que les trajets ayant des places disponibles
			.filter(
				(trip) =>
					!currentUser?.tripsAsPassenger.includes(trip.id) ||
					!currentUser?.tripsAsDriver.includes(trip.id)
			); // on n'affiche pas les trajets auxquels l'utilisateur est déjà inscrit ou est conducteur
	};

	if (userLoading || tripsLoading) {
		return <LoadingScreen />;
	}

	if (userError || tripsError) {
		return <ErrorScreen error={userError ?? tripsError} />;
	}

	const filteredTrips = filterTrips(
		trips ?? [],
		filters,
		searchData.start,
		searchData.end
	);

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
				<ReturnButton handleBack={() => router.push('/search')} />
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
							/>
							<IconButton
								name={sortDirection === 'asc' ? 'sort-asc' : 'sort-desc'}
								lib={'Octicons'}
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
						data={!tripsLoading && filteredTrips}
						renderItem={({ item }) => (
							<Pressable onPress={() => router.push(`/trips/${item.id}/join`)}>
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

export default Result;
