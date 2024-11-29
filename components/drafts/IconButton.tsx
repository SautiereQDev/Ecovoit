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

type IconButtonProps = {
	iconName: keyof typeof Ionicons.glyphMap;
	color?: keyof typeof colors;
	title?: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
};

export default function IconButton({
	iconName,
	onPress,
	style,
	color = 'dark',
	title,
	size = 'large',
}: IconButtonProps) {
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

const colors = {
	primary: '#007bff',
	secondary: '#6c757d',
	success: '#28a745',
	danger: '#dc3545',
	warning: '#ffc107',
	info: '#17a2b8',
	light: '#f8f9fa',
	dark: '#343a40',
};

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
