import React, { useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSession } from '@/components/context/SessionProvider';
import { ThemedText } from '@/components';
import { User } from '@/types/Ecovoit';
import GetImage from '@/components/modal/GetImage';
import { imageSourceType } from '@/types';

export default function UserPage() {
	const initialUser: User = {
		id: 1,
		username: 'John Doe',
		email: 'johndoe@gmail.com',
		bio: "I'm a cool guy",
		firstName: 'John',
		lastName: 'Doe',
		rank: 'member',
		verified: true,
		vehicles: [],
		tripsAsDriver: [],
		tripsAsPassenger: [],
	};
	const [user, setUser] = useState<User | null>(initialUser);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [imgSource, setImgSource] = useState<imageSourceType>('galerie');

	const { signOut, isLoading } = useSession();

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
					imgSource={imgSource}
					setImgSource={setImgSource}
					setProfileImage={setProfileImage}
					profileImage={profileImage}
					onClose={() => setShowModal(false)}
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
});
