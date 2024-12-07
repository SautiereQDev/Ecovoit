import {
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from "react-native";
import React from "react";
import { ThemedText } from "../texts/ThemedText";
import { Colors } from "@/constants/Colors";

type Props = PressableProps & {
	buttonStyle?: StyleProp<ViewStyle>;
	text: string;
	textProps?: {
		type?:
			| "header1"
			| "header2"
			| "header3"
			| "header4"
			| "header5"
			| "header6"
			| "small"
			| "italic"
			| "accent"
			| "defaultBody"
			| "bigger"
		color?: keyof typeof Colors.light;
	};
	backgroundColor?: keyof typeof Colors.light;
};

/**
 * CustomButton component renders a pressable button with customizable text.
 *
 * @param {StyleProp<ViewStyle>} buttonStyle - Optional style for the button.
 * @param {string} text - The text to display inside the button.
 * @param {Object} textProps - Optional properties for the text.
 * @param {string} textProps.type - The type of text style.
 * @param {keyof typeof Colors.light} textProps.color - The color of the text.
 * @param {keyof typeof Colors.light} backgroundColor - The background color of the button.
 * @param {PressableProps} restProps - Additional props for the Pressable component.
 *
 * @returns {JSX.Element} The rendered button component.
 */
export function CustomButton({
															 buttonStyle,
															 text,
															 textProps = { color: "background" },
															 backgroundColor = "primary",
															 ...restProps
														 }: Props): JSX.Element {
	return (
		<Pressable
			style={[
				styles.button,
				buttonStyle,
				{ backgroundColor: Colors.light[backgroundColor] },
			]}
			{...restProps}
		>
			<ThemedText
				type={textProps?.type ?? "accent"}
				color={textProps?.color}
				style={styles.text}
			>
				{text}
			</ThemedText>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 6,
		borderRadius: 10,
	},
	text: {
		textAlign: "center",
	},
});

export default CustomButton;