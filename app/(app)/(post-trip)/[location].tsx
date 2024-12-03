import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import PostTrip from '../(tabs)/post-trip';
import PostTripLayout from '@/components/layouts/PostTripLayout';
import Map from '@/components/map/Map';

export default function Location() {
	const { location } = useLocalSearchParams();
	return (
		<PostTripLayout>
			<Map style={{ width: '100%', height: '100%' }} />
		</PostTripLayout>
	);
}

const styles = StyleSheet.create({});
