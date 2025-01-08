import React, { useState } from 'react';
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	View,
} from 'react-native';
import { ThemedText } from '@/components/texts/ThemedText';
import { useRouter } from 'expo-router';
import { useNotifications } from 'react-native-notificated';
import { profileStyles } from '@/styles/profile';
import { useData } from '@/providers';

export default function EditProfile() {
	const [tempUser, setTempUser] = useState<GetUserType | undefined>(undefined);

	const router = useRouter();
	const { notify } = useNotifications();
	const { useUser } = useData();
	const { data: user, isLoading: loading } = useUser('me');

	// useEffect(() => {
	// 	if (!loading) {
	// 		setTempUser(user);
	// 	}
	// }, [loading, user]);

	const handleSave = () => {
		router.back();
		notify('success', {
			params: {
				title: 'Profil mis à jour',
				description: 'Vos informations ont été sauvegardées avec succès.',
			},
		});
	};

	if (loading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator
					size='large'
					animating
				/>
				<ThemedText>Loading...</ThemedText>
			</View>
		);
	}

	if (!user) {
		return (
			<View>
				<ThemedText>
					Impossible de lire les données, veuillez réssayer plutard
				</ThemedText>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={profileStyles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ThemedText>Not implemented on backend...</ThemedText>
			{/*<View style={profileStyles.container}>*/}
			{/*	<ReturnButton />*/}
			{/*	<ThemedText*/}
			{/*		type={'header4'}*/}
			{/*		style={profileStyles.title}*/}
			{/*	>*/}
			{/*		Modifier votre profil*/}
			{/*	</ThemedText>*/}

			{/*	<View style={profileStyles.formGroup}>*/}
			{/*		<ThemedText type={'defaultBody'}>Nom d'utilisateur</ThemedText>*/}
			{/*		<TextInput*/}
			{/*			style={profileStyles.input}*/}
			{/*			// @ts-ignore*/}
			{/*			value={tempUser.username}*/}
			{/*			onChangeText={(text) => setTempUser({ ...user, username: text })}*/}
			{/*			placeholder="Nom d'utilisateur"*/}
			{/*		/>*/}
			{/*	</View>*/}
			{/*	<View style={profileStyles.formGroup}>*/}
			{/*		<ThemedText type={'defaultBody'}>Biographie</ThemedText>*/}
			{/*		<TextInput*/}
			{/*			style={[profileStyles.input, profileStyles.multilineInput]}*/}
			{/*			// @ts-ignore*/}
			{/*			value={tempUser.bio}*/}
			{/*			onChangeText={(text) => setTempUser({ ...user, bio: text })}*/}
			{/*			placeholder='Parlez-nous de vous'*/}
			{/*			multiline*/}
			{/*		/>*/}
			{/*	</View>*/}

			{/*	<View style={profileStyles.buttonContainer}>*/}
			{/*		<CustomButton*/}
			{/*			text={'Enregistrer'}*/}
			{/*			onPress={handleSave}*/}
			{/*			textProps={{ type: 'defaultBody' }}*/}
			{/*			backgroundColor={'accentBackground'}*/}
			{/*			buttonStyle={profileStyles.button}*/}
			{/*		/>*/}
			{/*		<CustomButton*/}
			{/*			text={'Annuler'}*/}
			{/*			onPress={() => router.back()}*/}
			{/*			textProps={{ type: 'defaultBody' }}*/}
			{/*			backgroundColor={'disabledBackground'}*/}
			{/*			buttonStyle={profileStyles.button}*/}
			{/*		/>*/}
			{/*	</View>*/}
			{/*</View>*/}
		</KeyboardAvoidingView>
	);
}
