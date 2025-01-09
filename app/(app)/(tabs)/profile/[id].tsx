import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ReturnButton } from '@/components/buttons';
import { ThemedText } from '@/components/texts';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useData } from '@/providers';
import { profileStyles } from '@/styles';
import { ErrorScreen, LoadingScreen } from '@/components/pages';

export function Profile() {
	const [showModal, setShowModal] = useState<boolean>(false);

	const { id } = useLocalSearchParams<{ id: string }>();

	const { useUser } = useData();
	const { data: user, isLoading, error } = useUser(id);

	console.log('user', user);

	const router = useRouter();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <ErrorScreen error={error} />;
	}

	return (
		<ScrollView style={profileStyles.container}>
			<ReturnButton />
			<ThemedText
				type={'header3'}
				style={profileStyles.title}
			>
				Profile de {user?.username}
			</ThemedText>
			<View>
				<View style={[{ marginBottom: 50 }, profileStyles.biography]}>
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
							{user?.stars}
						</ThemedText>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

export default Profile;
