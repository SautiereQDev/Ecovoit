import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useData } from '@/providers';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { ThemedText } from '@/components/texts';
import { Link, router } from 'expo-router';
import { TripCard } from '@/components/cards';
import { CustomButton } from '@/components/buttons';

export const Index = () => {
	const { useCurrentUserTrips } = useData();
	const { trips: userTrips, isLoading, error } = useCurrentUserTrips();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <ErrorScreen error={error} />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ThemedText
					type='header1'
					style={styles.title}
				>
					Ecovoit
				</ThemedText>
				<CustomButton
					text={'Chercher un covoiturage'}
					buttonStyle={styles.searchButton}
					// @ts-ignore
					onPress={() => router.push('/(app)/(tabs)/searchTrip')}
					textProps={{ color: 'background', type: 'header5' }}
				/>
				<ThemedText
					type='header3'
					style={styles.secondaryTitle}
				>
					Mes trajets effectués ou en cours 🌿
				</ThemedText>
				{userTrips && userTrips.length > 0 && (
					<FlatList
						data={userTrips}
						renderItem={({ item }) =>
							item ? (
								<Link
									href={`/(app)/DetailedTrip/[id]`}
									key={item.id}
								>
									<TripCard data={item} />
								</Link>
							) : null
						}
						keyExtractor={(item, index) => index.toString()}
						ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Index;

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
		paddingHorizontal: '7%',
		marginHorizontal: 'auto',
		borderRadius: 10,
	},
});
