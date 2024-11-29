import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	Text,
	ViewStyle,
} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/constants/drafts/useThemeColor';

type CustomButtonProps = {
	iconLeft?: keyof typeof Ionicons.glyphMap;
	title: string;
	iconRight?: keyof typeof Ionicons.glyphMap;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	theme?: 'light' | 'dark';
	color?:
		| 'primary'
		| 'secondary'
		| 'background'
		| 'success'
		| 'error'
		| 'warning'
		| 'info';
	size?: 'small' | 'medium' | 'large';
};

export default function CustomButton({
	iconLeft,
	title,
	iconRight,
	onPress,
	style,
	theme,
	color = 'primary',
	size = 'medium',
}: CustomButtonProps) {
	const colors = useThemeColor(theme);

	return (
		<View
			style={[
				{
					height: sizes.container[size].height,
					marginHorizontal: sizes.container[size].margin,
					backgroundColor: colors[color][500],
				},
				styles.container,
				style,
			]}
		>
			<Pressable
				style={styles.pressable}
				onPress={onPress}
			>
				{iconLeft && (
					<Ionicons
						name={iconLeft}
						size={sizes.icon[size]}
						color={colors['textMuted']}
						style={styles.iconLeft}
					/>
				)}

				<Text
					style={[
						styles.text,
						{ color: colors['textMuted'], fontSize: sizes.font[size] },
						iconLeft && !iconRight ? { marginLeft: 20 } : {},
						iconRight && !iconLeft ? { marginRight: 20 } : {},
					]}
				>
					{title}
				</Text>

				{iconRight && (
					<Ionicons
						name={iconRight}
						size={sizes.icon[size]}
						color={colors['textMuted']}
						style={styles.iconRight}
					/>
				)}
			</Pressable>
		</View>
	);
}

const sizes = {
	container: {
		small: {
			height: 40,
			margin: 60,
		},
		medium: {
			height: 50,
			margin: 50,
		},
		large: {
			height: 60,
			margin: 40,
		},
	},
	icon: {
		small: 25,
		medium: 35,
		large: 45,
	},
	font: {
		small: 15,
		medium: 20,
		large: 25,
	},
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	pressable: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontWeight: 'bold',
	},
	iconLeft: {
		position: 'absolute',
		left: 8,
	},
	iconRight: {
		position: 'absolute',
		right: 8,
	},
});
