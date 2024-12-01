import {
	Text,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
	TextInput,
} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { EVColor } from '@/constants/drafts/Colors';

type CustomInputTextProps = {
	label?: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	iconLeft?: keyof typeof Ionicons.glyphMap;
	iconRight?: keyof typeof Ionicons.glyphMap;
	value: string;
	style?: StyleProp<ViewStyle>;
	theme?: 'light' | 'dark';
	color?: keyof EVColor;
	size?: 'small' | 'medium' | 'large';
	onChangeText?: (text: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onIconLeftPress?: () => void;
	onIconRightPress?: () => void;
};

export default function CustomInputText({
	label,
	placeholder,
	iconLeft,
	secureTextEntry = false,
	iconRight,
	style,
	theme,
	onChangeText,
	value,
	color = 'secondary-1',
	size = 'medium',
}: CustomInputTextProps) {
	const colors = useThemeColor(theme);

	return (
		<View
			style={[
				{
					width: '90%',
					paddingLeft: 20,
					backgroundColor: colors['background-1'],
					borderColor: colors[color],
				},
				styles.container,
				style,
			]}
		>
			{label && (
				<Text
					style={[
						{
							fontSize: sizes['font'][size] / 2,
							color: colors['text-primary'],
						},
						styles.label,
					]}
				>
					{label}
				</Text>
			)}

			<TextInput
				secureTextEntry={secureTextEntry}
				style={[{ fontSize: sizes['font'][size] }, styles.input]}
				cursorColor={colors['text-primary']}
				placeholder={placeholder}
				onChangeText={onChangeText}
			>
				{value}
			</TextInput>
			{iconRight && (
				<Ionicons
					name={iconRight}
					size={sizes.icon[size]}
					color={colors['text-primary']}
					style={styles.iconRight}
				/>
			)}
		</View>
	);
}

const sizes = {
	input: {
		small: {
			height: 40,
			width: 60,
		},
		medium: {
			height: 50,
			width: 70,
		},
		large: {
			height: 60,
			width: 80,
		},
	},
	icon: {
		small: 20,
		medium: 25,
		large: 30,
	},
	font: {
		small: 15,
		medium: 20,
		large: 25,
	},
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		position: 'absolute',
		top: -20,
		left: 5,
	},
	input: {
		width: '100%',
	},
	iconLeft: {},
	iconRight: {
		position: 'absolute',
		right: 20,
	},
});
