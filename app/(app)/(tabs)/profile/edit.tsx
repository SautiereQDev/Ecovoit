import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { ThemedText } from '@/components/texts/ThemedText';
import CustomButton from '@/components/buttons/CustomButton';
import { User } from '@/types/Ecovoit';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useNotifications } from 'react-native-notificated';

export default function EditProfile() {
	const router = useRouter();
	const { notify } = useNotifications();

	// TODO : Utiliser des donnés dynamiques
	const [userData, setUserData] = useState<User>({
		id: 1,
		username: 'John Doe',
		email: 'johndoe@gmail.com',
		bio: "I'm a cool guy, I like to drive and meet new people. I'm always on time and I have a clean car.",
		firstName: 'John',
		lastName: 'Doe',
		rank: 'member',
		verified: true,
		vehicles: [],
		tripsAsDriver: [],
		tripsAsPassenger: [],
	});


	const handleSave = async () => {
		try {
			// Implement your update logic here
			await setUserData(userData);

			// Show success notification
			notify('success', {
				params: {
					title: 'Profil mis à jour',
					description: 'Vos informations ont été sauvegardées avec succès.',
				},
			});

			// Navigate back to profile
			router.back();
		} catch (error) {
			// Show error notification
			notify('error', {
				params: {
					title: 'Erreur',
					description:
						'Une erreur est survenue lors de la mise à jour du profil.',
				},
			});
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<ThemedText
					type={'header4'}
					style={styles.title}
				>
					Modifier votre profil
				</ThemedText>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Nom d'utilisateur</ThemedText>
					<TextInput
						style={styles.input}
						value={userData.username}
						onChangeText={(text) =>
							setUserData({ ...userData, username: text })
						}
						placeholder="Nom d'utilisateur"
					/>
				</View>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Prénom</ThemedText>
					<TextInput
						style={styles.input}
						value={userData.firstName}
						onChangeText={(text) =>
							setUserData({ ...userData, firstName: text })
						}
						placeholder='Prénom'
					/>
				</View>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Nom</ThemedText>
					<TextInput
						style={styles.input}
						value={userData.lastName}
						onChangeText={(text) =>
							setUserData({ ...userData, lastName: text })
						}
						placeholder='Nom'
					/>
				</View>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Email</ThemedText>
					<TextInput
						style={styles.input}
						value={userData.email}
						onChangeText={(text) => setUserData({ ...userData, email: text })}
						placeholder='Email'
						keyboardType='email-address'
					/>
				</View>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Biographie</ThemedText>
					<TextInput
						style={[styles.input, styles.multilineInput]}
						value={userData.bio}
						onChangeText={(text) => setUserData({ ...userData, bio: text })}
						placeholder='Parlez-nous de vous'
						multiline
						numberOfLines={4}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<CustomButton
						text={'Enregistrer'}
						onPress={handleSave}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'accentBackground'}
						buttonStyle={styles.button}
					/>
					<CustomButton
						text={'Annuler'}
						onPress={() => router.back()}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'disabledBackground'}
						buttonStyle={styles.button}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		padding: 16,
	},
	title: {
		textAlign: 'center',
		marginBottom: 20,
	},
	formGroup: {
		marginBottom: 15,
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.light.disabledBorder,
		borderRadius: 8,
		padding: 10,
		backgroundColor: Colors.light.background,
	},
	multilineInput: {
		height: 100,
		textAlignVertical: 'top',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	button: {
		width: '45%',
	},
});
