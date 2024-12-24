import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedText, TripCard } from '@/components';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TripCardType } from '@/types';
import { Link } from 'expo-router';

export default function Index() {
	const [displayedCards, setDisplayedCards] = useState<TripCardType[]>([
		{
			depart: 'Super U',
			destination: 'Chez Auguste',
			status: 'current',
			nom: 'Thomas',
			date: '12/12/2024',
		},
		{
			depart: 'Super U',
			destination: 'Chez Auguste',
			status: 'completed',
			nom: 'Thomas',
			date: '12/12/2021',
		},
		{
			depart: 'Super U',
			destination: 'Chez Auguste',
			status: 'completed',
			nom: 'Thomas',
			date: '12/12/2021',
		},
		{
			depart: 'Super U',
			destination: 'Chez Auguste',
			status: 'completed',
			nom: 'Thomas',
			date: '12/12/2024',
		},
	]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ThemedText
					type='header1'
					color='primary'
					style={styles.title}
				>
					Ecovoit
				</ThemedText>
				<Link
					href={'/(app)/(tabs)/searchTrip/search'}
					style={styles.searchButton}
				>
					<ThemedText
						color='background'
						type='header5'
						style={{ textAlign: 'center' }}
					>
						Chercher un covoiturage
					</ThemedText>
				</Link>
				<ThemedText
					type='header3'
					style={styles.secondaryTitle}
				>
					Mes trajets effectués ou en cours 🌿
				</ThemedText>
				<FlatList
					data={displayedCards}
					renderItem={({ item }) => <TripCard data={item} />}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light.background,
	},
	title: {
		marginBottom: "3%",
		textAlign: 'center',
	},
	content: {
		display: 'flex',
		gap: 10,
		marginTop: "2%",
		maxWidth: '85%',
		marginHorizontal: 'auto',
	},
	secondaryTitle: {
		marginVertical: "5%",
	},
	searchButton: {
		backgroundColor: Colors.light.primary,
		paddingVertical: "3%",
		maxWidth: '90%',
		marginHorizontal: 'auto',
		borderRadius: 10,
	},
});
