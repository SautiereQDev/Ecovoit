import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
	Text,
} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EVColor } from '@/constants/drafts/Colors';
import { useThemeColor } from '@/constants/drafts/useThemeColor';

type IconButtonProps = {
	iconName: keyof typeof Ionicons.glyphMap;
	theme?: 'light' | 'dark';
	color?: keyof EVColor;
	title?: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
};

export default function IconButton({
	iconName,
	onPress,
	style,
	theme,
	color = 'secondary-1',
	title,
	size = 'large',
}: IconButtonProps) {
	const colors = useThemeColor(theme);
	return (
		<View
			style={[
				{
					width: sizes.container[size].width,
					height: sizes.container[size].height,
				},
				styles.container,
				style,
			]}
		>
			<Pressable onPress={onPress}>
				<Ionicons
					name={iconName}
					size={sizes.icon[size]}
					color={colors[color]}
				/>
			</Pressable>
			{title && (
				<Text style={[{ color: colors[color] }, styles.text]}>{title}</Text>
			)}
		</View>
	);
}

const sizes = {
	container: {
		tiny: {
			width: 30,
			height: 30,
		},
		small: {
			width: 40,
			height: 40,
		},
		medium: {
			width: 50,
			height: 50,
		},
		large: {
			width: 60,
			height: 60,
		},
		xlarge: {
			width: 70,
			height: 70,
		},
	},
	icon: {
		tiny: 15,
		small: 20,
		medium: 25,
		large: 30,
		xlarge: 35,
	},
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		position: 'absolute',
		bottom: 0,
	},
});
