import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Pressable,
	ScrollView,
	View,
} from 'react-native';
import { useSession } from '@/context/SessionProvider';
import { IconButton, ThemedText } from '@/components';
import GetImage from '@/components/modal/GetImage';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import { useRouter } from 'expo-router';
import { useProfile } from '@/context/ProfileProvider';
import { ProfileCompletion } from '@/components/ProfileCompletion';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { profileStyles } from '@/styles/profile';
import { axiosInstance } from '@/app/_layout';

export function Profile() {
	const [showModal, setShowModal] = useState<boolean>(false);

	const { signOut, isLoading } = useSession();
	const { user, setProfileImage } = useProfile();

	const { getMissingFields } = useProfileCompletion();
	const missingFields = getMissingFields();

	const router = useRouter();

	useEffect(() => {
		axiosInstance
			.get('https://api-ev-qq.pimous.dev/users/me', {
				headers: { Authorization: '5877943231555567616' },
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator
					size={'large'}
					animating
				/>
				<ThemedText>Loading...</ThemedText>
			</View>
		);
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
				<GetImage
					visible={showModal}
					onClose={() => setShowModal(false)}
					setImage={setProfileImage}
				/>
				<Pressable onPress={() => setShowModal(true)}>
					<Image
						source={
							user.profilePicture
								? { uri: user.profilePicture }
								: require('@/assets/images/user-picture.jpg')
						}
						style={profileStyles.profilePicture}
					/>
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
						A propos de {user?.firstName}
					</ThemedText>
					<ThemedText style={profileStyles.biographyText}>
						{user.bio ? user?.bio : "Salut, je suis nouveau sur l'application"}
					</ThemedText>
				</View>
				{/*TODO: Afficher un message si tous les champs ne sont pas remplis pour la premièrte fois*/}
				{missingFields.length > 0 && <ProfileCompletion />}
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
