import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

type CircleButtonProps = {
	iconName: keyof typeof Ionicons.glyphMap;
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
	size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
};

export default function CircleButton({
	iconName,
	onPress,
	style,
	variant = 'primary',
	size = 'medium',
}: CircleButtonProps) {
	return (
		<View
			style={[
				{
					width: sizes.container[size].width,
					height: sizes.container[size].height,
					backgroundColor: variants[variant].backgroundColor,
				},
				styles.container,
				style,
			]}
		>
			<Pressable onPress={onPress}>
				<Ionicons
					name={iconName}
					size={sizes.icon[size]}
					color={variants[variant].color}
				/>
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
