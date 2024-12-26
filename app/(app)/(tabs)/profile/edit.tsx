import React from 'react';
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
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useNotifications } from 'react-native-notificated';
import { useProfile } from '@/context/ProfileProvider';

export default function EditProfile() {
	const router = useRouter();
	const { notify } = useNotifications();
	const {user, setUser} = useProfile();

	const handleSave = () => {
		router.back();

		notify('success', {
			params: {
				title: 'Profil mis à jour',
				description: 'Vos informations ont été sauvegardées avec succès.',
			},
		});
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
						// @ts-ignore
						value={user.username}
						onChangeText={(text) =>
							setUser({ ...user, username: text })
						}
						placeholder="Nom d'utilisateur"
					/>
				</View>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Prénom</ThemedText>
					<TextInput
						style={styles.input}
						// @ts-ignore
						value={user.firstName}
						onChangeText={(text) =>
							setUser({ ...user, firstName: text })
						}
						placeholder='Prénom'
					/>
				</View>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Nom</ThemedText>
					<TextInput
						style={styles.input}
						// @ts-ignore
						value={user.lastName}
						onChangeText={(text) =>
							setUser({ ...user, lastName: text })
						}
						placeholder='Nom'
					/>
				</View>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Email</ThemedText>
					<TextInput
						style={styles.input}
						// @ts-ignore
						value={user.email}
						onChangeText={(text) =>
							setUser({ ...user, email: text })
						}
						placeholder='Email'
						keyboardType='email-address'
					/>
				</View>

				<View style={styles.formGroup}>
					<ThemedText type={'defaultBody'}>Biographie</ThemedText>
					<TextInput
						style={[styles.input, styles.multilineInput]}
						// @ts-ignore
						value={user.bio}
						onChangeText={(text) =>
							setUser({ ...user, bio: text })
						}
						placeholder='Parlez-nous de vous'
						multiline
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
		maxWidth: '85%',
		marginHorizontal: 'auto',
	},
	scrollContainer: {
		flexGrow: 1,
		padding: "3%",
	},
	title: {
		textAlign: 'center',
		marginVertical: "10%",
	},
	formGroup: {
		marginBottom: "5%",
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.light.disabledBorder,
		borderRadius: 8,
		padding: "3%",
		backgroundColor: Colors.light.background,
	},
	multilineInput: {
		height: 100,
		textAlignVertical: 'top',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: "5%",
	},
	button: {
		width: '45%',
	},
});
