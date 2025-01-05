import { Pressable, SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/texts';
import { VehicleCard } from '@/components/cards';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { VehicleMenu } from '@/components/modals';
import { ReturnButton } from '@/components/buttons';
import { vehiclesStyles } from '@/styles/vehicles';
import { useData } from '@/providers';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { EVAPI } from '@ecovoit-api/mock-adapter';

const Index = () => {
	const newVehicle = () => {
		router.push('/profile/vehicles/new_vehicle');
	};

	const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
	const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const [selectedVehicleLabel, setSelectedVehicleLabel] = useState<string>('');

	const handleLongPress = (event: any, label: string) => {
		const { pageX, pageY } = event.nativeEvent;
		setMenuPosition({ x: pageX, y: pageY });
		setSelectedVehicleLabel(label);
		setMenuVisibility(true);
	};

	const { useCurrentUserVehicles } = useData();
	const { data: voitures, isLoading, error } = useCurrentUserVehicles();

	if (error) {
		return <ErrorScreen error={error} />;
	}

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<SafeAreaView style={vehiclesStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header3'}
				style={vehiclesStyles.title}
			>
				Mes voitures
			</ThemedText>
			{voitures && voitures?.length > 0 && (
				<View style={vehiclesStyles.carsContainer}>
					{voitures.map((voiture: EVAPI.Vehicle) => (
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
			)}
			<Pressable onPress={newVehicle}>
				{voitures && voitures?.length < 4 && (
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
