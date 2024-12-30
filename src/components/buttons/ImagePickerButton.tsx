import React, { ReactNode, useState } from 'react';
import { Image, Modal, StyleSheet, View, ViewStyle } from 'react-native';
import CustomButton from '@/components/buttons/CustomButton';
import GetImage from '@/components/modal/GetImage';

/**
 * Props for the ImagePickerButton component.
 */
interface ImagePickerButtonProps {
	/** The URL of the image to display. */
	image: string | null | undefined;
	/** Function to set the image URL. */
	setImage:
		| React.Dispatch<React.SetStateAction<string | null>>
		| ((image: string) => void);
	/** Optional style for the container view. */
	style?: ViewStyle;
}

/**
 *
 * @param image {string | null | undefined} The URL of the image to display.
 * @param setImage {React.Dispatch<React.SetStateAction<string | null>> | ((image: string) => void)} Function to set the image URL.
 * @param style {ViewStyle} Optional style for the container view.
 * @returns {ReactNode} The ImagePickerButton component.
 */
export const ImagePickerButton = ({
	image,
	setImage,
	style,
}: ImagePickerButtonProps): ReactNode => {
	const [modalVisible, setModalVisible] = useState(false);

	/**
	 * Opens the modal to add an image.
	 */
	const addImage = () => {
		setModalVisible(true);
	};

	/**
	 * Removes the currently selected image.
	 */
	const removeImage = () => {
		setImage('');
	};

	/**
	 * Closes the modal.
	 */
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
