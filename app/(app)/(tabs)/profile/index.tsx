import React, { useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	View,
} from 'react-native';
import { useSession } from '@/context/SessionProvider';
import { ThemedText } from '@/components';
import GetImage from '@/components/modal/GetImage';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import { useRouter } from 'expo-router';
import { useProfile } from '@/context/ProfileProvider';
import ProfileCompletion from '@/components/ProfileCompletion';

export default function Profile() {
	const [showModal, setShowModal] = useState<boolean>(false);

	const { signOut, isLoading } = useSession();
	const { user, profileImage, setProfileImage, checkMissingFields } =
		useProfile();

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
		<View style={styles.container}>
			<ThemedText
				type={'header3'}
				style={styles.title}
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
						style={styles.profilePicture}
					/>
				</Pressable>
				<ThemedText
					type={'header6'}
					style={styles.username}
				>
					{user?.username}
				</ThemedText>
				{user?.bio ? (
					<View style={styles.biographie}>
						<ThemedText
							type={'header6'}
							style={styles.biographieText}
						>
							A propos de {user?.firstName}
						</ThemedText>
						<ThemedText style={styles.biographieText}>{user?.bio}</ThemedText>
					</View>
				) : (
					<ProfileCompletion missingFields={checkMissingFields} />
				)}
				<View style={styles.data}>
					<View style={styles.cell}>
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
					<View style={styles.verticalSeparator} />
					<View style={styles.cell}>
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
					<View style={styles.verticalSeparator} />
					<View style={styles.cell}>
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
				<View style={styles.buttons}>
					<CustomButton
						text={'Modifier'}
						onPress={() => router.push('/profile/edit')}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'accentBackground'}
						buttonStyle={styles.button}
					/>
					<CustomButton
						text={'Déconnexion'}
						onPress={signOut}
						textProps={{ type: 'defaultBody' }}
						backgroundColor={'accentBackground'}
						buttonStyle={styles.button}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		marginHorizontal: '5%',
		paddingVertical: '3%',
		borderRadius: 10,
		gap: 5,
	},
	biographieText: {
		textAlign: 'center',
	},
	data: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '95%',
		marginHorizontal: 'auto',
		marginVertical: '15%',
	},
	cell: {
		width: '30%',
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
		width: '35%',
	},
});
