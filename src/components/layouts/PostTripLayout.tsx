import { PropsWithChildren } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView, StyleSheet } from 'react-native';
import IconButton from '@/components/IconButton';
import { ThemedText } from '@/components/ThemedText';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export const PostTripLayout = ({
	title,
	children,
	iconTopLeft = 'arrow-back-sharp',
	iconTopRight = 'close-sharp',
	onPressTopLeft = () => {},
	onPressTopRight = () => {},
}: PropsWithChildren<{
	title?: string;
	onPressTopLeft?: () => void;
	onPressTopRight?: () => void;
	iconTopLeft?: keyof typeof Ionicons.glyphMap;
	iconTopRight?: keyof typeof Ionicons.glyphMap;
}>) => {
	const colors = useThemeColor();

	return (
		<SafeAreaView
			style={[{ backgroundColor: colors['background-1'] }, styles.container]}
		>
			<StatusBar translucent />
			<IconButton
				iconName={iconTopLeft}
				onPress={onPressTopLeft}
				size='large'
				style={{ position: 'absolute', top: 15, left: 0 }}
			/>
			<IconButton
				iconName={iconTopRight}
				onPress={onPressTopRight}
				size='large'
				style={{ position: 'absolute', top: 15, right: 0 }}
			/>

			<ThemedText
				type='title'
				style={{ marginTop: 80 }}
			>
				{title}
			</ThemedText>

			{children}
		</SafeAreaView>
	);
};

export default PostTripLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
	},
});
