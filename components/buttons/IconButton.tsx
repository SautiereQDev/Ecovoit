import {
	ButtonProps,
	StyleProp,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from "react-native";
import React, { ComponentProps, ReactNode } from "react";
import { Colors } from "@/constants/Colors";
import Octicons from "@expo/vector-icons/Octicons";
import { ThemedText } from "../texts/ThemedText";

type OcticonsProps = ComponentProps<typeof Octicons>;

interface Props extends Omit<ButtonProps, "title">, OcticonsProps {
	buttonStyle?: StyleProp<ViewStyle>;
	textProps?: {
		type?:
			| "header1"
			| "header2"
			| "header3"
			| "header4"
			| "header5"
			| "small"
			| "italic"
			| "accent"
			| "defaultBody"
			| "bigger";
		color: keyof typeof Colors.light;
	};
	iconStyle?: StyleProp<TextStyle>;
	title?: string;
	iconFirst?: boolean;
}

/**
 * IconButton component that renders a button with an icon.
 *
 * @param {StyleProp<ViewStyle>} buttonStyle - Custom style for the button.
 * @param {string} title - Title of the button.
 * @param {object} textProps - Properties for the text inside the button.
 * @param {StyleProp<ViewStyle>} iconStyle - Custom style for the icon.
 * @param iconFirst
 * @param {Props} restProps - Other properties passed to the button.
 *
 * @returns {JSX.Element} A TouchableOpacity component with an icon.
 */
export function IconButton({
	buttonStyle,
	title,
	textProps = { type: "defaultBody", color: "text" },
	iconStyle,
	iconFirst = false,
	...restProps
}: Props): ReactNode {
	if (iconFirst) {
		return (
			<TouchableOpacity
				style={buttonStyle}
				{...restProps}
			>
				<Octicons
					{...restProps}
					style={iconStyle}
				/>
				{title && textProps && <ThemedText {...textProps}>{title}</ThemedText>}
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity
				style={buttonStyle}
				{...restProps}
			>
				{title && textProps && <ThemedText {...textProps}>{title}</ThemedText>}
				<Octicons
					{...restProps}
					style={iconStyle}
				/>
			</TouchableOpacity>
		);
	}
}

export default IconButton;
