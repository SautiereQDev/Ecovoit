import {
	ButtonProps,
	StyleProp,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import React, { ComponentProps, ReactNode } from 'react';
import { Colors } from '@/constants/Colors';
import Octicons from '@expo/vector-icons/Octicons';
import { ThemedText } from '../texts/ThemedText';

type OcticonsProps = ComponentProps<typeof Octicons>;

interface Props extends Omit<ButtonProps, 'title'>, OcticonsProps {
	buttonStyle?: StyleProp<ViewStyle>;
	textProps?: {
		type?:
			| 'header1'
			| 'header2'
			| 'header3'
			| 'header4'
			| 'header5'
			| 'small'
			| 'italic'
			| 'accent'
			| 'defaultBody'
			| 'bigger';
		color: keyof typeof Colors.light;
	};
	iconStyle?: StyleProp<TextStyle>;
	title?: string;
	iconFirst?: boolean;
}

export function IconButton({
	buttonStyle,
	title,
	textProps = { type: 'defaultBody', color: 'text' },
	iconStyle,
	iconFirst = false,
	...restProps
}: Readonly<Props>): ReactNode {
	return (
		<TouchableOpacity
			style={[{ flexDirection: 'row', alignItems: 'center' }, buttonStyle]}
			{...restProps}
		>
			{iconFirst && (
				<Octicons
					{...restProps}
					style={iconStyle as TextStyle}
				/>
			)}
			{title && textProps && <ThemedText {...textProps}>{title}</ThemedText>}
			{!iconFirst && (
				<Octicons
					{...restProps}
					style={iconStyle as TextStyle}
				/>
			)}
		</TouchableOpacity>
	);
}

export default IconButton;
