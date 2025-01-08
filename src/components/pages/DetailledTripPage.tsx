import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { CustomButton, ReturnButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { TripInfoLabel, TripLabel } from '@/components/labels';
import { RouteMap } from '@/components/map';
import { Stars } from '@/components/UI';
import { EVAPI } from '@ecovoit-api/mock-adapter';
import { getHoursAndMinutes } from '@/utils';
import { detailTripStyles, globalStyles } from '@/styles';
import { notify } from 'react-native-notificated';
import { router } from 'expo-router';

type ratingType = 1 | 2 | 3 | 4 | 5 | 0.5 | 1.5 | 2.5 | 3.5 | 4.5;

// TODO: rendre le profil cliquable que si on est en mode visitor

export const DetailedTripPage = ({
	trip,
	vehicle,
	driver,
	handleSubscribe,
	visiting = false,
}: {
	visiting?: boolean;
	trip?: EVAPI.Trip;
	vehicle?: EVAPI.Vehicle;
	handleSubscribe?: () => void;
	driver?: EVAPI.PublicUser;
}) => {
	const start: EVAPI.Location | undefined = trip?.points.find(
		(point: EVAPI.Point) => point.type === 'start'
	)?.location;
	const end: EVAPI.Location | undefined = trip?.points.find(
		(point: EVAPI.Point) => point.type === 'end'
	)?.location;
	const checkpoints: EVAPI.Location[] | undefined = trip?.points
		.filter(
			(point: EVAPI.Point) =>
				point.type === 'checkpoint' && point.location !== undefined
		)
		.map((point: EVAPI.Point) => point.location);

	return (
		<ScrollView style={globalStyles.container}>
			{visiting ? (
				<View style={detailTripStyles.header}>
					<ReturnButton style={detailTripStyles.backButton} />
					<CustomButton
						text={'Rejoindre le trajet'}
						textProps={{ color: 'background' }}
						backgroundColor={'secondary'}
						buttonStyle={detailTripStyles.joinButton}
						onPress={
							handleSubscribe ??
							(() => {
								notify('error', {
									params: {
										title: 'Erreur',
										description: 'Impossible de vous inscrire à ce trajet',
									},
								});
							})
						}
					/>
				</View>
			) : (
				<ReturnButton />
			)}
			<ThemedText
				type='header3'
				style={detailTripStyles.title}
			>
				{trip &&
					new Date(trip.datetime).toLocaleDateString('fr-FR', {
						day: 'numeric',
						month: 'long',
						hour: 'numeric',
						minute: 'numeric',
					})}
			</ThemedText>
			<ThemedText
				type='header5'
				style={detailTripStyles.title}
			>
				{start && end && `${start.name} -> ${end.name}`}
			</ThemedText>
			<View style={detailTripStyles.labelContainer}>
				<TripLabel status={trip?.status ?? 'upcoming'} />
			</View>
			<View style={detailTripStyles.body}>
				<View style={detailTripStyles.mapContainer}>
					{start && end && trip?.points && trip?.points?.length > 0 && (
						<RouteMap
							start={start}
							end={end}
							waypoints={checkpoints ?? []}
							style={detailTripStyles.map}
						/>
					)}
					{Boolean(
						trip?.distance && vehicle?.consumption && trip?.datetime
					) && (
						<TripInfoLabel
							distance={trip?.distance ?? undefined}
							emission={
								trip?.distance && vehicle?.consumption
									? trip.distance * vehicle.consumption
									: 0
							}
							arrivalTime={
								trip?.datetime ? new Date(trip.datetime).getTime() : 0
							}
						/>
					)}
				</View>
				<View style={detailTripStyles.description}>
					<View style={detailTripStyles.userContainer}>
						<Pressable
							onPress={() => {
								router.push(`/profile/${driver?.id}`);
							}}
						>
							<Image
								source={
									driver?.id
										? { uri: `user/pp/${driver.id}.avif` }
										: require('@/assets/images/user-picture.jpg')
								}
								style={detailTripStyles.userImage}
							/>
						</Pressable>
						{trip?.driver?.username && (
							<ThemedText
								type='header5'
								style={detailTripStyles.driverName}
							>
								{trip?.driver?.username}
							</ThemedText>
						)}
					</View>
					<View style={detailTripStyles.descriptionBody}>
						{trip?.description && (
							<View style={detailTripStyles.descriptionText}>
								<ThemedText type='header6'>Description du trajet</ThemedText>
								<ThemedText>{trip.description}</ThemedText>
							</View>
						)}
						<View style={detailTripStyles.stars}>
							<ThemedText type={'bigger'}>{driver?.stars}</ThemedText>
							<Stars rating={driver?.stars as ratingType} />
						</View>
					</View>
				</View>

				<View style={detailTripStyles.complementaryInfos}>
					<ThemedText
						type={'header5'}
						style={detailTripStyles.titleInfos}
						color={'background'}
					>
						Infos complémentaires
					</ThemedText>
					<ThemedText
						type={'header6'}
						color={'background'}
					>
						{vehicle?.label}
					</ThemedText>
					{trip?.points.map((point) => (
						<ThemedText
							key={point.id}
							color={'background'}
						>
							- {point.location.name}
							{point.waitingTime > 0 &&
								` (${getHoursAndMinutes(point.waitingTime)})`}
						</ThemedText>
					))}
					{/*	Liste des points du trajet + temps d'attente */}
					{/*	 Temps de voyage */}
				</View>
			</View>
		</ScrollView>
	);
};

export default DetailedTripPage;
