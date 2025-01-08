import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useData } from '@/providers';
import {
	DetailedTripPage,
	ErrorScreen,
	LoadingScreen,
} from '@/components/pages';
import { notify } from 'react-native-notificated';

const JoinTripPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { useTrip, useVehicleByUserByLabel, useUser, useAddPassengerToTrip } =
		useData();
	const { data: trips, isLoading, error: errorTrip } = useTrip(id);
	const addPassengerToTrip = useAddPassengerToTrip();

	const {
		data: vehicle,
		isLoading: vehicleLoading,
		error: errorVehicle,
	} = useVehicleByUserByLabel(trips?.driver?.id!, trips?.vehicle!);

	const {
		data: driver,
		isLoading: driverLoading,
		error: errorDriver,
	} = useUser(trips?.driver?.id!);

	const handleSubscribe = () => {
		addPassengerToTrip.mutate(
			{ tripId: id },
			{
				onError: (error) => {
					console.error(error);
					if (error.status === 409) {
						notify('error', {
							params: {
								title: 'Erreur',
								description: 'Vous êtes déjà inscrit à ce trajet',
							},
						});
						router.push('/');
					} else {
						notify('error', {
							params: {
								title: 'Erreur',
								description: `Une erreur est survenue lors de l'opration`,
							},
						});
					}
				},
				onSuccess: () => {
					notify('success', {
						params: {
							title: 'Opération effectué',
							description: 'Vous avez été ajouté au trajet avec succès',
						},
					});
					router.push('/');
				},
			}
		);
	};

	if (errorTrip) {
		return <ErrorScreen error={errorTrip} />;
	}
	if (errorDriver) {
		return <ErrorScreen error={errorDriver} />;
	}
	if (errorVehicle) {
		return <ErrorScreen error={errorVehicle} />;
	}

	if (isLoading || vehicleLoading || driverLoading) {
		return <LoadingScreen />;
	}

	return (
		<DetailedTripPage
			trip={trips}
			vehicle={vehicle}
			driver={driver}
			handleSubscribe={handleSubscribe}
		/>
	);
};

export default JoinTripPage;
