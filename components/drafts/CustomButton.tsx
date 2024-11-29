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
import { fontSize } from '@/constants/Fonts';

type CustomButtonProps = {
	iconLeft?: keyof typeof Ionicons.glyphMap;
	title: string;
	iconRight?: keyof typeof Ionicons.glyphMap;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	variant?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'light'
		| 'dark';
	size?: 'small' | 'medium' | 'large';
};

export default function CustomButton({
	iconLeft,
	title,
	iconRight,
	onPress,
	style,
	variant = 'danger',
	size = 'medium',
}: CustomButtonProps) {
	return (
		<View
			style={[
				{
					height: sizes.container[size].height,
					marginHorizontal: sizes.container[size].margin,
					backgroundColor: variants[variant].backgroundColor,
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
						color={variants[variant].color}
						style={styles.iconLeft}
					/>
				)}

				<Text
					style={[
						styles.text,
						{ color: variants[variant].color, fontSize: sizes.font[size] },
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
						color={variants[variant].color}
						style={styles.iconRight}
					/>
				)}
			</Pressable>
		</View>
	);
}

const variants = {
	primary: {
		backgroundColor: '#007bff',
		color: '#fff',
	},
	secondary: {
		backgroundColor: '#6c757d',
		color: '#fff',
	},
	success: {
		backgroundColor: '#28a745',
		color: '#fff',
	},
	danger: {
		backgroundColor: '#dc3545',
		color: '#fff',
	},
	warning: {
		backgroundColor: '#ffc107',
		color: '#000',
	},
	info: {
		backgroundColor: '#17a2b8',
		color: '#fff',
	},
	light: {
		backgroundColor: '#f8f9fa',
		color: '#000',
	},
	dark: {
		backgroundColor: '#343a40',
		color: '#fff',
	},
};

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
