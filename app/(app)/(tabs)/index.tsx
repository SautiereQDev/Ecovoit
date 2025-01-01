import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useData } from '@/providers';
import { ErrorScreen, LoadingPage } from '@/components/pages';

export default function Index() {
	const { useUser, useCurrentUserTrips } = useData();
	// const { data, isLoading, isError } = useUser('me');
	const { data, isLoading, isError } = useCurrentUserTrips();

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <ErrorScreen />;
	}

	if (!isLoading) {
		console.log(data);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				{/*<ThemedText*/}
				{/*	type='header1'*/}
				{/*	color='primary'*/}
				{/*	style={styles.title}*/}
				{/*>*/}
				{/*	Ecovoit*/}
				{/*</ThemedText>*/}
				{/*<Link*/}
				{/*	href={'/(app)/(tabs)/searchTrip/search'}*/}
				{/*	style={styles.searchButton}*/}
				{/*>*/}
				{/*	<ThemedText*/}
				{/*		color='background'*/}
				{/*		type='header5'*/}
				{/*		style={{ textAlign: 'center' }}*/}
				{/*	>*/}
				{/*		Chercher un covoiturage*/}
				{/*	</ThemedText>*/}
				{/*</Link>*/}
				{/*<ThemedText*/}
				{/*	type='header3'*/}
				{/*	style={styles.secondaryTitle}*/}
				{/*>*/}
				{/*	Mes trajets effectués ou en cours 🌿*/}
				{/*</ThemedText>*/}
				{/*{data?.tripsAsDriver.length === 0 && (*/}
				{/*	<FlatList*/}
				{/*		data={}*/}
				{/*		renderItem={({ item }) => <TripCard data={item} />}*/}
				{/*		keyExtractor={(item, index) => index.toString()}*/}
				{/*		ItemSeparatorComponent={() => <View style={{ height: 20 }} />}*/}
				{/*	/>*/}
				{/*)}*/}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light.background,
	},
	title: {
		marginBottom: '3%',
		textAlign: 'center',
	},
	content: {
		display: 'flex',
		gap: 10,
		marginTop: '2%',
		maxWidth: '85%',
		marginHorizontal: 'auto',
	},
	secondaryTitle: {
		marginVertical: '5%',
	},
	searchButton: {
		backgroundColor: Colors.light.primary,
		paddingVertical: '3%',
		maxWidth: '90%',
		marginHorizontal: 'auto',
		borderRadius: 10,
	},
});
