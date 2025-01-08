import React from 'react';
import DetailedTripPage from '@/components/pages/DetailledTripPage';
import { useLocalSearchParams } from 'expo-router';
import { useData } from '@/providers';
import { ErrorScreen, LoadingScreen } from '@/components/pages';

const Index = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { useTrip, useVehicleByUserByLabel, useUser } = useData();
	const { data: trips, isLoading, error: errorTrip } = useTrip(id);

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

	if (errorTrip) {
		return <ErrorScreen error={errorVehicle} />;
	}
	if (errorDriver) {
		return <ErrorScreen error={errorTrip} />;
	}
	if (errorVehicle) {
		return <ErrorScreen error={errorTrip} />;
	}

	if (isLoading || vehicleLoading || driverLoading) {
		return <LoadingScreen />;
	}

	return (
		<DetailedTripPage
			driver={driver}
			trip={trips}
			vehicle={vehicle}
		/>
	);
};
export default Index;
