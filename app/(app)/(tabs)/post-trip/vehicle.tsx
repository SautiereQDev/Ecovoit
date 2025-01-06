import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { ThemedText } from '@/components/texts';
import { globalStyles } from '@/styles';
import { CustomButton, ReturnButton } from '@/components/buttons';
import { VehicleCard } from '@/components/cards';
import { useData, usePostTrip } from '@/providers';
import { ErrorScreen, LoadingScreen } from '@/components/pages';
import { ThemedInput } from '@/components/inputs';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router } from 'expo-router';

const schema = z.object({
	seats: z.number().int().min(1),
});

export const Vehicle = () => {
	// TODO: Afficher une modal pour demander si il souhaite ajouter une description
	//  TODO: Recuperer les vehicle de l'utilisateur et les afficher sous forme de cards cliquable comme dans le profil

	// Choix du vehicle + selection du nombre de siège

	const { postTripQuery, setPostTripQuery } = usePostTrip();

	const { useCurrentUserVehicles } = useData();
	const { data: vehicles, error, isLoading } = useCurrentUserVehicles();

	const [selectedVehicle, setSelectedVehicle] = React.useState<string | null>(
		null
	);

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<{
		seats: number;
	}>({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		setSelectedVehicle(vehicles?.[0].label ?? null);
	}, [isLoading, vehicles]);

	const submit = (data: { seats: number }) => {
		if (!selectedVehicle) throw new Error('No vehicle selected');
		setPostTripQuery({
			...postTripQuery,
			vehicle: selectedVehicle,
			seats: data.seats,
		});
		console.log(postTripQuery);
		// @ts-ignore
		router.push('post-trip/description');
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <ErrorScreen error={error} />;
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
				<View style={styles.seatContainer}>
					<ThemedText
						type={'header4'}
						style={globalStyles.title}
					>
						Nombre de sièges disponibles
					</ThemedText>
					<Controller
						render={({ field: { onChange, onBlur, value } }) => (
							<ThemedInput
								keyboardType={'number-pad'}
								style={styles.seats}
								size={'large'}
								textAlign={'center'}
								onBlur={onBlur}
								onChangeText={(text) => onChange(parseInt(text, 10))}
								value={value ? value.toString() : ''}
								hasError={!!errors.seats}
								errorMessage={errors.seats?.message}
							/>
						)}
						name={'seats'}
						control={control}
					/>
				</View>
				<CustomButton
					text={'Créer le trajet'}
					textProps={{ color: 'background' }}
					buttonStyle={{ width: '70%' }}
					onPress={handleSubmit(submit)}
					disabled={!selectedVehicle || watch('seats') === 0}
				/>
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
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '3%',
		marginBottom: '20%',
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
