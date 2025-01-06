import React from 'react';
import DetailedTrip from '@/components/pages/DetailledTripPage';
import { useLocalSearchParams } from 'expo-router';

const DetailedTripPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	return <DetailedTrip tripId={id} />;
};

export default DetailedTripPage;
