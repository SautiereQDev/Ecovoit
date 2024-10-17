import {ButtonProps, StyleProp, StyleSheet, TouchableOpacity, ViewStyle,} from "react-native";
import React from "react";
import {ThemedText} from "@/components/ThemedText.tsx";
import {Colors} from "@/constants/Colors";

type Props = ButtonProps & {
	buttonStyle: StyleProp<ViewStyle>;
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
			| undefined;
		color: keyof typeof Colors.light;
	};
};

export default function CustomButton({buttonStyle, title, textProps, ...buttonProps}: Props) {
	return (
		<TouchableOpacity style={buttonStyle} {...buttonProps}>
			<ThemedText
				type={textProps?.type ?? "defaultBody"}
				color={textProps?.color}
				style={styles.text} // Separate style for the text
			>
				{title}
			</ThemedText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		textAlign: "center",
	},
});
