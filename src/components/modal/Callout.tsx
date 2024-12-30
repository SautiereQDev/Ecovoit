import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { PropsWithChildren } from 'react';
import { Ionicons } from '@expo/vector-icons';

type CalloutProps = PropsWithChildren<{
	isVisible: boolean;
	title?: string;
	content?: string;
	onClose: () => void;
}>;

export default function Callout({
	isVisible,
	title,
	onClose,
	children,
	content,
}: CalloutProps) {
	return (
		<Modal
			transparent
			animationType='slide'
			visible={isVisible}
		>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
					<Ionicons
						onPress={onClose}
						name='close'
						size={18}
					/>
				</View>
				<View style={styles.contentContainer}>
					<Text style={styles.content}>{content}</Text>
					{children}
					<Pressable
						style={styles.button}
						onPress={() => alert('Hello World')}
					>
						<Text style={styles.buttonText}>Click here</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 30,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
		backgroundColor: '#fff',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		width: '100%',
	},
	title: {
		color: '#000',
	},
	contentContainer: {
		backgroundColor: '#fff',
		padding: 10,
		alignItems: 'center',
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
		width: '100%',
	},
	content: {
		fontSize: 30,
	},
	button: {
		backgroundColor: '#fff',
		borderRadius: 10,
		marginTop: 20,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#000',
	},
});
