import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EVColor } from '@/constants/drafts/Colors';
import { useThemeColor } from '@/constants/drafts/useThemeColor';

type CircleButtonProps = {
	iconName: keyof typeof Ionicons.glyphMap;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	theme?: 'light' | 'dark';
	color?: keyof EVColor;
	size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
};

export default function CircleButton({
	iconName,
	onPress,
	style,
	color = 'info-2',
	theme,
	size = 'medium',
}: CircleButtonProps) {
	const colors = useThemeColor(theme);
	return (
		<View
			style={[
				{
					width: sizes.container[size].width,
					height: sizes.container[size].height,
					backgroundColor: colors[color],
				},
				styles.container,
				style,
			]}
		>
			<Pressable onPress={onPress}>
				<Ionicons
					name={iconName}
					size={sizes.icon[size]}
					color={colors['text-primary']}
				/>
			</Pressable>
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
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
