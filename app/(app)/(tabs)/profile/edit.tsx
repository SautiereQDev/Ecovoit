import React from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/texts/ThemedText';
import CustomButton from '@/components/buttons/CustomButton';
import { useRouter } from 'expo-router';
import { useNotifications } from 'react-native-notificated';
import { profileStyles } from '@/styles/profile';
import { ReturnButton } from '@/components/buttons/ReturnButton';

export default function EditProfile() {
	const router = useRouter();
	const { notify } = useNotifications();
	const { user, setUser } = useProfile();

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
			style={profileStyles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={profileStyles.container}>
				<ReturnButton />
				<ThemedText
					type={'header4'}
					style={profileStyles.title}
				>
					Modifier votre profil
				</ThemedText>

				<View style={profileStyles.formGroup}>
					<ThemedText type={'defaultBody'}>Nom d'utilisateur</ThemedText>
					<TextInput
						style={profileStyles.input}
						// @ts-ignore
						value={user.username}
						onChangeText={(text) => setUser({ ...user, username: text })}
						placeholder="Nom d'utilisateur"
					/>
				</View>

				<View style={profileStyles.formGroup}>
					<ThemedText type={'defaultBody'}>Prénom</ThemedText>
					<TextInput
						style={profileStyles.input}
						// @ts-ignore
						value={user.firstName}
						onChangeText={(text) => setUser({ ...user, firstName: text })}
						placeholder='Prénom'
					/>
				</View>

				<View style={profileStyles.formGroup}>
					<ThemedText type={'defaultBody'}>Nom</ThemedText>
					<TextInput
						style={profileStyles.input}
						// @ts-ignore
						value={user.lastName}
						onChangeText={(text) => setUser({ ...user, lastName: text })}
						placeholder='Nom'
					/>
				</View>

				<View style={profileStyles.formGroup}>
					<ThemedText type={'defaultBody'}>Email</ThemedText>
					<TextInput
						style={profileStyles.input}
						// @ts-ignore
						value={user.email}
						onChangeText={(text) => setUser({ ...user, email: text })}
						placeholder='Email'
						keyboardType='email-address'
					/>
				</View>

				<View style={profileStyles.formGroup}>
					<ThemedText type={'defaultBody'}>Biographie</ThemedText>
					<TextInput
						style={[profileStyles.input, profileStyles.multilineInput]}
						// @ts-ignore
						value={user.bio}
						onChangeText={(text) => setUser({ ...user, bio: text })}
						placeholder='Parlez-nous de vous'
						multiline
					/>
				</View>

				<View style={profileStyles.buttonContainer}>
					<CustomButton
						text={'Enregistrer'}
						onPress={handleSave}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'accentBackground'}
						buttonStyle={profileStyles.button}
					/>
					<CustomButton
						text={'Annuler'}
						onPress={() => router.back()}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'disabledBackground'}
						buttonStyle={profileStyles.button}
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
