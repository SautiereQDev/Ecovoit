import React, { useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
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

export default function Profile() {
	const [showModal, setShowModal] = useState<boolean>(false);

	const { signOut, isLoading } = useSession();
	const { user, profileImage, setProfileImage } = useProfile();

	const { getMissingFields } = useProfileCompletion();
	const missingFields = getMissingFields();

	const router = useRouter();

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

	console.log('user', user);

	return (
		<View style={globalStyle.container}>
			<ThemedText
				type={'header3'}
				style={globalStyle.title}
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
							profileImage
								? { uri: profileImage }
								: require('@/assets/images/user-picture.jpg')
						}
						style={globalStyle.profilePicture}
					/>
				</Pressable>
				<ThemedText
					type={'header6'}
					style={globalStyle.username}
				>
					{user?.username}
				</ThemedText>
				<View style={globalStyle.biographie}>
					<ThemedText
						type={'header6'}
						style={globalStyle.biographieText}
					>
						A propos de {user?.firstName}
					</ThemedText>
					<ThemedText style={globalStyle.biographieText}>
						{user.bio ? user?.bio : "Salut, je suis nouveau sur l'application"}
					</ThemedText>
				</View>
				{missingFields.length > 0 && <ProfileCompletion />}
				<IconButton
					lib='FontAwesome'
					// @ts-ignore
					name='car'
					size={24}
					color={Colors.light.text}
					buttonStyle={globalStyle.carButton}
					onPress={() => router.push('/profile/vehicles')}
				/>
				<View style={globalStyle.data}>
					<View style={globalStyle.cell}>
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
					<View style={globalStyle.verticalSeparator} />
					<View style={globalStyle.cell}>
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
					<View style={globalStyle.verticalSeparator} />
					<View style={globalStyle.cell}>
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
				<View style={globalStyle.buttons}>
					<CustomButton
						text={'Modifier'}
						onPress={() => router.push('/profile/edit')}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'accentBackground'}
						buttonStyle={globalStyle.button}
					/>
					<CustomButton
						text={'Déconnexion'}
						onPress={signOut}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'accentBackground'}
						buttonStyle={globalStyle.button}
					/>
				</View>
			</View>
		</View>
	);
}

export const globalStyle = StyleSheet.create({
	container: {
		flex: 1,
		padding: '7.5%',
		backgroundColor: Colors.light.background,
	},
	title: {
		textAlign: 'center',
		marginTop: '5%',
	},
	profilePicture: {
		borderRadius: 9999,
		height: 100,
		aspectRatio: 1,
		alignSelf: 'center',
		marginTop: '8%',
	},
	username: {
		textAlign: 'center',
		marginTop: '2%',
	},
	biographie: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: Colors.light.accentBackground,
		marginVertical: '5%',
		paddingVertical: '3%',
		borderRadius: 10,
		gap: 5,
	},
	biographieText: {
		textAlign: 'center',
	},
	missingFields: {
		marginTop: '5%',
	},
	data: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginHorizontal: 'auto',
		marginTop: '10%',
		marginBottom: '10%',
	},
	cell: {
		flex: 1,
		marginHorizontal: 'auto',
	},
	verticalSeparator: {
		width: 1,
		backgroundColor: Colors.light.disabledBorder,
		marginHorizontal: 10,
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		margin: 'auto',
		gap: 40,
		marginTop: '5%',
	},
	button: {
		width: 'auto',
		paddingHorizontal: '10%',
	},
	carButton: {
		alignSelf: 'flex-start',
		marginTop: '10%',
		marginLeft: '5%',
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.light.disabledBorder,
		padding: '3%',
	},
});
