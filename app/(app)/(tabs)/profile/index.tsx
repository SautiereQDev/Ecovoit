import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { CustomButton, IconButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { useRouter } from 'expo-router';
import { useData, useSession } from '@/providers';
import { profileStyles } from '@/styles';
import { Colors } from '@/constants';
import { ErrorScreen, LoadingScreen } from '@/components/pages';

export function Profile() {
	const [showModal, setShowModal] = useState<boolean>(false);

	const { signOut, isLoading: sessionLoading } = useSession();

	const { useUser } = useData();
	const { data: user, isLoading, error } = useUser('me');

	console.log('user', user);

	const router = useRouter();

	if (sessionLoading ?? isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <ErrorScreen error={error} />;
	}

	return (
		<ScrollView style={profileStyles.container}>
			<ThemedText
				type={'header3'}
				style={profileStyles.title}
			>
				Votre profile
			</ThemedText>
			<View>
				{/*<GetImage*/}
				{/*	visible={showModal}*/}
				{/*	onClose={() => setShowModal(false)}*/}
				{/*	setImage={setProfileImage}*/}
				{/*/>*/}
				<Pressable onPress={() => setShowModal(true)}>
					{/*<Image*/}
					{/*	source={*/}
					{/*		user.profilePicture*/}
					{/*			? { uri: user.profilePicture }*/}
					{/*			: require('@/assets/images/user-picture.jpg')*/}
					{/*	}*/}
					{/*	style={profileStyles.profilePicture}*/}
					{/*/>*/}
				</Pressable>
				<ThemedText
					type={'header6'}
					style={profileStyles.username}
				>
					{user?.username}
				</ThemedText>
				<View style={profileStyles.biography}>
					<ThemedText
						type={'header6'}
						style={profileStyles.biographyText}
					>
						A propos de {user?.username}
					</ThemedText>
					<ThemedText style={profileStyles.biographyText}>
						{user?.bio ? user?.bio : "Salut, je suis nouveau sur l'application"}
					</ThemedText>
				</View>
				{/*TODO: Afficher un message si tous les champs ne sont pas remplis pour la premièrte fois*/}
				{/*{missingFields.length > 0 && <ProfileCompletion />}*/}
				<IconButton
					lib='FontAwesome'
					// @ts-ignore
					name='car'
					size={24}
					color={Colors.light.text}
					buttonStyle={profileStyles.carButton}
					onPress={() => router.push('/profile/vehicles')}
				/>
				<View style={profileStyles.stats}>
					<View style={profileStyles.statCell}>
						<ThemedText
							type={'accent'}
							style={{ textAlign: 'center' }}
						>
							Kilomètres parcourus
						</ThemedText>
						<ThemedText
							type={'defaultBody'}
							style={{ textAlign: 'center' }}
						>
							843km
						</ThemedText>
					</View>
					<View style={profileStyles.separator} />
					<View style={profileStyles.statCell}>
						<ThemedText
							type={'accent'}
							style={{ textAlign: 'center' }}
						>
							Nombre de passagers
						</ThemedText>
						<ThemedText
							type={'defaultBody'}
							style={{ textAlign: 'center' }}
						>
							123
						</ThemedText>
					</View>
					<View style={profileStyles.separator} />
					<View style={profileStyles.statCell}>
						<ThemedText
							type={'accent'}
							style={{ textAlign: 'center' }}
						>
							Note moyenne
						</ThemedText>
						<ThemedText
							type={'defaultBody'}
							style={{ textAlign: 'center' }}
						>
							4.56
						</ThemedText>
					</View>
				</View>
				<View style={profileStyles.buttonContainer}>
					<CustomButton
						text={'Modifier'}
						onPress={() => router.push('/profile/edit')}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'accentBackground'}
						buttonStyle={profileStyles.button}
					/>
					<CustomButton
						text={'Déconnexion'}
						onPress={signOut}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'accentBackground'}
						buttonStyle={profileStyles.button}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

export default Profile;
