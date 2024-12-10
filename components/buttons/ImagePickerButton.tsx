import React, { useState } from 'react';
import { Image, Modal, StyleSheet, View, ViewStyle } from 'react-native';
import CustomButton from '@/components/buttons/CustomButton';
import GetImage from '@/components/modal/GetImage';

interface ImagePickerButtonProps {
	image: string | null | undefined;
	setImage:
		| React.Dispatch<React.SetStateAction<string | null>>
		| ((image: string) => void);
	style?: ViewStyle;
}

export const ImagePickerButton = ({
	image,
	setImage,
	style,
}: ImagePickerButtonProps) => {
	const [modalVisible, setModalVisible] = useState(false);

	const addImage = () => {
		setModalVisible(true);
	};

	const removeImage = () => {
		setImage('');
	}

	const handleClose = () => {
		setModalVisible(false);
	};

	return (
		<View style={[styles.container, style]}>
			<Image
				source={
					image ? { uri: image } : require('@/assets/images/default-user.png')
				}
				style={styles.image}
			/>
			<View style={styles.buttonStyle}>
				<CustomButton
					text={image ? 'Modifier' : 'Ajouter'}
					onPress={addImage}
					buttonStyle={styles.button}
					textProps={{ type: 'small' }}
					backgroundColor={'accentBackground'}
				/>
				{image && (
					<CustomButton
						text={'Suprimer'}
						onPress={removeImage}
						buttonStyle={styles.button}
						textProps={{ type: 'small' }}
						backgroundColor={'accentBackground'}
					/>
				)}
			</View>
			<Modal
				visible={modalVisible}
				onRequestClose={handleClose}
				transparent={true}
			>
				<GetImage
					visible={modalVisible}
					onClose={handleClose}
					setImage={setImage}
				/>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	buttonStyle: {
		flexDirection: 'row',
		gap: 20,
		marginHorizontal: 'auto',
	},
	button: {
		width: '30%',
	},
	image: {
		height: 100,
		aspectRatio: 1,
		borderRadius: 9999,
		marginHorizontal: 'auto',
	},
});

export default ImagePickerButton;
