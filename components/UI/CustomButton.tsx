import {Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle,} from "react-native";
import React from "react";
import {ThemedText} from "../ThemedText.tsx";
import {Colors} from "../../constants/Colors";

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
				| "small"
				| "italic"
				| "accent"
				| "defaultBody";
		color: keyof typeof Colors.light;
	};
};
/**
 * CustomButton component renders a pressable button with customizable text.
 *
 * @param {StyleProp<ViewStyle>} buttonStyle - Optional style for the button.
 * @param {string} text - The text to display inside the button.
 * @param {Object} textProps - Optional properties for the text.
 * @param {string} textProps.type - The type of text style.
 * @param {keyof typeof Colors.light} textProps.color - The color of the text.
 * @param {PressableProps} restProps - Additional props for the Pressable component.
 *
 * @returns {JSX.Element} The rendered button component.
 */
export default function CustomButton({
buttonStyle,
text,
textProps,
...restProps
}: Props) {
	return (
			<Pressable style={[styles.button, buttonStyle]} {...restProps}>
				<ThemedText
						type={textProps?.type ?? "defaultBody"}
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
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	text: {
		textAlign: "center",
	},
});