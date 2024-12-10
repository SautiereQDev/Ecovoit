import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/buttons/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/texts/ThemedText';
import { notify } from 'react-native-notificated';

type Props = {
	visible: boolean;
	onClose: () => void;
	setImage: React.Dispatch<string | null > | ((image: string) => void);
};

export const GetImage = ({
	visible,
	onClose,
	setImage,
}: Props) => {

	const pickImageFromGalerie = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			onClose();
			notify('success', { params: { title: 'Image uploadé' } });
		}
	};

	const pickImageFromCamera = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			onClose();
			notify('success', { params: { title: 'Image uploadé' } });
		}
	};

	return (
		<Modal
			visible={visible}
			onRequestClose={onClose}
			transparent={true}
		>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<ThemedText type={'header4'} style={styles.title}>Source de l'image de profile</ThemedText>
					<View style={styles.buttons}>
						<CustomButton
							text={'Depuis la galerie'}
							onPress={pickImageFromGalerie}
							textProps={{type: 'bigger', color: 'background'}}
							buttonStyle={styles.button}
						/>
						<CustomButton
							text={"Ouvrir l'appareil photo"}
							onPress={pickImageFromCamera}
							textProps={{type: 'bigger', color: 'background'}}
							buttonStyle={styles.button}
						/>
					</View>
					<CustomButton onPress={onClose} text={'Fermer'} textProps={{ type: 'bigger', color: 'background' }} buttonStyle={styles.exitButton} backgroundColor={'secondary'} />
				</View>
			</View>
		</Modal>
	);
};

export default GetImage;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	container: {
		width: '90%',
		height: '38%',
		paddingTop: '5%',
		backgroundColor: Colors.light.background,
		borderRadius: 10,
	},
	title: {
		textAlign: 'center',
		marginHorizontal: '5%'
	},
	buttons:{
		display: 'flex',
		justifyContent: 'space-around',
		marginVertical: 'auto',
		gap: 20,
		marginBottom: '25%',
	},
	button: {
		width: '70%',
		marginHorizontal: 'auto',
	},
	exitButton: {
		position: 'absolute',
		paddingHorizontal: "3%",
		bottom: 10,
		right: 10,
	}
});
