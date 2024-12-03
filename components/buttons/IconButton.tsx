import {
	ButtonProps,
	StyleProp,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import React, { ComponentProps, ReactNode } from 'react';
import { Colors } from '@/constants/Colors';
import {
	FontAwesome6,
	MaterialCommunityIcons,
	Octicons,
} from '@expo/vector-icons';
import { ThemedText } from '../texts/ThemedText';

type OcticonsProps = ComponentProps<typeof Octicons>;

type IconLibraries = 'octicons' | 'fontawesome6' | 'MaterialCommunityIcons';

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
	lib?: IconLibraries;
	backgroundColor?: keyof typeof Colors.light;
}

export function IconButton({
	                           buttonStyle,
	                           title,
	                           textProps = { type: 'defaultBody', color: 'text' },
	                           iconStyle,
	                           iconFirst = false,
	                           lib = 'octicons',
	                           backgroundColor = 'background',
	                           ...restProps
                           }: Readonly<Props>): ReactNode {
	const Icon =
		lib === 'octicons'
			? Octicons
			: lib === 'fontawesome6'
				? FontAwesome6
				: MaterialCommunityIcons;

	return (
		<TouchableOpacity
			// @ts-ignore
			style={[{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light[backgroundColor] }, buttonStyle as ViewStyle]}
			{...restProps}
		>
			{iconFirst && (
				<Icon
					{...restProps}
					style={iconStyle as TextStyle}
				/>
			)}
			{title && textProps && <ThemedText {...textProps}>{title}</ThemedText>}
			{!iconFirst && (
				<Icon
					{...restProps}
					style={iconStyle as TextStyle}
				/>
			)}
		</TouchableOpacity>
	);
}

export default IconButton;