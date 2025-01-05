import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/texts';
import { globalStyles } from '@/styles';
import { IconButton, ReturnButton } from '@/components/buttons';
import { VehicleCard } from '@/components/cards';
import { useData } from '@/providers';
import { LoadingScreen } from '@/components/pages';
import { ThemedInput } from '@/components/inputs';

export const Vehicle = () => {
	// TODO: Afficher une modal pour demander si il souhaite ajouter une description
	//  TODO: Recuperer les vehicle de l'utilisateur et les afficher sous forme de cards cliquable comme dans le profil

	// Choix du vehicle + selection du nombre de siège

	const { useCurrentUserVehicles } = useData();
	const { data: vehicles, error, isLoading } = useCurrentUserVehicles();

	const [selectedVehicle, setSelectedVehicle] = React.useState<string | null>(
		null
	);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<View style={globalStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header4'}
				style={[globalStyles.title, { marginTop: '10%' }]}
			>
				Selection du vehicle
			</ThemedText>
			<View style={styles.carsSelection}>
				{vehicles?.map((vehicle) => (
					<Pressable
						key={vehicle.label}
						onPress={() => setSelectedVehicle(vehicle.label)}
						style={styles.carsCard}
					>
						<VehicleCard
							vehicle={vehicle}
							isSelected={
								!!selectedVehicle && selectedVehicle === vehicle.label
							}
						/>
					</Pressable>
				))}
				<View>
					<ThemedText
						type={'header4'}
						style={globalStyles.title}
					>
						Nombre de sièges disponibles
					</ThemedText>
					<View style={styles.seatContainer}>
						<IconButton
							size={24}
							name={'arrow-left'}
							style={styles.arrowButton}
						/>
						<ThemedInput
							keyboardType={'number-pad'}
							style={styles.seats}
							size={'large'}
						/>
						<IconButton
							size={24}
							name={'arrow-right'}
							style={styles.arrowButton}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Vehicle;

const styles = StyleSheet.create({
	carsSelection: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		gap: 5,
	},
	carsCard: {
		marginVertical: '3%',
		maxWidth: '45%',
	},
	seatContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '3%',
	},
	seats: {
		width: '30%',
		margin: 'auto',
	},
	arrowButton: {
		borderWidth: 1,
		borderColor: 'black',
		padding: 10,
		borderRadius: 10,
	},
});
