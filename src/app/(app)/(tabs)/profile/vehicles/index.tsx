import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/src/components';
import { Vehicle } from '@/src/types';
import VehicleCard from '@/src/components/cards/VehicleCard';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import VehicleMenu from '@/src/components/modal/VehicleMenu';
import ReturnButton from '@/src/components/buttons/ReturnButton';
import { vehiclesStyles } from '@/src/styles/vehicles';

const Index = () => {
	const newVehicle = () => {
		router.push('/profile/vehicles/add');
	};

	const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
	const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const [selectedVehicleLabel, setSelectedVehicleLabel] = useState<string>('');

	const [voitures, setVoitures] = useState<Vehicle[]>([
		{
			owner: '123e4567-e89b-12d3-a456-426614174000',
			label: 'Peugeot 208',
			consumption: 5.6,
			emission: 120,
		},
		{
			owner: '123e4567-e89b-12d3-a456-426614174000',
			label: 'Renault Clio',
			consumption: 6.2,
			emission: 130,
		},
		{
			owner: '123e4567-e89b-12d3-a456-426614174000',
			label: 'Volkswagen Polo',
			consumption: 5.9,
			emission: 127,
		},
	]);

	const handleLongPress = (event: any, label: string) => {
		const { pageX, pageY } = event.nativeEvent;
		setMenuPosition({ x: pageX, y: pageY });
		setSelectedVehicleLabel(label);
		setMenuVisibility(true);
	};

	return (
		<SafeAreaView style={vehiclesStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header3'}
				style={vehiclesStyles.title}
			>
				Mes voitures
			</ThemedText>
			<View style={vehiclesStyles.carsContainer}>
				{voitures.map((voiture: Vehicle) => (
					<Pressable
						onLongPress={(event) => handleLongPress(event, voiture.label)}
						key={voiture.label}
					>
						<VehicleCard
							vehicle={voiture}
							style={vehiclesStyles.carCard}
						/>
					</Pressable>
				))}
				<VehicleMenu
					visible={menuVisibility}
					onClose={() => setMenuVisibility(false)}
					position={menuPosition}
					label={selectedVehicleLabel}
				/>
			</View>
			<Pressable onPress={newVehicle}>
				{voitures.length < 4 && (
					<View style={vehiclesStyles.addButton}>
						<ThemedText type={'accent'}>Ajouter un véhicule</ThemedText>
						<FontAwesome6
							name='add'
							size={24}
							color='black'
							style={vehiclesStyles.addIcon}
						/>
					</View>
				)}
			</Pressable>
		</SafeAreaView>
	);
};
export default Index;

const styles = StyleSheet.create({
	title: {
		marginTop: '5%',
		textAlign: 'center',
	},
	carsContainer: {
		marginTop: '10%',
	},
	cars: {
		marginRight: 'auto',
		minWidth: '55%',
		marginTop: '5%',
	},
	addButton: {
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		maxWidth: '55%',
		height: '34%',
		marginTop: '5%',
	},
	addIcon: {
		textAlign: 'center',
		marginVertical: 'auto',
	},
});
