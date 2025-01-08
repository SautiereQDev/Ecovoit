import { postTrip } from '@/api';
import { usePostTrip } from '@/providers';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Button,
	Pressable,
} from 'react-native';

export default function Confirm() {
	const { trip, setDescription, setVehicle, postTrip, resetTrip } =
		usePostTrip();

	const [vehicles, setVehicles] = useState([]);

	useEffect(() => {
		fetch(`https://api-ev-qq.pimous.dev/vehicles/5877943231555567616`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setVehicles(data);
				setVehicle(data[0].label);
			});
	}, []);

	const handleConfirm = () => {
		postTrip().then((data) => {
			console.log(data);
			resetTrip();
			router.dismissAll();
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Confirmation du voyage</Text>
			<View style={styles.infoContainer}>
				<Text style={styles.label}>Date et heure:</Text>
				<Text style={styles.value}>
					{new Date(trip.datetime).toLocaleString()}
				</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.label}>Véhicule:</Text>
				{vehicles ? (
					vehicles.map((v, index) => (
						<Pressable
							key={index}
							onPress={() => {
								setVehicle(v.label);
								console.log(v.label);
							}}
						>
							<Text>{v.label}</Text>
						</Pressable>
					))
				) : (
					<Text>Chargement...</Text>
				)}
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.label}>Nombre de sièges:</Text>
				<Text style={styles.value}>{trip.seats}</Text>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.label}>Description:</Text>
				<TextInput
					style={styles.input}
					value={trip.description}
					onChangeText={setDescription}
					placeholder='Entrez une description'
				/>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.label}>Points:</Text>
				{trip.points.map((p, index) => (
					<Text
						key={index}
						style={styles.value}
					>
						{p.type === 'start' ? 'Départ' : 'Arrivée'} : {p.locationName}
					</Text>
				))}
			</View>
			<Button
				title='Confirmer'
				onPress={handleConfirm}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	infoContainer: {
		marginBottom: 15,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	value: {
		fontSize: 16,
		color: '#333',
	},
	picker: {
		height: 50,
		width: '100%',
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		paddingHorizontal: 10,
		marginTop: 5,
	},
});
